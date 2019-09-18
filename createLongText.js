const fs = require('fs')
const directory = './lyricCollection/';
let currentType = ''
/* Search for all the file in a given directory */
fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    console.log(file);
    readFile(file)
  });
});


/* Read a single file and create the json */
const readFile = (file) => {

  fs.readFile(directory + file, 'utf8', function (err, data) {
    if (err) throw err;
    const arrayOfContent = data.split("\n").map(ele => {
      if (ele.includes('Refrain')) currentType = 'Refrain'
      if (ele.includes('Bridge')) currentType = 'Bridge'
      if (ele.includes('Author')) currentType = 'Author'
      if (ele === '') currentType = ''
      return {
        text: ele

      }
    }).filter(line => line.text.length > 0).filter(line => line.text === 'Bridge:' || line.text === 'Refrain:' || line.text === 'Author:' || line.text === 'Date:' ? false : true)

    console.log(arrayOfContent)
    storeData(arrayOfContent, './long.txt')
  });


  /* Append the data to the json file */
  const storeData = (data, path) => {
    try {
      fs.appendFile(path, JSON.stringify(data), () => console.log('Done'));
    } catch (err) {
      console.error(err)
    }
  }


  isUpperCase = (ele) => {
    return /\B[A-Z]\B/g.test(ele);
  }

  isNumber = (ele) => {
    return /^\d+$/.test(ele)
  }




}

