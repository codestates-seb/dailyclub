import { useState } from 'react';
import styled from 'styled-components';

export const FilterButton = styled.button`
  height: 30px;
  width: 100px;
  border: solid 1px lightGrey;
`;

export const DropDownContainer = styled.ul`
  border: solid 1px lightGrey;
  width: 100px;
  height: 90px;
  overflow: scroll;
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
`;

export const DropDouwnList = styled.li`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: lightGrey;
  }
`;

function AreaFilter() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [area, setArea] = useState<string>('지역');

  const handleClickFilterButton = () => {
    setIsClicked(!isClicked);
  };

  const handleClickArea = (e: React.MouseEvent<HTMLElement>) => {
    setArea((e.target as any).textContent);
    setIsClicked(!isClicked);
  };

  const areaList: string[] = [
    '지역',
    '서울',
    '경기/강원',
    '인천',
    '대전/충청',
    '대구/경북',
    '부산/울산/경남',
    '광주/전라',
    '제주',
  ];

  return (
    <>
      <FilterButton onClick={handleClickFilterButton}>{area}</FilterButton>
      {isClicked ? (
        <DropDownContainer>
          {areaList.map((el) => (
            <DropDouwnList onClick={handleClickArea} key={el}>
              {el}
            </DropDouwnList>
          ))}
        </DropDownContainer>
      ) : null}
    </>
  );
}

export default AreaFilter;
