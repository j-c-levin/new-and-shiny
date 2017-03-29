'use strict';
// Map for signature
let signatureObject = {};
// Assign signatures
signatureObject[1] = {
    name: 'sequential art',
    imageIdentifier: /^SA/,
    imageNameToUrl: (comic) => {
        return `www.collectedcurios.com/${comic}`;
    }
};
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
    }
};