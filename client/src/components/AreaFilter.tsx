import { useState } from 'react';
import { filterActions, getLocation } from 'stores/filterSlice';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import styled from 'styled-components';
import DownArrow from '../images/DownArrow.svg';

export const FilterButton = styled.button`
  height: 30px;
  width: 130px;
  border: 0.7px solid lightGrey;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4rem;
`;
const WrapLocationParent = styled.div`
  position: relative;
`;

export const DropDownContainer = styled.ul`
  position: absolute;
  z-index: 1;
  background-color: white;
  border: solid 0.7px lightGrey;
  border-radius: 5px;
  width: 100%;
  height: 160px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bab9b9;
    border-radius: 15px;
    scrollbar-width: thin;
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

interface AreaProps {
  setAreaSelected?: React.Dispatch<React.SetStateAction<string>>;
  setParamsData?: any;
  paramsData?: any;
}

function AreaFilter({ setAreaSelected, setParamsData, paramsData }: AreaProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [area, setArea] = useState<string>('지역');
  const dispatch = useAppDispatch();
  const getFilterLocation = useAppSelector(getLocation);

  const handleClickFilterButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  const handleClickArea = (e: React.MouseEvent<HTMLElement>) => {
    setArea((e.target as any).textContent);
    setIsClicked(!isClicked);

    if (setAreaSelected) {
      if ((e.target as any).textContent === '전체') {
        const { location, programDate, minKind, ...rest } = paramsData;
        setAreaSelected('');
        setParamsData({
          ...rest,
        });
        dispatch(filterActions.setLocation(''));
      } else {
        setAreaSelected((e.target as any).textContent);
        setParamsData({
          ...paramsData,
          location: (e.target as any).textContent,
        });
        dispatch(filterActions.setLocation((e.target as any).textContent));
      }
    }
  };

  const areaList: string[] = [
    '전체',
    '서울',
    '경기',
    '강원',
    '인천',
    '대전/충청',
    '대구/경북',
    '부산/울산/경남',
    '광주/전라',
    '제주',
  ];

  return (
    <WrapLocationParent>
      <FilterButton onClick={handleClickFilterButton}>
        {area}
        {/* {getFilterLocation.length > 0 ? getFilterLocation : area} */}
        <img src={DownArrow} alt="down arrow" />
      </FilterButton>
      {isClicked ? (
        <DropDownContainer>
          {areaList.map((el) => (
            <DropDouwnList onClick={handleClickArea} key={el}>
              {el}
            </DropDouwnList>
          ))}
        </DropDownContainer>
      ) : null}
    </WrapLocationParent>
  );
}

export default AreaFilter;
