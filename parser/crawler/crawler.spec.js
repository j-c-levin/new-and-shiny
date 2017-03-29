'use strict';
// Chai
let expect = require('chai').expect;
// Crawler
let crawler = require('./crawler');
// Tests
describe('Crawler', function () {
    describe('getImageUrls', function () {
        it('finds one image', function() {
            let input = '<img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>';
            crawler.loadHtml(input);
            let output = crawler.getImageUrls();
            expect(output.length).to.equal(1);
        });
        it('finds three image', function() {
            let input = `<img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         <img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         <img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>`;
            crawler.loadHtml(input);
            let output = crawler.getImageUrls();
            expect(output.length).to.equal(3);
        });
        it('finds one image where other tags exist', function() {
            let input = `<body>
                         <div id="container">
                         <a href="index.html">back</a>
                         <img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         </div>
                         </body>`;
            crawler.loadHtml(input);
            let output = crawler.getImageUrls();
            expect(output.length).to.equal(1);
        });
        it('finds three images where other tags exist', function() {
            let input = `<img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         <body>
                         <div id="container">
                         <a href="index.html">back</a>
                         <img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         </div>
                         <img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         </body>`;
            crawler.loadHtml(input);
            let output = crawler.getImageUrls();
            expect(output.length).to.equal(3);
        });
    });
});