import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import Models from './Models';
import Visualizer from './Visualizer';
import SpGraph from './SpGraph'; // Adjusted for case sensitivity  
import Spmodel from './Spmodel';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <aside className="sidebar">
                <h3>SPIRULINA</h3>
                <ul>
                    <li><Link to="aboutus">ABOUT US</Link></li>
                    <li><Link to="models">EDA</Link></li>
                    <li><Link to="spgraph">ANALYSIS</Link></li>
                    <li><Link to="spmodel">PREDICTION</Link></li>
                    <li><Link to="visualizer">CONTACT US</Link></li>
                </ul>
            </aside>
            <main className="content">
                <Routes>
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="models" element={<Models />} />
                    <Route path="visualizer" element={<Visualizer />} />
                    <Route path="spgraph" element={<SpGraph />} /> 
                    <Route path="spmodel" element={<Spmodel />} />
                </Routes>
            </main>
        </div>
    );
};

export default Home;