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
    const unfilteredTexts = data.split("-nt-");

    console.log(unfilteredTexts.length, "unFilteredTexts ist vom Typ "+ typeof unfilteredTexts);
  

const singleLines = unfilteredTexts.toString().split("\n").map((singleTextLine, index) => {
  if (singleTextLine.includes("Refrain")) currentType = "Refrain";
  if (singleTextLine.includes("Bridge")) currentType = "Bridge";
  if (singleTextLine.includes("Artist")) currentType = "Artist";
  if (singleTextLine === "") currentType = "";
  return {
    nr: index,
    text: singleTextLine,
    lengthOfLine: singleTextLine.length,
    type: isUpperCase(singleTextLine)
      ? "Title"
      : isDate(singleTextLine)
      ? "Date"
      : isYear(singleTextLine)
      ? "Year"
      : currentType
  };
      });
      console.log(unfilteredTexts[0]);
      textCollection.push(unfilteredTexts[0]);
      textCollection.push(unfilteredTexts[1]); 
// console.log(textCollection[0]);
//  //
 //
   });
};
isUpperCase = singleTextLine => {
  // check for more than 2 Capital Letters in a row > The title
  // console.log(/\b[A-Z]{2,}/g.test(singleTextLine));
  return /\b[A-Z]{2,}/g.test(singleTextLine);
};
isDate = singleTextLine => {
  // check for sth like (08.09)
  return /\([0-9]{1,}\.[0-9]{1,}.{0,}\)/g.test(singleTextLine);
};

isYear = singleTextLine => {
  // check for sth like (08.09)
  return /^\d{4}\b/g.test(singleTextLine);
};


isNumber = singleTextLine => {
  return /^\d+$/.test(singleTextLine);
};
function store2Json(singleText, index) {
  console.log(typeof singleText);
  storeData(
    unfilteredTextArray(singleText),
    "./text-material/lyrics.json",
    index
  );
}





