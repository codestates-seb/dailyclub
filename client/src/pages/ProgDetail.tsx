import Layout from 'components/Layout';
import LevelPercent from 'components/LevelPercent';
import styled from 'styled-components';
import User from '../images/User.svg';
import Bookmark from '../images/BookmarkBtn.svg';
import Bookmarked from '../images/Bookmarked.svg';
import Calendar from '../images/Calendar.svg';
import Loc from '../images/Location.svg';
import Info from '../images/Info.svg';
import Msg from '../images/Message.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplyListVal, PaginationVal, ProgramDetailVal } from 'types/programs';
import BasicImg from '../images/BasicImg.jpg';
import Profile from '../images/Profile.svg';
import Pagination from 'pagination/Pagination';
import { useAppSelector } from 'stores/hooks';
import ApplyModal from 'components/ApplyModal';
import MessageModal from 'components/MessageModal';
import DeleteModal from 'components/DeleteModal';
import CancelModal from 'components/CancelModal';
import ProgressBar from 'components/ProgressBar';
import { getToday } from 'utils/getToday';
import { compareWithToday } from 'utils/compareWithToday';
import KindGuide from 'components/KindGuide';
import { useMediaQuery } from 'react-responsive';

const ProgPageDetail = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
  @media screen and (max-width: 767px) {
    width: 100%;
    min-width: 260px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const ProgDetailWrap = styled.div`
  position: relative;
  min-width: 520px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 20px;
  @media screen and (max-width: 767px) {
    min-width: 0;
  }
`;

const ProgDetailInfo = styled.div`
  min-width: 250px;
  width: 35%;
  margin-bottom: 10px;
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const ProgDetailImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const ProgTitleSection = styled.div`
  margin-top: 20px;
  color: #222;
  font-size: 30px;
  font-weight: 700;
  line-height: 34px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
    line-height: 25px;
  }
`;

const ProgTxtSection = styled.div`
  margin-top: 30px;
  height: 20rem;
  line-height: 25px;
`;

const ProgText = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-line;
  @media screen and (max-width: 767px) {
    font-size: 15px;
    line-height: 20px;
    font-weight: lighter;
  }
`;

const ProgMemberContent = styled.div`
  margin-top: 50px;
`;

const MemberSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;


const NoMember = styled.div`
  text-align: center;
  padding: 50px 0 25px 0;
`;

const ProglInfoWrap = styled.div`
  flex-direction: column;
  border: 1px solid #ddd;
  top: 74px;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 0 20px;
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    border: 0;
    padding: 0;
  }
`;

const ProgInfoText = styled.div`
  color: #7e7b7b;
  padding-top: 15px;
`;

const ProgPeople = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 0;
`;

const ProgDate = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 0;
`;

const ProgRegion = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 0;
`;

const ProgApply = styled.button`
  background-color: #ff5100;
  color: white;
  width: 80%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
`;

const ProgUpdateBtn = styled.button`
  background-color: #ff5100;
  color: white;
  width: 35%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
`;

const ProgDeleteBtn = styled.button`
  background-color: black;
  color: white;
  width: 35%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
`;

const ProgMessage = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 0;
`;

const LeaderInfo = styled.div`
  flex-direction: column;
  border: 1px solid #ddd;
  top: 74px;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 20px;
  margin-top: 10px;
`;

const ProfileNickname = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1rem;
`;

const SendMsg = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
`;

const SendMsgBtn = styled.button`
  width: 100%;
  border: 1px solid #efefef;
  padding: 15px;
  margin-top: 10px;
  flex-direction: row;
`;

const H2 = styled.h2`
  font-size: 24px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const H3 = styled.h3`
  margin-left: 10px;
  font-size: 18px;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
`;
const ProfileIntro = styled.div`
  font-weight: lighter;
  font-size: 15px;
  margin-bottom: 1rem;
`;

const MemItem = styled.div`
  margin: 0.7rem 0.7rem 0.7rem 0;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 15px;
`;
const MemItemWrap1 = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const MemItemWrap2 = styled.div`
  flex-direction: column;
`;

const MemName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

const MemIntro = styled.div`
  font-size: 15px;
  font-weight: lighter;
`;

const MemInfo = styled.div`
  margin-left: 10px;
