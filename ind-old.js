const fs = require("fs");
const directory = "./lyrics/";
let currentType = "";
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
    const arrayOfContent = data
      .split("\n")
      .map((singleTextLine, index) => {
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
      })
      .filter(line => line.text.length > 0)
      .filter(line =>
        line.text.includes("Refrain") ||
        line.text.includes("Bridge") 
        ? false
          : true
      );

    //console.log(arrayOfContent)
    storeData(arrayOfContent, "./lyrics-v1.json");
  });

  /* Append the data to the json file */
  const storeData = (data, path) => {
    try {
      // fs.writeFileSync
      fs.appendFile(path, JSON.stringify(data), () => console.log("Done"));
    } catch (err) {
      console.error(err);
    }
  };

  isUpperCase = singleTextLine => {
    return /[A-Z]{3,}/g.test(singleTextLine);
  };

  isDate = singleTextLine => {
    // check for sth like (08.09)
    return /\([0-9]{1,}\.[0-9]{1,}.{0,}\)/g.test(singleTextLine);
  };

  isYear = singleTextLine => {
    // check for sth like (08.09)
    return /[0-9]{4}./g.test(singleTextLine);
  };

  isNumber = singleTextLine => {
    return /^\d+$/.test(singleTextLine);
  };
};