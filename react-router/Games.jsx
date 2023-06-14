import React from "react";
// 여기서 문제 발생
// 이 컴포넌트에서 import하는 React 객체와 NumberBaseball 컴포넌트에서 import하는 React 객체가 다름
// class에서는 발생하지 않음(hooks에서만 발생)
// 해결 : 아래 컴포넌트를 class로 바꿔야 함
// import NumberBaseBall from "../3_숫자야구/NumberBaseball";
// import RSP from "../5_가위바위보/RSP";
// import Lotto from "../6_로또추첨기/Lotto";
import GameMatcher from "./GameMatcher";

// react-router-dom이 내부적으로 react-router를 사용하는 구조
// 우리는 react-router-dom만 사용!
// StaticRouter : 주로 서버에서 사용
import {
  BrowserRouter,
  HashRouter,
  StaticRouter,
  Route,
  Link,
  Switch,
} from "react-router-dom";

// 1. react-router를 사용하고 싶으면 해당 컴포넌트의 최상위를 BrowserRouter or HashRouter로 감싸줌
// - 가장 많이 사용하는 것은 BrowserRouter

// 2. Route를 이용해 페이지를 생성
// - 1) react-router가 여러 개 가상의 페이지 주소를 만들고 => 각각의 컴포넌트를 연결
// - 여러 컴포넌트를 하나의 페이지에서 동시에 사용할 수 있음
// - cf> react-router는 실제로 여러 페이지가 존재하는 것이 아니라, 가상의 페이지를 이용해 그렇게 보이게 만든 것이다!
// - 2) 실제 /number-baseball이라는 페이지는 존재하지 않고 react-router만 알고 있는 가상 페이지
// - 서버에 /number-baseball로 요청하면 Cannot GET /number-baseball로 응답 => 프론트에서만 동작하기 때문에
// - 3) ***따라서, <a /> 태그를 사용하여 실제 페이지로 이동하려고 하면 에러 발생***
// - 대신 react-router에서 제공하는 <Link /> 컴포넌트(태그) 이용 : 실제 브라우저에서는 <a /> 태그

// 3. <Route /> 밖의 부분( <div><Link/>...</div> )이 해당 컴포넌트의 레이아웃
// - 페이지 주소가 변경되어도 바뀌지 않는 부분을 뜻함
// - Navigation Bar, Header, Footer 등이 포함 : 모양(ㄷ)은 정하기 나름...

// 4. Dynamic Route Maching
// - <Route />가 너무 늘어나면 관리하는 데 문제가 생길 수 있음. 효율적으로 관리하는 방법
// - path="/game/:name"
// - 여러 개도 가능 => path="/game/:name/:number"

