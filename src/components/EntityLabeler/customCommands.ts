import { Transforms, Editor, Text, Node, Point } from 'slate'
import { serialize, deserialize } from './utilities'

export const defaultEditorValue: Node[] = [
    {
        type: 'paragraph',
        children: [
            {
                type: 'start_token',
                children: [
                    {
                        text: ''
                    },
                ]
            },
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
            {
                type: 'end_token',
                children: [
                    {
                        text: ''
                    },
                ]
            },
        ],
    },
]

const localStorageKey = 'content'

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
        localStorage.setItem(localStorageKey, serializedValue)
    },

    loadValue(): Node[] {
        try {
            return deserialize(localStorage.getItem(localStorageKey)!)
                ?? defaultEditorValue
        }
        catch {
            return defaultEditorValue
        }
    },

    expandSelectionToTokenBoundaries(editor: Editor) {
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

        // If either the start or end is not a token preven expansion
        if (startToken.type !== 'token'
            || endToken.type !== 'token') {
            return
        }

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

export default CustomEditor