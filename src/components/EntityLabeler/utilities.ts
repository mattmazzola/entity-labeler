import { Node } from 'slate'
import * as models from './models'

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


export const createExtraction = (text = ''): models.Exraction => {
    return {
        tokenizedText: tokenizeText(text),
        entityPredictions: [],
        tokenMetadata: [],
    }
}

export const tokenizeRegex = /\s+|[.?,!]/g
export function tokenizeText(text: string, tokenRegex: RegExp = tokenizeRegex): string[] {
    return text.split(tokenRegex)
}

export function convertExtractionToNodes(extraction: models.Exraction): Node[] {
    const tokenElements = extraction.tokenizedText.flatMap<models.TokenElement>(text => {
        // TODO: Change to only add "space" token if metadata hasSpace is true
        return [
            {
                type: 'token',
                selectable: true,
                children: [
                    { text }
                ]
            },
            {
                type: 'token',
                selectable: false,
                children: [
                    { text: ' ' }
                ]
            }
        ]
    })

    tokenElements.pop()

    const paragraph: models.ParagraphElement = {
        type: 'paragraph',
        children: tokenElements
    }

    return [paragraph]
}
