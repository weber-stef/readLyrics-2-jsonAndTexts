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
      .map((ele, index) => {
        if (ele.includes("Refrain")) currentType = "Refrain";
        if (ele.includes("Bridge")) currentType = "Bridge";
        if (ele.includes("Author")) currentType = "Author";
        if (ele === "") currentType = "";
        return {
          nr: index,
          text: ele,
          length: ele.length,
          type: isUpperCase(ele)
            ? "Title"
            : isDate(ele)
            ? "Date"
            : isYear(ele)
            ? "Year"
            : currentType
        };
      })
      // Ignore empty lines and thus destroy layout: .filter(line => line.text.length > 0)
      .filter(line =>
        line.text === "Bridge:" ||
        line.text === "Bridge" ||
        line.text === "Refrain:" ||
        line.text === "Refrain" ||
        line.text === "Author:" ||
        line.text === "Date:"
          ? false
          : true
      );

    //console.log(arrayOfContent)
    storeData(arrayOfContent, "./lyrics.json");
  });

  /* Append the data to the json file */
  const storeData = (data, path) => {
    try {
      const neuerText = data
        .map(ele => {
          if (ele.type === "Title") {
            ele.text = ele.text + "\n";
            console.log(ele.text);
          } else {
            ele.text = ele.text;
          }
          return ele.text;
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

  isUpperCase = ele => {
    return /[A-Z]{2,}/g.test(ele);
  };

  isDate = ele => {
    // check for sth like (08.09)
    return /\([0-9]{1,}\.[0-9]{1,}.{0,}\)/g.test(ele);
  };

  isYear = ele => {
    // check for sth like (08.09)
    return /[0-9]{4}./g.test(ele);
  };

  isAuthor = ele => {};

  isNumber = ele => {
    return /^\d+$/.test(ele);
  };
};
