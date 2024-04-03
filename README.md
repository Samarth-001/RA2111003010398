# Microservices Assessment

This assessment includes two problems that involve developing HTTP microservices using Node.js.

## Problem 1: Average Calculator HTTP Microservice

### Description
Develop an HTTP microservice that calculates the average of a list of numbers and maintains a sliding window of the last `n` calculated averages.

### API Endpoint


### Parameters
- `numberid`: Accepts values 'p' for prime numbers, 'f' for Fibonacci numbers, 'e' for even numbers, and 'r' for random numbers.


### Response JSON Structure
```json
{
  "numbers": [2, 3, 5, 8], // List of fetched numbers
  "windowPrevState": [],   // Previous state of the sliding window
  "windowCurrState": [2, 3, 5, 8], // Current state of the sliding window
  "avg": "4.50"            // Calculated average rounded to 2 decimal places
}
```

## Prime Screenshot
![image](https://github.com/Samarth-001/RA2111003010398/assets/88262012/ed7aa448-0645-4f64-b031-0498da1f7d11)

## Fibonacci Screenshot
![image](https://github.com/Samarth-001/RA2111003010398/assets/88262012/eb74b0b0-a9b1-4d9e-9d41-0968fef8dd64)


# Problem 2: Top Product HTTP Microservice

## Description
Develop an HTTP microservice that retrieves top products from specific companies and categories based on provided parameters.

## API Endpoint
`GET /companies/:companyname/categories/:categoryname/products`

### Parameters
- `companyname`: Name of the company (e.g., "AMZ", "SNP").
- `categoryname`: Name of the category (e.g., "Phone", "Computer").
- Query Parameters:
  - `top`: Number of top products to retrieve.
  - `minPrice`: Minimum price filter.
  - `maxPrice`: Maximum price filter.

```json


### Response JSON Structure
{
  "topProducts": [
    {
      "productName": "Product 1",
      "price": 200,
      "rating": 4.5,
      "discount": 10,
      "availability": "yes"
    },
    {
      "productName": "Product 2",
      "price": 250,
      "rating": 4.2,
      "discount": 15,
      "availability": "out-of-stock"
    },
    {
      "productName": "Product 3",
      "price": 300,
      "rating": 4.7,
      "discount": 5,
      "availability": "Yes"
    }
  ]
}

```
