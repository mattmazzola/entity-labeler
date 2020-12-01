import { Node } from 'slate'
import * as models from './models'

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

export const createExtraction = (text = '', tokenizer: (s: string) => string[] = tokenizeText): models.Exraction => {
    return {
        tokenizedText: tokenizer(text),
        entityPredictions: [],
        tokenMetadata: [],
    }
}

export const tokenizeRegex = /\s+|[.?,!]/g
export function tokenizeText(text: string, tokenRegex: RegExp = tokenizeRegex): string[] {
    return text.split(tokenRegex)
}

export function convertExtractionToNodes(extraction: models.Exraction): Node[] {
    const tokenElements = extraction.tokenizedText.flatMap((text, i) => {
        const token: models.TokenElement = {
            type: 'token',
            selectable: true,
            tokenIndex: i,
            children: [
                { text }
            ]
        }

        const tokens: (models.TokenElement | Node)[] = [token]
        const isLast = extraction.tokenizedText.length - 1 === i
        const addSpace = !isLast

        // TODO: Change to only add "space" token if metadata hasSpace is true
        const spaceElement: Node = {
            type: 'space',
            children: [
                { text: ' ' }
            ]
        }

        if (addSpace) {
            tokens.push(spaceElement)
        }

        return tokens
    })

    const paragraph: models.ParagraphElement = {
        type: 'paragraph',
        children: tokenElements
    }

    return [paragraph]
}

export function convertValueToExtraction(value: Node[]): models.Exraction {

    const allTokenNodes = value.flatMap(node => {
        const nodeEntries = [...Node.elements(node)]
        const nodes = nodeEntries.map(([n,p]) => n)
        const tokenNodes = nodes.filter(n => n.type === 'token')

        return tokenNodes
    })

    const tokenizedText = allTokenNodes.map(n => Node.string(n))

    console.log({ allTokenNodes })

    return {
        entityPredictions: [],
        tokenMetadata: [],
        tokenizedText
    }
}