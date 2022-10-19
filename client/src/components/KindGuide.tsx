import { useState } from 'react';
import styled from 'styled-components';
import QuestionMark from '../images/QuestionMark.svg';

const GuideParent = styled.div`
  position: relative;
`;
const KindGuideContainer = styled.div`
  position: absolute;
  bottom: 35px;
  left: -10px;
  width: 270px;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 15%);
  background-color: white;
  z-index: 8;
  font-size: 12px;
  text-align: start;
`;
const KindGuideTitle = styled.div`
  font-weight: 800;
  margin-bottom: 10px;
`;
const KindTriangle = styled.div`
  display: block;
  z-index: 10;
  position: absolute;
  bottom: 25px;
  left: -7px;
  border-color: #fff transparent;
  border-style: solid;
  border-width: 20px 15px 0 15px;
`;

export default function KindGuide() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <GuideParent>
      <div
        onMouseEnter={() => setGuideOpen(true)}
        onMouseLeave={() => setGuideOpen(false)}
      >
        <img src={QuestionMark} alt="question mark" />
      </div>
      {guideOpen ? (
        <>
          <KindTriangle />
          <KindGuideContainer>
            <KindGuideTitle>친절도</KindGuideTitle>
            평가된 친절도로 모집이 가능한 여부가 달라져요. 신청 가능한 퍼센트를
            설정해보세요!
          </KindGuideContainer>
        </>
      ) : null}
    </GuideParent>
  );
}
