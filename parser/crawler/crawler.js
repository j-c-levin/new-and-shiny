'use strict';
// Module.exports
// Cheerio for parsing pages
let cheerio = require('cheerio');
// Prepare a variable to hold the pages
let $ = null;
// Loads an html page
module.exports = {
    loadHtml: (html) => {
        $ = cheerio.load(html);
    },
    // Retrieves all iamges
    getImageUrls: () => {
        let images = $('img');
        return images;
    },
    matchImageWithSelector: (images, selector) => {
        // Finds and returns the first match
        return images.map((index, element) => {
            if (element.attribs.src.match(new RegExp(selector))) {
                return element;
            }
        })[0];
    }
};