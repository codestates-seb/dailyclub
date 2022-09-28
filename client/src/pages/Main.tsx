import { useEffect, useState } from 'react';
import axios from 'axios';
import AreaFilter from 'components/AreaFilter';
import Layout from 'components/Layout';
import styled from 'styled-components';
import Bookmark from '../images/Bookmark.svg';
import QuestionMark from '../images/QuestionMark.svg';
import DownArrow from '../images/DownArrow.svg';
import LevelPercent from 'components/LevelPercent';
import ProgressBar from 'components/ProgressBar';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'stores/hooks';
import { getisLoggedId, getUserData, getUserError } from 'stores/userInfoSlice';

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
  programStatus: string;
  title: string;
  text: string;
  programImages?: any; // 추가예정
  minKind: number;
  currentPerson: number; // api엔 없음
  numOfRecruits: number;
  location: string;
  programDate: string;
  bookmarkId?: number | null;
  writer: string; // 수정
}
export default function Main() {
  const URL = process.env.REACT_APP_DEV_URL;

  const searchKeyword = useAppSelector((state) => state.search.keyword);
  const [levelOpened, setLevelOpened] = useState(false);
  const [areaSelected, setAreaSelected] = useState('');
  const [rangeValue, setRangeValue] = useState('');
  const [dateSelected, setDateSelected] = useState('');
  const [programs, setPrograms] = useState<Array<Object>>([]);
  // console.log(searchKeyword); // input값 전역상태에서 가져온거 확인용

  /** 유저 전역상태 전체 - users, isLoggedId, loading, error  */
  const loginUserInfo = useAppSelector((state) => state.userInfo);
  // console.log('유저 전역정보: ', loginUserInfo ?? loginUserInfo);  // 확인용

  /** 유저 전역상태 1개씩 - isLoggedId, users, error */
  const isLoggedId = useAppSelector(getisLoggedId); // 로그인여부
  const userData = useAppSelector(getUserData); // 유저정보
  const userError = useAppSelector(getUserError); // 에러내용
  // console.log('유저 전역상태: ', isLoggedId, userData, userError); // 확인 후 주석해제하면 됩니다

  /** 필터 조회api - 키워드,지역,날짜,친절도*/
  useEffect(() => {
    const getProgramList = async () => {
      await axios
        .get(`${URL}/api/programs?page=1&size=10`)
        // .get(
        //   `${URL}/api/programs?page=1&size=10
        // &keyword=${searchKeyword}&location=${areaSelected}&minKind=${rangeValue}&programDate=${dateSelected}&programStatus=POSSIBLE`
        // )
        .then(({ data }) => {
          // console.log(data);
          setPrograms(data?.data);
        })
        .catch((err) => console.log(err.message));
    };
    getProgramList();
  }, []);

  const progFilterProps = {
    keyword: '',
    location: areaSelected,
    programDate: dateSelected,
    levelRange: rangeValue, // api문서엔 없음
  };
  // console.log(progFilterProps); // 필터조회api 보낼때 객체

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
            {programs &&
              programs?.map((el: any) => (
                <Link to={`/programs/${el.id}`} key={el.id}>
                  <ProgItem>
                    <ProgBanner>
                      <ProgRecruitment
                        style={{
                          backgroundColor: `${
                            el.programStatus === '모집중'
                              ? '#38D9A9'
                              : null || el.programStatus === '마감임박'
                              ? '#d22a2a'
                              : null || el.programStatus === '모집종료'
                              ? 'darkGray'
                              : null
                          }`,
                        }}
                      >
                        {el?.programStatus}
                      </ProgRecruitment>
                      <ProgImg>사진</ProgImg>
                      <ProgBookmark>
                        <img src={Bookmark} alt="bookmark" />
                      </ProgBookmark>
                    </ProgBanner>
                    <ProgTitle>
                      [{el.location}] {el.title.slice(0, 16)}...
                    </ProgTitle>
                    <LevelPercent percent={el.minKind} />
                    <ProgProgressBar>
                      <ProgressBar
                        currentPerson={el.numOfRecruits}
                        totalPerson={el.numOfRecruits}
                      />
                    </ProgProgressBar>
                    <ProgWrapper>
                      <ProgPerson>
                        모집인원 {el.numOfRecruits} / {el.numOfRecruits}
                      </ProgPerson>
                      <ProgDate>
                        {Math.floor(
                          (+new Date(el.programDate) - +new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}
                        일 남음
                      </ProgDate>
                    </ProgWrapper>
                  </ProgItem>
                </Link>
              ))}
          </ProgContainer>
        </IngContainer>
        <DoneContainer>
          <RecruitText>모집 마감된 모임</RecruitText>
          <ProgContainer>
            {programs &&
              programs?.map((el: any) => (
                <ProgItem key={el.id}>
                  <ProgBanner>
                    <ProgRecruitment>모집종료</ProgRecruitment>
                    <ProgImg>사진</ProgImg>
                    <ProgBookmark>
                      <img src={Bookmark} alt="bookmark" />
                    </ProgBookmark>
                  </ProgBanner>
                  <ProgTitle>
                    [{el.location}] {el.title.slice(0, 16)}...
                  </ProgTitle>
                  <LevelPercent percent={el.minKind} />
                  <ProgProgressBar>
                    <ProgressBar
                      currentPerson={el.numOfRecruits}
                      totalPerson={el.numOfRecruits}
                    />
                  </ProgProgressBar>
                  <ProgWrapper>
                    <ProgPerson>
                      모집인원 {el.numOfRecruits} / {el.numOfRecruits}
                    </ProgPerson>
                    <ProgDate>
                      {Math.floor(
                        (+new Date(el.programDate) - +new Date()) /
                          (1000 * 60 * 60 * 24)
                      )}
                      일 남음
                    </ProgDate>
                  </ProgWrapper>
                </ProgItem>
              ))}
          </ProgContainer>
        </DoneContainer>
      </WrapContainer>
    </Layout>
  );
}
