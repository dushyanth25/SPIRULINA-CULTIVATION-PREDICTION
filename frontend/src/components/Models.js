import React, { useState } from 'react';
import './Models.css';

const Models = () => {
    const [showNewContent, setShowNewContent] = useState(false);

    const handleButtonClick = () => {
        setShowNewContent(true);
    };

    return (
        <div className="models-container">
            {showNewContent ? (
                <>
                    <h1>STATISTICS</h1>
                    <h2>ANALYSIS IMAGES</h2>
                    <div className="extra-images">
                        <div className="first-row">
                            <img src="\u1.png" alt="Univariate analysis" className="model-image" />
                            <img src="\u2.png" alt="Bivariate analysis" className="model-image" />
                        </div>
                        </div>
                    <div className="third-image"> 
                        <div className="first-row">  
                        {/* Applying the specific third-image CSS class here */}
                            <img src="\u3.png" alt="Statistical overview" className="third-image" />
                        </div>
                        </div>
                    
                </>
            ) : (
                <>
                    <h1>PREPROCESSING</h1>
                    <div className="model-row">
                        <div className="model">
                            <h2>NULL VALUES</h2>
                            <img src="\prep1.png" alt="Null values preprocessing step" className="model-image" />
                        </div>
                        <div className="model">
                            <h3>DATA TYPE</h3>
                            <img src="\prep2.png" alt="Data type preprocessing step" className="model-image" />
                        </div>
                    </div>
                    <button className="action-button" onClick={handleButtonClick}>STATISTICS</button>
                </>
            )}
        </div>
    );
};

export default Models;
