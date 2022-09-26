import React, { useState } from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import ProgressBar from 'components/ProgressBar';
import LevelPercent from 'components/LevelPercent';
import QuestionMark from '../images/QuestionMark.svg';
import BookMarkTab from 'components/BookMarkTab';
import MessageTab from 'components/Tab/MessageTab';
import { Link } from 'react-router-dom';

const MyPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

/* 프로필 부분 - 정석 */
const Profile = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: end;
  margin: 1rem;
`;

const ProfileWrap = styled.div`
  width: 70%;
  height: 43%;
  padding: 2rem 1rem 2rem 1rem;
  border: 1px solid #e2e6e8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 7rem;
  height: 7rem;
  margin: 1rem;
  background-color: #e2e6e8;
  border-radius: 50%;
`;

const ProfileNickname = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1rem;
`;

const ProfileIntro = styled.div`
  font-weight: lighter;
  margin-bottom: 1rem;
`;

const ProfileUpdateBtn = styled.button`
  width: 10rem;
  height: 2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  color: #ff5924;
  margin-bottom: 1rem;
`;

const KindWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const UpdateInput = styled.input`
  width: 10rem;
  height: 2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const UpdateImageInput = styled.input`
  display: none;
`;
const UpdateImageLabel = styled.label`
  width: 7rem;
  height: 7rem;
  margin: 1rem;
  background-color: #e2e6e8;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

/* 탭 부분 */
const TabContainer = styled.div`
  width: 60%;
  height: 100%;
`;
const TabMenu = styled.ul`
  color: #bdbdbd;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  margin-bottom: 2rem;
  .submenu {
    padding: 1rem 1rem 0.5rem 1rem;
    margin-left: 1rem;
    cursor: pointer;
    transition: 0.1s;
  }
  .focused {
    border-bottom: 2px solid #e84118;
    color: black;
  }
`;
const TabContent = styled.div`
  margin: 1rem;
`;

export const ClubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
export const ClubTabTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin: 2rem 0;
`;
export const ClubItem = styled.div`
  display: flex;
  width: 90%;
  margin: 0 1.4rem 1.4rem 0;
  padding: 1.2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
`;
export const ClubImg = styled.div`
  border: 0.7px solid gray;
  border-radius: 50%;
  width: 35px;
  height: 30px;
`;
export const ClubInfo = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ClubTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
`;
export const ClubBody = styled.div`
  font-size: 0.6rem;
  font-weight: 300;
  color: gray;
`;
export const ClubDate = styled.div`
  font-size: 0.6rem;
  color: #767676;
`;
const UserWrapBtn = styled.div`
  margin-top: 2rem;
`;
const WithdrawalBtn = styled.button`
  border: none;
  padding-right: 0.3rem;
  &:hover {
    font-weight: 600;
  }
`;
const LogoutBtn = styled(WithdrawalBtn)``;

/** 모임목록 더미데이터 */
interface ProgProps {
  id: number;
  status: string;
  title: string;
  booked: boolean;
  percent: number;
  currentPerson: number;
  totalPerson: number;
  date: string;
  content: string;
}
const programList: ProgProps[] = [
  {
    id: 1,
    status: '모집중',
    title: '[서울] 아이유 콘서트 동행 구합니다...',
    booked: false,
    percent: 100,
    currentPerson: 4,
    totalPerson: 8,
    date: '2022.09.20',
    content: '내용이다 아이유 콘서트',
  },
  {
    id: 2,
    status: '마감임박',
    title: '[영국] 손흥민 직관 동행 구합니다...',
    booked: false,
    percent: 20,
    currentPerson: 8,
    totalPerson: 10,
    date: '2022.09.20',
    content: '내용이다 아이유 콘서트',
  },
  {
    id: 3,
    status: '모집종료',
    title: '[대구] 대구 풋살구장 사람구합니다...',
    booked: false,
    percent: 80,
    currentPerson: 3,
    totalPerson: 11,
    date: '2022.09.20',
    content: '내용이다 아이유 콘서트',
  },
  {
    id: 4,
    status: '모집중',
    title: '[서울] 홍대 라멘투어 마제소바,돈...',
    booked: false,
    percent: 70,
    currentPerson: 4,
    totalPerson: 10,
    date: '2022.09.20',
    content: '내용이다 아이유 콘서트',
  },
];

