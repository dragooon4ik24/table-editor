import React from 'react'

import './TableRow.scss'

export default function TableRow({name, type, color, onRemoveClick}) {
  return (
    <tr className="TableRow">
      <td>{name}</td>
      <td>{type}</td>
      <td>
        <div className="TableRow-Color" style={{backgroundColor: `${color}`}}></div>
      </td>
      <td className="TableRow-Controls">
        <button
          className="TableRow-Button TableRow-Button_edit"
          type="button"
          onClick={() => {
            console.log('edit')
          }}
        ></button>
        <button className="TableRow-Button TableRow-Button_remove" type="button" onClick={onRemoveClick}></button>
      </td>
    </tr>
  )
}
