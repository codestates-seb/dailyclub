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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ApplyListVal, ProgramDetailVal } from 'types/programs';
import BasicImg from '../images/BasicImg.jpg';

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
  box-sizing: border-box;
  max-width: 100%;
  width: 70%;
  margin-top: 15px;
  margin-left: 0 !important;
  margin-bottom: 20px;
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
  margin-bottom: 1rem;
`;

const MemItem = styled.div`
  margin: 0.7rem 0.7rem 0.7rem 0;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 15px;
`;
const MemItemWrap1 = styled.div`
  flex-direction: row;
`;

const MemItemWrap2 = styled.div`
  flex-direction: column;
`;

const MemName = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const MemIntro = styled.div`
  margin-bottom: 5px;
`;

const ApplyDate = styled.div`
  margin-top: 10px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const BtnWrap = styled.div``;

const BookmarkBtn = styled.button`
  max-width: 100%;
  border: none;
`;
const KindWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export default function ProgDetail() {
  const DEV_URL = process.env.REACT_APP_DEV_URL;
  const params = useParams();

  const [data, setData] = useState<ProgramDetailVal>();
  const [progImg, setProgImg] = useState<string>('');
  const [applyList, setApplyList] = useState<Array<ApplyListVal>>([]);

  useEffect(() => {
    //프로그램 상세조회 api
    axios.get(`${DEV_URL}/api/programs/${params.programId}`).then((res) => {
      setData(res.data);
      if (res.data.programImages.length === 0) {
        setProgImg(BasicImg);
      } else {
        setProgImg(
          `data:${res.data.programImages[0].contentType};base64,${res.data.programImages[0].bytes}`
        );
      }
    });
    //신청한 멤버 조회
    axios
      .get(`${DEV_URL}/api/applies?page=1&size=4&programId=${params.programId}`)
      .then((res) => {
        setApplyList(res.data.data);
      });
  }, []);

  //신청하기
  const handleApply = () => {
    axios.post(
      `${DEV_URL}/api/applies`,
      { programId: params.programId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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
                    <MemName>{el.user.nickname}</MemName>
                    <MemIntro>{el.user.introduction}</MemIntro>
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
                {applyList.length} / {data?.numOfRecruits}
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
              <BookmarkBtn>
                <Icon>
                  <img
                    src={Bookmark}
                    alt="logo"
                    style={{ height: 25, width: 25 }}
                  />
                </Icon>
              </BookmarkBtn>

              <ProgApply onClick={handleApply}>신청하기</ProgApply>
            </BtnWrap>
          </ProglInfoWrap>
          <H2>모임장 정보</H2>
          <LeaderInfo>
            <MemName>
              <ProfileNickname>{data?.writer.nickname}</ProfileNickname>
            </MemName>
            <MemIntro>
              <ProfileIntro>{data?.writer.introduction}</ProfileIntro>
            </MemIntro>
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
