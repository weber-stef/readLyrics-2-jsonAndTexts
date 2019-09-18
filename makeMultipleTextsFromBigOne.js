const fs = require("fs");
const directory = "./lyricCollection/";
let currentType = "";
const textCollection = [];

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

    // check for "-nt-"-Entries to have them as markers push the seperated texts to the textCollection array
    unfilteredTexts.map((lineInAllTexts, index) => {
      if (lineInAllTexts.includes("-nt-")) {
        const seperatedTexts = allMyTexts.split("-nt-");
        pushSeperatedTextsToCollection(seperatedTexts);
        console.log(textCollection.seperatedTexts);
      }
    });
    //
  });
};

function pushSeperatedTextsToCollection(seperatedTexts) {
  //const unfilteredTextArray = singleText =>
  seperatedTexts.map((singleTextLine, index) => {
    // console.log(singleTextLine);
    return singleTextLine;
  });
  textCollection.push(seperatedTexts);

  // console.log(typeof seperatedTexts);
  // console.log(textCollection);
  // console.log(typeof seperatedTexts);
  // console.log(textCollection);
}
