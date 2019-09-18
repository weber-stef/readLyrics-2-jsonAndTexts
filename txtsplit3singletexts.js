const fs = require("fs");
const directory = "./lyricCollection/";
let currentType = "";
const mainTextArray = [];

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
    // Split big text into single texts
    const unfilteredTexts = data.split(
      "------------------- next textfile -----------------------"
    );

    // console.log(Array.isArray(unfilteredTexts));
    unfilteredTexts.map((singleText, index) => {
      // create single textfiles here
      createSingleFile(singleText);
      store2Json(singleText, index);
    });
  });
};
///
// function to map through single texts applying conditions

const createSingleFile = singleText => {
  //singleText is the lyric singleText
  //titles array contains titles
  const singleLines = singleText.split("\n");
  const singleTitles = singleLines.filter(singleTextLine =>
    isUpperCase(singleTextLine)
  );

  console.log(singleTitles.toString());
};

const unfilteredTextArray = singleText =>
  singleText.split("\n").map((singleTextLine, index) => {
    if (singleTextLine.includes("Refrain")) currentType = "Refrain";
    if (singleTextLine.includes("Bridge")) currentType = "Bridge";
    if (singleTextLine.includes("Author")) currentType = "Author";
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

/* Append the data to the json file */
const storeData = (data, path, index) => {
  try {
    fs.appendFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};
// hasLowerCase = singleTextLine => {
//   // check for more than 2 Capital Letters in a row > The title
//   // console.log(/\b[A-Z]{2,}/g.test(singleTextLine));
//   return /\b[a-z]{2,}/g.test(singleTextLine);
// };
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

isAuthor = singleTextLine => {};

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
