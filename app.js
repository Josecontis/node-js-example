const Util = require("util");
const fs = require("fs");

// fs.readFile("./Hello_world.txt", "utf8", (err,text) => {
//     if(err){
//         console.log("Failed to read file", err);
//     }
//     else
//     {
//         console.log("Reading: ", text);
//     }
// });

// with promise
const readFile = Util.promisify(fs.readFile);
readFile("./Hello_world.txt", "utf8")
  .then((text) => {
    console.log("Reading: ", text);
  })
  .catch((err) => {
    console.log("Failed to read file", err);
  });
