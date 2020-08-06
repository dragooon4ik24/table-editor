import React from 'react'

import Table from './Table/Table'

function App() {
  return (
    <div className="App">
      <div className="Container">
        <section className="TableEditor">
          <h1 className="TableEditor-Title">Табличный редактор</h1>
          <Table />
        </section>
      </div>
    </div>
  )
}

export default App