// 유저정보 데이터
const userProps: {
  id: number;
  nickname: string;
  picture: string;
  introduction: string;
  kind: number;
  role: string;
} = {
  id: 1,
  nickname: '냥냥',
  picture: '사진',
  introduction: '자기소개 입니다.',
  kind: 50,
  role: 'USER',
};

function MyPage() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const menuArr = [
    {
      name: '내 모임',
      content: (
        <div>
          <ClubTabTitle>참여 중인 모임</ClubTabTitle>
          <ClubContainer>
            {programList.map((el) => (
              <ClubItem key={el.id}>
                <ClubImg></ClubImg>
                <ClubInfo>
                  <ClubTitle>{el.title}</ClubTitle>
                  <ClubBody>{el.content}</ClubBody>
                  <ClubDate>{el.date}</ClubDate>
                </ClubInfo>
              </ClubItem>
            ))}
          </ClubContainer>
          <ClubTabTitle>개설한 모임</ClubTabTitle>
          <ClubContainer>
            {programList.map((el) => (
              <ClubItem key={el.id}>
                <ClubImg></ClubImg>
                <ClubInfo>
                  <ClubTitle>{el.title}</ClubTitle>
                  <ClubBody>{el.content}</ClubBody>
                  <ClubDate>{el.date}</ClubDate>
                </ClubInfo>
              </ClubItem>
            ))}
          </ClubContainer>
        </div>
      ),
    },
    {
      name: '메시지함',
      content: (
        <>
          <MessageTab />
        </>
      ),
    },
    {
      name: '북마크',
      content: (
        <>
          <BookMarkTab />
        </>
      ),
    },
  ];
  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };
  const menuTab = menuArr.map((el, index) => (
    <li
      key={index}
      onClick={() => selectMenuHandler(index)}
      className={currentTab === index ? 'submenu focused' : 'submenu'}
    >
      {el.name}
    </li>
  ));

  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  //프로필 수정모드 변경 함수입니다
  const handleUpdateMode = () => {
    setIsUpdateMode(true);
  };

  //프로필 수정하는 함수입니다
  const profileUpdate = () => {
    setIsUpdateMode(false);
  };
  return (
    <Layout>
      <MyPageContainer>
        {/* 프로필 부분 - 정석 */}
        <Profile>
          <ProfileWrap>
            {isUpdateMode ? (
              <>
                <UpdateImageLabel htmlFor="file"></UpdateImageLabel>
                <UpdateImageInput
                  id="file"
                  type="file"
                  name="avatar"
                  accept="image/*"
                ></UpdateImageInput>
                <UpdateInput
                  type="text"
                  value={userProps.nickname}
                ></UpdateInput>
                <UpdateInput
                  type="text"
                  value={userProps.introduction}
                ></UpdateInput>
                <ProfileUpdateBtn onClick={profileUpdate}>
                  수정완료
                </ProfileUpdateBtn>
              </>
            ) : (
              <>
                <ProfileImage></ProfileImage>
                <ProfileNickname>{userProps.nickname}</ProfileNickname>
                <ProfileIntro>{userProps.introduction}</ProfileIntro>
                <ProfileUpdateBtn onClick={handleUpdateMode}>
                  프로필 수정
                </ProfileUpdateBtn>
              </>
            )}
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
            <UserWrapBtn>
              <WithdrawalBtn>회원탈퇴</WithdrawalBtn>
              <LogoutBtn>로그아웃</LogoutBtn>
            </UserWrapBtn>
          </ProfileWrap>
        </Profile>

        {/* 탭 모임목록부분 - 태경 */}
        <TabContainer>
          <TabMenu>{menuTab}</TabMenu>
          <TabContent>
            <div>{menuArr[currentTab].content}</div>
          </TabContent>
        </TabContainer>
      </MyPageContainer>
    </Layout>
  );
}

export default MyPage;
