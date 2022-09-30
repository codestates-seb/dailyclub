import styled from 'styled-components';
import {
  BtnGroup,
  ModalBackDrop,
  ModalView,
  SendBtn,
  SendCancelBtn,
} from './MessageModal';
import { CheckMessage } from './ApplyModal';

function CancelModal() {
  return (
    <ModalBackDrop>
      <ModalView>
        <CheckMessage>신청을 취소하시겠습니까?</CheckMessage>
        <BtnGroup>
          <SendCancelBtn>아니요</SendCancelBtn>
          <SendBtn>네</SendBtn>
        </BtnGroup>
      </ModalView>
    </ModalBackDrop>
  );
}
export default CancelModal;
