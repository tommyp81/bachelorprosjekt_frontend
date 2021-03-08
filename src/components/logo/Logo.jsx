//
import React from 'react';
import blogo from '../../assets/images/BadmintonClubLogo.png';
import './Logo.css';

const logo= (props) => (
    <div className = "Logo">
        <a href="/"><img src = {blogo} alt="badmintonclub logo"/></a>
    </div>
);
    
export default logo;