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
});