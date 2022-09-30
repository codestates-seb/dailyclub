import styled from 'styled-components';
import {
  BtnGroup,
  ModalBackDrop,
  ModalView,
  SendBtn,
  SendCancelBtn,
} from './MessageModal';

export const CheckMessage = styled.div`
  margin-bottom: 10px;
  font-size: 30px;
`;

function ApplyModal() {
  return (
    <ModalBackDrop>
      <ModalView>
        <CheckMessage>신청을 완료하시겠습니까?</CheckMessage>
        <BtnGroup>
          <SendCancelBtn>취소</SendCancelBtn>
          <SendBtn>확인</SendBtn>
        </BtnGroup>
      </ModalView>
    </ModalBackDrop>
  );
}

export default ApplyModal;
