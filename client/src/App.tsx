import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import { GlobalStyles } from './styles';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ProgCreate from 'pages/ProgCreate';
import MyPage from 'pages/MyPage';

const App: React.FC = () => {
  return (
    <div>
      <ThemeProvider
        theme={{
          lightGrey: '#e2e6e8',
          accent: '#38d9a9',
        }}
      >
        <GlobalStyles />
        <BrowserRouter>
          <Header isLoggedIn={false} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createprogram" element={<ProgCreate />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
