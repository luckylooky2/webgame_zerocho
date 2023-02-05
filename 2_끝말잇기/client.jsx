// <script src=""> 태그를 대체
// 모듈 시스템을 이용하여 react react-dom 패키지를 불러옴
const React = require("react");
const ReactDOM = require("react-dom");

// <script> class WordRelay extends ... </script>를 대체
// 모듈 시스템 : 외부 JS 파일로 대체(import)
// 필요한 파일만 불러올 수 있음 => 모든 파일을 사용하지 않아도 됨(효율적)
const WordRelay = require("./WordRelay");

// <script type="text/babel"> ReactDOM.render()를 대체
// webpack 실행 시 오류 => JSX를 해석하지 못하기 때문
// babel을 추가로 세팅해주어야 함(현재는 세팅 X)
// but, babel을 설치 + babel 내에서도 설정 필요 => JSX 문법을 사용할 수 있음
// npm install -D @babel/core(기본) @babel/preset-env(브라우저에 맞게 최신 -> 옛날 문법으로 변경)
// @babel/preset-react(JSX 지원) babel-loader(babel webpack 연결)
ReactDOM.render(<WordRelay />, document.querySelector("#root"));
