import styled from 'styled-components';

export const ModalBackDrop = styled.div`
  background: rgba(225, 225, 225, 0.831);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div`
  position: fixed;
  top: 20%;
  background-color: white;
  width: 90%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const MessageInput = styled.input`
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

const BtnGroup = styled.div`
  display: flex;
`;

const SendBtn = styled.button`
  padding: 5px;
  margin: 2px;
  width: 60px;
  height: 30px;
  border: none;
  color: white;
  background-color: #ff5924;
`;

const SendCancelBtn = styled.button`
  padding: 5px;
  margin: 2px;
  width: 60px;
  height: 30px;
  border: none;
  color: white;
  background-color: black;
`;

const ModalTitle = styled.h2`
  text-align: left;
  width: 90%;
  height: 10%;
`;

function MessageModal() {
  return (
    <ModalBackDrop>
      <ModalView>
        <ModalTitle>문의내용</ModalTitle>
        <MessageForm>
          <MessageInput type="textarea"></MessageInput>
          <BtnGroup>
            <SendBtn>보내기</SendBtn>
            <SendCancelBtn>취소하기</SendCancelBtn>
          </BtnGroup>
        </MessageForm>
      </ModalView>
    </ModalBackDrop>
  );
}

export default MessageModal;
