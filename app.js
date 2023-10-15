const path = require("path")
const fs = require("fs")
const PNG = require("pngjs").PNG

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
    return img;
  }
}

// const grayScale = (pathIn, pathOut) => {
//   const readStream = fs.createReadStream(pathIn);
//   const filename = path.basename(pathIn);

//   const writeStream = fs.createWriteStream(path.join(pathOut, filename));
//   const pngStream = new PNG();
//   pngStream.on("parsed", function () {
//     const modifiedImage = handleGrayscale();
//     modifiedImage.pack().pipe(writeStream);
//   });
//   pngStream.on("error", function (err) {
//     console.log(`Error: ${err}`);
//     process.exit(1);
//   });
//   pipeline(readStream, pngStream, writeStream, function onEnd(err) {
//     if (err) {
//       console.log(`Error: ${err}`);
//       process.exit(1);
//     } else {
//       console.log("Done");
//     }
//   });
  // readStream
  // .on((err) => console.log(err))
  // .on((value) => console.log(value.toString()))
  // .pipe(pngStream)
  // .on((value) => console.log(value.toString()))
  // .on((err) => console.log(err))

  // .pipe(writeStream)
  // .on((value) => console.log(value.toString()))
  // .on((err) => console.log(err))

  // pipeline(readStream, pngStream, writeStream)
// };
// const grayScale = (pathIn, pathOut) => {
//   return new Promise((resolve, reject) => {
//     const readStream = fs.createReadStream(pathIn);
//     const filename = path.basename(pathIn);
//     const writeStream = fs.createWriteStream(path.join(pathOut, filename));
//     const pngStream = new PNG();
//     pngStream.on("parsed", function () {
//       try {
//         const modifiedImage = handleGrayscale(this);
//         modifiedImage.pack().pipe(writeStream);
//         writeStream.on('finish', resolve) ; // Resolve the Promise if the processing is successful
//       } catch (error) {
//         reject(error); // Reject the Promise if an error occurs
//       }
//     });
//     pngStream.on("error", function (err) {
//       console.log(`Error: ${err}`);
//       reject(err); // Reject the Promise in case of an error
//     });

//     pipeline(readStream, pngStream, writeStream, function onEnd(err) {
//       if (err) {
//         console.log(`Error: ${err}`);
//         reject(err); // Reject the Promise if an error occurs during the pipeline
//       } else {
//         console.log("Done");
//         resolve(); // Resolve the Promise on successful completion
//       }
//     });
//   });
// };
// const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(pathIn);
    const filename = path.basename(pathIn);
    const writeStream = fs.createWriteStream(path.join(pathOut, filename));
    // const writeStream = fs.createWriteStream(pathOut)
    const pngStream = new PNG();
    readStream.pipe(pngStream).on("parsed", function () {
      const modifiedImage = handleGrayscale.call(this);
      modifiedImage.pack().pipe(writeStream);
    });
  
    pngStream.on("error", function (err) {
      console.log(`Error: ${err}`);
      process.exit(1);
    });
   
    pngStream.on("error", function (err) {
      console.log(`Error: ${err}`);
      process.exit(1);
    });
    pipeline(readStream, pngStream, writeStream, (err) => {
      if (err) {
        console.error(`Error in pipeline: ${err}`);
        resolve(); // Skip this file
      }
    });
  });
};
const readDir = (dir) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, value) => {
        if (err) {
          reject(err);
        }
        const extensionName = ".png";
        const arrWithPng = value.filter(
          (item) => path.extname(item) === extensionName
        );
        const arrWithPngPath = arrWithPng.map((item) => {return path.join(dir, item)});
        // arrWithPng.forEach(element => {
  
        // if(element.slice(-4,-1) === extensionName ){
        console.log(arrWithPngPath)
        resolve(arrWithPngPath)
        
        
      });
    });
  };
readDir(pathUnzipped)
  .then((pngFiles) => {
    if (Array.isArray(pngFiles)) {
      const grayscalePromises = pngFiles.map((pngFile) => {
        return grayScale(pngFile, pathProcessed);
      });

      return Promise.all(grayscalePromises);
    } else {
      throw new Error("The 'readDir' function did not return an array of PNG files.");
    }
  })
  .then(() => {
    console.log("Grayscale Processing Completed");
  })
  .catch((error) => console.error("Error:", error));
// const IOhandler = require("./IOhandler");

// const grayScale = (pathUnzipped, pathProcessed) => {
//   const readStream = fs.createReadStream(pathIn);
//   const filename = path.basename(pathIn);
//   if (filename.startsWith("__MACOSX")) {
//     console.log(`Skipping file: ${filename}`);
//     return;
//   }
//   const writeStream = fs.createWriteStream(path.join(pathOut, filename));
//   const pngStream = new PNG();

//   readStream.pipe(pngStream);

//   // Check for errors while parsing
//   pngStream.on("error", function (err) {
//     console.log(`Error parsing the PNG file: ${err}`);
//     process.exit(1);
//   });

//   pngStream.on("parsed", function () {
//     // Check if the file is within the __MACOSX directory
//     if (pathIn.includes("__MACOSX")) {
//       console.log("Skipping __MACOSX file");
//       return;
//     }

//     // At this point, the file is a valid PNG image
//     // At this point, the file is a valid PNG image
//     const modifiedImage = handleGrayscale.call(this);
//     modifiedImage.pack().pipe(writeStream);
//   });

//   pipeline(readStream, pngStream, writeStream, function onEnd(err) {
//     if (err) {
//       console.log(`Error: ${err}`);
//       process.exit(1);
//     } else {
//       console.log("Done");
//     }
//   });
// };

// module.exports = {
//   unzip,
//   readDir,
//   grayScale,
// };
