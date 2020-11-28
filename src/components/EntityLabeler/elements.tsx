import React from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'

export const Leaf: React.FC<RenderLeafProps> = (props) => {
    return (
        <span
            {...props.attributes}
            className={`${props.leaf.bold ? 'leaf-bold' : ''}`}
        >
            {props.children}
        </span>
    )
}

export const CodeElement = (props: RenderElementProps) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

export const ParagraphElement = (props: RenderElementProps) => {
    return <div
        {...props.attributes}
        className="paragraph"
    >
        {props.children}
    </div>
}

export const EntityElement = (props: RenderElementProps) => {
    return <div
        {...props.attributes}
        className="entity"
    >
        {props.children}
    </div>
}

export const TokenElement = (props: RenderElementProps) => {
    return <div
        {...props.attributes}
        className="token"
    >
        {props.children}
    </div>
}

export const DefaultElement = (props: RenderElementProps) => {
    return <div {...props.attributes}>{props.children}</div>
}