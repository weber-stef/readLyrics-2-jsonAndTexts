const fs = require("fs"),
  readline = require("readline"),
  stream = require("stream");

const instream = fs.createReadStream("./lyrics/txt-from-pdf-1.txt");
const outstream = new stream();
outstream.readable = true;
outstream.writable = true;

const rl = readline.createInterface({
  input: instream,
  output: outstream,
  terminal: false
});

rl.on("line", function(line) {
  if (isUpperCase() == true) {
    line = "gross";
  }
  console.log(line);
  //Do your stuff ...
  //Then write to outstream
  // rl.write(cubestuff);
});

isUpperCase = line => {
  return /\b[A-Z]\b/g.test(line);
};

isDate = line => {
  // check for sth like (08.09)
  return /\([0-9]{1,}\.[0-9]{1,}.{0,}\)/g.test(line);
};

isYear = line => {
  // check for sth like (08.09)
  return /[0-9]{4}./g.test(line);
};
