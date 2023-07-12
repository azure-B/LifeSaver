const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();
const session = require("express-session");
const router = require("./router/router");
const { sequelize } = require("./models");
const secretKey = require("./config");

app.use(cors({ origin: "http://54.90.25.182", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session 세팅
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000,
      httpOnly: false,
    },
  })
);

// sequelize 설정 - 동기화 진행
sequelize
  .sync({ force: false }) // true면 서버 실행마다 테이블 재생성
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api/", router);

app.listen(PORT, () => {
  console.log("serveron");
});
