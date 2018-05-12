const fs = {
  writeFile: (file, data, callback) => {
    this[file] = data;
    setTimeout(callback, 0);
  },
  mockWritten: file => this[file],
};

module.exports = fs;
