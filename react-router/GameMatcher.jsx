import React from "react";
import { withRouter } from "react-router-dom";

// cf> hooks인 경우 : props에 포함되어 있음
class GameMatcher extends React.Component {
  onClick() {
    this.props.history.goBack();
  }

  render() {
    // <Route />가 렌더링할 컴포넌트에 넣어주는 props(history, location, match)라고 생각하면 됨!
    console.log(this.props);

    // history : {length: 41, action: 'PUSH', location: {…}, createHref: ƒ, push: ƒ, …}
    // - 페이지 앞으로가기, 뒤로가기 내역, react history API에 대한 정보
    // - ***브라우저가 기본 제공하는 history API를 사용하면 안 됨, react-router가 제공하는 것을 사용해야 함***
    // - why? react-router가 임의로 눈속임 하고 있는 것이기 때문에, 기본 브라우저와 동작이 다름!
    // - 내부적으로는 react-router가 브라우저의 history API를 사용하고 있는 구조이기는 하지만
    // - 직접적으로 브라우저 history API를 사용하면 안 됨!
    // - e.g. history.pushState("", "", "/hello");
    // - 대신 react-router history API를 사용해야 react 안에서 제대로 사용할 수 있음
    // - e.g. this.props.history.pushState("", "", "/hello");

    // location : {pathname: '/game/index', search: '', hash: '', state: undefined, key: 'txvq4i'}
    // - react-router가 사용하는 가상 페이지 주소에 대한 정보
    // - query string : location.search에 포함
    // - e.g. /game/number-baseball?query=true&hello=world

    // match : {path: '/game/:name', url: '/game/index', isExact: true, params: {…}}
    // - **동적 주소 라우팅에 관한 정보를 저장**
    // - params에 react-router 해당 정보가 들어있음 => 분기 처리 기준
    // - useParams와 관련이 있는 듯?

    // staticContext : undefined

    // slice(1) : ? 문자 제거
    // 아래처럼 따로 파싱이 필요
    let urlParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlParams.get("query")); // true

    // if (this.props.match.params.name === "number-baseball")
    //   return <NumberBaseBall />;
    // else if (this.props.match.params.name === "rock-scissors-paper")
    //   return <RSP />;
    // else if (this.props.match.params.name === "lotto-generator")
    //   return <Lotto />;
    return <div>일치하는 게임이 없습니다.</div>;
  }
}

export default GameMatcher;
// cf> 만약 <Route />가 연결되지 않은 상태인데 props(history, location, match)를 사용하고 싶다?
// high order component : withRouter 이용
// export default withRouter(GameMatcher); // 이러면 props가 생성됨

// high order component => hooks로 대체 가능
// useRouter..?
