import React from 'react';
import './TogglerStyle.css'

export const SwitchToggler = (props) => {
    const {func, label, flag} = props;
    return (
        <div className='toggler'>
                <div className={`circle ${flag? 'bg-white':'bg-dark' }`} onClick={func}></div>
                <h6>{label}</h6>

        </div>
    );
};
