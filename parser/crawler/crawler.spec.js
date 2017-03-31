'use strict';
// Chai
let expect = require('chai').expect;
// Crawler
let crawler = require('./crawler');
// Tests
describe('Crawler', function () {
    describe('getImageUrls', function () {
        it('finds one image', function () {
            let input = '<img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>';
            crawler.loadHtml(input);
            let output = crawler.getImageUrls();
            expect(output.length).to.equal(1);
        });
        it('finds three image', function () {
            let input = `<img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         <img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         <img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>`;
            crawler.loadHtml(input);
            let output = crawler.getImageUrls();
            expect(output.length).to.equal(3);
        });
        it('finds one image where other tags exist', function () {
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
        it('finds three images where other tags exist', function () {
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
    describe('matchImageWithSelector', function () {
        beforeEach(() => {
            let input = `<img id="strip" src="SA_0975_small.jpg" width="900" height="290"/>
                         <img id="strip" src="Nav_Last" width="900" height="290"/>
                         <img id="strip" src="Nav_First" width="900" height="290"/>`;
            crawler.loadHtml(input);
        });
        it('matches an image with regex', function () {
            let output = crawler.matchImageWithSelector(crawler.getImageUrls(), '^SA');
            expect(output).to.not.be.null;
            expect(output.length).to.be.a('undefined');
            expect(output.attribs.src).to.equal('SA_0975_small.jpg');
        });
        it('returns undefined on no match', function () {
            let output = crawler.matchImageWithSelector(crawler.getImageUrls(), '^ABC');
            expect(output).to.be.a('undefined');
        });
        it('only returns one element', function () {
            let output = crawler.matchImageWithSelector(crawler.getImageUrls(), '^Nav');
            expect(output).to.not.be.null;
            expect(output.length).to.be.a('undefined');
        });
    });
});