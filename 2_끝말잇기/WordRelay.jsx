// 1. 파일을 나누는 경우 사용하는 객체들을 꼭 다시 불러와야 함
// 다른 파일이기 때문에!
const React = require('react');
// 아래와 같은 이름으로 사용할 수 있음
const { Component } = React;

class WordRelay extends Component {
    state = {};

    render() {

    }
}

// 2. 파일을 나누는 경우 반드시 추가해주어야 함
// 모듈 시스템 : 이 파일 밖에서도 사용할 수 있게 해줌(export)
module.exports = WordRelay;