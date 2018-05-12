const fs = {};

fs.writeFile = (file, data, callback) => {
  fs[file] = data;
  setTimeout(callback, 0);
};

fs.mockWritten = file => fs[file];

module.exports = fs;
