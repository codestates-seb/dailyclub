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
import NoticeList from 'pages/NoticeList';
import NoticeDetail from 'pages/NoticeDetail';
import NoticeCreate from 'pages/NoticeCreate';
import ProgDetail from 'pages/ProgDetail';
import ProgUpdate from 'pages/ProgUpdate';
import { theme } from 'theme';
import Hero from 'pages/Hero';
import ReviewCreate from 'pages/ReviewCreate';

const App: React.FC = () => {
  return (
    <div className="wrap">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/programs" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/programs/create" element={<ProgCreate />} />
            <Route path="/programs/:programId" element={<ProgDetail />} />
            <Route
              path="/programs/:programId/update"
              element={<ProgUpdate />}
            />
            <Route path="/users/:userId" element={<MyPage />} />
            <Route path="/notice" element={<NoticeList />} />
            <Route path="/notice/:noticeId" element={<NoticeDetail />} />
            <Route path="/notice/create" element={<NoticeCreate />} />
            <Route
              path="/programs/:programId/reviews/:applyId"
              element={<ReviewCreate />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
