const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const lines = (
      (this.currentLine != null ? this.currentLine: '') + chunk.toString()
    ).split(os.EOL);
    this.currentLine = lines.pop();
    for (const line of lines) {
      this.push(line);
    }
    callback();
  }

  _flush(callback) {
    this.push(this.currentLine != null ? this.currentLine:'');
    callback();
  }
}

module.exports = LineSplitStream;
