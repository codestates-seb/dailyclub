import {
  BtnGroup,
  ModalBackDrop,
  ModalView,
  SendBtn,
  SendCancelBtn,
} from './MessageModal';
import { CheckMessage } from './ApplyModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface DeleteModalProps {
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  programId: number | undefined;
}

function DeleteModal({ setIsDeleteOpen, programId }: DeleteModalProps) {
  const DEV_URL = process.env.REACT_APP_DEV_URL;

  const navigate = useNavigate();

  const deleteProgram = () => {
    axios
      .delete(`${DEV_URL}/api/programs/${programId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setIsDeleteOpen(false);
        navigate('/programs');
      })
      .catch((err) => {
        setIsDeleteOpen(false);
      });
  };

  return (
    <ModalBackDrop>
      <ModalView>
        <CheckMessage>프로그램을 삭제하시겠습니까?</CheckMessage>
        <BtnGroup>
          <SendCancelBtn
            onClick={() => {
              setIsDeleteOpen(false);
            }}
          >
            취소
          </SendCancelBtn>
          <SendBtn onClick={deleteProgram}>확인</SendBtn>
        </BtnGroup>
      </ModalView>
    </ModalBackDrop>
  );
}

export default DeleteModal;
