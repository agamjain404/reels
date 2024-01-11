import React from 'react'
import './Video.css'
import * as ReactDOM from 'react-dom';

function Video(props) {

  const handleClick = (event) => {
    event.preventDefault();
    event.target.muted = !event.target.muted
  }
  const handleScroll = (event) => {
    let next = ReactDOM.findDOMNode(event.target).parentNode.nextSibling;
    if (next) {
        next.scrollIntoView();
        event.target.muted = true;
    }
  }
  return (
    <video src={props.src} onEnded={handleScroll} className='videos-styling' muted="muted" onClick={handleClick}>
    </video>
  )
}

export default Video
