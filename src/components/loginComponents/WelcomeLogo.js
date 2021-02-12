import React from "react";
import { Image } from "react-bootstrap";
import "./Login.css";

export default function WelcomeLogo () {
    return (
        <div className="WelcomeLogo">
            <Image 
            src="https://www.badminton.no/siteassets/badminton_logo.png" 
            alt="Logo"
            width="300"
            height="300"/>
            <h1>Norges Badmintonforbund</h1>
            <p>Kunnskapsportal og kommunikasjonsplattform for badmintonspillere over hele landet</p>
        </div>
    );
}