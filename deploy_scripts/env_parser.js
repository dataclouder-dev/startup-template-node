#!/usr/bin/env node

const fs = require('fs');
const dotenv = require('dotenv');

function parseEnvFile(envFilePath = '../.env') {
    // Read the .env file
    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

    // Filter and create the formatted string
    const formattedVars = Object.entries(envConfig)
        .filter(([key]) => !['GOOGLE_APPLICATION_CREDENTIALS'].includes(key))
        .map(([key, value]) => `${key}=${value}`)
        .join(',');

    // Print the formatted string (for shell to capture)
    console.log(`${formattedVars}`);
}

// Run the function
parseEnvFile();