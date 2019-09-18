const fs = require("fs");
const directory = "./lyricCollection/";
let currentType = "";
const textCollection = [];
let numberOfTexts = 0;

/* Search for all the file in a given directory */
fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    // console.log(file);
    readFile(file);
  });
});

const readFile = file => {
  fs.readFile(directory + file, "utf8", function(err, data) {
    if (err) throw err;
    const allMyTexts = data;
    const unfilteredTexts = data.split("\n");
    // console.log(unfilteredTexts);
    // check for "-nt-"-Entries
    unfilteredTexts.map((lineInAllTexts, index) => {
      // console.log(typeof lineInAllTexts);
      if (lineInAllTexts.includes("-nt-")) {
        const seperatedTexts = allMyTexts.split("-nt-");
        newFunction(seperatedTexts);
      }
    });
    //
  });
};

function newFunction(seperatedTexts) {
  textCollection.push(seperatedTexts);
  // console.log(seperatedTexts);
  // console.log(typeof seperatedTexts);
  console.log(textCollection);
}
//ok for "-nt-" in text data, if present increment variable "numberOftexts"
// if (data.indexOf("-nt-") >= 0) {
//   numberOfTexts++;
// }
// console.log(numberOfTexts);
// });
