import React, { useState } from 'react';
import axios from 'axios';
import './Spmodel.css';

function Spmodel() {
  const [inputs, setInputs] = useState({
    seawater_medium: '',
    temperature: '',
    pond_system: '',
    aeration: '',
    light_time: '',
    bg11_medium: '',
    salinity: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const descriptions = {
    1: {
      text: " Spirulina from this environment is great for producing protein-rich feed for animals. These conditions help in creating high-quality nutrition for livestock.",
      image: "/anic3.png"
    },
    2: {
      text: " Spirulina from this environment works well for making protein supplements and powders. It's suited for producing proteins that can be used in everyday diets and health products.",
      image: "/pec2.png"
    },
    3: {
      text: "Spirulina from this environment environment is perfect for maximizing protein content, and it's also ideal for producing medicinal ingredients.",
      image: "/medc3.png"
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  // Set loading to true when starting the request

    // Basic validation to ensure no empty fields
    if (Object.values(inputs).some(value => value === '')) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/predict/', inputs);
      setPrediction(response.data.prediction);  // Assuming prediction returns class 1, 2, or 3
      setError(null);
      resetForm();  // Optionally reset form after success
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);  // Show server error
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      setPrediction(null);
    } finally {
      setLoading(false);  // Stop loading once the request is complete
    }
  };

  // Reset the form after successful submission
  const resetForm = () => {
    setInputs({
      seawater_medium: '',
      temperature: '',
      pond_system: '',
      aeration: '',
      light_time: '',
      bg11_medium: '',
      salinity: ''
    });
  };

  return (
    <div className="form-container">
      <h2>PROTEIN CONTENT PREDICTOR</h2>
      <form onSubmit={handleSubmit} className="grid-form">
        <div className="form-group">
          <label>SEAWATER MEDIUM:</label>
          <input 
            type="number" 
            name="seawater_medium" 
            value={inputs.seawater_medium} 
            onChange={handleInputChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>TEMPERATURE:</label>
          <input 
            type="number" 
            name="temperature" 
            value={inputs.temperature} 
            onChange={handleInputChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>POND SYSTEM:</label>
          <input 
            type="number" 
            name="pond_system" 
            value={inputs.pond_system} 
            onChange={handleInputChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>AERATION:</label>
          <input 
            type="number" 
            name="aeration" 
            value={inputs.aeration} 
            onChange={handleInputChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>LIGHT TIME:</label>
          <input 
            type="number" 
            name="light_time" 
            value={inputs.light_time} 
            onChange={handleInputChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>BG11 MEDIUM:</label>
          <input 
            type="number" 
            name="bg11_medium" 
            value={inputs.bg11_medium} 
            onChange={handleInputChange} 
            required
          />
        </div>

        <div className="form-group">
          <label>SALINITY:</label>
          <input 
            type="number" 
            name="salinity" 
            value={inputs.salinity} 
            onChange={handleInputChange} 
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Predicting..." : "Submit"}
        </button>
      </form>

      {loading && <div className="loading-msg">Loading prediction...</div>}
      {error && <div className="error-msg">Error: {error}</div>}

      {/* Display prediction result with description and image */}
      {prediction && (
        <div className="prediction-msg">
          <h3>Predicted Protein Content Class: {prediction}</h3>
          <div className="description-container">
            <p>{descriptions[prediction]?.text}</p>
            {descriptions[prediction]?.image && (
              <img
                src={descriptions[prediction].image}
                alt={`Class ${prediction}`}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Spmodel;
