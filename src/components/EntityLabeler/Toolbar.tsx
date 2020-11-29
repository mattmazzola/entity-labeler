import React from 'react'
import { Editor, Node } from 'slate'
import CustomEditor from './customCommands'
import { EditMode } from './withEditModes'

type Props = {
    editor: Editor,
    setValue: React.Dispatch<React.SetStateAction<Node[]>>
}
const Toolbar: React.FC<Props> = (props) => {
    function onEditModeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newEditMode = event.target.value as EditMode
        props.editor.editMode = newEditMode
        // TODO: Why doesn't useEffect work for this type of state change?
        console.log({ editMode: props.editor.editMode })
    }

    function onChangeDebug() {
        props.editor.debug = !props.editor.debug
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
                <button type="button" onClick={() => props.setValue(CustomEditor.loadValue())}>Reset</button>
            </fieldset>

        </div>
    )
}

export default Toolbar