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

const readFile = file => {
  fs.readFile(directory + file, "utf8", function(err, data) {
    if (err) throw err;
    // Split big text into single texts
    const unfilteredTexts = data.split("sw\n");
    console.log(unfilteredTexts[200]);
    // Split single texts into json-Arrays
    unfilteredTexts.map(
      song =>{
        const singleSongArray = song.split("\n").map((singleTextLine, index) =>  {     if (singleTextLine.includes("Refrain")) {
          console.log(singleTextLine);
          return {
            text: singleTextLine, type:"Refrain"
          }
        }
      
      

    )}
  });
};
