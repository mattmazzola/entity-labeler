import React from 'react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import classnames from 'classnames'
import './Elements.css'

export const Leaf: React.FC<RenderLeafProps> = (props) => {
    const classNames = classnames({
        'leaf-bold': props.leaf.bold
    })

    return (
        <span {...props.attributes} className={classNames}>
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
    return <span
        {...props.attributes}
        className="entity"
    >
        {props.children}
    </span>
}

export const TokenElement = (props: RenderElementProps) => {
    const classNames = classnames({
        'token': true,
        'token--selectable': props.element.selectable
    })

    return <span {...props.attributes} className={classNames}>{props.children}</span>
}
