// uplaoad config
const multer = require("multer");
const multerS3 = require("multer-s3");
const moment = require("moment");
const dotenv = require("dotenv").config();
const AWS = require("aws-sdk");

// for local
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../images/")); // 상위 디렉토리로 이동하여 저장
//   },
//   filename: function (req, file, cb) {
//     // 한글 처리
//     file.originalname = Buffer.from(file.originalname, "latin1").toString(
//       "utf8"
//     );
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
//     );
//   },
// });

// for s3
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

const storage = multerS3({
  s3: s3,
  acl: "public-read-write",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  bucket: process.env.S3_BUCKET_NAME,
  key: (req, file, cb) => {
    let dir = process.env.S3_BUCKET_PATH;
    let datetime = moment().format("YYYYMMDDHHmmss");
    // 한글 처리
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, dir + datetime + "_" + file.originalname); // 저장되는 파일명
  },
});

const upload = multer({ storage: storage });

function deleteFile(data, callback) {
  let Objects = [];
  for (var i in data) {
    let path = extractPathFromURL(data[i].url);
    Objects.push({ Key: path });
  }
  s3.deleteObjects(
    {
      Bucket: process.env.S3_BUCKET_NAME,
      Delete: {
        Objects,
      },
    },
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log("s3 Object", data);
      }
    }
  );
}

// 객체로 접근하기 위해 경로를 디코딩함
function extractPathFromURL(url) {
  const urlObj = new URL(url);
  const path = decodeURIComponent(urlObj.pathname);
  return path;
}

module.exports = { upload, deleteFile };
