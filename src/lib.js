require("webpack-hot-middleware/client")
const libs = {};
if (typeof window === 'undefined') {
    /* expect node */
    exports.libs = libs;
} else {
    /* browser */
    window.libs = libs;
}