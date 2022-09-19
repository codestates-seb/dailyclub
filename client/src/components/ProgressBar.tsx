import styled from 'styled-components';

interface ProgressProps {
  currentPerson: number;
  totalPerson: number;
}

const ProgressContent = styled.progress`
  width: 100%;
  height: 0.2rem;
  -webkit-appearance: none;
  &::-webkit-progress-bar {
    border-radius: 50px;
    background-color: #edecec;
  }

  &::-webkit-progress-value {
    border-radius: 50px;
    background-color: #38d9a9;
  }
`;

export default function ProgressBar({
  currentPerson,
  totalPerson,
}: ProgressProps) {
  return (
    <>
      <ProgressContent value={(currentPerson / totalPerson) * 100} max="100" />
    </>
  );
}
