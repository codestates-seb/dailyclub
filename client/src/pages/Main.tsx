import { useEffect, useState } from 'react';
import axios from 'axios';
import AreaFilter from 'components/AreaFilter';
import Layout from 'components/Layout';
import styled from 'styled-components';
import Bookmark from '../images/Bookmark.svg';
import Bookmarked from '../images/Bookmarked.svg';
import DownArrow from '../images/DownArrow.svg';
import LevelPercent from 'components/LevelPercent';
import ProgressBar from 'components/ProgressBar';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import BasicImg from '../images/BasicImg.jpg';
import Pagination from 'pagination/Pagination';
import { FilterParamsProp, ProgramDetailVal } from 'types/programs';
import { getToday } from 'utils/getToday';
import KindGuide from 'components/KindGuide';
import {
  filterActions,
  getDate,
  getLocation,
  getMinKind,
} from 'stores/filterSlice';

const WrapContainer = styled.div`
  margin-bottom: 5rem;
`;
const RecruitText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const IngContainer = styled.div`
  min-width: 600px;
`;
const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
`;
const DateInput = styled.input`
  all: unset;
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
  &::-webkit-calendar-picker-indicator {
    &:hover {
      cursor: pointer;
    }
  }
`;
const LevelRange = styled.div`
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
  cursor: pointer;
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
  cursor: default;
  padding: 0.8rem 1rem;
`;
const WrapLevelRangeInput = styled.input`
  all: unset;
  width: 100%;
  height: 3px;
  background: #ff5924;
  cursor: pointer;
`;
const RangeValue = styled.div`
  margin: 1rem 0;
  font-size: 1.1rem;
`;
const WrapLevelSpan = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
`;
const WrapLevelLabel = styled.div`
  font-weight: 600;
  color: #777777;
`;
const WrapLevelText = styled.div`
  color: #8f8f8f;
  font-size: 0.5rem;
`;
const ProgContainer = styled.div`
  min-height: 36rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 10px;
  margin-bottom: 3rem;
`;
const ProgItem = styled.div``;
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
  z-index: 1000000;
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
const FilterRowWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const KindRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const KindResetBtn = styled.button`
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 10px;
  margin-left: 40px;
  border: 1px solid lightGray;
  border-radius: 10px;
  &:hover {
    font-weight: 600;
    background-color: ${(props) => props.theme.lightGrey};
    transition: 0.15s ease-in-out;
  }
`;
const CheckStatusInput = styled.input`
  display: none;
`;
const CheckStatusInputContent = styled.div`
  input + label {
    text-align: center;
    padding: 5px 0 0 10px;
    color: gray;
    cursor: pointer;
  }
  input:checked + label {
    transition: 0.1s ease-in-out;
    font-weight: 800;
    color: black;
    cursor: pointer;
  }
`;

