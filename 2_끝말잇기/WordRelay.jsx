// 1. 파일을 나누는 경우 사용하는 객체들을 꼭 다시 불러와야 함(import)
// 다른 파일이기 때문에!
const React = require("react");
// 아래와 같은 이름으로 사용할 수 있음
// class WordRelay extends Component {}
const { Component } = React;

class WordRelay extends Component {
  // constructor은 굳이 안 써도 됨
  state = {
    word: "이찬형",
    value: "",
    result: "",
  };

  // class component에서는 메서드를 만들기 위해서 화살표 함수로 만들어야 함
  // why?
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  // render() 안에 함수를 define하는 것은 함수가 호출될 때마다 함수 객체를 새로 만들기 때문에, 밖으로 빼는 것이 효율적
  onSubmit = (e) => {
    e.preventDefault();
    // if (String(this.state.word).at(-1) === String(this.state.value).at(0)) {
    if (this.state.word[this.state.word.length - 1] === this.state.value[0])
      this.setState({ word: this.state.value, value: "", result: "딩동댕!" });
    else this.setState({ result: "땡" });
    this.input.focus();
  };

  onRef = (c) => {
    this.input = c;
  };

  // 핫 리로딩? (소스 코드의 변경점을 감지 후 저장한 output을 수정)
  // 코드를 바꾸면 build를 다시 적용해야 하는 것이 너무 귀찮음 => 자동화
  // npm install -D react-refresh @pmmmwh/react-refresh-webpack-plugin webpack-dev-server
  // 웹팩 개발용 서버 설치
  // 역할?
  // webpack.config.js에 적어놓은 대로 build한 output을 path에 저장(메모리로?)하고 index.html을 실행하면 저장했던 결과를 제공
  // 핫 리로딩을 지원하는 개발 서버를 추가 설치하여 돌림
  // 단, localhost:8080으로 접속해야 기능을 사용할 수 있음
  render() {
    return (
      <>
        {this.state.word}
        <form onSubmit={this.onSubmit}>
          {/* React에서는 JS 예약어와 겹치기 때문에 htmlFor, className을 사용 => 현재는 사용할 수 있도록 바뀐 듯? */}
          <label htmlFor="wordInput">글자를 입력하세요.</label>
          {/*
          controlled input : value와 onChange가 존재하는 input, React에서 자주 사용
          uncontrolled input : 아무것도 없는 원시적인 HTML적인 input, 간단하다는 장점, value 속성을 사용하면 controlled input으로 간주될 수 있기 때문에 defaultValue를 사용

          언제 사용?
          - value가 onSubmit 안에서만 사용되는 경우에는 uncontrolled input으로 대체 가능
          - submitForm()에서 버튼이 안 눌리는 것처럼 보이는 방법 vs. controlled input에서 아예 버튼이 눌리지 않게 하는 방법
          <input id="value"> 로 설정 후, e.target.children.word.value(혹은 e.target[0] 즉, HTML 활용법)로 접근할 수 있기 때문
          정확하게 어떤 차이가 있나?
          */}
          <input
            ref={this.onRef}
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            id="wordInput"
            className="wordInput"
          />
          <button>입력!</button>
        </form>
        {this.state.result}
      </>
    );
  }
}

// 2. 파일을 나누는 경우 반드시 추가해주어야 함
// 모듈 시스템 : 이 파일 밖에서도 사용할 수 있게 해줌(export)
module.exports = WordRelay;
