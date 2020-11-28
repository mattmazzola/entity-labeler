import { Node } from 'slate'

// Define a serializing function that takes a value and returns a string.
export const serialize = (value: Node[]) => {
    return JSON.stringify(value)
}

export const serializeAsString = (value: Node[]) => {
    return (
        value
            // Return the string content of each paragraph in the value's children.
            .map(n => Node.string(n))
            // Join them all with line breaks denoting paragraphs.
            .join('\n')
    )
}

// Define a deserializing function that takes a string and returns a value.
export const deserialize = (string: string): Node[] => {
    return JSON.parse(string)!
}

export const deserializeString = (string: string): Node[] => {
    // Return a value array of children derived by splitting the string.
    return string.split('\n').map(line => {
        return {
            children: [{ text: line }],
        }
    })
}