import React from 'react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact, DefaultElement } from 'slate-react'
import CustomEditor from './customCommands'
import { CodeElement, EntityElement, Leaf, ParagraphElement, TokenElement } from './elements'
import './EntityLabeler.css'
import { deserialize } from './utilities'
import { EditMode, withEditModes } from './withEditModes'

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
    const editor = React.useMemo(() => withEditModes(withReact(withHistory(createEditor()))), [])
    const [value, setValue] = React.useState(() => defaultEditorValue2)

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

    const renderLeaf = React.useCallback(props => {
        return <Leaf {...props} />
    }, [])

    const onMouseUp = React.useCallback((event) => {
        CustomEditor.expandSelectionToTokenBoundaries(editor)
    }, [])

    function onChangeValue(newValue: Node[]) {
        setValue(newValue as any)
    }

    function onEditModeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newEditMode = event.target.value as EditMode
        editor.editMode = newEditMode
    }

    React.useEffect(() => {
        console.log(`Edit Mode Changed: `, { editMode: editor.editMode })
    }, [editor.editMode])

    return (
        <div className="entity-labeler">
            <div>
                <label htmlFor="editMode-none">
                    <input id="editMode-none" onChange={onEditModeChange} type="radio" value={EditMode.None} checked={editor.editMode === EditMode.NoTextEdit} name="editMode" />
                    None
                </label>
                <label htmlFor="editMode-noTextEdit">
                    <input id="editMode-noTextEdit" onChange={onEditModeChange} type="radio" value={EditMode.NoTextEdit} checked={editor.editMode === EditMode.NoTextEdit} name="editMode" />
                    No Text Edit
                </label>
                <button type="button" onClick={() => CustomEditor.wrapNodes(editor)}>Wrap Nodes</button>
                <button type="button" onClick={() => CustomEditor.saveValue(editor)} >Save</button>
                <button type="button" onClick={() => setValue(getInitialValue())}>Reset</button>
            </div>
            <Slate
                editor={editor}
                value={value}
                onChange={onChangeValue}
            >
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onMouseUp={onMouseUp}
                />
            </Slate>
        </div>
    )
}


export default EntityLabeler