export default function Main() {
  const URL = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchKeyword = useAppSelector((state) => state.search.keyword);
  const [levelOpened, setLevelOpened] = useState(false);
  const [areaSelected, setAreaSelected] = useState('');
  const [rangeValue, setRangeValue] = useState('');
  const [programs, setPrograms] = useState<Array<ProgramDetailVal>>([]);
  const [pageList, setPageList] = useState();
  const [page, setPage] = useState<number>(1);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [bookmarkedId, setBookmarkedId] = useState<any>(null);
  const [paramsData, setParamsData] = useState<FilterParamsProp>({});

  /** 유저 전역상태 전체 - users, isLoggedIn, loading, error  */
  const { users, isLoggedIn } = useAppSelector((state) => state.userInfo);
  const getFilterLocation = useAppSelector(getLocation);
  const getFilterDate = useAppSelector(getDate);
  const getMinKinds = useAppSelector(getMinKind);
  // console.log('필터 전역정보: ', getFilterLocation, getFilterDate, getMinKinds); // 확인용

  const STATUS_LIST = [
    { id: 1, statusName: '모집중' },
    { id: 2, statusName: '마감임박' },
    { id: 3, statusName: '마감' },
  ];

  /** 필터 조회api - 키워드,지역,날짜,친절도*/
  useEffect(() => {
    setParamsData({ ...paramsData, location: getFilterLocation });
    setParamsData({ ...paramsData, programDate: getFilterDate });
    setParamsData({ ...paramsData, minKind: getMinKinds });
    // setParamsData({ ...paramsData, keyword: searchKeyword });
  }, []);
  // console.log('param :', paramsData && paramsData);

  useEffect(() => {
    const getProgramList = async () => {
      await axios
        .get(`${URL}/api/programs?page=${page}&size=12`, {
          params: {
            ...paramsData,
            keyword: searchKeyword,
            // location: getFilterLocation,
            // programDate: getFilterDate,
            // minKind: getMinKinds,
          },
        })
        .then(({ data }) => {
          // console.log(data?.data);
          setPrograms(data?.data?.reverse());
          setPageList(data?.pageInfo);
        })
        .catch((err) => console.log(err.message));
    };
    getProgramList();
  }, [searchKeyword, areaSelected, bookmarked, paramsData, page]);

  const handleBookedToggle = async (id: number, bookmarkId: number) => {
    if (bookmarkId === null) {
      setBookmarked(false);
      setBookmarkedId(null);
    } else {
      setBookmarked(true);
      setBookmarkedId(bookmarkId);
    }
    if (bookmarked === false && bookmarkedId === null) {
      await axios
        .post(`${URL}/api/bookmarks`, { programId: id })
        .then(({ data }) => {
          setBookmarkedId(data.id);
          // console.log('북마크 등록 :', data);
        });
    }
    if (bookmarked === true && bookmarkedId && bookmarkId) {
      await axios.delete(`${URL}/api/bookmarks/${bookmarkId}`).then(() => {
        setBookmarkedId(null);
        // console.log('북마크 삭제', bookmarked, bookmarkedId);
      });
    }
    setBookmarked(!bookmarked);
  };

  const handleResetKindVal = () => {
    const { minKind, ...rest } = paramsData;
    setParamsData({
      ...rest,
    });
    setRangeValue('');
    dispatch(filterActions.setMinKind(''));
  };

  const handleStatusChecked = (target: any, el: any) => {
    const checkStatus = document.getElementsByName('OnlyOneCheckedStatus');
    if (checkStatus) {
      checkStatus.forEach((item: any) => {
        item.checked = false;
      });
      target.checked = true;
      setParamsData({
        ...paramsData,
        programStatus: el.statusName,
      });
    }
  };

  return (
    <Layout>
      <WrapContainer>
        <IngContainer>
          <RecruitText>모집 중인 프로그램 / 모임</RecruitText>
          <FilterContainer>
            <FilterRowWrapper>
              <AreaFilter
                setAreaSelected={setAreaSelected}
                setParamsData={setParamsData}
                paramsData={paramsData}
              />
              <DateInput
                type="text"
                placeholder="날짜 선택"
                aria-required="true"
                onBlur={(e) => (e.target.type = 'text')}
                // defaultValue={getFilterDate ? getFilterDate : null}
                onChange={(e) => {
                  // dispatch(filterActions.setDate(e.target.value));
                  setParamsData({ ...paramsData, programDate: e.target.value });
                }}
                onFocus={(e) => (e.target.type = 'date')}
                min={getToday()}
                max="2032-12-31"
              />
              <LevelRange onClick={() => setLevelOpened(!levelOpened)}>
                친절도 &nbsp;{rangeValue}%
                {/* 친절도 &nbsp;{getMinKinds ? getMinKinds : rangeValue}% */}
                <KindGuide />
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
                      onChange={(e) => {
                        dispatch(filterActions.setMinKind(e.target.value));
                        setRangeValue(e.target.value);
                      }}
                      defaultValue={rangeValue}
                      // defaultValue={getMinKinds ? getMinKinds : rangeValue}
                      onMouseUp={() =>
                        setParamsData({ ...paramsData, minKind: rangeValue })
                      }
                    />
                    <KindRowWrapper>
                      <RangeValue>
                        {rangeValue}%
                        {/* {getMinKinds ? getMinKinds : rangeValue}% */}
                      </RangeValue>
                      <KindResetBtn onClick={handleResetKindVal}>
                        초기화
                      </KindResetBtn>
                    </KindRowWrapper>
                  </WrapLevel>
                ) : null}
              </LevelRange>
            </FilterRowWrapper>
            <FilterRowWrapper>
              {STATUS_LIST?.map((el) => (
                <CheckStatusInputContent key={el.id}>
                  <CheckStatusInput
                    type="checkbox"
                    id={String(el.id)}
                    value={el?.statusName}
                    name="OnlyOneCheckedStatus"
                    onClick={(e) => handleStatusChecked(e.target, el)}
                  />
                  <label htmlFor={String(el.id)}>&nbsp; {el?.statusName}</label>
                </CheckStatusInputContent>
              ))}
            </FilterRowWrapper>
          </FilterContainer>
          <ProgContainer>
            {programs &&
              programs?.map((el: any) => (
                <ProgItem key={el.id}>
                  <ProgBanner>
                    <Link to={`/programs/${el.id}`} key={el.id}>
                      <ProgRecruitment
                        style={{
                          backgroundColor: `${
                            el.programStatus === '모집중'
                              ? '#38D9A9'
                              : null || el.programStatus === '마감임박'
                              ? '#d22a2a'
                              : null || el.programStatus === '마감'
                              ? 'darkGray'
                              : null
                          }`,
                        }}
                      >
                        {el?.programStatus}
                      </ProgRecruitment>
                      <img
                        src={
                          el?.programImages.length === 0
                            ? BasicImg
                            : `data:${el.programImages[0].contentType};base64,${el?.programImages[0].bytes}`
                        }
                        style={{
                          height: '180px',
                          width: '100%',
                          borderRadius: '5px',
                          objectFit: 'cover',
                        }}
                        alt="program Image"
                        loading="lazy"
                      />
                    </Link>
                    <ProgBookmark
                      onClick={() => {
                        isLoggedIn === false
                          ? navigate('/login')
                          : handleBookedToggle(el.id, el.bookmarkId);
                      }}
                    >
                      {el.bookmarkId !== null ? (
                        <img src={Bookmarked} alt="bookmarked" />
                      ) : (
                        <img src={Bookmark} alt="bookmark" />
                      )}
                    </ProgBookmark>
                  </ProgBanner>
                  <Link to={`/programs/${el.id}`} key={el.id}>
                    <ProgTitle>
                      [{el.location}]{' '}
                      {el?.title?.length > 16
                        ? el.title.slice(0, 16) + '...'
                        : el?.title}
                    </ProgTitle>
                    <LevelPercent percent={el.minKind} />
                    <ProgProgressBar>
                      <ProgressBar
                        currentPerson={el.numOfApplicants}
                        totalPerson={el.numOfRecruits}
                      />
                    </ProgProgressBar>
                    <ProgWrapper>
                      <ProgPerson>
                        모집인원 {el.numOfApplicants} / {el.numOfRecruits}
                      </ProgPerson>
                      <ProgDate>
                        {el?.programDate === getToday()
                          ? '오늘 마감'
                          : Math.floor(
                              (+new Date(el.programDate) - +new Date()) /
                                (1000 * 60 * 60 * 24)
                            ) +
                            1 +
                            '일 남음'}
                      </ProgDate>
                    </ProgWrapper>
                  </Link>
                </ProgItem>
              ))}
          </ProgContainer>
          <Pagination list={pageList} page={page} setPage={setPage} />
        </IngContainer>
      </WrapContainer>
    </Layout>
  );
}
