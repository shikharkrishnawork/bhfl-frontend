const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Arrays for numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';

    // Processing data to extract numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (isNaN(item) && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item) && item > highestLowercase) {
                highestLowercase = item;
            }
        }
    });

    // Dummy user data
    const user_id = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const roll_number = 'ABCD123';

    // Dummy file validation (if Base64 string exists)
    const file_valid = file_b64 ? true : false;
    const file_mime_type = file_b64 ? 'application/pdf' : null; // Just an example
    const file_size_kb = file_b64 ? 1000 : 0; // Example file size

    // Response
    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Starting the server
app.listen(port, () => {
    console.log("Server is running on port ${port}");
});