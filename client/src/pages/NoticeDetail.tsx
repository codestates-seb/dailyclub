import Layout from 'components/Layout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NoticeDetailContainer = styled.div`
  height: 100vh;
`;
const NoticeDetailLabel = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  padding-bottom: 0.8rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid gray;
`;
const NoticeWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
`;
const NoticeDetailTitle = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`;
export const NoticeDetailEditBtn = styled.button`
  height: 1.9rem;
  padding: 0 1rem;
  margin-left: 1rem;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 0.8rem;
  align-items: center;
  background-color: #fd6d3d;
  &:hover {
    background-color: #e15425;
  }
`;
const NoticeDetailDeleteBtn = styled(NoticeDetailEditBtn)``;
const NoticeDetailContent = styled.div`
  margin-bottom: 2rem;
  min-height: 300px;
`;
const NoticeDetailBackContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const NoticeDetailBackBtn = styled(NoticeDetailEditBtn)`
  background-color: #bbbbbb;
  &:hover {
    background-color: #a8a8a8;
  }
`;
const NoticeDetailDate = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin: 1rem 0;
  flex: 2;
`;
const NoticeInput = styled.input`
  border: 0.7px solid gray;
  border-radius: 4px;
  width: 70%;
  padding: 0.3rem 1rem;
  margin-bottom: 1rem;
`;
const NoticeTextarea = styled.textarea`
  border: 0.7px solid gray;
  border-radius: 4px;
  width: 70%;
  padding: 0.3rem 1rem;
  margin-bottom: 3rem;
  min-height: 300px;
`;
const NoticeEditContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NoticeEditDoneBtn = styled(NoticeDetailEditBtn)`
  width: 80px;
  margin-top: 1rem;
`;

interface NoticeProps {
  id: number;
  userId: number;
  title: string;
  text: string;
  createdDate: string;
}

function NoticeDetail() {
  const navigate = useNavigate();
  const [noticeIsEdited, setNoticeIsEdited] = useState<boolean>(false);
  const [notice, setNotice] = useState<NoticeProps>({
    id: 1,
    userId: 3,
    title: '???????????? ???????????????.',
    text: '???????????? ???????????????.',
    createdDate: '2022-08-31 12:31',
  });

  const handleNoticeEditToggle = () => {
    setNoticeIsEdited(true);
  };
  /** ???????????? ???????????? */
  const handleNoticeEdit = () => {
    navigate(-1);
  };
  /** ???????????? ???????????? */
  const handleNoticeDelete = () => {};

  return (
    <Layout>
      <NoticeDetailLabel>????????????</NoticeDetailLabel>
      <NoticeDetailContainer>
        {noticeIsEdited ? (
          <>
            <NoticeEditContent>
              <NoticeInput defaultValue={notice?.title} />
              <NoticeTextarea defaultValue={notice?.text} />
              <NoticeWrapper>
                <NoticeEditDoneBtn onClick={handleNoticeEdit}>
                  ????????????
                </NoticeEditDoneBtn>
                <NoticeEditDoneBtn onClick={() => setNoticeIsEdited(false)}>
                  ????????????
                </NoticeEditDoneBtn>
              </NoticeWrapper>
            </NoticeEditContent>
          </>
        ) : (
          <>
            <NoticeDetailTitle>{notice.title}</NoticeDetailTitle>
            <NoticeWrapper>
              <NoticeDetailDate>{notice.createdDate}</NoticeDetailDate>
              <NoticeDetailEditBtn onClick={handleNoticeEditToggle}>
                ????????????
              </NoticeDetailEditBtn>
              <NoticeDetailDeleteBtn onClick={handleNoticeDelete}>
                ????????????
              </NoticeDetailDeleteBtn>
            </NoticeWrapper>
            <NoticeDetailContent>{notice.text}</NoticeDetailContent>
          </>
        )}

        <NoticeDetailBackContainer>
          <NoticeDetailBackBtn onClick={() => navigate('/notice')}>
            ????????????
          </NoticeDetailBackBtn>
        </NoticeDetailBackContainer>
      </NoticeDetailContainer>
      ;
    </Layout>
  );
}

export default NoticeDetail;
