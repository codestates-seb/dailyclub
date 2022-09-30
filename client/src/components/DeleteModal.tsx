import styled from 'styled-components';
import {
  BtnGroup,
  ModalBackDrop,
  ModalView,
  SendBtn,
  SendCancelBtn,
} from './MessageModal';
import { CheckMessage } from './ApplyModal';

function DeleteModal() {
  return (
    <ModalBackDrop>
      <ModalView>
        <CheckMessage>프로그램을 삭제하시겠습니까?</CheckMessage>
        <BtnGroup>
          <SendCancelBtn>취소</SendCancelBtn>
          <SendBtn>확인</SendBtn>
        </BtnGroup>
      </ModalView>
    </ModalBackDrop>
  );
}

export default DeleteModal;
