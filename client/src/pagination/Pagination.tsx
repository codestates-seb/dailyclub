import React from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { PaginationVal } from 'types/programs';
import styled from 'styled-components';

interface PaginationProps {
  list: PaginationVal | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  /* border-radius: 5px; */
  padding: 8px;
  margin: 0;
  /* background: #ff5100; */
  color: black;
  font-size: 1rem;

  &:hover {
    color: #ff5924;
    cursor: pointer;
  }

  &[disabled] {
    color: grey;
    cursor: revert;
    transform: revert;
  }

  &:active {
    color: #c98169;
  }
`;

function Pagination({ list, page, setPage }: PaginationProps) {
  let total = list?.totalElements;
  let limit = list?.size;

  const numPages = [];

  //@ts-ignore
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    numPages.push(i);
  }

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &#9664; {/*◀*/}
        </Button>
        {numPages.map((el) => (
          <Button key={el} onClick={() => setPage(el)} disabled={page === el}>
            {el}
          </Button>
        ))}

        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === numPages.length}
        >
          &#9654; {/*▶*/}
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;
