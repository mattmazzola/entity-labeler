import { Editor } from "slate"

export enum EditMode {
    None = 'None',
    NoTextEdit = 'NoTextEdit',
}

const defaultEditMode = EditMode.NoTextEdit

type EditorWithEditModes = {
    editMode: EditMode
}

const editModeOperationsMaps: Record<EditMode, string[]> = {
    [EditMode.None]: [],
    [EditMode.NoTextEdit]: ['insert_text', 'remove_text', 'split_node'],
}

export function withEditModes<T extends Editor>(editor: T): T & EditorWithEditModes {
    const editorWithModes = (editor as unknown) as (T & EditorWithEditModes)
    editorWithModes.editMode = defaultEditMode

    const { apply: originalApply } = editor

    editor.apply = (operation) => {
        console.log({
            editMode: editorWithModes.editMode,
            operationType: operation.type,
            operation
        })

        const disallowedOperaions = editModeOperationsMaps[editorWithModes.editMode]
        const isOperationDisallowed = disallowedOperaions.includes(operation.type)
        if (isOperationDisallowed) {
            return
        }

        originalApply(operation)
    }

    return editorWithModes
}