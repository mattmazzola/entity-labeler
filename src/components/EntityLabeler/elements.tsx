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
    return <div
        {...props.attributes}
        className="entity"
    >
        {props.children}
    </div>
}

export const TokenElement = (props: RenderElementProps) => {
    const classNames = classnames({
        'token': true,
        'token--selectable': props.element.selectable
    })

    return <div {...props.attributes} className={classNames}>{props.children}</div>
}

export const DefaultElement = (props: RenderElementProps) => {
    return <div {...props.attributes} className="element">{props.children}</div>
}