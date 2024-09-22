import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState(""); // Stores the user input JSON
  const [responseData, setResponseData] = useState(null); // Stores the API response
  const [error, setError] = useState(null); // To display errors
  const [selectedOptions, setSelectedOptions] = useState([]); // Stores the dropdown selections
  
  // Dropdown options for filtering response data
  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
  ];

  // Handler for JSON submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(inputData); // Validates JSON input
      setError(null); // Clear previous errors if any
      
      const response = await axios.post("https://bfhl-backend-6jjf.onrender.com/bfhl", parsedData);
      setResponseData(response.data); // Sets the response data
    } catch (err) {
      setError("Invalid JSON format or API error."); // Displays error if JSON is invalid or API fails
    }
  };

  // Filters and renders the response based on dropdown selection
  const renderResponse = () => {
    if (!responseData) return null;

    let filteredData = {};
    selectedOptions.forEach((option) => {
      filteredData[option.value] = responseData[option.value];
    });

    return (
      <pre>{JSON.stringify(filteredData, null, 2)}</pre> // Nicely format the filtered response
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Enter JSON e.g. { "data": ["A", "C", "z"] }'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          rows="5"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}

      {responseData && (
        <div className="response-section">
          <h2>Select Data to View:</h2>
          <Select
            isMulti
            options={options}
            onChange={(selected) => setSelectedOptions(selected)}
          />
          <div className="response-output">{renderResponse()}</div>
        </div>
      )}
    </div>
  );
}

export default App;
