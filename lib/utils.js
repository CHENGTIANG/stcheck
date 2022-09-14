const fs = require("fs");
const strip = require("strip-comments");

const readFileContent = (filePath) => {
    return fs.readFileSync(filePath, "utf8").replace(/^\ufeff/u, "");
}
exports.readFileContent = readFileContent


function stripComments(code) {
  code = strip(code, {
    preserveNewlines: true,
  });
  code = strip(code, {
    preserveNewlines: true,
    language: "html",
  });
  code = strip(code, {
    preserveNewlines: true,
    language: "css",
  });
  return code;
}

exports.stripComments = stripComments