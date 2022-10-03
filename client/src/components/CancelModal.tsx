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
import { ApplyListVal, PaginationVal } from 'types/programs';

interface CancelModalProps {
  setIsCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyMemberfilter: ApplyListVal[];
  setApplyList: React.Dispatch<React.SetStateAction<ApplyListVal[]>>;
  programId: number | undefined;
  setPageList: React.Dispatch<React.SetStateAction<PaginationVal | undefined>>;
}

function CancelModal({
  setIsCancelOpen,
  applyMemberfilter,
  setApplyList,
  programId,
  setPageList,
}: CancelModalProps) {
  const DEV_URL = process.env.REACT_APP_DEV_URL;

  const cancelApply = async () => {
    await axios
      .delete(`${DEV_URL}/api/applies/${applyMemberfilter[0].id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setIsCancelOpen(false);
      })
      .catch((err) => {
        setIsCancelOpen(false);
        console.log(err);
      });

    await axios
      .get(`${DEV_URL}/api/applies?page=1&size=4&programId=${programId}`)
      .then((res) => {
        setApplyList(res.data.data);
        setPageList(res.data.pageInfo);
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
