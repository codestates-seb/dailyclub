import styled from 'styled-components';
import {
  BtnGroup,
  ModalBackDrop,
  ModalView,
  SendBtn,
  SendCancelBtn,
} from './MessageModal';
import { CheckMessage } from './ApplyModal';
import axios from 'axios';
import { ApplyListVal } from 'types/programs';

interface CancelModalProps {
  setIsCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyMemberfilter: ApplyListVal[];
}

function CancelModal({ setIsCancelOpen, applyMemberfilter }: CancelModalProps) {
  const DEV_URL = process.env.REACT_DEV_URL;

  const cancelApply = () => {
    axios.delete(`${DEV_URL}/api/applies/${applyMemberfilter[0].id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <ModalBackDrop>
      <ModalView>
        <CheckMessage>신청을 취소하시겠습니까?</CheckMessage>
        <BtnGroup>
          <SendCancelBtn
            onClick={() => {
              setIsCancelOpen(false);
            }}
          >
            아니요
          </SendCancelBtn>
          <SendBtn onClick={cancelApply}>네</SendBtn>
        </BtnGroup>
      </ModalView>
    </ModalBackDrop>
  );
}
export default CancelModal;
