import AreaFilter from 'components/AreaFilter';
import Layout from 'components/Layout';
import styled from 'styled-components';
import Bookmark from '../images/Bookmark.svg';
import QuestionMark from '../images/QuestionMark.svg';
import DownArrow from '../images/DownArrow.svg';
import LevelPercent from 'components/LevelPercent';
import { useState } from 'react';
import ProgressBar from 'components/ProgressBar';

const WrapContainer = styled.div`
  margin-bottom: 5rem;
`;
const RecruitText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const IngContainer = styled.div``;
const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const DateInput = styled.input`
  height: 30px;
  width: 115px;
  border: 0.7px solid lightGrey;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.3rem;
  padding: 0 0.4rem;
  &::placeholder {
    color: black;
  }
`;
const LevelRange = styled.button`
  position: relative;
  height: 30px;
  width: 130px;
  border: 0.7px solid lightGrey;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.3rem;
  padding: 0 0.4rem;
`;
const WrapLevel = styled.div`
  position: absolute;
  left: 0px;
  top: 30px;
  z-index: 2;
  width: 270px;
  height: 110px;
  border: 1px solid lightGrey;
  border-radius: 5px;
  background-color: white;
`;
const WrapLevelRangeInput = styled.input`
  width: 80%;
  height: 3px;
  background: #ff5924;
`;
const RangeValue = styled.div`
  margin: 1rem;
  font-size: 1.1rem;
`;
const WrapLevelSpan = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
`;
const WrapLevelLabel = styled.div`
  font-weight: 600;
  color: #777777;
`;
const LevelHoverText = styled.div``;
const WrapLevelText = styled.div`
  color: #8f8f8f;
  font-size: 0.5rem;
`;
const ProgContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const ProgItem = styled.div`
  margin: 0.7rem 0.7rem 0.7rem 0;
`;
const ProgImg = styled.div`
  background-color: gray;
  height: 130px;
  border-radius: 5px;
`;
const ProgBanner = styled.div`
  position: relative;
`;
const ProgRecruitment = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  width: 4rem;
  height: 1.4rem;
  background-color: darkGray;
`;
const ProgBookmark = styled.button`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  border: none;
  background-color: inherit;
`;
const ProgTitle = styled.div`
  font-weight: 600;
  margin: 0.7rem 0;
`;
const ProgProgressBar = styled.div``;
const ProgWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.5rem;
  margin: 0.5rem 0;
  color: gray;
`;
const ProgPerson = styled.div``;
const ProgDate = styled.div``;

const DoneContainer = styled.div`
  padding: 7rem 0;
