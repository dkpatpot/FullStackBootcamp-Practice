import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([{ message: "Enter your URL :", name: "URL" }])
  .then((answers) => {
    const url = answers.URL;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("qr_image.png"));
    fs.writeFile('url_link.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('It cant run in this environment');
    } else {
      console.log('ERROR');
    }
  });
