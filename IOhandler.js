/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 2023-10-14
 * Author: Simranjit Kaur
 *
 */

const AdmZip = require("adm-zip"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathIn, (err, zipped_data) => {
      if (err) {
        reject(err);
      } else {
        const zip = new AdmZip(zipped_data);
        unzipped_data = zip.extractAllTo(pathOut, true);
        // console.log(unzipped_data)
        resolve(unzipped_data);
      }
    });
  });
};
/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const extensionName = ".png";
        const arrWithPng = files.filter(
          (item) => path.extname(item) === extensionName
        );
        const arrWithPngPath = arrWithPng.map((item) => path.join(dir, item));
        // console.log(arrWithPngPath);
        resolve(arrWithPngPath);
      }
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

function handleGrayscale(img) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var idx = (this.width * y + x) << 2;

      // invert color
      this.data[idx] = 255 - this.data[idx];
      this.data[idx + 1] = 255 - this.data[idx + 1];
      this.data[idx + 2] = 255 - this.data[idx + 2];

      // and reduce opacity
      this.data[idx + 3] = this.data[idx + 3] >> 1;
    }
  }
  return img;
}

const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathIn);
    const filename = path.basename(pathIn);
    const writeStream = fs.createWriteStream(path.join(pathOut, filename));
    const pngStream = new PNG();
    readStream
      .on("error", (err) => {
        console.log(`Error in reading the image: ${err}`);
        reject(err);
      })
      .pipe(pngStream)
      .on("error", (err) => {
        console.error(`Error in image processing: ${err}`);
        reject(err);
      })
      .on("parsed", function() {
        const modifiedImage = handleGrayscale.call(this, pngStream)
        if (modifiedImage) {
          modifiedImage
            .pack()
            .pipe(writeStream)
            .on("error", (err) => {
              console.error(`Error in sending image: ${err}`);
              reject(err);
            })
            .on("finish", () => {
              console.log("Image processing done.");
              resolve();
            });
        } else {
          reject("Modified image is undefined.");
        }
      }); 
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
