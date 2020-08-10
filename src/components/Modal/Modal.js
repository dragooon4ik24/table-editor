import React from 'react'
import {SketchPicker} from 'react-color'

import './Modal.scss'

export default class Modal extends React.Component {
  refInput = React.createRef()
  state = {
    name: '',
    type: 'main',
    color: 'white',
    isValidate: true,
  }
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleDocumentEscPress)
    if (this.props.row) {
      const {name, type, color} = this.props.row
      this.setState({name, type, color, isValidate: true})
    }
  }
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleDocumentEscPress)
  }
  handleDocumentEscPress = (evt) => {
    if (evt.keyCode === 27) {
      this.props.onClose()
    }
  }
  handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose()
    }
  }
  handleInputNameChange = (evt) => {
    const {value} = evt.target
    this.setState((prevState) => ({...prevState, name: value}))
  }
  handleInputTypeChange = (evt) => {
    const {value} = evt.target
    this.setState((prevState) => ({...prevState, type: value}))
  }
  handleColorChange = (colors) => {
    this.setState((prevState) => ({...prevState, color: colors.hex}))
  }
  handleColorChangeComplete = (colors) => {
    this.setState((prevState) => ({...prevState, color: colors.hex}))
  }
  handleSubmitButtonClick = (evt) => {
    evt.preventDefault()
    if (!this.state.name) {
      this.setState((prevState) => ({...prevState, isValidate: false}))
      this.refInput.current.focus()
    } else {
      this.props.onClose()
      this.props.onSubmit(this.state)
    }
  }
  render() {
    return (
      <div className="Modal" onClick={this.handleOverlayClick}>
        <div className="Modal-Wrapper">
          <div className="Modal-Header">
            <h2 className="Modal-Title">{`${this.props.title} данных`}</h2>
          </div>
          <form className="Modal-Form" noValidate>
            <div className="Modal-FormWrapper">
              <div className="Modal-InputWrapper">
                <label className="Modal-Input" htmlFor="name">
                  Название
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  ref={this.refInput}
                  value={this.state.name}
                  onChange={this.handleInputNameChange}
                  required
                />
                {!this.state.isValidate ? <p className="Modal-Error">*Заполните имя</p> : null}
              </div>
              <div className="Modal-InputWrapper">
                <label className="Modal-Input" htmlFor="type">
                  Тип
                </label>
                <select id="type" type="text" name="type" value={this.state.type} onChange={this.handleInputTypeChange}>
                  <option defaultValue value="main">
                    main
                  </option>
                  <option value="side">side</option>
                  <option value="section">section</option>
                  <option value="header">header</option>
                </select>
              </div>
            </div>
            <div className="Modal-ColorWrapper">
              <label className="Modal-Input_color" htmlFor="color">
                Цвет:
              </label>
              <input id="color" type="hidden" name="color" required value={this.state.color} />
              <div className="Modal-Color" style={{backgroundColor: `${this.state.color}`}}></div>
            </div>
            <SketchPicker
              disableAlpha
              color={this.state.color}
              onChange={this.handleColorChange}
              onChangeComplete={this.handleColorChangeComplete}
            />
            <div className="Modal-Actions">
              <button className="CommonButton" type="button" onClick={this.props.onClose}>
                Отмена
              </button>
              <button className="CommonButton" type="submit" onClick={this.handleSubmitButtonClick}>
                {this.props.buttonName}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
