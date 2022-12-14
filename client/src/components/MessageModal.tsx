import styled from 'styled-components';

export const ModalBackDrop = styled.div`
  background: rgba(225, 225, 225, 0.831);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 9000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div`
  position: fixed;
  background-color: white;
  min-width: 360px;
  width: 40%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  z-index: 9999;
  @media screen and (max-width: 767px) {
    width: 90%;
    min-width: 220px;
    max-width: 360px;
  }
`;

const MessageInput = styled.textarea`
  padding: 5px;
  width: 100%;
  height: 100%;
  border: 1px solid #ff5924;
  border-radius: 5px;
`;

const MessageForm = styled.form`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BtnGroup = styled.div`
  display: flex;
`;

export const SendBtn = styled.button`
  padding: 5px;
  margin: 2px;
  width: 60px;
  height: 30px;
  border: none;
  color: white;
  border-radius: 5px;
  background-color: #ff5924;
`;

export const SendCancelBtn = styled.button`
  padding: 5px;
  margin: 2px;
  width: 60px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 5px;
  color: #949393;
  background-color: white;
`;

const ModalTitle = styled.h2`
  text-align: left;
  width: 90%;
  height: 10%;
`;

interface MessageModalProps {
  setIsMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MessageModal({ setIsMessageOpen }: MessageModalProps) {
  return (
    <ModalBackDrop>
      <ModalView>
        <ModalTitle>문의내용</ModalTitle>
        <MessageForm>
          <MessageInput value="아직 준비 중인 기능입니다"></MessageInput>
          <BtnGroup>
            <SendBtn
              onClick={(e) => {
                e.preventDefault();
                setIsMessageOpen(false);
              }}
            >
              보내기
            </SendBtn>
            <SendCancelBtn
              onClick={(e) => {
                e.preventDefault();
                setIsMessageOpen(false);
              }}
            >
              취소하기
            </SendCancelBtn>
          </BtnGroup>
        </MessageForm>
      </ModalView>
    </ModalBackDrop>
  );
}

export default MessageModal;
