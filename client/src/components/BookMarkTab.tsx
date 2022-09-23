import {
  ClubTabTitle,
  ClubContainer,
  ClubBody,
  ClubDate,
  ClubImg,
  ClubInfo,
  ClubItem,
  ClubTitle,
} from 'pages/MyPage';
import React from 'react';

function BookMarkTab() {
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

  return (
    <div>
      <ClubTabTitle>북마크 중인 모임</ClubTabTitle>
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
  );
}

export default BookMarkTab;
