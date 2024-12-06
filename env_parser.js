#!/usr/bin/env node

const fs = require('fs');
const dotenv = require('dotenv');

function parseEnvFile(envFilePath = '.env') {
    // Read the .env file
    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

    // Create the formatted string
    const formattedVars = Object.entries(envConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join(',');

    // Print the formatted string (for shell to capture)
    console.log(`ENV_VARS="${formattedVars}"`);
}

// Run the function
parseEnvFile();