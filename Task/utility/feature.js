const DataURIParser = require("datauri/parser");
const path = require("path");

const getDatauri = (file) => {
  const parser = new DataURIParser();
  const extname = path.extname(file.originalname).toString;
  return parser.format(extname, file.buffer);
};

module.exports = getDatauri;