const Games = () => {
  return (
    <BrowserRouter>
      {/* <a href="/number-baseball">숫자야구</a> */}
      <div>
        <Link to="/game/number-baseball?query=true&hello=world">숫자 야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또 생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        {/* 동적 라우트 매칭을 하면 아래처럼 일일이 페이지마다 작성하지 않아도 됨 */}
        {/* <Route path="/number-baseball" component={NumberBaseBall} />
        <Route path="/rock-scissors-paper" component={RSP} />
        <Route path="/lotto-generator" component={Lotto} /> */}
        <Switch>
          <Route path="/" component={GameMatcher} />
          <Route path="/game/:name" component={GameMatcher} />
          <Route path="/game/exact" component={GameMatcher} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;

// HashRouter
// - e.g. /#/number-baseball : 페이지 주소 중간에 #(hash)가 들어가 있는 형태
// - 의미 : 서버는 모르고 브라우저만 아는 주소(# 뒤에 부분은 브라우저만 아는 주소)
// - 장점 : 새로고침을 해도 화면이 보임(화면이 그대로 유지), 새로고침할 때 문제가 없음
// - 브라우저에서만 동작하기 때문에 문제가 적음 => deploy할 때 편함
// - vs. BrowserRouter : 새로고침하면 서버로 요청이 감
// - 단점 : SEO에서 불이익(검색 엔진 로봇이 돌아다니면서 정보를 수집 => 브라우저가 아닌 서버에 물어보기 때문에)
// - => 실무에서 잘 사용하지 않음
// - cf> BrowserRouter를 사용해도 SEO를 위해 따로 세팅(서버에 해당 페이지를 등록)이 필요 => 그래야 검색 엔진 로봇이 탐지할 수 있음
// - e.g. 검색 엔진 필요없는 페이지, 관리자 페이지 ...
// - 긴 콘텐츠에서 목차 기능으로 scroll 바로 이동하는것 구현할때 hash 많이 씀 => HashRouter를 쓰진 않고, BrowserRouter + Hash로 구현

// - HashRouter와 Hash는 어떤 관련?
// - 기본적으로 주소에서 hash는 서버는 모르고 브라우저만 아는 개념

// query string
// - e.g. /game/number-baseball?query=true&hello=world : 주소에 데이터를 붙여주는 형태
// - 데이터를 전달하는 가장 쉬운 방법
// - 1. 주소와 ?로 구분
// - 2. key=value로 사용
// - 3. 여러 쌍을 사용할 때는 &로 구분
// - 사용 : SPA에서 페이지를 구현할 때(미리 다 받아와서 일부만 보여주는 것이 아니라, 서버에서 해당 페이지를 그때 그때 받아옴)
// - 장점 : ***새로고침을 했을 때, 그 페이지를 그대로 보여줄 수 있는 가능성이 생김***
// - 없었다면, 매번 첫 번째 페이지만 보여줄 수 밖에 없음

// Route props 전달
// 1. component={() => <GameMatcher props="123" />}
// 2. render={(props) => <GameMatcher props={props.abc} />}
// 2번 추천
// 기존 history, location, match 등은 사라지는 듯...?
// => render={(props) => <GameMatcher props={...props} />}

// Switch
// <Route path="/game/:name" component={GameMatcher} />
// <Route path="/game/exact" component={GameMatcher} />
// 이런 경우 두 컴포넌트 모두 렌더링됨 => 의도한 바와 다름
// <Switch> 컴포넌트 안에 있으면, 첫 번째로 일치하는 컴포넌트만 렌더링

// exact
// <Switch>
//  <Route path="/" component={GameMatcher} />
//  <Route path="/game/:name" component={GameMatcher} />
//  <Route path="/game/exact" component={GameMatcher} />
// </Switch>
// Switch를 해도 /game/exact로 접속하면 /로 라우팅되는 문제(잘 이해는 안 가지만...)
// <Route exact path="/" component={GameMatcher} />
// exact를 붙이면 정확하게 일치하지 않으면 넘어가는 처리를 할 수 있음

// react-router v6
// - 대대적인 변화
// - why? Reach Router와 통합하면서 변화가 생김 : react-training => remix-run 회사 이름 변경
// - remix? Next.js와 같은 react 프레임워크
// - remix를 만들면서 v5를 도입하려고 했으나 잘 안 되어서? Reach와 합친 v6를 도입
// - 공통점 : BrowserRouter
// - 차이점 : 찾는 방법? 1) github change log / migration guide / release tag 2) 공식 문서
// - Switch => Routes
// - exact 제거
// - component, render => element
// - Route 중첩 가능 => *JSX로 처리할 수 있어 더 직관적*
// - <Routes> <Route path="/game/:name" element={<GameMatcher />} /> </Routes> // Games.jsx
// - <Routes> <Route path="number-baseball" element={<NumberBaseBall />} /> <Routes> // GameMatcher.jsx : 내부 Route는 상대 경로임에 주의
// - 나머지 예외 처리 => path="*"
// - <Route path="*" element={<div>일치하는 게임이 없습니다.</div>} />
// - 404 페이지 용도
// - props 변경
// - history : history.push => useNavigate(), useNavigate(-1) 뒤로가기
// - match : useParams()

// 있던 props, attributes도 사라질 수 있기 때문에, 이러한 변화에 있어서 TS가 유리
// 에러 표시를 띄워주기 때문에
// JS는? Codemod라는 라이브러리로 가능, react-router v5에서 v6으로 올리는 스크립트?를 사람들이 만들 수 있어서 쉽게 바꿀 수 있는 장점
