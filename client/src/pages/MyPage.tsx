import React, { useState } from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import MessageTab from 'components/Tab/MessageTab';

const MyPageContainer = styled.div`
  display: flex;
  height: 100%;
`;

/* 프로필 부분 - 정석 */
const Profile = styled.div`
  width: 40%;
  height: 100%;
  border: 1px solid gray; // 구분위해 임시 표시
`;

/* 탭 부분 */
const TabContainer = styled.div`
  width: 60%;
  height: 100%;
  border: 1px solid gray; // 구분위해 임시 표시
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

const ClubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
const ClubTabTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin: 2rem 0;
`;
const ClubItem = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 1.4rem 1.4rem;
  padding-right: 1.2rem;
`;
const ClubImg = styled.div`
  border: 0.7px solid gray;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const ClubInfo = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ClubTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
`;
const ClubBody = styled.div`
  font-size: 0.6rem;
  font-weight: 300;
  color: gray;
`;
const ClubDate = styled.div`
  font-size: 0.6rem;
  color: #767676;
`;

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
          <div>
            북마크 - 각자 파일작업 가능할듯
            <div>북마크 목록써라</div>
          </div>
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

  return (
    <Layout>
      <MyPageContainer>
        {/* 프로필 부분 - 정석 */}
        <Profile></Profile>

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
