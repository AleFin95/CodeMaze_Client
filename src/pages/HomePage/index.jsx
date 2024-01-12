import React from 'react'
import './index.css'
import { Link } from "react-router-dom";
import myImage from '../../assets/bg.jpg'; // Adjust the path based on your directory structure


import { Video } from '../../components';

export const HomePage = () => {

  const styles = {
    fontFamily:" 'Lemon', serif",
    marginTop: "1.5em",
    padding: "10px",
    borderRadius: "30px",
    marginRight: "400px",
    marginLeft: "400px",
    marginBottom: "0em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const h2Styles = {
    fontSize: "40px",
    fontFamily: "'Lemon', serif",
    marginBottom: "1em",
    marginTop: "1em",
 
  };

  const button = {

  }

  /* backgroundColor: "#7df59b",
    border: "solid 5px #1e943b",
    outline: "none",
    cursor: "pointer",
    padding: "30px",
    fontSize: "24px",
    textTransform: "uppercase",
    fontFamily: "'Lemon', serif",
    borderRadius: "40px",
    boxShadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adding a subtle shadow for depth */
    /*transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; */ 

  return (
    <>
  <Video/>
    <section id="page">
      <section data-testid="top" id="top" style={styles} >
        <h1 style={h2Styles}>Start your coding journey now!</h1>
        <div className="message">
          <ul role="list" className="fa-ul">
            <li> <i className="fa fa-arrow-circle-right circle fa-2x" aria-hidden="true"></i>Play with your friends! </li>
            <li> <i className="fa fa-arrow-circle-right fa-2x" aria-hidden="true"></i>Multiple programming languages to choose from! </li>
          </ul>
        </div><div className="buttons">
          <Link id="link1" to='/game'><button className="button1"> 1 Vs 1</button></Link>
          <Link id="link2" to='/game'><button className="button2">Solo mode</button></Link>
        </div>
        
      </section> 
    </section> 
    </>
  )
}

export default HomePage