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
      <h1>Games</h1>
        <div class="filters">
            <p>Top Games</p>
            <p>MongoDB</p>
            <p id="showAll">Show All</p> 
        </div>
        <div class="games">
          <img src="https://images.freecreatives.com/wp-content/uploads/2015/04/amazing-video-game-art-wallpapers-sci-fi-videogames-game.png" alt="image"/>
          <img src="https://images.freecreatives.com/wp-content/uploads/2015/04/amazing-video-game-art-wallpapers-sci-fi-videogames-game.png" alt="image"/>
          <img src="https://images.freecreatives.com/wp-content/uploads/2015/04/amazing-video-game-art-wallpapers-sci-fi-videogames-game.png" alt="image"/>
          <img src="https://images.freecreatives.com/wp-content/uploads/2015/04/amazing-video-game-art-wallpapers-sci-fi-videogames-game.png" alt="image"/>
        </div>
      </section>
    </section>
    </>
  )
}

export default HomePage