'use strict';
// Filesystem
let fs = require('fs');
// Path
let path = require('path');
// Map for signature
let signatureObject = {};
// Assign signatures
let signaturesFile = fs.readFileSync(path.join(__dirname, './signatures.json'), 'utf-8');
signaturesFile = JSON.parse(signaturesFile);
signaturesFile.forEach((signature, index) => {
    signatureObject[index] = signature;
});
// Module exports
module.exports = {
    // Returns a signature object using its id
    getSignature: (id) => {
        if (signatureObject[id]) {
            return signatureObject[id];
        } else {
            throw `Signature not found for id ${id}`;
        }
    },
    // Overrides the current signatures object
    setSignatures: (signatures) => {
        signatureObject = signatures;
    },
    // Parses the signature imageNameToUrl and returns the correct url
    imageNameToUrl: (imageName, signatureFormat) => {
        signatureFormat = signatureFormat.split('${}');
        return `${signatureFormat[0]}${imageName}${signatureFormat[1]}`;
    }
};