import { useState } from 'react';
import styled from 'styled-components';

const MessageLavel = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin: 2rem 0;
`;
const MessageContainer = styled.div``;
const MessageItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
const MessageContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;
const MessageFromUser = styled.div`
  font-weight: 800;
  font-size: 0.8rem;
  margin-right: 1rem;
  color: #e15425;
`;
const MessageDate = styled.div`
  font-size: 0.7rem;
  color: gray;
`;
const MessageWrap = styled.div`
  flex: 2;
  cursor: pointer;
`;
const MessageText = styled.div``;
const MessageDetailText = styled.div`
  margin: 1rem 0 3rem 0;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const MessageDeleteBtn = styled.button`
  height: 1.4rem;
  padding: 0 0.7rem;
  margin-left: 1rem;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 0.7rem;
  background-color: #fd6d3d;
  &:hover {
    background-color: #e15425;
  }
`;
const MessageBackBtn = styled(MessageDeleteBtn)``;
const MessageSendBtn = styled(MessageDeleteBtn)``;

interface MessageListProp {
  id: number;
  userId: number;
  fromUserNickname: string;
  toUserId: string;
  toUserNickname: string;
  text: string;
  readStatus: string;
  createdDate: string;
}
const messageLists: MessageListProp[] = [
  {
    id: 1,
    userId: 3,
    fromUserNickname: '보낸이닉네임',
    toUserId: 'hoho123',
    toUserNickname: '받는이닉네임',
    text: '메시지내용입니다',
    readStatus: 'UNREAD',
    createdDate: '2022-08-31 12:31',
  },
  {
    id: 2,
    userId: 3,
    fromUserNickname: '보낸이닉네임2',
    toUserId: 'hoho1232',
    toUserNickname: '받는이닉네임2',
    text: '메시지내용입니다2',
    readStatus: 'UNREAD',
    createdDate: '2022-08-31 12:31',
  },
  {
    id: 3,
    userId: 3,
    fromUserNickname: '보낸이닉네임3',
    toUserId: 'hoho1233',
    toUserNickname: '받는이닉네임3',
    text: '메시지내용입니다3',
    readStatus: 'UNREAD',
    createdDate: '2022-08-31 12:31',
  },
];

export default function MessageTab() {
  const [messageOpen, setMessageOpen] = useState<boolean>(false);

  const handleMessageClick = (id: number) => () => {
    // console.log(id); // 클릭한 el.id => 메시지 1개 조회api할때 필요
    setMessageOpen(!messageOpen);
  };

  /** 메시지 삭제 API */
  const handleMessageDelete = (id?: number) => () => {
    // console.log(id); // 클릭한 el.id => 삭제할 메시지 id
  };

  return (
    <>
      <MessageLavel>메시지함</MessageLavel>
      <MessageContainer>
        {messageOpen ? (
          <>
            <MessageContent>
              <MessageFromUser>메시지 1개 조회 후 보낸이닉네임</MessageFromUser>
              <MessageDate>메시지 1개 조회 후 날짜</MessageDate>
            </MessageContent>
            <MessageDetailText>메시지 1개 조회 후 내용</MessageDetailText>
            <BtnContainer>
              {/* handleMessageDelete(1) 임시로 1 넣어둠 추후 수정해야함*/}
              <MessageDeleteBtn onClick={handleMessageDelete(1)}>
                삭제
              </MessageDeleteBtn>
              <MessageSendBtn>답장하기</MessageSendBtn>
              <MessageBackBtn onClick={() => setMessageOpen(false)}>
                뒤로가기
              </MessageBackBtn>
            </BtnContainer>
          </>
        ) : (
          <>
            {messageLists.map((el) => (
              <MessageItem key={el.id}>
                <MessageWrap onClick={handleMessageClick(el.id)}>
                  <MessageContent>
                    <MessageFromUser>{el.fromUserNickname}</MessageFromUser>
                    <MessageDate>{el.createdDate}</MessageDate>
                  </MessageContent>
                  <MessageText>{el.text}</MessageText>
                </MessageWrap>
                <MessageDeleteBtn onClick={handleMessageDelete(el.id)}>
                  삭제
                </MessageDeleteBtn>
              </MessageItem>
            ))}
          </>
        )}
      </MessageContainer>
    </>
  );
}
