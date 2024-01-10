import React from 'react'
import './index.css'
 
import { Video } from '../../components';

export const HomePage = () => {





  return (
    <>
    <Video/>
    <section id="page">
      <section id="top">
        <div className="message">
          <h1>Level Up your coding game</h1>
          <p>Play with your friends</p>
          <p>Use your favourite programming language</p>
        </div>
      </section>
      <section id="middle">
        <h1>Start your coding journey now!</h1>
        <div class="buttons">
          <button class="button1"> 1 Vs 1</button>
          <button class="button2">Solo mode</button>
        </div>
      </section>
      <section>
        <h2>Play for free</h2>
      </section>
    </section> 
    </>
  )
}

export default HomePage