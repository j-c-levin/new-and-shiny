'use strict';
// Chai
let expect = require('chai').expect;
// Crawler
let signatures = require('./signatures');
// Setup
let signatureObject = {};
// Assign signatures
signatureObject[1] = {
    name: 'sequential art',
    imageIdentifier: /^SA/,
    imageNameToUrl: (comic) => {
        return `www.collectedcurios.com/${comic}`;
    }
};
// Tests
describe('Signatures', function () {
    beforeEach(() => {
        signatures.setSignatures(signatureObject);
    });
    describe('getSignature', function () {
        it('gets a signature', function () {
            let output = signatures.getSignature(1);
            expect(output).to.not.be.null;
            expect(output.name).to.equal('sequential art');
            expect(`${output.imageIdentifier}`).to.equal('/^SA/');
        });
        it('corrects parses a name into a url', function () {
            let output = signatures.getSignature(1).imageNameToUrl('test');
            expect(output).to.not.be.null;
            expect(output).to.equal('www.collectedcurios.com/test');
        });
        it('throws if id does not exist', function () {
            signatures.setSignatures(signatureObject);
            expect(() => { signatures.getSignature(2); }).to.throw('Signature not found for id 2');
        });
    });
    describe('imageNameToUrl', function () {
        it('formats a name correctly', function () {
            let input = 'name';
            let encloseWith = 'first${}last';
            let output = signatures.imageNameToUrl(input, encloseWith);
            expect(output).to.equal('firstnamelast');
        });
        it('throws if the signature format is invalid', function () {
            let input = 'name';
            let encloseWith = 'firstlast';
            expect(() => {signatures.imageNameToUrl(input, encloseWith);}).to.throw('Signature formation must include "${}"');
        });
    });
    describe('prepareSignaturesForWriting', function () {
        it('prepares a signature object correctly', function () {
            let input = {
                '0': {
                    'name': 'sequential art', 'imageIdentifier': '^SA',
                    'imageNameToUrl': 'www.collectedcurios.com/${}',
                    'linkToNextOrLast': '^Nav_Last',
                    'linkToUrl': 'http://www.collectedcurios.com${}',
                    'latestPageUrl': 'http://www.collectedcurios.com/sequentialart.php?s=980',
                    'latestImageUrl': 'www.collectedcurios.com/SA_0976_small.jpg'
                }
            };
            let expectedOutput = [
                {
                    'name': 'sequential art',
                    'imageIdentifier': '^SA',
                    'imageNameToUrl': 'www.collectedcurios.com/${}',
                    'linkToNextOrLast': '^Nav_Last',
                    'linkToUrl': 'http://www.collectedcurios.com${}',
                    'latestPageUrl': 'http://www.collectedcurios.com/sequentialart.php?s=980',
                    'latestImageUrl': 'www.collectedcurios.com/SA_0976_small.jpg'
                }
            ];
            signatures.setSignatures(input);
            let output = signatures.prepareSignaturesForWriting();
            expect(output).to.not.be.null;
            expect(JSON.stringify(output)).to.equal(JSON.stringify(expectedOutput));
        });
        it('prepares multiple signature objects correctly', function () {
            let input = {
                '0': {
                    'name': 'sequential art', 'imageIdentifier': '^SA',
                    'imageNameToUrl': 'www.collectedcurios.com/${}',
                    'linkToNextOrLast': '^Nav_Last',
                    'linkToUrl': 'http://www.collectedcurios.com${}',
                    'latestPageUrl': 'http://www.collectedcurios.com/sequentialart.php?s=980',
                    'latestImageUrl': 'www.collectedcurios.com/SA_0976_small.jpg'
                },
                '1': {
                    'name': 'art', 'imageIdentifier': '^SA',
                    'imageNameToUrl': 'www.collectedcurios.com/${}',
                    'linkToNextOrLast': '^Nav_Last',
                    'linkToUrl': 'http://www.collectedcurios.com${}',
                    'latestPageUrl': 'http://www.collectedcurios.com/sequentialart.php?s=980',
                    'latestImageUrl': 'www.collectedcurios.com/SA_0976_small.jpg'
                }
            };
            let expectedOutput = [
                {
                    'name': 'sequential art',
                    'imageIdentifier': '^SA',
                    'imageNameToUrl': 'www.collectedcurios.com/${}',
                    'linkToNextOrLast': '^Nav_Last',
                    'linkToUrl': 'http://www.collectedcurios.com${}',
                    'latestPageUrl': 'http://www.collectedcurios.com/sequentialart.php?s=980',
                    'latestImageUrl': 'www.collectedcurios.com/SA_0976_small.jpg'
                },
                {
                    'name': 'art', 'imageIdentifier': '^SA',
                    'imageNameToUrl': 'www.collectedcurios.com/${}',
                    'linkToNextOrLast': '^Nav_Last',
                    'linkToUrl': 'http://www.collectedcurios.com${}',
                    'latestPageUrl': 'http://www.collectedcurios.com/sequentialart.php?s=980',
                    'latestImageUrl': 'www.collectedcurios.com/SA_0976_small.jpg'
                }
            ];
            signatures.setSignatures(input);
            let output = signatures.prepareSignaturesForWriting();
            expect(output).to.not.be.null;
            expect(JSON.stringify(output)).to.equal(JSON.stringify(expectedOutput));
        });
    });
});