import React from 'react'
import './index.css'

export const HomePage = () => {
  return (
    <>
    <section id="page">
    <section id="top">
      <div class="message">
          <h1>Level Up your coding game</h1>
          <p>Play with your friends</p>
          <p>Use your favourite programming language</p>
      </div>
    </section>
    <section id="middle">
      <h2>Games</h2>
        <div class="filters">
            <p>Top Games</p>
            <p>MongoDB</p>
            <p id="showAll">Show All</p> 
        </div>
        <section id="games">
          <div>
          <div class="buttons">
            <p>1 vs 1</p>
            <p>Solo mode</p>
          </div>
          </div>
          <div>
          <div class="buttons">
            <p>1 vs 1</p>
            <p>Solo mode</p>
          </div>
          </div>

          <div>
          
          <div class="buttons">
            <p>1 vs 1</p>
            <p>Solo mode</p>
          </div>
          </div>
          <div></div>
          
        </section>
      </section>
    </section>
    </>
  )
}

export default HomePage