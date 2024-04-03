const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9678;

// Valid companies and categories
const validCompanies = ["AMZ", "SNP", "FLP", "AZO", "MYN"];
const validCategories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

app.get('/getProducts/:company/:category', async (req, res) => {
  const { company, category } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  // Check if company and category are valid
  if (!validCompanies.includes(company) || !validCategories.includes(category)) {
    return res.status(400).json({ error: 'Invalid company or category' });
  }

  const apiUrl = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