`;

interface ProgProps {
  id: number;
  numStatus: string;
  title: string;
  booked: boolean;
  percent: number;
  currentPerson: number;
  totalPerson: number;
  date: string;
}
export default function Main() {
  const [levelOpened, setLevelOpened] = useState(false);
  const [areaSelected, setAreaSelected] = useState('');
  const [rangeValue, setRangeValue] = useState('');
  const [dateSelected, setDateSelected] = useState('');

  const progFilterProps = {
    location: areaSelected,
    date: dateSelected,
    levelRange: rangeValue,
  };
  // console.log(progFilterProps); // 필터조회api 보낼때 객체 {location: '경기/강원', date: '2022-09-07', levelRange: '12'}

  const programList: ProgProps[] = [
    {
      id: 1,
      numStatus: '모집중',
      title: '[서울] 아이유 콘서트 동행 구합니다...',
      booked: false,
      percent: 100,
      currentPerson: 4,
      totalPerson: 8,
      date: '11',
    },
    {
      id: 2,
      numStatus: '마감임박',
      title: '[영국] 손흥민 직관 동행 구합니다...',
      booked: false,
      percent: 20,
      currentPerson: 8,
      totalPerson: 10,
      date: '11',
    },
    {
      id: 3,
      numStatus: '모집종료',
      title: '[대구] 대구 풋살구장 사람구합니다...',
      booked: false,
      percent: 80,
      currentPerson: 3,
      totalPerson: 11,
      date: '11',
    },
    {
      id: 4,
      numStatus: '모집중',
      title: '[서울] 홍대 라멘투어 마제소바,돈...',
      booked: false,
      percent: 70,
      currentPerson: 4,
      totalPerson: 10,
      date: '11',
    },
    {
      id: 5,
      numStatus: '모집중',
      title: '[대구] 대구 풋살구장 사람구합니다...',
      booked: false,
      percent: 69,
      currentPerson: 4,
      totalPerson: 10,
      date: '11',
    },
    {
      id: 6,
      numStatus: '모집중',
      title: '[대구] 대구 풋살구장 사람구합니다...',
      booked: false,
      percent: 50,
      currentPerson: 4,
      totalPerson: 10,
      date: '11',
    },
  ];

  return (
    <Layout>
      <WrapContainer>
        <IngContainer>
          <RecruitText>모집 중인 모임</RecruitText>
          <FilterContainer>
            <AreaFilter setAreaSelected={setAreaSelected} />
            <DateInput
              type="text"
              required
              placeholder="날짜 선택"
              aria-required="true"
              onBlur={(e) => (e.target.type = 'text')}
              onChange={(e) => setDateSelected(e.target.value)}
              onFocus={(e) => (e.target.type = 'date')}
            />
            <LevelRange onClick={() => setLevelOpened(!levelOpened)}>
              친절도 &nbsp;{rangeValue}%
              <img src={QuestionMark} alt="question mark" />
              <img src={DownArrow} alt="down arrow" />
              {levelOpened ? (
                <WrapLevel>
                  <WrapLevelSpan>
                    <WrapLevelLabel>친절도 범위</WrapLevelLabel>
                    <WrapLevelText>
                      * 최소 친절 % 범위를 선택해보세요.
                    </WrapLevelText>
                  </WrapLevelSpan>
                  <WrapLevelRangeInput
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    onChange={(e) => setRangeValue(e.target.value)}
                  />
                  <RangeValue>{rangeValue}%</RangeValue>
                </WrapLevel>
              ) : null}
            </LevelRange>
          </FilterContainer>
          <ProgContainer>
            {programList?.map((el: ProgProps) => (
              <ProgItem key={el.id}>
                <ProgBanner>
                  <ProgRecruitment
                    style={{
                      backgroundColor: `${
                        el.numStatus === '모집중'
                          ? '#38D9A9'
                          : null || el.numStatus === '마감임박'
                          ? '#d22a2a'
                          : null || el.numStatus === '모집종료'
                          ? 'darkGray'
                          : null
                      }`,
                    }}
                  >
                    {el.numStatus}
                  </ProgRecruitment>
                  <ProgImg>사진</ProgImg>
                  <ProgBookmark>
                    <img src={Bookmark} alt="bookmark" />
                  </ProgBookmark>
                </ProgBanner>
                <ProgTitle>{el.title}</ProgTitle>
                <LevelPercent percent={el?.percent} />
                <ProgProgressBar>
                  <ProgressBar
                    currentPerson={el.currentPerson}
                    totalPerson={el.totalPerson}
                  />
                </ProgProgressBar>
                <ProgWrapper>
                  <ProgPerson>
                    모집인원 {el.currentPerson} / {el.totalPerson}
                  </ProgPerson>
                  <ProgDate>{el.date}일 남음</ProgDate>
                </ProgWrapper>
              </ProgItem>
            ))}
          </ProgContainer>
        </IngContainer>
        <DoneContainer>
          <RecruitText>모집 마감된 모임</RecruitText>
          <ProgContainer>
            {programList?.map((el: ProgProps) => (
              <ProgItem key={el.id}>
                <ProgBanner>
                  <ProgRecruitment>모집종료</ProgRecruitment>
                  <ProgImg>사진</ProgImg>
                  <ProgBookmark>
                    <img src={Bookmark} alt="bookmark" />
                  </ProgBookmark>
                </ProgBanner>
                <ProgTitle>{el.title}</ProgTitle>
                <LevelPercent percent={el?.percent} />
                <ProgProgressBar>
                  <ProgressBar
                    currentPerson={el.totalPerson}
                    totalPerson={el.totalPerson}
                  />
                </ProgProgressBar>
                <ProgWrapper>
                  <ProgPerson>
                    모집인원 {el.totalPerson} / {el.totalPerson}
                  </ProgPerson>
                  <ProgDate>{el.date}일 남음</ProgDate>
                </ProgWrapper>
              </ProgItem>
            ))}
          </ProgContainer>
        </DoneContainer>
      </WrapContainer>
    </Layout>
  );
}
