'use strict';
// Crawler.js
let crawler = require('./crawler');
// If local
// let fs = require('fs');
// let path = require('path');
// let html = fs.readFileSync(path.join(__dirname, '\offline pages\\975.html'),'UTF-8');
// crawler.loadHtml(html);
// From online
// Superagent
let request = require('superagent');
// Get pages
request
    .get('http://www.collectedcurios.com/sequentialart.php?s=977')
    .then((res) => {
        crawler.loadHtml(res.text);
        // Retrieve image urls
        let imageArray = crawler.getImageUrls();
        let image = imageArray.map((count, image) => {
            if (image.attribs.src.startsWith('SA')) {
                return image.attribs.src;
            }
        })[0];
        let url = `www.collectedcurios.com/${image}`;
        console.log(url);
    })
    .catch((err) => {
        console.log(`Err: ${JSON.stringify(err)}`);
    });