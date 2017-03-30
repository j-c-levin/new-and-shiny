'use strict';
// Switch between online and offline
let useOnline = false;
// Crawler.js
let crawler = require('./crawler/crawler');
// Signatures file and the intended signature
let signature = require('./signatures/signatures');
let currentSignature = signature.getSignature(0);
module.exports = {
    // Generic parsing
    parse: (html) => {
        crawler.loadHtml(html);
        // Retrieve the image urlS
        let imageArray = crawler.getImageUrls();
        // find a regex match
        let imageName = crawler.matchImageWithSelector(imageArray, currentSignature.imageIdentifier);
        // Get back the correctly formatted image url from the image name
        let url = signature.imageNameToUrl(imageName.attribs.src, currentSignature.imageNameToUrl);
        console.log(url);
        module.exports.findLast();
    },
    findLast: () => {
        // Retrieve the image urlS
        let imageArray = crawler.getImageUrls();
        let result = crawler.matchImageWithSelector(imageArray, currentSignature.linkToNextOrLast);
        console.log(result.parent.attribs.href);
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
        .get('http://www.collectedcurios.com/sequentialart.php?s=975')
        .then((res) => {
            module.exports.parse(res);
        })
        .catch((err) => {
            console.log(`Err: ${JSON.stringify(err)}`);
        });
};
((useOnline) ? online : offline)();