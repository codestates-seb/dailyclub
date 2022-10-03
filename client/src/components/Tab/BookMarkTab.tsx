import axios from 'axios';
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
import Pagination from 'pagination/Pagination';
import React, { useEffect, useState } from 'react';
import BasicImg from '../../images/BasicImg.jpg';

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
  const URL = process.env.REACT_APP_DEV_URL;
  const [bookmarkPage, setBookmarkPage] = useState(1);
  const [bookmarkPageList, setBookmarkPageList] = useState();
  const [bookmarkList, setBookmarkList] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}/api/bookmarks?page=${bookmarkPage}&size=10`)
      .then(({ data }) => {
        console.log(data);
        setBookmarkList(data?.data);
        setBookmarkPageList(data?.pageInfo);
      });
  }, []);

  return (
    <div>
      <ClubTabTitle>북마크 중인 모임</ClubTabTitle>
      <ClubContainer>
        {bookmarkList &&
          bookmarkList?.map((el: any) => (
            <ClubItem key={el.id}>
              <ClubImg>
                <img
                  src={
                    el?.program?.programImages?.length === 0
                      ? BasicImg
                      : `data:${el?.program?.programImages[0].contentType};base64,${el?.program?.programImages[0].bytes}`
                  }
                  alt="basicImg"
                  style={{ height: 40, width: 40, borderRadius: 50 }}
                  loading="lazy"
                />
              </ClubImg>
              <ClubInfo>
                <ClubTitle>
                  [{el?.program?.location}] {el?.program?.title}
                </ClubTitle>
                <ClubBody>{el?.program?.text}</ClubBody>
                <ClubDate>{el?.program?.programDate}</ClubDate>
              </ClubInfo>
            </ClubItem>
          ))}
      </ClubContainer>
      <Pagination
        list={bookmarkPageList}
        page={bookmarkPage}
        setPage={setBookmarkPage}
      />
    </div>
  );
}

export default BookMarkTab;
