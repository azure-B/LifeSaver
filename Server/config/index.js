const dotenv = require("dotenv");
const path = require("path");

// .env 파일의 경로 설정
const envPath = path.join(__dirname, "key.env");

// dotenv로 .env 파일 로드
dotenv.config({ path: envPath });

// process.env에서 SECRET_KEY 가져오기
const secretKey = process.env.SECRET_KEY;

// 다른 파일에서 사용할 수 있도록 내보내기
module.exports = secretKey;
