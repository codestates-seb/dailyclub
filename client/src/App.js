import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import { GlobalStyles } from "./styles";

function App() {
  return (
    <div>
      <ThemeProvider
        theme={{
          lightGrey: "#e2e6e8",
          accent: "#38d9a9",
        }}
      >
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
