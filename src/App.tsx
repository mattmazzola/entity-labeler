import React from 'react';
import './App.css';
import EntityLabeler from './components/EntityLabeler'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Entity Labeler</h1>
        <p>Label hierarchial entities with the new Slate editor</p>
      </header>
      <div>
        <EntityLabeler />
      </div>
    </div>
  );
}

export default App;
