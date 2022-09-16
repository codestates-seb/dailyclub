import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const HeaderContainer = styled.div`
  height: 60px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IconContainer = styled.div`
  display: flex;
  margin-left: 16px;
`;
const Logo = styled.div`
  margin: 0 20px;
`;
// const SearchBar = styled.div``;
// const SearchBar = styled.div``;

export default function Header({ isLoggedIn }) {
  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">로고</Link>
      </Logo>
      <IconContainer>
        <FontAwesomeIcon icon={faSearch} size="lg" />
        {isLoggedIn ? (
          <>
            <Link to="/">
              <FontAwesomeIcon icon={faPenToSquare} size="lg" />
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <div>로그인</div>
          </Link>
        )}
      </IconContainer>
    </HeaderContainer>
  );
}
