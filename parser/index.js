'use strict';
// Switch between online and offline
let useOnline = false;
// Crawler.js
let crawler = require('./crawler/crawler');
// Signatures file
let signatures = require('./signatures/signatures').getSignature(1);
module.exports = {
    // Generic parsing
    parse: (html) => {
        crawler.loadHtml(html);
        // Retrieve the image url that matches the regex provided
        let imageArray = crawler.getImageUrls();
        let imageName = imageArray.map((count, image) => {
            if (image.attribs.src.match(signatures.imageIdentifier)) {
                return image.attribs.src;
            }
        })[0];
        let url = signatures.imageNameToUrl(imageName);
        console.log(url);
    }
};
// If local
let offline = () => {
    let fs = require('fs');
    let path = require('path');
    let html = fs.readFileSync(path.join(__dirname, '\offline pages\\975.html'), 'UTF-8');
    module.exports.parse(html);
};
// From online
let online = () => {
    // Superagent
    let request = require('superagent');
    // Get pages
    request
        .get('http://www.collectedcurios.com/sequentialart.php?s=977')
        .then((res) => {
            module.exports.parse(res);
        })
        .catch((err) => {
            console.log(`Err: ${JSON.stringify(err)}`);
        });
};
((useOnline) ? online : offline)();