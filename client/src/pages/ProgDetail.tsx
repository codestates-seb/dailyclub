import Layout from 'components/Layout';
import LevelPercent from 'components/LevelPercent';
import styled from 'styled-components';
import User from '../images/User.svg';
import Bookmark from '../images/BookmarkBtn.svg';
import Calendar from '../images/Calendar.svg';
import Loc from '../images/Location.svg';
import Info from '../images/Info.svg';
import Msg from '../images/Message.svg';
import QuestionMark from '../images/QuestionMark.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplyListVal, PaginationVal, ProgramDetailVal } from 'types/programs';
import BasicImg from '../images/BasicImg.jpg';
import Profile from '../images/Profile.svg';
import Pagination from 'pagination/Pagination';
import { useAppSelector } from 'stores/hooks';
import { getUserData } from 'stores/userInfoSlice';

const ProgPageDetail = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const ProgDetailWrap = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 20px;
`;

const ProgDetailInfo = styled.div`
  width: 35%;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const ProgDetailImg = styled.img`
  width: 100%;
  height: 250px;
`;

const ProgTitleSection = styled.div`
  margin-top: 20px;
  color: #222;
  font-size: 30px;
  font-weight: 700;
  line-height: 34px;
`;

const ProgTxtSection = styled.div`
  margin-top: 30px;
  font-size: 18px;
  font-weight: 600;
`;

const ProgText = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 500;
`;

const ProgMemberContent = styled.div`
  margin-top: 50px;
`;

const MemberSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ProglInfoWrap = styled.div`
  flex-direction: column;
  border: 1px solid #ddd;
  top: 74px;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 0 20px;
  margin-top: 10px;
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
  width: 48%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
`;

const ProgDeleteBtn = styled.button`
  background-color: black;
  color: white;
  width: 48%;
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
`;

const H3 = styled.h3`
  margin-left: 10px;
  font-size: 18px;
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

interface ModalProps {
  setIsMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsApplyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProgDetail({
  setIsMessageOpen,
  setIsApplyOpen,
  setIsCancelOpen,
  setIsDeleteOpen,
}: ModalProps) {
  const DEV_URL = process.env.REACT_APP_DEV_URL;
  const params = useParams();

  const [data, setData] = useState<ProgramDetailVal>();
  const [progImg, setProgImg] = useState<string>('');
  const [applyList, setApplyList] = useState<Array<ApplyListVal>>([]);

  const [pageList, setPageList] = useState<PaginationVal>();
  const [page, setPage] = useState<number>(1);

  const userData = useAppSelector(getUserData);
  const loginUserId = 1;

  const navigate = useNavigate();

  const applyMemberfilter = applyList.filter((el) => {
    return el.user.id === loginUserId;
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
    // console.log(userData);
  }, [page]);

  //신청하기
  const postApply = () => {
    axios
      .post(
        `${DEV_URL}/api/applies`,
        { programId: params.programId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        location.reload();
      });
  };

  //취소하기
  const cancelApply = () => {
    axios.delete(`${DEV_URL}/api/applies/${applyMemberfilter[0].id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  //업데이트 페이지 이동
  const navigateUpdatePage = () => {
    navigate(`/programs/${params.programId}/update`);
  };

  //프로그램 삭제
  const deleteProgram = () => {
    axios.delete(`${DEV_URL}/api/programs/${params.progrmaId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Layout>
      <ProgPageDetail>
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
            <MemberSection>
              {applyList?.map((el) => (
                <MemItem key={el.id}>
                  <MemItemWrap1>
                    {el.user.picture ? (
                      <img
                        src={
                          'data:' +
                          el.user.picture +
                          ';base64,' +
                          el.user.picture
                        }
                        alt="profile"
                        style={{ height: 40, width: 40 }}
                      />
                    ) : (
                      <img
                        src={Profile}
                        alt="profile"
                        style={{ height: 40, width: 40 }}
                      />
                    )}
                    <MemInfo>
                      <MemName>{el.user.nickname}</MemName>
                      <MemIntro>{el.user.introduction}</MemIntro>
                    </MemInfo>
                  </MemItemWrap1>
                  <MemItemWrap2>
                    <KindWrap>
                      <div>
                        친절도 &nbsp;
                        <img src={QuestionMark} alt="question mark" />
                      </div>
                      <LevelPercent percent={el.user.kind}></LevelPercent>
                    </KindWrap>
                    <ApplyDate>{el.createdTime} 신청</ApplyDate>
                  </MemItemWrap2>
                </MemItem>
              ))}
            </MemberSection>
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
                <img src={User} alt="logo" style={{ height: 25, width: 25 }} />

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
                <img src={Loc} alt="logo" style={{ height: 25, width: 25 }} />
                <H3>모집지역</H3>
              </Icon>
              <ProgInfoText>{data?.location}</ProgInfoText>
            </ProgRegion>
            <ProgMessage>
              <Icon>
                <img src={Info} alt="logo" style={{ height: 25, width: 25 }} />
                <H3>최소 친절도</H3>
              </Icon>
              <ProgInfoText>{data?.minKind}% 이상</ProgInfoText>
            </ProgMessage>
            <BtnWrap>
              {loginUserId === data?.writer.id ? (
                <>
                  <ProgUpdateBtn onClick={navigateUpdatePage}>
                    수정하기
                  </ProgUpdateBtn>
                  <ProgDeleteBtn onClick={deleteProgram}>
                    삭제하기
                  </ProgDeleteBtn>
                </>
              ) : applyMemberfilter.length !== 0 ? (
                <>
                  <BookmarkBtn>
                    <Icon>
                      <img
                        src={Bookmark}
                        alt="logo"
                        style={{ height: 25, width: 25 }}
                      />
                    </Icon>
                  </BookmarkBtn>

                  <ProgApply onClick={cancelApply}>취소하기</ProgApply>
                </>
              ) : (
                <>
                  <BookmarkBtn>
                    <Icon>
                      <img
                        src={Bookmark}
                        alt="logo"
                        style={{ height: 25, width: 25 }}
                      />
                    </Icon>
                  </BookmarkBtn>

                  <ProgApply onClick={postApply}>신청하기</ProgApply>
                </>
              )}
            </BtnWrap>
          </ProglInfoWrap>
          <H2>모임장 정보</H2>
          <LeaderInfo>
            <MemName>
              {data?.writer.picture ? (
                <img src="" alt="profile" style={{ height: 40, width: 40 }} />
              ) : (
                <img
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
              <div>
                친절도 &nbsp;
                <img src={QuestionMark} alt="question mark" />
              </div>
              <LevelPercent
                //@ts-ignore
                percent={data?.writer.kind}
              ></LevelPercent>
            </KindWrap>
            <SendMsgBtn>
              <SendMsg>
                <img src={Msg} alt="logo" style={{ height: 20, width: 20 }} />{' '}
                메시지 보내기
              </SendMsg>
            </SendMsgBtn>
          </LeaderInfo>
        </ProgDetailInfo>
      </ProgPageDetail>
    </Layout>
  );
}
