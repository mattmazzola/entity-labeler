import React from 'react'
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text, Node, Point } from 'slate'
import { withHistory } from 'slate-history'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react'
import './EntityLabeler.css'

// Define a serializing function that takes a value and returns a string.
const serialize = (value: Node[]) => {
    return JSON.stringify(value)
}

const serializeAsString = (value: Node[]) => {
    return (
        value
            // Return the string content of each paragraph in the value's children.
            .map(n => Node.string(n))
            // Join them all with line breaks denoting paragraphs.
            .join('\n')
    )
}

// Define a deserializing function that takes a string and returns a value.
const deserialize = (string: string): Node[] => {
    return JSON.parse(string)!
}

const deserializeString = (string: string): Node[] => {
    // Return a value array of children derived by splitting the string.
    return string.split('\n').map(line => {
        return {
            children: [{ text: line }],
        }
    })
}

// Define our own custom set of helpers.
const CustomEditor = {
    isBoldMarkActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true,
        })

        return !!match
    },

    isCodeBlockActive(editor: Editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        })

        return !!match
    },

    toggleBoldMark(editor: Editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleCodeBlock(editor: Editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'code' },
            { match: n => Editor.isBlock(editor, n) }
        )
    },

    saveValue(editor: Editor) {
        const value = editor.children
        // Save the value to Local Storage.
        const serializedValue = serialize(value)
        localStorage.setItem('content', serializedValue)
    },

    getTokens(editor: Editor) {
        const { selection, children } = editor

        if (!selection?.anchor || !selection?.focus) {
            return
        }

        const [startPoint, endPoint] = Point.isAfter(selection.anchor, selection.focus)
            ? [selection.focus, selection.anchor]
            : [selection.anchor, selection.focus]

        const startTokenPath = startPoint.path.slice(0, -1)
        const endTokenPath = endPoint.path.slice(0, -1)
        const startToken = Node.get(editor, startTokenPath)
        const endToken = Node.get(editor, endTokenPath)

        Transforms.setSelection(editor, {
            anchor: {
                offset: 0,
                path: startPoint.path
            },
            focus: {
                offset: (Node.get(editor, endPoint.path).text as string).length,
                path: endPoint.path
            }
        })
        console.log({ startToken, endToken })
    },

    wrapNodes(editor: Editor) {
        Transforms.wrapNodes(editor, { type: 'entity', children: [] })
    }
}

const defaultEditorValue: Node[] = [
    {
        type: 'paragraph',
        children: [
            {
                text: 'A line of text in a paragraph.'
            },
        ],
    },
]

const defaultEditorValue2: Node[] = [
    {
        type: 'paragraph',
        children: [
            {
                type: 'token',
                children: [
                    {
                        text: 'Token 1'
                    },
                ]
            },
            {
                type: 'token',
                children: [
                    {
                        text: 'Token 2'
                    },
                ]
            },
            {
                type: 'token',
                children: [
                    {
                        text: 'Token 3'
                    },
                ]
            },
            {
                type: 'token',
                children: [
                    {
                        text: 'Token 4'
                    },
                ]
            },
        ],
    },
]

function getInitialValue() {
    try {
        return deserialize(localStorage.getItem('content')!)
            || defaultEditorValue
    }
    catch {
        return defaultEditorValue
    }
}

const EntityLabeler: React.FC = () => {
    // Create a Slate editor object that won't change across renders.
    const editor = React.useMemo(() => withReact(withHistory(createEditor())), [])

    // Keep track of state for the value of the editor.
    const [value, setValue] = React.useState(() => defaultEditorValue2)

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = React.useCallback(props => {
        switch (props.element.type) {
            case 'paragraph':
                return <ParagraphElement {...props} />
            case 'entity':
                return <EntityElement {...props} />
            case 'token':
                return <TokenElement {...props} />
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = React.useCallback(props => {
        return <Leaf {...props} />
    }, [])

    const onKeyDown = React.useCallback((event) => {
        if (!event.ctrlKey) {
            return
        }

        // When "B" is pressed, bold the text in the selection.
        // Replace the `onKeyDown` logic with our new commands.
        switch (event.key) {
            case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
            }

            case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
            }
        }

    }, [editor])


    const onMouseUp = React.useCallback((event) => {
        CustomEditor.getTokens(editor)
    }, [])

    function onChangeValue(newValue: Node[]) {
        setValue(newValue as any)
    }

    return (
        <div className="entity-labeler">
            <div>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleBoldMark(editor)
                    }}
                >
                    Bold
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleCodeBlock(editor)
                    }}
                >
                    Code Block
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.wrapNodes(editor)
                    }}
                >
                    Wrap Nodes
                </button>
                <button
                    onClick={event => {
                        event.preventDefault()
                        CustomEditor.saveValue(editor)
                    }}
                >
                    Save
                </button>
                <button
                    onClick={event => {
                        event.preventDefault()
                        setValue(getInitialValue())
                    }}
                >
                    Reset
                </button>
            </div>
            <Slate
                editor={editor}
                value={value}
                onChange={onChangeValue}
            >
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                    onMouseUp={onMouseUp}
                />
            </Slate>
        </div>
    )
}

// Define a React component to render leaves with bold text.
const Leaf = (props: RenderLeafProps) => {
    return (
        <span
            {...props.attributes}
            className={`${props.leaf.bold ? 'leaf-bold' : ''}`}
        >
            {props.children}
        </span>
    )
}

const CodeElement = (props: RenderElementProps) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const ParagraphElement = (props: RenderElementProps) => {
    return <div
        {...props.attributes}
        className="paragraph"
    >
        {props.children}
    </div>
}

const EntityElement = (props: RenderElementProps) => {
    return <div
        {...props.attributes}
        className="entity"
    >
        {props.children}
    </div>
}

const TokenElement = (props: RenderElementProps) => {
    return <div
        {...props.attributes}
        className="token"
    >
        {props.children}
    </div>
}

const DefaultElement = (props: RenderElementProps) => {
    return <div {...props.attributes}>{props.children}</div>
}

export default EntityLabeler