import { Editor } from "slate"

export enum EditMode {
    None = 'None',
    LabelMode = 'NoTextEdit',
}

const defaultEditMode = EditMode.None

export type EditModesEditor = {
    editMode: EditMode
    debug: boolean
}

const editModeOperationsMaps: Record<EditMode, string[]> = {
    [EditMode.None]: [],
    [EditMode.LabelMode]: ['insert_text', 'remove_text', 'split_node', 'merge_node'],
}

export function withEditModes<T extends Editor>(editor: T): T & EditModesEditor {
    // TODO: Clean up typing. Do we need casting?
    const editorWithModes = (editor as unknown) as (T & EditModesEditor)
    editorWithModes.editMode = defaultEditMode
    editorWithModes.debug = false

    const { apply: originalApply } = editor

    editor.apply = (operation) => {
        console.log({
            editMode: editorWithModes.editMode,
            debug: editorWithModes.debug,
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