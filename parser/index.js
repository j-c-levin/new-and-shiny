'use strict';
// Switch between online and offline
let useOnline = true;
// Crawler.js
let crawler = require('./crawler/crawler');
// Superagent
let request = require('superagent');
// Signatures file and the intended signature
let signature = require('./signatures/signatures');
// Setup
let signatureId = 0;
let currentSignature = signature.getSignature(signatureId);
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
        currentSignature.latestImageUrl = url;
        console.log(currentSignature.latestImageUrl);
        module.exports.findLast();
    },
    findLast: () => {
        // Retrieve the image urlS
        let imageArray = crawler.getImageUrls();
        // Find the 'next page' or 'last page' button
        let result = crawler.matchImageWithSelector(imageArray, currentSignature.linkToNextOrLast);
        if (result) {
            // The button exists, so we are not looking at the latest page yet
            console.log('not the latest version, navigating to:', result.parent.attribs.href);
            // Get the url attached to the button and format it according to the signature
            currentSignature.latestPageUrl = signature.linkToUrl(result.parent.attribs.href, currentSignature.linkToUrl);
            // Navigate to that page and parse again
            module.exports.getPage(currentSignature.latestPageUrl);
        } else {
            // No 'next' or 'last' button exist, so we are on the latest page
            console.log('latest version, writing');
            // Write out the new data
            signature.setNewData(signatureId, currentSignature);
        }
    },
    getPage: (url) => {
        request
            .get(url)
            .then((res) => {
                // Use the HTML that comes in the 'text' field
                module.exports.parse(res.text);
            })
            .catch((err) => {
                console.log(`Err: ${JSON.stringify(err)}`);
            });
    }
};
// If local
let offline = () => {
    let fs = require('fs');
    let path = require('path');
    let html = fs.readFileSync(path.join(__dirname, '\offline pages\\976.html'), 'UTF-8');
    module.exports.parse(html);
};
// Starts everything off by switching between online and offline mode
((useOnline) ? module.exports.getPage : offline)(currentSignature.latestPageUrl);