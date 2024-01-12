import React from 'react'
import './index.css'
import { Link } from "react-router-dom";
import myImage from '../../assets/bg.jpg'; // Adjust the path based on your directory structure


import { Video } from '../../components';

export const HomePage = () => {

  const styles = {
    backgroundColor: "yellow",
    marginTop: "1.5em",
    padding: "20px",
    borderRadius: "30px",
    marginRight: "400px",
    marginLeft: "400px",
    marginBottom: "0em",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
    
    display: "flex",
    justifyContent: "flex-start",
    backgrounSize: "cover",
    /*background-position:  center center ;*/
    transition: "transform 0.5s ease-out",
  };


  return (
    <>
  <Video/>
    <section id="page">
      <section id="top" style={styles}>
        <div className="message">
          <h1>Level Up your coding game</h1>
          <ul role="list" className="fa-ul">
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
        <h2>fdgdf </h2>
      </section>
    </section> 
    </>
  )
}

export default HomePage