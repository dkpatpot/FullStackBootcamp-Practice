const fs = require("fs");
// fs.writeFile("message2.txt","Hello from nodejs",(err) => {
//     if(err) throw err;
//     console.log("This file has been saved");
//     // When a request is aborted - the callback is called with an AbortError
//   });
fs.readFile('message2.txt', "utf8" ,(err, data) => {
    if (err) throw err;
    console.log(data);
  });