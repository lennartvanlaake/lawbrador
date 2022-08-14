var { Readability } = require('@mozilla/readability');
const { default: axios } = require('axios');
var { JSDOM } = require('jsdom')
const fs = require('fs')

async function main() {
    //const url = "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A61962CJ0026&qid=1652106196685"
   
    const url = "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A62018CC0311&qid=1660476583109"
    // const url = "https://wetten.overheid.nl/BWBR0001854/2022-07-01"
    const req = await axios.get(url)
    const text = req.data;
    const doc = new JSDOM(text, { url: url })
    let reader = new Readability(doc.window.document);
    
    let article = reader.parse();
    fs.writeFileSync('/home/gebruiker/lawbrador/packages/experiments/demo.html', article.content, { flag: 'w+'} )
    console.log("bla")
}

main();