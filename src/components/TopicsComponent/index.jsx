import React from 'react'

const TopicsComponent = () => {
  return (
    <>
        <h1>Topics</h1>
        <section id="games">
          <div className='first'>
          <h2>Algorithms</h2>  
           <div className="buttons">
              <p>1 vs 1</p>
              <p>Solo mode</p>
            </div>
          </div>
          <div className='second'>
          <h2>Loops</h2> 
          <div className="buttons">
            <p>1 vs 1</p>
            <p>Solo mode</p>
          </div>
          </div>
          <div className='third'>
          <h2>Functions</h2>
          <div className="buttons">
            <p>1 vs 1</p>
            <p>Solo mode</p>
          </div>
          </div>
          <div className='fourth'>
          <h2>Arrays</h2>
          <div className="buttons">
            <p>1 vs 1</p>
            <p>Solo mode</p>
          </div>
          </div>
          <div className='fifth'>
          <h2>Debugging</h2>
          <div className="buttons">
            <p>1 vs 1</p>
            <p>Solo mode</p>
          </div>
          </div>
          </section>
    </>
  )
}

export default TopicsComponent