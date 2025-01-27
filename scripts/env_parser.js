#!/usr/bin/env node

import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseEnvFile(envFilePath = resolve(__dirname, '../.env')) {
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
