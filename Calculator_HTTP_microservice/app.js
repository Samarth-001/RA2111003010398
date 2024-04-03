const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9678;
const WINDOW_SIZE = 10;

let numbersWindow = [];

// Fetch numbers from the test server based on the ID
async function fetchNumbers(id) {
    let endpoint = '';
    switch (id) {
      case 'p':
        endpoint = 'primes';
        break;
      case 'f':
        endpoint = 'fibo';
        break;
      case 'e':
        endpoint = 'even';
        break;
      case 'r':
        endpoint = 'rand';
        break;
      default:
        throw new Error('Invalid ID');
    }
  
    try {
      const response = await axios.get(`http://20.244.56.144/test/${endpoint}`, {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTQ4OTk1LCJpYXQiOjE3MTIxNDg2OTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImU4YWZlZGQ1LWE5OWQtNDNmNi05NTVhLTBmODZjMzE2OTBhNyIsInN1YiI6InNoNzc1OEBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoic3JtVW5pdmVyc2l0eSIsImNsaWVudElEIjoiZThhZmVkZDUtYTk5ZC00M2Y2LTk1NWEtMGY4NmMzMTY5MGE3IiwiY2xpZW50U2VjcmV0IjoiZ01qSXV3cnNyU2ZjTEhscSIsIm93bmVyTmFtZSI6IlNhbWFydGgiLCJvd25lckVtYWlsIjoic2g3NzU4QHNybWlzdC5lZHUuaW4iLCJyb2xsTm8iOiJSQTIxMTEwMDMwMTAzOTgifQ.PuUwTYe4M1bP6oknN-4gVuWMyeKpKQ_I708psn-z2Ig', // Replace with your actual access token
        },
      });
      console.log(response.data.numbers);
      return response.data.numbers; // Assuming the API response contains a 'numbers' field
    } catch (error) {
      console.error('Error fetching numbers:', error);
      return [];
    }
  }
  

// Calculate the average of numbers in the window
function calculateAverage() {
  const sum = numbersWindow.reduce((acc, num) => acc + num, 0);
  return numbersWindow.length > 0 ? sum / numbersWindow.length : 0;
}

// Endpoint to handle qualified number IDs
app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  // Handle only qualified IDs: 'p' for prime, 'f' for Fibonacci, 'e' for even, and 'r' for random
  if (['p', 'f', 'e', 'r'].includes(numberid)) {
    const numbers = await fetchNumbers(numberid);

    // Update numbers window with fetched numbers
    numbersWindow.push(...numbers);
    numbersWindow = Array.from(new Set(numbersWindow)); // Ensure uniqueness

    // Maintain window size
    if (numbersWindow.length > WINDOW_SIZE) {
      numbersWindow = numbersWindow.slice(-WINDOW_SIZE);
    }

    // Prepare response JSON
    const response = {
      numbers,
      windowPrevState: numbersWindow.slice(0, -numbers.length),
      windowCurrState: numbersWindow,
      avg: calculateAverage().toFixed(2), // Round to 2 decimal places
    };

    res.json(response);
  } else {
    res.status(400).json({ error: 'Invalid number ID' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
