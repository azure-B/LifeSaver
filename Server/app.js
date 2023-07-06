const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();
const router = require("./router/router");
const { sequelize } = require("./models");

// sequelize 설정 - 동기화 진행
sequelize
  .sync({ force: false }) //true면 서버 실행마다 테이블 재생성
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", router);

app.listen(PORT, () => {
  console.log("serveron");
});
