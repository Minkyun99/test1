const express = require("express"); //express
const logger = require("morgan");
const path = require("path"); //path
const app = express();
const PORT = 3000; //port 3000 설정

app.use(logger("tiny"));

const _path = path.join(__dirname, "/dist"); //path 지정
console.log(_path); //현재 경로를 확인할 수 있는 console.log

app.use("/", express.static(_path)); //static 경로인 dist 폴더에 index.html의 내용이 보이도록 함.
