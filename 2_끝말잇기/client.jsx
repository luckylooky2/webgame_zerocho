// <script src=""> 태그를 대체
// 모듈 시스템을 이용하여 react react-dom 패키지를 불러옴
const React = require('react');
const ReactDom = require('react-dom');

// <script> class WordRelay extends ... </script>를 대체
// 모듈 시스템 : 외부 JS 파일로 대체(import)
// 필요한 파일만 불러올 수 있음 => 모든 파일을 사용하지 않아도 됨(효율적)
const WordRelay = require('./WordRelay');


// <script type="text/babel"> ReactDOM.render()를 대체
ReactDom.render(<WordRelay />, document.querySelector('#root'));