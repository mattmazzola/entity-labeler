import { Element } from 'slate'

type TokenMetadata = {
    hasSpace: boolean
}

type EntityPrediction = {
    id: string
    name: string
    startTokenIndex: number
    endTokenIndex: number
    phrase: string
    entityType: number
    role?: string
    roleId?: string
}

export type Exraction = {
    tokenizedText: string[]
    tokenMetadata: TokenMetadata[]
    entityPredictions: EntityPrediction[]
}

export type TokenElement = Element
    & {
        type: 'token',
        selectable: boolean
    }

export type EntityElement = Element
    & {
        type: 'entity'
    }

export type ParagraphElement = Element
    & {
        type: 'paragraph'
    }