const fs = require("fs");
const directory = "./lyricCollection/";
let currentType = "";
// function to becalled in map
function whatever(clme) {
  console.log(clme);
}
/* Search for all the file in a given directory */
fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    console.log(file);
    readFile(file);
  });
});

/* Read a single file and create the json */
const readFile = file => {
  fs.readFile(directory + file, "utf8", function(err, data) {
    if (err) throw err;
    const unfilteredTextArray = data.split("\n").map((singleTextLine, index) => {
      if (singleTextLine.includes("Refrain")) currentType = "Refrain";
      if (singleTextLine.includes("Bridge")) currentType = "Bridge";
      if (singleTextLine.includes("Author")) currentType = "Author";
      if (singleTextLine === "") currentType = "";
      if (singleTextLine === "sw") currentType = "pg";
      return {
        nr: index,
        text: singleTextLine,
        length: singleTextLine.length,
        type: isUpperCase(singleTextLine)
          ? "Title"
          : isDate(singleTextLine)
          ? "Date"
          : isYear(singleTextLine)
          ? "Year"
          : currentType
      };
    });
    
    const filteredTextArray = unfilteredTextArray.filter(line =>
      line.text.includes("Refrain") ||
      line.text.includes("Bridge")
        ? false
        : true
    );

    //define storage-function  (dataToHandOverToJson, PathToJsonFile, dataToHandOverToReformattedTextFile)
    storeData(filteredTextArray, "./lyrics.json", unfilteredTextArray);
  });

  /* Append the data to the json file */
  const storeData = (data, path, unfilteredData) => {
    try {
      const neuerText = unfilteredData
        .map((singleTextLine, index) => {
                      return (
                      singleTextLine.text
            );
          
        })
        .join("\n");
      console.log(neuerText);
      fs.writeFile("out.txt", neuerText, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });
      fs.appendFile(path, JSON.stringify(data), () => console.log("Done"));
    } catch (err) {
      console.error(err);
    }
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
    return /[0-9]{4}./g.test(singleTextLine);
  };

  isAuthor = singleTextLine => {};

  isNumber = singleTextLine => {
    return /^\d+$/.test(singleTextLine);
  };
};