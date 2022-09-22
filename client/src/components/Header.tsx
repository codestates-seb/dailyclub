import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Logo from '../images/Logo.svg';
import Pen from '../images/Pen.svg';
import Message from '../images/Message.svg';
import Search from '../images/Search.svg';

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 10;
  height: 60px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
`;
const HeaderContent = styled.div`
  min-width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;
const IconContainer = styled.div`
  display: flex;
`;
const LogoContent = styled.div``;
const Icon = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;
const SearchForm = styled.form`
  height: 35px;
  padding: 0.3rem;
  background-color: #f4f4f4;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;
const SearchBtn = styled.button`
  background-color: #f4f4f4;
  border: none;
  margin-left: 0.5rem;
  color: rgba(143, 143, 143, 0.8);
`;
const SearchInput = styled.input`
  width: 300px;
  margin: 0 0.5rem;
  border-radius: 15px;
  font-weight: 300;
  &::placeholder {
    font-weight: 300;
    color: rgba(143, 143, 143, 0.8);
  }
`;
const LoginText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 1.1rem;
  margin-left: 1rem;
  color: #ff5924;
`;
const ProfileBtn = styled.div`
  cursor: pointer;
`;
/* 프로필 클릭 시 나오는 Wrapper */
const WrapParent = styled.div`
  position: relative;
`;
const WrapChild = styled.div`
  position: absolute;
  top: 42px;
  right: 0px;
  width: 270px;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;
const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.3rem 0;
`;
const UserProfileImg = styled.div`
  width: 70px;
  height: 70px;
  margin-bottom: 15px;
  border: 1px solid grey;
  border-radius: 50%;
  cursor: pointer;
`;
const UserNickName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;
const MyPageBtn = styled.button`
  padding: 0.3rem 1rem;
  margin-top: 15px;
  border: 0.5px solid grey;
  border-radius: 5px;
  font-size: 13px;
  &:hover {
    font-weight: 700;
  }
`;
const NotificationContainer = styled.div`
  font-size: 2px;
  display: flex;
  flex-direction: column;
`;
const NotificationLabel = styled.div`
  padding: 0.5rem 0.7rem;
  background-color: #e6fcf5;
  color: gray;
  font-size: 0.7rem;
`;
const Notifications = styled.div`
  padding: 0.7rem;
  flex: 2;
`;
const Notification = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 0.4rem;
`;
const NotificationConfirm = styled.div`
  width: 7px;
  height: 7px;
  background-color: grey;
  border-radius: 50%;
  margin-right: 0.5rem;
`;
const NotificationContent = styled.span`
  font-size: 11px;
  margin-right: 0.5rem;
  flex: 2;
`;
const NotificationTime = styled.div`
  color: grey;
`;
const LogoutBtn = styled.button`
  font-size: 12px;
  text-align: center;
  background-color: #c3fae8;
  border: none;
  padding: 0.5rem 0;
  &:hover {
    background-color: #a8ddcb;
  }
`;

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  interface NotifyList {
    id: number;
    confirmed: boolean;
    content: string;
    receivedTime: string;
  }
  const notificationList: NotifyList[] = [
    {
      id: 1,
      confirmed: false,
      content: '[서울] 아이유 콘서트..에 변경사항이 있습니다',
      receivedTime: '1분전',
    },
    {
      id: 2,
      confirmed: true,
      content: '[영국] 손흥민 직관... 까지 1일 남았습니다',
      receivedTime: '1분전',
    },
    {
      id: 3,
      confirmed: true,
      content: '[서울] 홍대 라멘투어... 에 변경사항이 있습니다',
      receivedTime: '3일전',
    },
  ];

  const [isopened, setIsOpened] = useState<boolean>(false);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <LogoContent>
            <Link to="/">
              <img src={Logo} alt="logo" style={{ height: 55, width: 90 }} />
            </Link>
          </LogoContent>
          <IconContainer>
            <SearchForm>
              <SearchBtn>
                <img
                  src={Search}
                  alt="logo"
                  style={{ height: 15, width: 15 }}
                />
              </SearchBtn>
              <SearchInput placeholder="프로그램 / 모임을 검색해보세요" />
            </SearchForm>
            {isLoggedIn ? (
              <>
                <Icon>
                  <Link to="/programs/create">
                    <img
                      src={Pen}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />
                  </Link>
                </Icon>
                <Icon>
                  <Link to="/mypage">
                    <img
                      src={Message}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />
                  </Link>
                </Icon>
                <Icon>
                  <ProfileBtn onClick={() => setIsOpened(!isopened)}>
                    <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                  </ProfileBtn>
                </Icon>
              </>
            ) : (
              <LoginText>
                <Link to="/login">로그인</Link>
              </LoginText>
            )}
          </IconContainer>
        </HeaderContent>
        {isopened ? (
          <WrapParent>
            <WrapChild>
              <UserContent>
                <UserProfileImg>
                  <Link to="/mypage"></Link>
                </UserProfileImg>
                <UserNickName>닉네임</UserNickName>
                <MyPageBtn>
                  <Link to="/mypage">마이페이지</Link>
                </MyPageBtn>
              </UserContent>
              <NotificationContainer>
                <NotificationLabel>새 알림 {1}</NotificationLabel>
                <Notifications>
                  {notificationList?.map((notification: NotifyList) => (
                    <Notification key={notification.id}>
                      <NotificationConfirm>
                        {notification.confirmed}
                      </NotificationConfirm>
                      <NotificationContent>
                        {notification.content}
                      </NotificationContent>
                      <NotificationTime>
                        {notification.receivedTime}
                      </NotificationTime>
                    </Notification>
                  ))}
                </Notifications>
                <LogoutBtn>로그아웃</LogoutBtn>
              </NotificationContainer>
            </WrapChild>
          </WrapParent>
        ) : null}
      </HeaderContainer>
    </>
  );
}
