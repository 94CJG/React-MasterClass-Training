import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";


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
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleDark = () => setIsDark(current => !current);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router  isDark={isDark} toggleDark={toggleDark} />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>{" "}
    </>
  );
}
export default App;
/** 
 * App (isDark, modifierFn)

-> Router -> Coins (modifier)
-> Router -> Coin -> Chart (isDark)
global state는 어플리케이션이 무언가를 인지해야 할 때 사용.
global state는 어플리케이션이 특정 value에 접근해야 할 때 사용.
ㄴ component가 어디에 있던지, 누가 접근하고자 하는지에 상관없이!

isDark: App -> Router -> Coin -> Chart

Header -> (isDark) <- Chart
*/