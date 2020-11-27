import React from 'react'
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'
import './EntityLabeler.css'

const EntityLabeler: React.FC = () => {
    // Create a Slate editor object that won't change across renders.
    const editor = React.useMemo(() => withReact(createEditor()), [])

    // Keep track of state for the value of the editor.
    const [value, setValue] = React.useState([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ])

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = React.useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    return (
        <div className="entity-labeler">
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => setValue(newValue as any)}
            >
                <Editable
                    renderElement={renderElement}
                    onKeyDown={event => {
                        if (event.key === '&') {
                            event.preventDefault()
                            editor.insertText('and')
                        }
                        if (event.key === '`' && event.ctrlKey) {
                            // Prevent the "`" from being inserted by default.
                            event.preventDefault()
                            // Determine whether any of the currently selected blocks are code blocks.
                            const [match] = Editor.nodes(editor, {
                                match: n => n.type === 'code',
                            })
                            // Toggle the block type depending on whether there's already a match.
                            Transforms.setNodes(
                                editor,
                                { type: match ? 'paragraph' : 'code' },
                                { match: n => Editor.isBlock(editor, n) }
                            )
                        }
                    }}
                />
            </Slate>
        </div>
    )
}


const CodeElement = (props: RenderElementProps) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
}

export default EntityLabeler