import Layout from 'components/Layout';
import LevelPercent from 'components/LevelPercent';
import styled from 'styled-components';

const ProgPageDetail = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    border-radius: 4px;
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
    background-color: #1ebd8e;
    color: white;
    box-sizing: border-box;
    max-width: 100%;
    width: 100%;
    margin-top: 15px;
    margin-left: 0!important;
    margin-bottom: 20px;
    padding: 10px 0;
    border: none;
    border-radius: 4px;
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
    border-radius: 4px;
    padding: 20px;
    margin: 5px;
    margin-top: 10px;
`

const SendMsg = styled.button`
    width: 100%;
    border: 1px solid #EFEFEF;
    padding: 15px;
    margin-top: 10px;
    text-align: center;
`

const H2 = styled.h2`
    font-size: 24px;
`

const H3 = styled.h3`
    font-size: 18px;
`

const MemItem = styled.div`
    margin: 0.7rem 0.7rem 0.7rem 0;
    border: 1px solid #efefef;
    border-radius: 4px;
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
    
`

interface MemersProps {
    id: number;
    nickname: string;
    percent: number;
    intro: string;
    date: string;
}

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
            percent: 80,
            intro: '한줄소개',
            date: '3',
        },
        {
            id: 3,
            nickname: '사멤버',
            percent: 100,
            intro: '한줄소개',
            date: '2',
        },
        {
            id: 4,
            nickname: '오멤버',
            percent: 80,
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
                        <ProgTextHead>
                            목적
                            <ProgText>
                                아사모 아이유를 사랑하는 사람들의 모임
                            </ProgText>
                        </ProgTextHead>
                        <ProgTextHead>
                            진행방법
                            <ProgText>카카오톡, 슬랙으로 입장</ProgText>
                        </ProgTextHead>
                        <ProgTextHead>
                            모이는 장소
                            <ProgText>고척돔 00편의점 앞</ProgText>
                        </ProgTextHead>
                        <ProgTextHead>
                            진행시간
                            <ProgText>
                                09/13 화 13:00 ~ 15:00
                            </ProgText>
                        </ProgTextHead>
                        <ProgTextHead>
                            회비
                            <ProgText>
                                응원봉 30,000원에 대한 회비
                            </ProgText>
                        </ProgTextHead>
                        <ProgTextHead>
                            기타
                            <ProgText>
                                인천인 환영합니다~
                            </ProgText>
                        </ProgTextHead>
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
                                        <LevelPercent percent={el?.percent} />
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
                            <H3>모집인원</H3>
                            <ProgInfoText>99 / 100</ProgInfoText>
                        </ProgPeople>
                        <ProgDate>
                            <H3>모집일정</H3>
                            <ProgInfoText>2022.09.20. 까지 모집</ProgInfoText>
                        </ProgDate>
                        <ProgRegion>
                            <H3>모집지역</H3>
                            <ProgInfoText>인천</ProgInfoText>
                        </ProgRegion>
                        <ProgMessage>
                            음오아예    
                        </ProgMessage>
                        <ProgApply>
                            신청하기
                        </ProgApply>
                    </ProglInfoWrap>
                    <H2>모임장 정보</H2>
                    <LeaderInfo>
                        <MemName>
                            일리더
                        </MemName>
                        <MemIntro>
                            한주우우울소개애애ㅐㅐㅐㅐㅐ
                        </MemIntro>
                        친절도 퍼센트바 와씨;;
                        <SendMsg>메시지 보내기</SendMsg>
                    </LeaderInfo>
                </ProgDetailInfo>
            </ProgPageDetail>
        </Layout>
    )
}