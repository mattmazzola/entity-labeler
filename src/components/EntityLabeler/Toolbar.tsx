import React from 'react'
import { Editor, Node, Transforms } from 'slate'
import CustomEditor, { defaultEditorValue } from './customCommands'
import { EditMode, EditModesEditor } from './withEditModes'

type Props = {
    editor: Editor & EditModesEditor,
    setValue: React.Dispatch<React.SetStateAction<Node[]>>
}
const Toolbar: React.FC<Props> = (props) => {
    function onEditModeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newEditMode = event.target.value as EditMode
        props.editor.editMode = newEditMode

        // Attempts to get editor to update
        props.editor.onChange()

        // // set an arbitrary property then set it back to undefined
        // for (const _forceRefresh of [{}, undefined]) {
        //     Transforms.setNodes(props.editor, { _forceRefresh }, { at: [0] })
        // }

        // TODO: Why doesn't useEffect work for this type of state change?
        // Maybe because it's not real react state, and thus the change to an editor property isn't observed?
        // CustomEditor.expandSelectionToTokenBoundaries(props.editor)
        console.log({ editMode: props.editor.editMode })
    }

    React.useEffect(() => {
        console.log(`Toolbar: editor.change: `, { editMode: props.editor.editMode })
    }, [props.editor.editMode, props.editor.debug])

    function onChangeDebug() {
        props.editor.debug = !props.editor.debug

        // Attempts to get editor to update
        props.editor.onChange()

        // // set an arbitrary property then set it back to undefined
        // for (const _forceRefresh of [{}, undefined]) {
        //     Transforms.setNodes(props.editor, { _forceRefresh }, { at: [0] })
        // }

        console.log({ debug: props.editor.debug })
    }

    return (
        <div className="toolbar">
            <fieldset>
                <legend>Mode:</legend>
                <label htmlFor="editMode-none">
                    <input id="editMode-none" onChange={onEditModeChange} type="radio" value={EditMode.None} defaultChecked={props.editor.editMode === EditMode.None} name="editMode" />
                    None
                </label>
                <label htmlFor="editMode-noTextEdit">
                    <input id="editMode-noTextEdit" onChange={onEditModeChange} type="radio" value={EditMode.LabelMode} name="editMode" />
                    Label
                </label>
            </fieldset>

            <fieldset>
                <legend>Options</legend>
                <label htmlFor="editMode-debug">
                    <input type="checkbox" onChange={onChangeDebug} defaultChecked={Boolean(props.editor.debug)} />
                    Debug
                </label>
            </fieldset>

            <fieldset>
                <legend>Actions:</legend>
                <button type="button" onClick={() => CustomEditor.wrapNodes(props.editor)}>Wrap Nodes</button>
                <button type="button" onClick={() => CustomEditor.saveValue(props.editor)} >Save</button>
                <button type="button" onClick={() => props.setValue(CustomEditor.loadValue())}>Load</button>
                <button type="button" onClick={() => props.setValue(defaultEditorValue)}>Reset</button>
            </fieldset>

        </div>
    )
}

export default Toolbar