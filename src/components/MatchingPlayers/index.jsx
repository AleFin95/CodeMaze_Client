import React from 'react'
import myImage from '../../assets/gif.gif';
import './index.css'

const MatchingPlayers = () => {

    const imagee = {
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundPosition:  "center center",
        marginTop: "100px",
        marginLeft: "900px",
        marginRight: "900px",
        textAlign: "center",
       
        paddingLeft: "220px",
    paddingRight: "220px",
    paddingTop: "220px",
    paddingBottom: "0",
        
        backgroundColor: "yellow",
       
        
        /*marginTop: "10em",
        alignItems: "center",
        paddingLeft: "90px",
        paddingRight: "90px",
        paddingTop: "90px",
        paddingBottom: "0",
    
        marginBottom: "3em",*/
      
        
      }
  return (
    <>
    <section id="matching">
        <h1>Matching you with another player...</h1>
        <div className='dd' ></div>
   </section> 
   </>
    )
}

export default MatchingPlayers