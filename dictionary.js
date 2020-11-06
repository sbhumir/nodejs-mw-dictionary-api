//npm node-fetch is the latest to use for API calls. Request is deprecated
const fetch = require("node-fetch");
const XLSX = require('xlsx');
require('dotenv').config()

const baseURL = 'https://dictionaryapi.com/api/v3/references/collegiate/json/';
const key = process.env.KEY;
var url,
    shortdef,
    partofSpeech,
    pronunciation,
    etymology;
//read words from excel. Dump more words in words excel and test the code
const workbook = XLSX.readFile('words.xlsx');
// get first sheet
var sheet1 = workbook.SheetNames[0];
var worksheet = workbook.Sheets[sheet1];

//get word details from m-w dictionary
function getWordFromDict() {
    try {
        // read words from the cells that have words
        for (var i = 2; worksheet[`A${i}`] != undefined; i++) {
            var word = worksheet[`A${i}`].v;
            url = baseURL + word + '?key=' + key
            //console.log('url ', url);
            var results = [];

            //fetch the specific word details from merriam webster
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    if (json != undefined) {
                        //check if the word exists in collegiate dictionary
                        if (json[0].shortdef != undefined) {
                            //get short def
                            if (json[0].shortdef != undefined) {
                                shortdef = json[0].shortdef[0];
                            }
                            if (json[0].fl != undefined) {
                                //get partofSpeech
                                partofSpeech = json[0].fl;
                            }
                            if (json[0].hwi.prs != undefined) {
                                //get pronunciation
                                pronunciation = json[0].hwi.prs[0].mw;
                            }
                            if (json[0].et != undefined) {
                                //get etymology
                                let origin = (json[0].et[0]).toString();
                                etymology = (origin).slice(5);
                            }
                        } else {
                            //if the word is not found in the dictionary then set the word details empty
                            pronunciation = '';
                            shortdef = '';
                            partofSpeech = '';
                            etymology = '';
                        }
                    } else if (results = []);

                    // push the word details to results array
                    results.push(pronunciation);
                    results.push(shortdef);
                    results.push(partofSpeech);
                    results.push(etymology);
                })
            //write results array to excel sheet
            XLSX.utils.sheet_add_aoa(worksheet, [results], { origin: `B${i}` });
            XLSX.writeFile(workbook, 'words.xlsx');
            //console.log('results ', results);
        }
        console.log('Words details are written to excel. Check the excel sheet');
    } catch (e) {
        console.log(e.message);
    }
};
getWordFromDict();
