import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {

    return(
        <div>
           <Tilt className="Tilt br2 shadow-2 pa3 ma3"  sha options={{ max : 60 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img alt='logo' src={brain} width='200%' height='200%'/>
                 </div>
           </Tilt> 
        </div>
        
    );
}
export default Logo;