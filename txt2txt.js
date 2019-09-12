const fs = require("fs");
const directory = "./lyrics/";
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
    const unfilteredTextArry = data.split("\n").map((singleTextLine, index) => {
      if (singleTextLine.includes("Refrain")) currentType = "Refrain";
      if (singleTextLine.includes("Bridge")) currentType = "Bridge";
      if (singleTextLine.includes("Author")) currentType = "Author";
      if (singleTextLine === "") currentType = "";
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
    // Do not write the following words as text-entries to the json file
    const filteredTextArray = unfilteredTextArry.filter(line =>
      line.text === "Bridge:" ||
      line.text === "Bridge" ||
      line.text === "Refrain:" ||
      line.text === "Refrain" ||
      line.text === "Author:" ||
      line.text === "Date:"
        ? false
        : true
    );

    //define storage-function  (dataToHandOverToJson, PathToJsonFile, dataToHandOverToReformattedTextFile)
    storeData(filteredTextArray, "./lyrics.json", unfilteredTextArry);
  });

  /* Append the data to the json file */
  const storeData = (data, path, unfilteredData) => {
    try {
      const neuerText = unfilteredData
        .map((singleTextLine, index) => {
          if (singleTextLine.text.indexOf("\n") <= 0) {
            // console.log("no Linebreaks");
            //if mapping through one of the metioned cases, add linebreak before it
            if (
              singleTextLine.text.indexOf("Ref") >= 0 ||
              singleTextLine.text.indexOf("Bridge") >= 0
            ) {
              singleTextLine.text = "\n" + singleTextLine.text;
              singleTextLine.type = "";
            }
            if (isUpperCase()) {
              console.log("uppercase found");
              singleTextLine = singleTextLine + "\n";
            }
            return (
              isUpperCase() +
              " - " +
              singleTextLine.nr +
              " - " +
              singleTextLine.text
            );
          }
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
