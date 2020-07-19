const libs = {};
if (typeof window === 'undefined') {
    /* expect node */
    exports.libs = libs;
} else {
    /* browser */
    window.libs = libs;
}

// import CryptoJS from 'crypto-js';
// window.libs = {
//     CryptoJS
// }
