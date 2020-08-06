import React from 'react'

import './Table.scss'
import TableRow from '../TableRow/TableRow'
import {data} from '../../data/data'
import {ascendingSort, descendingSort} from '../../utils/utils'

const TABLE_EDITOR_DATA = 'tableEditorData'

export default class Table extends React.Component {
  componentDidMount() {
    let data = localStorage.getItem(TABLE_EDITOR_DATA)
    data && this.setState((prevState) => ({...prevState, data: JSON.parse(data).sort(ascendingSort)}))
  }

  state = {
    data,
    isSort: true,
  }
  handleRemoveButtonClick = (row) => {
    let index = this.state.data.indexOf(row)
    this.setState((prevState) => {
      prevState.data.splice(index, 1)
      return {...prevState, data: prevState.data}
    })
  }
  handleSaveButtonClick = () => {
    localStorage.setItem(TABLE_EDITOR_DATA, JSON.stringify(this.state.data))
  }
  handleSortButtonClick = () => {
    this.setState((prevState) => {
      let data = prevState.isSort
        ? prevState.data.slice().sort(descendingSort)
        : prevState.data.slice().sort(ascendingSort)
      return {data, isSort: !prevState.isSort}
    })
  }
  render() {
    return (
      <div className="Table">
        <table className="Table-Content">
          <thead>
            <tr className="Table-HeadRow">
              <th>
                <button
                  className={`Table-Name ${!this.state.isSort ? 'Table-Name_unsorted' : ''}`}
                  onClick={this.handleSortButtonClick}
                  type="button"
                >
                  Название
                </button>
              </th>
              <th className="Table-Type">Тип</th>
              <th className="Table-Color">Цвет</th>
              <th className="Table-Controls">Элементы управления</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.length ? (
              this.state.data.map((row) => (
                <TableRow
                  key={row.name}
                  name={row.name}
                  type={row.type}
                  color={row.color}
                  onRemoveClick={() => this.handleRemoveButtonClick(row)}
                />
              ))
            ) : (
              <tr>
                <td className="Table-Empty" colSpan="4">
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="Table-Actions">
          <button className="Table-Button Table-Button_remove" type="button">
            Создать запись
          </button>
          <button className="Table-Button Table-Button_save" type="button" onClick={this.handleSaveButtonClick}>
            Сохранить
          </button>
        </div>
      </div>
    )
  }
}
