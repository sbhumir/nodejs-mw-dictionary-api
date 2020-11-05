# Merriam Webster API for Scripps National Spelling Bee
A simple node.js application to fetch words' etymology, definition, part of speech, and pronunciation using Merriam Webster dictionary api. This is helpful to prepare for Scripps National Spelling Bee

## Requirements
Install the following npm packages or nom install - which is going to install the packages in this wrk directory package.json
```bash
  $ npm install node-fetch
  $ npm install xlsx
  $ npm install dotenv
```
API Key: Register/Sign to https://dictionaryapi.com/ to get dictionary API Key.
 
## Basic Configuration
Assign environment variable.

Method 1: Create '.env' file at the node.js project root directory and add the following entry

KEY=<YOUR_DICTIONARY_KEY>

Method 2: From cmd where you intend to run the file, execute the following cmd
```bash
For windows: set KEY=<YOUR_DICTIONARY_KEY> 
For Mac:  export KEY=<YOUR_DICTIONARY_KEY>
```
## Excel file

There is a sample words.xlsx file in this repo. Add as many words as you want and run the following file. If the word does not exist in collegiate dictionary, it skips that word. 

## Usability

```bash
 $ npm run test
