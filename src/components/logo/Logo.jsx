import React from 'react';
import blogo from '../../assets/images/BadmintonClubLogo.png';
import './Logo.css';

const logo= (props) => (
    <div className = "Logo">
        <img src = {blogo} alt="badmintonclub logo" />
    </div>
);
    
export default logo;