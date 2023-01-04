const { query } = require("express");
const express = require("express"); //express
const logger = require("morgan");
const path = require("path"); //path
const app = express();
const fs = require("fs");
const multer = require("multer");
const PORT = 3000; //port 3000 설정

app.use(logger("tiny"));

const _path = path.join(__dirname, "/dist"); //path 지정
console.log(_path); //현재 경로를 확인할 수 있는 console.log

const A = path.join(__dirname, "/dist");

app.use("/", express.static(_path)); //static 경로인 dist 폴더에 index.html의 내용이 보이도록 함.

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/test", (req, res) => {
  //test 경로를 추가하여 서버 동적 테스트 페이지 생성
  res.send(`아이디 : ${req.query.id} <br> 이름 : ${req.query.name}`);
});

app.post("/info", (req, res) => {
  //index.html값으로 파일 생성
  const id = req.body.iid;
  const name = req.body.iname;
  const data = req.body.idata;

  fs.stat(A + name + ".txt", (err, stats) => {
    if (stats) {
      res.send(
        `<script>alert("${name}.txt 파일이 이미 존재합니다! ${name}1.txt 이름으로 저장합니다.");history.go(-1)</script>`
      );
      fs.writeFile(
        A + name + "1.txt",
        `이름 : ${name}, 아이디 : ${id}, 문의사항 : ${data}`,
        (e) => {
          if (e) throw e;
        }
      );
    } else {
      fs.writeFile(
        A + name + ".txt",
        `이름 : ${name}, 아이디 : ${id}, 문의사항 : ${data}`,
        (e) => {
          if (e) throw e;
          res.send(
            `<script>alert("${name}.txt 파일 저장완료!");history.go(-1)</script>`
          );
        }
      );
    }
  });
});

app.listen(PORT, () => console.log("index 서버가 시작됩니다."));
