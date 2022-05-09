import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editSound } from '../actions';
import Display from './Display';
import '../css/sounds.css';

class Sounds extends Component {

  state = {
    modal: false,
    select: '',
    link: '',
    name: '',
    playing: '',
    vol: 0.5,
    loop: false,
    speed: 1
  }

  async onClick (audio) {
    try {
      await audio.play()
    } catch {
      console.log("Invalid URL")
    }
  }

  playClicked = (event) => {
    let audio = document.getElementById(event.target.id)
    this.setState({playing: event.target.id})
    audio.volume = this.state.vol
    audio.playbackRate = this.state.speed
    if (audio.loop) {
      audio.loop = !this.state.loop
      return audio.pause()
    }
    audio.loop = this.state.loop 
    this.onClick(audio)
  }

  async handleKey(key) {
    try {
      let audio = document.getElementById(key);
      this.setState({playing: key})
      audio.volume = this.state.vol
      audio.playbackRate = this.state.speed
      if (audio.loop) {
        audio.loop = !this.state.loop
        return audio.pause()
      }
      audio.loop = this.state.loop
      await audio.play();
    } catch {
      console.log("Invalid URL")
    }
  }

  getKey = (event) => {
    console.log(event.key)
    let arr = this.props.sound.soundBank.filter(elem => elem.keypress === event.key)
    try{
      this.handleKey(arr[0].id)
    } catch {
      console.log("Not valid key")
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.getKey)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.getKey)
  }

  toggle = () => {
    if (this.state.modal === false)
      document.removeEventListener("keydown", this.getKey)
    if (this.state.modal === true)
      document.addEventListener("keydown", this.getKey)
    this.setState({modal: !this.state.modal})
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    this.props.editSound(this.state.select, this.state.name, this.state.link)
    console.log(this.state)
    this.toggle();
  }

  setLoop = () => {
    this.setState({loop: !this.state.loop})
  }

  render() {

    let list = this.props.sound.soundBank.map(elem => (
      <div key={elem.key} className="buttonCols">
        <audio id={elem.id} src={elem.url}></audio>
        <button onClick={this.playClicked} id={elem.id} onKeyPress={this.getKey}>{elem.key}</button>
      </div>
    ))

    const btnToggle = this.state.loop ? {background: "yellowgreen", borderColor: "yellowgreen"} : {background: "gold", borderColor: "gold"}

    return (
      <div className='base'>
        <Col className="buttonSide">

          <div className="buttonContainer"> 
            {list}
          </div>

          <div>
            <button className='btn' onClick={this.toggle}>Edit Sounds</button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                Edit Sound Board
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="Select">Select Key</Label>
                    <Input type="select" name="select" id="Select" onChange={this.onChange}>
                      <option></option>
                      <option value="Q">Q</option>
                      <option value="W">W</option>
                      <option value="E">E</option>
                      <option value="A">A</option>
                      <option value="S">S</option>
                      <option value="D">D</option>
                      <option value="Z">Z</option>
                      <option value="X">X</option>
                      <option value="C">C</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="link">URL</Label>
                    <Input type="url" name="link" id="link" placeholder="Enter mp3 link" onChange={this.onChange}/>
                  </FormGroup>
                  <Button color='dark' block>Submit</Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </Col>

        <Col className="panelSide">
          <div>
            <Display label={this.state.playing} volume={this.state.vol} speed={this.state.speed}/>
          </div>

          <div>
            <Label for="volume">Volume</Label>
            <Input type="range" id="volume" name="vol" min="0" max="1" defaultValue="0.5" step="0.01" onChange={this.onChange} className='slider'/>   
          </div>

          <div>
            <Label for="speed">Speed</Label>
            <Input type="range" id="speed" name="speed" min="0.5" max="4" defaultValue="1" step="0.5" onChange={this.onChange} className='slider'/>   
          </div>

          <div>
            <Button className='loop' onClick={this.setLoop} style={btnToggle}>Loop</Button>
          </div>
        </Col>
      </div>
    )
  }
}

Sounds.protoTypes = {
  sound: PropTypes.object.isRequired,
  editSound: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  sound: state.soundReducer
})

export default connect(mapStateToProps, { editSound })(Sounds);