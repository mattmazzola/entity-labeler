import React from 'react'
import './App.css'
import EntityLabeler, { EntityLabelModels, createExtraction } from './components/EntityLabeler'
import { tokenizeText } from './components/EntityLabeler/utilities'

function App() {

  const [extraction, setExtraction] = React.useState(() => createExtraction('This is the default text', tokenizeText))
  const onChangeExtraction = (e: EntityLabelModels.Exraction) => {
    console.log(`onChangeExtraction: `, e)
    // setExtraction(e)
  }

  return (
    <div className="app">
      <header>
        <h1>Entity Labeler</h1>
        <p>Label hierarchial entities with the new Slate editor</p>
      </header>
      <main>
        <EntityLabeler
          extraction={extraction}
          onChange={onChangeExtraction}
          tokenizer={tokenizeText}
        />

        <h2>Extraction:</h2>
        <pre>
          <code>
            {JSON.stringify(extraction, null, 4)}
          </code>
        </pre>
      </main>
    </div>
  )
}

export default App
