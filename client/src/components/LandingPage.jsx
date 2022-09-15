import React from "react";
import { Link } from "react-router-dom";
import '../stylos/landinpage.css'

export default function LandingPage() {

return (
         <div className="landing">
            <h1 className="welcomeMsg">Do you like cooking? This is your place!</h1>
            <Link to='/home'>
            <button className="homeButton">Let's go</button>
            </Link>
         </div>
)
}