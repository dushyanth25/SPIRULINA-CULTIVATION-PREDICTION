import React, { useState } from 'react';
import './Visualizer.css'; // Import the CSS file

const Visualizer = () => {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { feedback, email };  // Include email in the request data

        try {
            const response = await fetch('http://localhost:8000/api/send-sms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('THANK YOU FOR SHARING YOUR COMMENTS');
            } else {
                setMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            setMessage('Failed to send feedback. Please try again later.');
        }
    };

    return (
        <div className="visualizer-container">
            <h2>CONTACT US</h2>
            <p>THANK YOU FOR USING OUR SERVICES</p>
            <p>FOR MORE DETAILS REFER: <a href="https://1drv.ms/w/c/2ad6e09b190db9f7/EYLzNCfS5HJKhGdz0iVeZcYB8BskvHFteUTSjoberY-j1w?e=hUJQXq" target="_blank" rel="noopener noreferrer">www.literature.com</a></p>
            <p>EMAIL: <strong>dushyanth520@gmail.com</strong></p>
            <p>Phone: <strong>9344371298</strong></p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="feedback">FEEDBACK:</label>
                    <input
                        type="text"
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Share your email where we can contact you:</label> {/* Updated label */}
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"  // Optional: Adding a placeholder for better UX
                        required
                    />
                </div>
                <button type="submit">Send Feedback</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Visualizer;
