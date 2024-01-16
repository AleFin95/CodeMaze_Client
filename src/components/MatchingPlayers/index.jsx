import React from 'react'
import myImage from '../../assets/gif.gif';
import { Link } from "react-router-dom";
import './index.css'


const MatchingPlayers = ({ handleCancel }) => {

    const div = {
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover", /* Adjust to your needs */
        backgroundPosition: "center", /* Center the background image */
        width: "353px",
        height: "300px",
        marginBottom: "0",    
    }

    const sectionmatching = {   
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center" ,
        marginTop: "15em",
    }

    const h1 = {
        fontSize: "30px", 
    }

    const linkStyle = {
        fontFamily: "Courier New,monospace",
        fontSize: "25px",
        textDecoration: "none", 
        padding: "20px",
        borderRadius: "8px"
    }

    return (
    <>
    <section data-testid="section1" id="matching" style={sectionmatching}>
        <h1 data-testid="h1" style={h1}>Matching you with another player...</h1>
        <div data-testid="div" className='dd' style={div} ></div>
        <Link data-testid="button" id="link" to="/" style={linkStyle} onClick={() => handleCancel()}>Cancel</Link>
    </section> 
   </>
    )
}

export default MatchingPlayers