`;

const ApplyDate = styled.div`
  margin-top: 10px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const BtnWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BookmarkBtn = styled.button`
  width: 15%;
  border: none;
`;
const KindWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const KindRowWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export default function ProgDetail() {
  const DEV_URL = process.env.REACT_APP_DEV_URL;
  const params = useParams();

  const [data, setData] = useState<ProgramDetailVal>();
  const [progImg, setProgImg] = useState<string>('');
  const [applyList, setApplyList] = useState<Array<ApplyListVal>>([]);
  const [detailBookmarked, setDetailBookmarked] = useState<boolean>(false);
  const [detailBookmarkId, setDetailBookmarkId] = useState<any>(null);
  const [writerImg, setWriterImg] = useState<string>('');

  const [pageList, setPageList] = useState<PaginationVal>();
  const [page, setPage] = useState<number>(1);

  //각 모달 Open 상태
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { userId } = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const applyMemberfilter = applyList.filter((el) => {
    return el.user.id === userId;
  });

  useEffect(() => {
    //프로그램 상세조회 api
    const getProgramDetail = async () => {
      await axios
        .get(`${DEV_URL}/api/programs/${params.programId}`)
        .then((res) => {
          setData(res.data);
          if (res.data.programImages.length === 0) {
            setProgImg(BasicImg);
          } else {
            setProgImg(
              `data:${res.data.programImages[0].contentType};base64,${res.data.programImages[0].bytes}`
            );
          }
          if (res.data?.bookmarkId === null) {
            setDetailBookmarked(false);
            setDetailBookmarkId(null);
          } else {
            setDetailBookmarked(true);
            setDetailBookmarkId(res.data?.bookmarkId);
          }
          if (res.data?.writer.userImages.length !== 0) {
            setWriterImg(
              `data:${res.data?.writer.userImages[0].contentType};base64,${res.data?.writer.userImages[0].bytes}`
            );
          }
        });
    };
    //신청한 멤버 조회
    const getApplyList = async () => {
      await axios
        .get(
          `${DEV_URL}/api/applies?page=${page}&size=4&programId=${params.programId}`
        )
        .then((res) => {
          setApplyList(res.data.data);
          setPageList(res.data.pageInfo);
        });
    };

    getProgramDetail();
    getApplyList();
  }, [page]);

  const handleBookmarkedToggle = async () => {
    setDetailBookmarked(!detailBookmarked);

    if (detailBookmarked === false && detailBookmarkId === null) {
      await axios
        .post(`${DEV_URL}/api/bookmarks`, { programId: data?.id })
        .then(({ data }) => {
          // console.log('북마크 등록', data);
          setDetailBookmarkId(data.id);
        });
    }
    if (detailBookmarked === true && detailBookmarkId) {
      await axios
        .delete(`${DEV_URL}/api/bookmarks/${detailBookmarkId}`)
        .then(() => {
          // console.log('북마크 삭제');
          setDetailBookmarkId(null);
        });
    }
  };

  const Mobile = ({ children }: { children?: any }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }: { children: any }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };

  return (
    <>
      <Layout>
        <ProgPageDetail>
          <Default>
            <ProgDetailWrap>
              <ProgDetailImg src={progImg}></ProgDetailImg>
              <ProgTitleSection>
                [{data?.location}]{data?.title}
              </ProgTitleSection>
              <ProgTxtSection>
                <ProgText>{data?.text}</ProgText>
              </ProgTxtSection>
              <ProgMemberContent>
              <H2>함께하는 멤버(신청자)</H2>
              {!applyList.length ? (
              <NoMember>신청자가 없습니다</NoMember>)
              : (
                <MemberSection>
                  {applyList?.map((el) => (
                    <MemItem key={el.id}>
                      <MemItemWrap1>
                        {el.user.userImages.length !== 0 ? (
                          <ProfileImg
                            src={
                              'data:' +
                              //@ts-ignore
                              el.user.userImages[0].contentType +
                              ';base64,' +
                              //@ts-ignore
                              el.user.userImages[0].bytes
                            }
                            alt="profile"
                            style={{ height: 40, width: 40, borderRadius: 50 }}
                            onClick={() => {
                              navigate(`/users/${el.user.id}`);
                            }}
                          />
                        ) : (
                          <ProfileImg
                            src={Profile}
                            alt="profile"
                            style={{ height: 40, width: 40 }}
                            onClick={() => {
                              navigate(`/users/${el.user.id}`);
                            }}
                          />
                        )}
                        <MemInfo>
                          <MemName
                            onClick={() => {
                              navigate(el.user.id);
                            }}
                          >
                            {el.user.nickname}
                          </MemName>
                          <MemIntro>{el.user.introduction}</MemIntro>
                        </MemInfo>
                      </MemItemWrap1>
                      <MemItemWrap2>
                        <KindWrap>
                          <KindRowWrap>
                            친절도 &nbsp;
                            <KindGuide />
                          </KindRowWrap>
                          <LevelPercent percent={el.user.kind}></LevelPercent>
                        </KindWrap>
                        <ProgressBar
                          currentPerson={el.user.kind}
                          totalPerson={100}
                        />
                        <ApplyDate>{el.createdTime} 신청</ApplyDate>
                      </MemItemWrap2>
                    </MemItem>
                  ))}
                </MemberSection>
              )}
                {applyList ? (
                  <Pagination list={pageList} page={page} setPage={setPage} />
                ) : null}
              </ProgMemberContent>
            </ProgDetailWrap>
            <ProgDetailInfo>
              <H2>모집정보</H2>
              <ProglInfoWrap>
                <ProgPeople>
                  <Icon>
                    <img
                      src={User}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />

                    <H3>모집인원</H3>
                  </Icon>
                  <ProgInfoText>
                    {pageList?.totalElements} / {data?.numOfRecruits}
                  </ProgInfoText>
                </ProgPeople>
                <ProgDate>
                  <Icon>
                    <img
                      src={Calendar}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />

                    <H3>진행날짜</H3>
                  </Icon>
                  <ProgInfoText>{data?.programDate}</ProgInfoText>
                </ProgDate>
                <ProgRegion>
                  <Icon>
                    <img
                      src={Loc}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />
                    <H3>모집지역</H3>
                  </Icon>
                  <ProgInfoText>{data?.location}</ProgInfoText>
                </ProgRegion>
                <ProgMessage>
                  <Icon>
                    <img
                      src={Info}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />
                    <H3>최소 친절도</H3>
                  </Icon>
                  <ProgInfoText>{data?.minKind}% 이상</ProgInfoText>
                </ProgMessage>
                <BtnWrap>
                  {userId === data?.writer.id ? (
                    <>
                      <BookmarkBtn onClick={handleBookmarkedToggle}>
                        <Icon>
                          {detailBookmarked ? (
                            <img
                              src={Bookmarked}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          ) : (
                            <img
                              src={Bookmark}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          )}
                        </Icon>
                      </BookmarkBtn>
                      {applyList.length !== 0 &&
                      data?.programDate === getToday() ? (
                        <ProgUpdateBtn
                          onClick={() => {
                            alert(
                              '함께하는 멤버가 있으므로 당일 수정이 불가합니다!'
                            );
                          }}
                        >
                          수정하기
                        </ProgUpdateBtn>
                      ) : (
                        <ProgUpdateBtn
                          onClick={() => {
                            navigate(`/programs/${params.programId}/update`);
                          }}
                        >
                          수정하기
                        </ProgUpdateBtn>
                      )}
                      {applyList.length !== 0 &&
                      data?.programDate === getToday() ? (
                        <ProgDeleteBtn
                          onClick={() => {
                            alert(
                              '함께하는 멤버가 있으므로 당일 삭제가 불가합니다!'
                            );
                          }}
                        >
                          삭제하기
                        </ProgDeleteBtn>
                      ) : (
                        <ProgDeleteBtn
                          onClick={() => {
                            setIsDeleteOpen(true);
                          }}
                        >
                          삭제하기
                        </ProgDeleteBtn>
                      )}
                    </>
                  ) : compareWithToday(data?.programDate as string) ===
                    '모임종료' ? (
                    <>
                      <BookmarkBtn onClick={handleBookmarkedToggle}>
                        <Icon>
                          {detailBookmarked ? (
                            <img
                              src={Bookmarked}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          ) : (
                            <img
                              src={Bookmark}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          )}
                        </Icon>
                      </BookmarkBtn>
                      <ProgApply
                        style={{
                          backgroundColor: 'rgba(81, 81, 81, 0.469)',
                        }}
                      >
                        종료된 모임입니다
                      </ProgApply>
                    </>
                  ) : applyMemberfilter.length !== 0 ? (
                    <>
                      <BookmarkBtn onClick={handleBookmarkedToggle}>
                        <Icon>
                          {detailBookmarked ? (
                            <img
                              src={Bookmarked}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          ) : (
                            <img
                              src={Bookmark}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          )}
                        </Icon>
                      </BookmarkBtn>

                      {data?.programDate !== getToday() ? (
                        <ProgApply
                          onClick={() => {
                            setIsCancelOpen(true);
                          }}
                        >
                          취소하기
                        </ProgApply>
                      ) : (
                        <ProgApply
                          onClick={() => {
                            alert('프로그램 당일 신청 취소가 불가합니다!');
                          }}
                        >
                          취소하기
                        </ProgApply>
                      )}
                    </>
                  ) : (
                    <>
                      <BookmarkBtn
                        onClick={() => {
                          userId === undefined || null
                            ? navigate('/login')
                            : handleBookmarkedToggle();
                        }}
                      >
                        <Icon>
                          {detailBookmarked ? (
                            <img
                              src={Bookmarked}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          ) : (
                            <img
                              src={Bookmark}
                              alt="logo"
                              style={{ height: 25, width: 25 }}
                            />
                          )}
                        </Icon>
                      </BookmarkBtn>

                      {data?.numOfRecruits === applyList.length ? (
                        <ProgApply
                          onClick={() => {
                            userId === undefined || null
                              ? navigate('/login')
                              : alert('신청인원이 가득 찼습니다!');
                          }}
                        >
                          신청하기
                        </ProgApply>
                      ) : (
                        <ProgApply
                          onClick={() => {
                            userId === undefined || null
                              ? navigate('/login')
                              : setIsApplyOpen(true);
                          }}
                        >
                          신청하기
                        </ProgApply>
                      )}
                    </>
                  )}
                </BtnWrap>
              </ProglInfoWrap>
              <H2>모임장 정보</H2>
              <LeaderInfo>
                <MemName
                  onClick={() => {
                    navigate(`/users/${data?.writer.id}`);
                  }}
                >
                  {writerImg ? (
                    <ProfileImg
                      src={writerImg}
                      alt="profile"
                      style={{ height: 40, width: 40, borderRadius: 50 }}
                    />
                  ) : (
                    <ProfileImg
                      src={Profile}
                      alt="profile"
                      style={{ height: 40, width: 40 }}
                    />
                  )}
                  <MemInfo>
                    <ProfileNickname>{data?.writer.nickname}</ProfileNickname>
                    <ProfileIntro>{data?.writer.introduction}</ProfileIntro>
                  </MemInfo>
                </MemName>
                <KindWrap>
                  <KindRowWrap>
                    친절도 &nbsp;
                    <KindGuide />
                  </KindRowWrap>
                  <LevelPercent
                    //@ts-ignore
                    percent={data?.writer.kind}
                  ></LevelPercent>
                </KindWrap>
                <ProgressBar
                  //@ts-ignore
                  currentPerson={data?.writer.kind}
                  totalPerson={100}
                />
                <SendMsgBtn
                  onClick={() => {
                    userId === undefined || null
                      ? navigate('/login')
                      : setIsMessageOpen(true);
                  }}
                >
                  <SendMsg>
                    <img
                      src={Msg}
                      alt="logo"
                      style={{ height: 20, width: 20 }}
                    />{' '}
                    메시지 보내기
                  </SendMsg>
                </SendMsgBtn>
              </LeaderInfo>
            </ProgDetailInfo>
          </Default>

          {/* 모바일 버전 */}

          <Mobile>
            <ProgDetailWrap>
              <ProgDetailImg src={progImg}></ProgDetailImg>
              <ProgTitleSection>
                [{data?.location}]{data?.title}
              </ProgTitleSection>
            </ProgDetailWrap>
            <ProgDetailInfo>
              <ProglInfoWrap>
                <ProgPeople>
                  <Icon>
                    <img
                      src={User}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />

                    <H3>모집인원</H3>
                  </Icon>
                  <ProgInfoText>
                    {pageList?.totalElements} / {data?.numOfRecruits}
                  </ProgInfoText>
                </ProgPeople>
                <ProgDate>
                  <Icon>
                    <img
                      src={Calendar}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />

                    <H3>진행날짜</H3>
                  </Icon>
                  <ProgInfoText>{data?.programDate}</ProgInfoText>
                </ProgDate>
                <ProgRegion>
                  <Icon>
                    <img
                      src={Loc}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />
                    <H3>모집지역</H3>
                  </Icon>
                  <ProgInfoText>{data?.location}</ProgInfoText>
                </ProgRegion>
                <ProgMessage>
                  <Icon>
                    <img
                      src={Info}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />
                    <H3>최소 친절도</H3>
                  </Icon>
                  <ProgInfoText>{data?.minKind}% 이상</ProgInfoText>
                </ProgMessage>
              </ProglInfoWrap>
              <H2>모임장 정보</H2>
              <LeaderInfo>
                <MemName
                  onClick={() => {
                    navigate(`/users/${data?.writer.id}`);
                  }}
                >
                  {writerImg ? (
                    <ProfileImg
                      src={writerImg}
                      alt="profile"
                      style={{ height: 40, width: 40, borderRadius: 50 }}
                    />
                  ) : (
                    <ProfileImg
                      src={Profile}
                      alt="profile"
                      style={{ height: 40, width: 40 }}
                    />
                  )}
                  <MemInfo>
                    <ProfileNickname>{data?.writer.nickname}</ProfileNickname>
                    <ProfileIntro>{data?.writer.introduction}</ProfileIntro>
                  </MemInfo>
                </MemName>
                <KindWrap>
                  <KindRowWrap>
                    친절도 &nbsp;
                    <KindGuide />
                  </KindRowWrap>
                  <LevelPercent
                    //@ts-ignore
                    percent={data?.writer.kind}
                  ></LevelPercent>
                </KindWrap>
                <ProgressBar
                  //@ts-ignore
                  currentPerson={data?.writer.kind}
                  totalPerson={100}
                />
                <SendMsgBtn
                  onClick={() => {
                    userId === undefined || null
                      ? navigate('/login')
                      : setIsMessageOpen(true);
                  }}
                >
                  <SendMsg>
                    <img
                      src={Msg}
                      alt="logo"
                      style={{ height: 20, width: 20 }}
                    />{' '}
                    메시지 보내기
                  </SendMsg>
                </SendMsgBtn>
              </LeaderInfo>
              <H2>소개글</H2>
              <ProgTxtSection>
                <ProgText>{data?.text}</ProgText>
              </ProgTxtSection>
              <ProgMemberContent>
              <H2>함께하는 멤버(신청자)</H2>
              {!applyList.length ? (
              <NoMember>신청자가 없습니다</NoMember>)
              : (
                <MemberSection>
                  {applyList?.map((el) => (
                    <MemItem key={el.id}>
                      <MemItemWrap1>
                        {el.user.userImages.length !== 0 ? (
                          <ProfileImg
                            src={
                              'data:' +
                              //@ts-ignore
                              el.user.userImages[0].contentType +
                              ';base64,' +
                              //@ts-ignore
                              el.user.userImages[0].bytes
                            }
                            alt="profile"
                            style={{ height: 40, width: 40, borderRadius: 50 }}
                            onClick={() => {
                              navigate(`/users/${el.user.id}`);
                            }}
                          />
                        ) : (
                          <ProfileImg
                            src={Profile}
                            alt="profile"
                            style={{ height: 40, width: 40 }}
                            onClick={() => {
                              navigate(`/users/${el.user.id}`);
                            }}
                          />
                        )}
                        <MemInfo>
                          <MemName
                            onClick={() => {
                              navigate(el.user.id);
                            }}
                          >
                            {el.user.nickname}
                          </MemName>
                          <MemIntro>{el.user.introduction}</MemIntro>
                        </MemInfo>
                      </MemItemWrap1>
                      <MemItemWrap2>
                        <KindWrap>
                          <KindRowWrap>
                            친절도 &nbsp;
                            <KindGuide />
                          </KindRowWrap>
                          <LevelPercent percent={el.user.kind}></LevelPercent>
                        </KindWrap>
                        <ProgressBar
                          currentPerson={el.user.kind}
                          totalPerson={100}
                        />
                        <ApplyDate>{el.createdTime} 신청</ApplyDate>
                      </MemItemWrap2>
                    </MemItem>
                  ))}
                </MemberSection>
              )}
                {applyList ? (
                  <Pagination list={pageList} page={page} setPage={setPage} />
                ) : null}
              </ProgMemberContent>
              <BtnWrap>
                {userId === data?.writer.id ? (
                  <>
                    <BookmarkBtn onClick={handleBookmarkedToggle}>
                      <Icon>
                        {detailBookmarked ? (
                          <img
                            src={Bookmarked}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        ) : (
                          <img
                            src={Bookmark}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        )}
                      </Icon>
                    </BookmarkBtn>
                    {applyList.length !== 0 &&
                    data?.programDate === getToday() ? (
                      <ProgUpdateBtn
                        onClick={() => {
                          alert(
                            '함께하는 멤버가 있으므로 당일 수정이 불가합니다!'
                          );
                        }}
                      >
                        수정하기
                      </ProgUpdateBtn>
                    ) : (
                      <ProgUpdateBtn
                        onClick={() => {
                          navigate(`/programs/${params.programId}/update`);
                        }}
                      >
                        수정하기
                      </ProgUpdateBtn>
                    )}
                    {applyList.length !== 0 &&
                    data?.programDate === getToday() ? (
                      <ProgDeleteBtn
                        onClick={() => {
                          alert(
                            '함께하는 멤버가 있으므로 당일 삭제가 불가합니다!'
                          );
                        }}
                      >
                        삭제하기
                      </ProgDeleteBtn>
                    ) : (
                      <ProgDeleteBtn
                        onClick={() => {
                          setIsDeleteOpen(true);
                        }}
                      >
                        삭제하기
                      </ProgDeleteBtn>
                    )}
                  </>
                ) : compareWithToday(data?.programDate as string) ===
                  '모임종료' ? (
                  <>
                    <BookmarkBtn onClick={handleBookmarkedToggle}>
                      <Icon>
                        {detailBookmarked ? (
                          <img
                            src={Bookmarked}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        ) : (
                          <img
                            src={Bookmark}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        )}
                      </Icon>
                    </BookmarkBtn>
                    <ProgApply
                      style={{
                        backgroundColor: 'rgba(81, 81, 81, 0.469)',
                      }}
                    >
                      종료된 모임입니다
                    </ProgApply>
                  </>
                ) : applyMemberfilter.length !== 0 ? (
                  <>
                    <BookmarkBtn onClick={handleBookmarkedToggle}>
                      <Icon>
                        {detailBookmarked ? (
                          <img
                            src={Bookmarked}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        ) : (
                          <img
                            src={Bookmark}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        )}
                      </Icon>
                    </BookmarkBtn>

                    {data?.programDate !== getToday() ? (
                      <ProgApply
                        onClick={() => {
                          setIsCancelOpen(true);
                        }}
                      >
                        취소하기
                      </ProgApply>
                    ) : (
                      <ProgApply
                        onClick={() => {
                          alert('프로그램 당일 신청 취소가 불가합니다!');
                        }}
                      >
                        취소하기
                      </ProgApply>
                    )}
                  </>
                ) : (
                  <>
                    <BookmarkBtn
                      onClick={() => {
                        userId === undefined || null
                          ? navigate('/login')
                          : handleBookmarkedToggle();
                      }}
                    >
                      <Icon>
                        {detailBookmarked ? (
                          <img
                            src={Bookmarked}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        ) : (
                          <img
                            src={Bookmark}
                            alt="logo"
                            style={{ height: 25, width: 25 }}
                          />
                        )}
                      </Icon>
                    </BookmarkBtn>

                    {data?.numOfRecruits === applyList.length ? (
                      <ProgApply
                        onClick={() => {
                          userId === undefined || null
                            ? navigate('/login')
                            : alert('신청인원이 가득 찼습니다!');
                        }}
                      >
                        신청하기
                      </ProgApply>
                    ) : (
                      <ProgApply
                        onClick={() => {
                          userId === undefined || null
                            ? navigate('/login')
                            : setIsApplyOpen(true);
                        }}
                      >
                        신청하기
                      </ProgApply>
                    )}
                  </>
                )}
              </BtnWrap>
            </ProgDetailInfo>
          </Mobile>
        </ProgPageDetail>
      </Layout>
      {isApplyOpen ? (
        <ApplyModal
          setIsApplyOpen={setIsApplyOpen}
          programId={data?.id}
          setApplyList={setApplyList}
          setPageList={setPageList}
        />
      ) : null}
      {isMessageOpen ? (
        <MessageModal setIsMessageOpen={setIsMessageOpen} />
      ) : null}
      {isCancelOpen ? (
        <CancelModal
          setIsCancelOpen={setIsCancelOpen}
          applyMemberfilter={applyMemberfilter}
          setApplyList={setApplyList}
          programId={data?.id}
          setPageList={setPageList}
        />
      ) : null}
      {isDeleteOpen ? (
        <DeleteModal setIsDeleteOpen={setIsDeleteOpen} programId={data?.id} />
      ) : null}
    </>
  );
}
