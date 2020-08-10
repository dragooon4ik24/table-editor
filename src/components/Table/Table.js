import React from 'react'

import './Table.scss'
import TableRow from '../TableRow/TableRow'
import {data} from '../../data/data'
import {ascendingSort, descendingSort} from '../../utils/utils'
import Modal from '../Modal/Modal'

const TABLE_EDITOR_DATA = 'tableEditorData'

export default class Table extends React.Component {
  componentDidMount() {
    const data = localStorage.getItem(TABLE_EDITOR_DATA)
    data && this.setState((prevState) => ({...prevState, data: JSON.parse(data).sort(ascendingSort)}))
  }

  state = {
    data,
    isSort: true,
    isModalOpen: false,
    editedRow: null,
  }
  handleRemoveButtonClick = (row) => {
    const index = this.state.data.indexOf(row)
    this.setState((prevState) => {
      const newData = prevState.data.slice()
      newData.splice(index, 1)
      return {...prevState, data: newData}
    })
  }
  handleEditButtonClick = (row) => {
    const index = this.state.data.indexOf(row)
    this.setState((prevState) => ({...prevState, isModalOpen: true, editedRow: prevState.data[index]}))
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
  handleOpenModal = () => {
    this.setState((prevState) => ({...prevState, isModalOpen: true}))
  }
  handleCloseModal = () => {
    this.setState((prevState) => ({...prevState, isModalOpen: false, editedRow: null}))
  }
  handleSubmit = (formData) => {
    const {name, type, color} = formData
    const newRow = {name, type, color}
    this.setState((prevState) => {
      if (prevState.editedRow) {
        const index = this.state.data.indexOf(this.state.editedRow)
        const newData = prevState.data.slice()
        newData.splice(index, 1, newRow)
        return {...prevState, data: newData}
      } else {
        const newData = prevState.data.slice()
        newData.push(newRow)
        newData.sort(ascendingSort)
        return {...prevState, data: newData}
      }
    })
    if (this.state.editedRow) {
      const index = this.state.data.indexOf(this.state.editedRow)
      this.setState((prevState) => {
        const newData = prevState.data.slice()
        newData.splice(index, 1)
        return {...prevState, data: newData}
      })
    }
  }
  render() {
    return (
      <>
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
                this.state.data.map((row, index) => (
                  <TableRow
                    key={`${row.name}${index}`}
                    name={row.name}
                    type={row.type}
                    color={row.color}
                    onRemoveClick={() => this.handleRemoveButtonClick(row)}
                    onEditClick={() => this.handleEditButtonClick(row)}
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
            <button className="Table-Button CommonButton" type="button" onClick={this.handleOpenModal}>
              Создать запись
            </button>
            <button className="Table-Button CommonButton" type="button" onClick={this.handleSaveButtonClick}>
              Сохранить
            </button>
          </div>
        </div>
        {this.state.isModalOpen && this.state.editedRow ? (
          <Modal
            title="Изменение"
            buttonName="Сохранить"
            row={this.state.editedRow}
            onClose={this.handleCloseModal}
            onSubmit={this.handleSubmit}
          />
        ) : this.state.isModalOpen ? (
          <Modal title="Добавление" buttonName="Создать" onClose={this.handleCloseModal} onSubmit={this.handleSubmit} />
        ) : null}
      </>
    )
  }
}
