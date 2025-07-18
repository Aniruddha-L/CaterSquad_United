import React from 'react'
import axios from 'axios'
import '../../Assets/css/Hub.css'

const Hub = () => {
  async function startGame() {
    try {
      await axios.get('http://localhost:5555/run-exe')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container-hub">
      <div className="container">
        <a href="http://localhost:8000">AI Assistant</a>
        <button onClick={startGame}>Simulator</button>
        <a href="https://engine.od.ua/cat-download-free#!/back">Documents</a>
        <a href="https://youtu.be/QWvKa1Bkak8" target='_blank'>📽️ Excavator Training and operation</a>
        <a href="https://youtu.be/OdJUdkUgh_E" target='_blank'>📽️ Generator Maintenance</a>
      </div>
      {/* <iframe width="1128" height="634" src="https://www.youtube.com/embed/QWvKa1Bkak8" title="Excavator Training &amp; Operation (Beginner) 2020 | Heavy Equipment Operator Training" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
    </div>
  )
}

export default Hub
