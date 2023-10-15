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
  
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */


const grayScale = (pathIn, pathOut) => {
  
};
console.log("Done");
module.exports = {
  unzip,
  readDir,
  grayScale,
};
