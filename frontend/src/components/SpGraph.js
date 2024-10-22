import React, { useState } from 'react';
import './SpGraph.css';

const SpGraph = () => {
    const [selectedModel, setSelectedModel] = useState('');

    const handleButtonClick = (model) => {
        setSelectedModel(model);
    };

    return (
        <div className="sp-graph-container">
            <h2>MODELS</h2>
            <div className="button-container">
                <button className="graph-button" onClick={() => handleButtonClick('decision-tree')}>
                    Decision Tree
                </button>
                <button className="graph-button" onClick={() => handleButtonClick('random-forest')}>
                    Random Forest
                </button>
                <button className="graph-button" onClick={() => handleButtonClick('knn')}>
                    KNearest Neighbour
                </button>
                <button className="graph-button" onClick={() => handleButtonClick('bagging')}>
                    Bagging
                </button>
                <button className="graph-button" onClick={() => handleButtonClick('boosting')}>
                    Boosting
                </button>
                <button className="graph-button" onClick={() => handleButtonClick('overall')}>
                    Overall
                </button>
            </div>

            <div className="image-container">
                {selectedModel === 'decision-tree' && (
                    <>
                        <img src="/decreport.png" alt="Decision Tree 1" className="graph-image" />
                        <img src="/decgraph.png" alt="Decision Tree 2" className="graph-image" />
                    </>
                )}
                {selectedModel === 'random-forest' && (
                    <>
                        <img src="/randrec.png" alt="Random Forest 1" className="graph-image" />
                    </>
                )}
                {selectedModel === 'knn' && (
                    <>
                        <img src="/knnrec.png" alt="KNearest Neighbour 1" className="graph-image" />
                    </>
                )}
                {selectedModel === 'bagging' && (
                    <>
                        <img src="/bagrec.png" alt="Bagging 1" className="graph-image" />
                    </>
                )}
                {selectedModel === 'boosting' && (
                    <>
                        <img src="/gradrec.png" alt="Boosting 1" className="graph-image" />
                    </>
                )}
                {selectedModel === 'overall' && (
                    <>
                        {/* Add an overall image or summary here */}
                        <img src="/over.bar.png"alt="Overall Report" className="graph-image" />
                        <img src="/pieove.png" alt="Decision Tree 2" className="graph-image" />
                        <p style={{ color: 'Black', fontWeight: 'normal', fontSize: '10px' }}>Decision Tree Has better accuracy over other models with accuracy of 67%</p>

                    </>
                )}
            </div>
        </div>
    );
};

export default SpGraph;
