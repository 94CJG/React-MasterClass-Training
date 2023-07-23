import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components'; 
import App from './App';
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}> 
        <App /> {/** ThemProvider 안에 있는 모든 것이 theme으로 접근 할 수 있다는 것을 의미한다.*/}
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);


