import React from 'react'
import './index.css'
import { TopicsComponent } from '../../components';

export const HomePage = () => {
  return (
    <>
    <section id="page">
      <section id="top">
        <div className="message">
          <h1>Level Up your coding game</h1>
          <p>Play with your friends</p>
          <p>Use your favourite programming language</p>
        </div>
      </section>
      <section id="middle">
        <TopicsComponent/>
      </section>
      <section>
        <h2>Play for free</h2>
      </section>
    </section> 
    </>
  )
}

export default HomePage