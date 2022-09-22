import Layout from 'components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NoticeDetailEditBtn } from './NoticeDetail';

const NoticeListContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NoticeListLabel = styled.div`
  padding-bottom: 0.8rem;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
`;

const Notice = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
`;

const NoticeListMenu = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
`;

const NoticeTitleLabel = styled.div`
  width: 90%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e2e6e8;
  border-bottom: 1px solid #e2e6e8;
`;

const NoticeDateLabel = styled.div`
  width: 10%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e6e8;
`;

const NoticeUl = styled.ul`
  width: 100%;
`;

const NoticeLi = styled.li`
  width: 100%;
  display: flex;
`;

const NoticeElTilte = styled.div`
  width: 90%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e6e8;
`;

const NoticeElDate = styled.div`
  width: 10%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e6e8;
`;

interface NoticeProps {
  id: number;
  userId: number;
  title: string;
  text: string;
  createdDate: string;
}

function NoticeList() {
  const noticeList: NoticeProps[] = [
    {
      id: 1,
      userId: 1,
      title: '1.01 버전 업데이트',
      text: '업데이트로 인해 13시 ~ 15시서비스 이용이 불가합니다.',
      createdDate: '2022-08-31',
    },
    {
      id: 2,
      userId: 2,
      title: '1.02 버전 업데이트',
      text: '업데이트로 인해 13시 ~ 15시서비스 이용이 불가합니다.',
      createdDate: '2022-08-31',
    },
    {
      id: 3,
      userId: 3,
      title: '1.03 버전 업데이트',
      text: '업데이트로 인해 13시 ~ 15시서비스 이용이 불가합니다.',
      createdDate: '2022-08-31',
    },
  ];

  return (
    <Layout>
      <NoticeListLabel>
        <Notice>공지사항</Notice>{' '}
        <Link to="/notice/create">
          <NoticeDetailEditBtn>글쓰기</NoticeDetailEditBtn>
        </Link>
      </NoticeListLabel>
      <NoticeListContainer>
        <NoticeListMenu>
          <NoticeTitleLabel>제목</NoticeTitleLabel>
          <NoticeDateLabel>작성일</NoticeDateLabel>
        </NoticeListMenu>
        <NoticeUl>
          {noticeList.map((el) => (
            <Link to="/notice/:noticeId" key={el.id}>
              <NoticeLi>
                <NoticeElTilte>{el.title}</NoticeElTilte>
                <NoticeElDate>{el.createdDate}</NoticeElDate>
              </NoticeLi>
            </Link>
          ))}
        </NoticeUl>
      </NoticeListContainer>
    </Layout>
  );
}

export default NoticeList;
