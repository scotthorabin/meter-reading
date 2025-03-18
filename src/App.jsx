import { useState } from 'react';
import './App.css';

function App() {
  const [newReading, addReading] = useState([]); // Store the user readings in a new array
  const [error, newError] = useState(""); // Store error messages
  const [input, addInput] = useState(""); // Stores input from user

  // New function to handle user new meter reading input
  function handleReading() {
    const newUserReading = parseInt(input, 10);

    // If statement to ensure number is greater than 0 but less than 99999
    // isNaN is used to determine if a value is a number or not
    if (isNaN(newUserReading) || newUserReading < 0 || newUserReading > 99999) {
    // New error when if statement has not been met
      newError("Please enter a valid number between 0 and 99999");
      return;
    }

      // Ensure the new reading is greater than the last recorded reading
  if (newReading.length > 0 && newUserReading <= newReading[0]) {
    newError("New reading must be higher than the last recorded reading.");
    return;
  }

    // If successful, new error will be empty and the new reading will be add to the array list
    newError("");
    addReading(prevReadings => [newUserReading, ...prevReadings]);
    addInput(""); // clear input once added
  }

  // New function to predict next reading
  function prediction() {
    // If there are less than 4 readings, prediction is not calculated
    if(newReading.length < 4){
      return "More data needed";
    }

    // new const to get the previous 4 values out of the newReading Array
    const lastFourReads = newReading.slice(0, 4);

    // new const that will take away the newReading values away from each other
    const difference = [
      lastFourReads[0] - lastFourReads[1],
      lastFourReads [1] - lastFourReads [2],
      lastFourReads [2] - lastFourReads [3],
    ];
    
    // this for loop will add all values from const difference
    // let is used so that the total value can be reassigned from the for loop
    let total = 0;
    for (let i = 0; i <difference.length; i++){
      total += difference[i];
    }

    // new const that will divide total by the 4 numbers in the difference array
    const average = total / difference.length;

    // new const that will get the most recent reading and round it to the nearest number (e.g. 5.5 would be rounded to 10)
    const predictionRead = lastFourReads[0] + Math.round(average);

    // the prediction function will return the new prediction
    // predictionRead will be converted to a string to ensure padStart works.
    // padstarts ensures that preditctionreading has 5 characters
    return predictionRead.toString().padStart(5, "0");

  }

  return (
    <div className="App">
      <h1>Meter Reading App</h1>

      {/* Input field for meter reading */}
      <div>
        <input
          type="number"
          value={input}
          onChange={(e) => addInput(e.target.value)} // Update input state
          placeholder="Enter a meter reading (00000 - 99999)"
        />
        <button onClick={handleReading}>Add Reading</button>
      </div>

      {/* if user doesnt meet if conditions, then produce the new error message*/}
      <p style={{ color: 'green' }}>{error}</p>

      {/* Display previous readings */}
      <div>
        <h2>Previous Readings</h2>
        <ul>
          {newReading.map((newReading, index) => (
            <li key={index}>{String(newReading).padStart(5, '0')}</li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Predicted Reading </h1>
        <p>{prediction()}</p>
      </div>
    </div>
  );
}

export default App;
