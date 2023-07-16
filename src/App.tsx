import { createGlobalStyle } from "styled-components";
import Router from "./Router";


const GlobalStyle = createGlobalStyle` //오브젝트를 전역 스코프에 CSS값 적용한다.
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400&display=swap');
  body
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }

    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    * {
      box-sizing:border-box;
    }
    body {
      font-family: 'Source Sans Pro', sans-serif;
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
    }

    a {
      text-decoration: none;
      color: inherit;
    }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
/**
 * <> :  Fragment 라고 부르며, 일종의 유령 컴포넌트이다.
 * ㄴ 부모 없이 서로 붙어 있는 많은 것들을 리턴할 수 있게 해준다.
*/