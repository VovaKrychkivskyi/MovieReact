import React from "react";

import Logo from '../../assets/logo.png'
import './logo.css'



export function LogoHeader (props) {
   const {flag} = props;
return(
    <div className='m-2 d-flex'>
        <img src={Logo} alt="logo" className={` align-self-center ${flag? 'logoImageScroled':'logoImage'}`}/>
        <div className='align-self-center'>
            <div className='m-2'>
                {flag
                    ? <h4>MovieDB</h4>
                    : <h3>MovieDB</h3>
                }
                {!flag &&
                <h6>react app</h6>
                }
            </div>
        </div>
    </div>
)
}