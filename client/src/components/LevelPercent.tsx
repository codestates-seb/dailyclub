import styled from 'styled-components';
import LevelTop from '../images/LevelTop.svg';
import LevelMiddle from '../images/LevelMiddle.svg';
import LevelBottom from '../images/LevelBottom.svg';

const LavelTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  padding: 0.2rem 0.4rem;
  margin-bottom: 0.5rem;
  font-size: 0.5rem;
  font-weight: 600;
  border-radius: 10px;

  /* 친절도 상 70-100 */
  background-color: rgb(56, 217, 169, 0.2);
  color: #27cf9d;
`;
/* 친절도 중 40-70 */
const LavelMiddle = styled(LavelTop)`
  background-color: rgb(255, 233, 155, 0.4);
  color: #fc6917;
`;
/* 친절도 하 0-40 */
const LavelBottom = styled(LavelTop)`
  background-color: rgb(237, 80, 70, 0.2);
  color: #ed5046;
`;

const LevelImg = styled.img`
  margin-right: 0.2rem;
  display: flex;
  justify-content: center;
`;

interface LevelProps {
  percent: number;
}
/** styled-components 안에서 color속성안에서 props 쓰고 싶었는데 에러나서 못함  */

export default function LevelPercent({ percent }: LevelProps) {
  return (
    <>
      {percent >= 70 ? (
        <LavelTop>
          <LevelImg src={LevelTop} alt="level top" />
          친절 {percent}%
        </LavelTop>
      ) : null}
      {percent >= 41 && percent <= 69 ? (
        <LavelMiddle>
          <LevelImg src={LevelMiddle} alt="level middle" />
          친절 {percent}%
        </LavelMiddle>
      ) : null}
      {percent <= 40 ? (
        <LavelBottom>
          <LevelImg src={LevelBottom} alt="level bottom" /> 친절 {percent}%
        </LavelBottom>
      ) : null}
    </>
  );
}
