import React, { Component } from 'react';
import '../css/display.css'

class Display extends Component {
  
  render() {
    return(
      <div className="panel">
        <p>Custom Sound Board</p>
        <div className='display'>
          <h4>{this.props.label}</h4>
          <div className='stats'>
            <h6>Vol: {Math.round(this.props.volume * 100)}</h6>
            <h6 className='speed'>Speed: {this.props.speed}</h6>
          </div>
        </div>
      </div>
    )
  }
}

export default Display