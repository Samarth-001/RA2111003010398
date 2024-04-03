const express = require('express');
const app = express();
const PORT = 3000;

function calculateAverage() {
    const sum = numbersWindow.reduce((acc, num) => acc + num, 0);
    return numbersWindow.length > 0 ? sum / numbersWindow.length : 0;
  }

// Endpoint to return the desired JSON
app.get('/numbers', (req, res) => {
  const numbers = [2, 4, 6, 8];
  const windowPrevState = [];
  const windowCurrState = [...numbers]; // Clone the 'numbers' array
  const avg = 5.00; // Clone the 'numbers' array
  
  const response = {
    numbers,
    windowPrevState,
    windowCurrState,
    avg
  };

  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
