import React from 'react'
import './index.css'
import { useNavigate,Link } from "react-router-dom";

import { Video } from '../../components';

export const HomePage = () => {

  const hide = ()=> {
    const section = document.querySelector('#page');
    section.classList.add('hidden');
  }


  return (
    <>
    <Video/>
    <section id="page">
      <section id="top">
        <div className="message">
          <h1>Level Up your coding game</h1>
          <ul className="fa-ul">
            <li> <i className="fa fa-arrow-circle-right circle fa-2x" aria-hidden="true"></i>Play with your friends! </li>
            <li> <i className="fa fa-arrow-circle-right fa-2x" aria-hidden="true"></i>Multiple programming languages to choose from! </li>
          </ul>
        </div>
      </section>
      <section id="middle">
        <h2>Start your coding journey now!</h2>
        <div className="buttons">
          <button className="button1"> <Link id="link1" to='/game'>1 Vs 1</Link></button>
          <button className="button2"><Link id="link2" to='/game'>Solo mode</Link></button>
        </div>
      </section>
      <section>
        <h2> </h2>
      </section>
    </section> 
    </>
  )
}

export default HomePage