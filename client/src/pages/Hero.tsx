import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BannerImg from '../images/BannerImg.svg';
import IntroImg1 from '../images/IntroImg1.svg';
import IntroImg2 from '../images/IntroImg2.svg';
import IntroImg3 from '../images/IntroImg3.svg';

const HeroContainer = styled.div`
  position: relative;
  top: 60px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainBannerWrap = styled.div`
  height: 45%;
  width: 100%;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

const IntroBanner = styled.div`
  font-size: 25px;
  font-weight: lighter;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const DailyClub = styled.h2`
  font-size: 25px;
  height: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProgramsBtn = styled.button`
  background-color: #ff5100;
  color: white;
  width: 10rem;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 3rem;
`;

const MainBannerImg = styled.img`
  width: 60%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IntroService = styled.div`
  width: 60%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

const IntroWrap = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
`;

const IntroTextGroup = styled.div`
  height: 100%;
  width: 50%;
`;

const IntroH2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const IntroText = styled.div`
  font-size: 16px;
  font-weight: lighter;
  margin-bottom: 10px;
`;

const IntroTextGroupEnd = styled(IntroTextGroup)`
  padding-left: 3rem;
`;

const IntroImg = styled.img`
  width: 50%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

function Hero() {
  return (
    <HeroContainer>
      <MainBannerWrap>
        <IntroBanner>가볍게 즐기는 다양한 모임</IntroBanner>
        <DailyClub>데일리 클럽</DailyClub>
        <Link to="/programs">
          <ProgramsBtn>모임 보러가기</ProgramsBtn>
        </Link>
        <MainBannerImg src={BannerImg}></MainBannerImg>
      </MainBannerWrap>
      <IntroService>
        <IntroWrap>
          <IntroTextGroup>
            <IntroH2>누구나 만들 수 있는 모임</IntroH2>
            <IntroText>
              이용자 누구나 모임을 개설하고 관리할 수 있어요.
            </IntroText>
            <IntroText>간편하게 모임을 업로드 해보세요!</IntroText>
          </IntroTextGroup>
          <IntroImg src={IntroImg1}></IntroImg>
        </IntroWrap>
        <IntroWrap>
          <IntroImg src={IntroImg2}></IntroImg>
          <IntroTextGroupEnd>
            <IntroH2>친절도 기능</IntroH2>
            <IntroText>리뷰 기능을 통해 평가된 친절도를 모임 생성시</IntroText>
            <IntroText>
              {' '}
              반영할 수 있어요. 건전한 모임 문화를 만들어요!
            </IntroText>
          </IntroTextGroupEnd>
        </IntroWrap>
        <IntroWrap>
          <IntroTextGroup>
            <IntroH2>메시지 연락</IntroH2>
            <IntroText>다이렉트 메시지 기능을 통해 다양한 모임의</IntroText>
            <IntroText>연락을 사이트에서 관리할 수 있어요.</IntroText>
          </IntroTextGroup>
          <IntroImg src={IntroImg3}></IntroImg>
        </IntroWrap>
      </IntroService>
    </HeroContainer>
  );
}

export default Hero;
