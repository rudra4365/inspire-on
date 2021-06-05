import React from 'react'
import './Quote.css'

function Quote(props) {
    return (
        <div className = "main">
            <br></br>
      <span>
        <strong>{props.text}</strong> &nbsp; <span>{props.author}</span>
      </span>
      </div>
    )
}

export default Quote;
