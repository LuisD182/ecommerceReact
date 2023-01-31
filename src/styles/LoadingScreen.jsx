import React from 'react';
// import '../styles/loading-screen.css';
import './loading-screen.css';

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;