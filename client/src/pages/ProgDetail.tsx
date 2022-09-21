import Layout from 'components/Layout';
import LevelPercent from 'components/LevelPercent';
import ProgressBar from 'components/ProgressBar';
import styled from 'styled-components';
import User from '../images/User.svg';
import Bookmark from '../images/BookmarkBtn.svg';
import Calendar from '../images/Calendar.svg';
import Loc from '../images/Location.svg';
import Info from '../images/Info.svg';
import Msg from '../images/Message.svg';
import QuestionMark from '../images/QuestionMark.svg';

const ProgPageDetail = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
`
const ProgDetailWrap = styled.div`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 20px;
`

const ProgDetailInfo = styled.div`
    width: 35%;
    box-sizing: border-box;
    padding: 20px;
`

const ProgDetailImg = styled.div`
    width: 100%;
    height: 250px;
    background-color: #ddd;
`

const ProgTitleSection = styled.div`
    margin-top: 20px;
    color: #222;
    font-size: 30px;
    font-weight: 700;
    line-height: 34px;
`

const ProgTxtSection = styled.div`
    margin-top: 30px;
    font-size: 18px;
    font-weight: 600;
`

const ProgTextHead = styled.div`
    margin-top: 20px;
    font-weight: 600;
`

const ProgText = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 500;
`

const ProgMemberContent = styled.div`
    margin-top: 50px;
`

const MemberSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const ProglInfoWrap = styled.div`
    flex-direction: column;
    border: 1px solid #ddd;
    top: 74px;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 0 20px;
    margin: 5px;
    margin-top: 10px;
`

const ProgInfoText = styled.div`
    color: #7e7b7b;
    padding-top: 15px;
`

const ProgPeople = styled.div`
    border-bottom: 1px solid #e6e6e6;
    padding: 20px 0;
`

const ProgDate = styled.div`
    border-bottom: 1px solid #e6e6e6;
    padding: 20px 0;
`

const ProgRegion = styled.div`
    border-bottom: 1px solid #e6e6e6;
    padding: 20px 0;
`

const ProgApply = styled.button`
    background-color: #ff5100;
    color: white;
    box-sizing: border-box;
    max-width: 100%;
    width: 70%;
    margin-top: 15px;
    margin-left: 0!important;
    margin-bottom: 20px;
    padding: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
`

const ProgMessage = styled.div`
    border-bottom: 1px solid #e6e6e6;
    padding: 20px 0;
`

const LeaderInfo = styled.div`
    flex-direction: column;
    border: 1px solid #ddd;
    top: 74px;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 20px;
    margin: 5px;
    margin-top: 10px;
`

const ProfileNickname = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1rem;
`;

const SendMsg = styled.div`
    font-size: 18px;
    text-align: center;
    font-weight: lighter;
`

const SendMsgBtn = styled.button`
    width: 100%;
    border: 1px solid #EFEFEF;
    padding: 15px;
    margin-top: 10px;
    flex-direction: row;
`

const H2 = styled.h2`
    font-size: 24px;
`

const H3 = styled.h3`
    margin-left: 10px;
    font-size: 18px;
`
const ProfileIntro = styled.div`
  font-weight: lighter;
  margin-bottom: 1rem;
`;

const MemItem = styled.div`
    margin: 0.7rem 0.7rem 0.7rem 0;
    border: 1px solid #efefef;
    border-radius: 5px;
    padding: 15px;
`
const MemItemWrap1 = styled.div`
    flex-direction: row;
`

const MemItemWrap2 = styled.div`
    flex-direction: column;
`

const MemName = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
`

const MemIntro = styled.div`
    margin-bottom: 5px;
`

const ApplyDate = styled.div`
    margin-top: 10px;
`

const Icon = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
`

const BtnWrap = styled.div`
    
`

const BookmarkBtn = styled.button`
    max-width: 100%;
    border: none;
