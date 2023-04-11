const React = require("react");
const { Component } = React;
const Try = require("./Try");

// 숫자 4개를 겹치지 않고 뽑는 방법
function getNumbers() {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      value: "",
      answer: getNumbers(),
      // React의 상태 불변성(immutable)
      // render()를 호출하는 기준이 변수의 참조가 바뀌어야 함(이전 state === 현재 state 결과가 false가 나와야 함)
      // const array = []; array.push(1); const array2 = [...array, 2];
      // console.log(array === array2); // false
      tries: [],
    };
    // why bind(this)? 메서드 바인딩
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // 화살표 함수를 사용하지 않으면, 내부적으로 안에서 this 키워드를 사용하지 못함
  // **화살표 함수가 특별한 것이 아니고, 메서드 바인딩 bind(this)를 자동으로 해 줌!**
  // **화살표 함수가 babel에서 생기면서 => 메서드 바인딩 생략, state를 밖으로 꺼냄, constructor 생략이 가능해짐**

  // Cannot read properties of undefined (reading 'setState') => this가 undefined
  // 그래도 사용하려면? constructor를 사용해야 함
  onSubmit(e) {
    // NumberBaseball {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
    // console.log(this); // React 내부
    e.preventDefault();
    for (let i = 0; i < this.state.value.length; i++) {
      let char = this.state.value[i];
      if (!("0" <= char && char <= "9")) {
        this.setState({ result: "숫자만 입력해주세요." });
        return;
      }
    }
    if (this.state.value === this.state.answer.join(""))
      this.setState({
        result: "홈런!",
        tries: [
          ...this.state.tries,
          { try: this.state.value, result: "홈런!" },
        ],
      });
    else {
      this.setState({
        value: "",
        tries: [...this.state.tries, this.state.value],
      });
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            /* React에서는 camel case, html에서는 snake case */
            maxLength={4}
            minLength={4}
            /* value를 꼭 붙여줘야 함 why? */
            value={this.state.value}
            onChange={this.onChange}
          />
          <button>입력!</button>
        </form>
        <h1>시도 : {this.state.tries.length}</h1>
        <ul>
          {/*
			map 안에서 return 할 때는 항상 key props를 적어주어야 함!
			why? React가 성능 최적화를 할 때, key를 보고 같은 컴포넌트인지 아닌지 판단하기 때문 => 뭐가 바뀌었는지 알아차리기가 힘듦
			key가 중복되면 error가 다시 발생
			1) 중복되지 않는 문자열 : v.fruit + v.taste
			2) map의 두 번째 인자(index)를 key로 설정하면 안 됨! (성능 최적화에 문제가 생길 수 있기 떄문에)
			3) 차라리 v.fruit + index로 사용 (비추천)

		  	<li><b>사과</b> - 맛있다</li> : 바뀌는 부분이 2개인 경우 
			1) 2차원 배열 : [['사과', '맛있다'] ...].map((elem) => { return <li><b>{v[0]}</b> - {v[1]}</li> })
			2) 원소 객체화 : [{type: '사과', taste: '맛있다'}].map((elem) => { return <li><b>{v.fruit}</b> - {v.taste}</li> })
			3) props : 
		  */}
          {this.state.tries.map((elem, index) => {
            return (
              // 자식 컴포넌트화 1) 가독성 2) 성능(반복문에서 저하가 많이 발생) 3) 재사용성
              // 배울 때는 Top-Down 방식으로 연습, 숙달이 되면 Bottom-Up 방식으로
              // html에서는 attribuet(속성), react에서는 props라고 부름
              // props가 있다는 것은 부모 컴포넌트가 있다는 뜻!
              // 문제가 되는 경우 : props를 너무 깊게 전달해야 할 때 => redux, context, mobx 등을 사용
              // (react-redux가 내부적으로 context를 사용하는 것으로 바뀜)
              <Try key={`${elem} + ${index}`} value={elem} index={index} />
            );
          })}
        </ul>
      </>
    );
  }
}

module.exports = NumberBaseball;
