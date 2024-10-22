import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const [showObjective, setShowObjective] = useState(false);
    const [showMethodology, setShowMethodology] = useState(false);

    const toggleObjective = () => setShowObjective(!showObjective);
    const toggleMethodology = () => setShowMethodology(!showMethodology);

    return (
        <div className="about-us">
            <h1>About Us</h1>
            <h2>Problem Overview</h2>
            <p>Spirulina, a nutrient-rich microalgae, is gaining widespread recognition for its use in superfoods, dietary supplements, and biofuels. However, optimizing spirulina yield involves managing a variety of environmental and operational factors. Predicting the correct yield amount is a complex challenge, but essential for minimizing resource waste and ensuring timely production. Our project tackles this issue by developing a predictive model to help spirulina producers streamline their processes.</p>
            
            {/* Toggle Objective Section */}
            <button className="section-toggle" onClick={toggleObjective}>
                {showObjective ? 'Hide Objective' : 'Show Objective'}
            </button>
            <div className={`collapsible ${showObjective ? 'open' : ''}`}>
                <div className="section-content">
                    <p>We aim to create a machine learning-based system that predicts spirulina yield using various inputs such as environmental and operational conditions. This innovative solution will help producers forecast yields more accurately, reduce resource wastage, and optimize production schedules. The system will also include an easy-to-use interface with built-in data visualizations to simplify decision-making.</p>
                </div>
            </div>
            
            {/* Toggle Methodology Section */}
            <button className="section-toggle" onClick={toggleMethodology}>
                {showMethodology ? 'Hide Methodology' : 'Show Methodology'}
            </button>
            <div className={`collapsible ${showMethodology ? 'open' : ''}`}>
                <div className="section-content">
                    <p>Our approach involves applying advanced machine learning techniques, including Random Forest, Gradient Boosting, and XGBoost, to model spirulina yield. We preprocess the data to handle missing values and normalize it for better training. The best-performing model will be identified through hyperparameter tuning using GridSearchCV, and the final solution will be integrated into a React-based web application with interactive visualization features.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