`
const KindWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

interface MemersProps {
    id: number;
    nickname: string;
    percent: number;
    intro: string;
    date: string;
}

const userProps: {
    id: number;
    nickname: string;
    introduction: string;
    kind: number;
    role: string;
  } = {
    id: 1,
    nickname: '일리더',
    introduction: '자기소개 입니다.',
    kind: 50,
    role: 'USER',
  };

export default function ProgDetail() {

    const memberList: MemersProps[] = [
        {
            id: 1,
            nickname: '이멤버',
            percent: 100,
            intro: '한줄소개',
            date: '4',
        },
        {
            id: 2,
            nickname: '삼멤버',
            percent: 75,
            intro: '한줄소개',
            date: '3',
        },
        {
            id: 3,
            nickname: '사멤버',
            percent: 50,
            intro: '한줄소개',
            date: '2',
        },
        {
            id: 4,
            nickname: '오멤버',
            percent: 25,
            intro: '한줄소개',
            date: '1',
        },
    ]
    return (
        <Layout>
            <ProgPageDetail>
                <ProgDetailWrap>
                    <ProgDetailImg>사진</ProgDetailImg>
                    <ProgTitleSection>
                        [서울] 아이유 콘서트 솔플 하시는 분 찾습니다.
                    </ProgTitleSection>
                    <ProgTxtSection>
                        <H2>소개글</H2>
                        <ProgTextHead>소제목</ProgTextHead>
                        <ProgText>내용</ProgText>
                    </ProgTxtSection>
                    <ProgMemberContent>
                        <H2>함께하는 멤버(신청자)</H2>
                        <MemberSection>
                            {memberList?.map((el: MemersProps) => (
                                <MemItem key={el.id}>
                                    <MemItemWrap1>
                                        <MemName>{el.nickname}</MemName>
                                        <MemIntro>{el.intro}</MemIntro>
                                    </MemItemWrap1>
                                    <MemItemWrap2>
                                    <KindWrap>
                                        <div>
                                            친절도 &nbsp;
                                            <img src={QuestionMark} alt="question mark" />
                                        </div>
                                        <LevelPercent percent={el.percent}></LevelPercent>
                                        </KindWrap>
                                        <ProgressBar
                                        currentPerson={el.percent}
                                        totalPerson={100}
                                        ></ProgressBar>
                                        <ApplyDate>{el.date}시간 전 신청</ApplyDate>
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
                                <img
                                    src={User}
                                    alt='logo'
                                    style={{height: 25, width: 25}}
                                    />
                                    
                            <H3>모집인원</H3>
                            </Icon>
                            <ProgInfoText>99 / 100</ProgInfoText>
                        </ProgPeople>
                        <ProgDate>
                            <Icon>
                                <img
                                    src={Calendar}
                                    alt='logo'
                                    style={{height: 25, width: 25}}
                                    />
                                    
                            <H3>모집일정</H3>
                            </Icon>
                            <ProgInfoText>2022.09.20. 까지 모집</ProgInfoText>
                        </ProgDate>
                        <ProgRegion>
                            <Icon>
                                <img
                                    src={Loc}
                                    alt='logo'
                                    style={{height: 25, width: 25}}
                                    />
                                <H3>모집지역</H3>
                            </Icon>
                            <ProgInfoText>인천</ProgInfoText>
                        </ProgRegion>
                        <ProgMessage>
                            <Icon>
                                <img
                                    src={Info}
                                    alt='logo'
                                    style={{height: 25, width: 25}}
                                    />
                                    <H3>안내사항</H3>
                            </Icon>   
                        </ProgMessage>
                        <BtnWrap>
                            <BookmarkBtn>
                            <Icon>
                            <img
                                src={Bookmark}
                                alt='logo'
                                style={{height: 25, width: 25}}
                                />
                            </Icon>
                            </BookmarkBtn>
                        
                        
                        <ProgApply>
                            신청하기
                        </ProgApply>
                        </BtnWrap>
                            
                    </ProglInfoWrap>
                    <H2>모임장 정보</H2>
                    <LeaderInfo>
                        <MemName>
                            <ProfileNickname>{userProps.nickname}</ProfileNickname>
                        </MemName>
                        <MemIntro>
                            <ProfileIntro>{userProps.introduction}</ProfileIntro>
                        </MemIntro>
                        <KindWrap>
                            <div>
                                친절도 &nbsp;
                                <img src={QuestionMark} alt="question mark" />
                            </div>
                            <LevelPercent percent={userProps.kind}></LevelPercent>
                            </KindWrap>
                            <ProgressBar
                                currentPerson={userProps.kind}
                                totalPerson={100}
                                ></ProgressBar>
                        <SendMsgBtn><SendMsg><img src={Msg} alt='logo' style={{height: 20, width: 20}} /> 메시지 보내기</SendMsg></SendMsgBtn>
                    </LeaderInfo>
                </ProgDetailInfo>
            </ProgPageDetail>
        </Layout>
    )
}