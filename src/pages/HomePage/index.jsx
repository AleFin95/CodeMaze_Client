import React from 'react'
import './index.css'

export const HomePage = () => {
  return (
    <>
    <section id="top">
      <div class="message">
        <div>
          <h1>Level Up your coding game</h1>
          <p>Play with your friends</p>
          <p>Use your favourite programming language</p>
        </div>
        <img src="https://i.ytimg.com/vi/I7YYJObe5SU/maxresdefault.jpg" alt="initialImage"></img>
      </div>
    </section>
    <section id="middle">
      <h1>Games</h1>
        <div class="filters">
          <p>Top Games</p>
          <p>MongoDB</p> 
          <button>Show all</button>
        </div>
        <div class="games">
          <img src="https://images.freecreatives.com/wp-content/uploads/2015/04/amazing-video-game-art-wallpapers-sci-fi-videogames-game.png" alt="image"/>
        </div>
      </section>
    </>
  )
}

export default HomePage