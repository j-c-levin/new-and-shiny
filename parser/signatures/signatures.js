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
        if (signatureFormat.length < 2) {
            throw 'Signature formation must include "${}"';
        } 
        return `${signatureFormat[0]}${imageName}${signatureFormat[1]}`;
    },
    // Does exactly the same thing as imageNameToUrl but I wanted to avoid confusion in the naming
    // So underneath it just quietly passes everything to imageNameToUrl
    linkToUrl: (linkName, signatureFormat) => {
        return module.exports.imageNameToUrl(linkName, signatureFormat);
    },
    setNewData: (id, currentSignature) => {
        // Assign the new data back into the array
        signatureObject[id] = currentSignature;
        // Get signature object into a correct mapped array signatureFormat
        let dataToWrite = module.exports.prepareSignaturesForWriting();
        // Write the file out
        fs.writeFileSync(path.join(__dirname, 'signatures.json'), JSON.stringify(dataToWrite, null, 4));
        console.log('written out');
    },
    prepareSignaturesForWriting: () => {
        // Map the signature object back to an array
        return Object.keys(signatureObject).map((index, key) => {
            return signatureObject[key];
        });
    }
};