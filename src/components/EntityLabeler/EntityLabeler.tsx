import React from 'react'
import { createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'
import CustomEditor from './customCommands'
import { CodeElement, EntityElement, Leaf, ParagraphElement, TokenElement, DefaultElement } from './elements'
import './EntityLabeler.css'
import { EditMode, withEditModes } from './withEditModes'
import * as models from './models'
import Toolbar from './Toolbar'
import { convertExtractionToNodes, convertValueToExtraction } from './utilities'

type Props = {
    extraction: models.Exraction
    onChange: (e: models.Exraction) => void
    tokenizer: (text: string) => string[]
}

const EntityLabeler: React.FC<Props> = (props) => {
    const editor = React.useMemo(() => withEditModes(withReact(withHistory(createEditor()))), [])
    const [value, setValue] = React.useState<Node[]>([])

    React.useEffect(() => {
        setValue(convertExtractionToNodes(props.extraction))
    }, [props.extraction])

    React.useEffect(() => {
        console.log(`Edit Mode Changed: `, editor.editMode)
    }, [editor.editMode])

    React.useEffect(() => {
        const extraction = convertValueToExtraction(value)
        props.onChange(extraction)
    }, [value])

    const renderElement = React.useCallback(props => {
        switch (props.element.type) {
            case 'paragraph':
                return <ParagraphElement {...props} />
            case 'entity':
                return <EntityElement {...props} />
            case 'token':
                return <TokenElement {...props} />
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = React.useCallback(props => {
        return <Leaf {...props} />
    }, [])

    const onMouseUp = React.useCallback(event => {
        if (editor.editMode === EditMode.LabelMode) {
            CustomEditor.expandSelectionToTokenBoundaries(editor)
        }
    }, [editor.editMode])

    function onChangeValue(newValue: Node[]) {
        setValue(newValue as any)
    }

    return (
        <div className="entity-labeler">
            <Toolbar
                editor={editor}
                setValue={setValue}
            />

            Mode: {editor.editMode}
            Debug: {editor.debug ? 'True' : 'False'}

            <div className={`slate-container ${editor.debug ? `slate-debug` : ``}`}>
                <Slate
                    editor={editor}
                    value={value}
                    onChange={onChangeValue}
                >
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onMouseUp={onMouseUp}
                    />
                </Slate>
            </div>
        </div>
    )
}


export default EntityLabeler