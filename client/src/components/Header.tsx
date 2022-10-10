import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { searchActions } from 'stores/searchSlice';
import Logo from '../images/Logo.svg';
import Pen from '../images/Pen.svg';
import Message from '../images/Message.svg';
import Search from '../images/Search.svg';
import Profile from '../images/Profile.svg';
import { logoutUser } from 'stores/userInfoSlice';
import { removeLocalStorage } from 'apis/localStorage';
import { byteToBase64 } from 'utils/byteToBase64';
import axios from 'axios';
import LevelPercent from './LevelPercent';

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 10;
  height: 60px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
  background-color: white;
`;
const HeaderContent = styled.div`
  min-width: 590px;
  width: 60%;
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
  width: 200px;
  height: 35px;
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
  align-items: center;
  margin: 1.2rem 0.7rem 0 0.7rem;
`;
const UserInfoColumnWrap = styled.div`
  margin-left: 1rem;
`;
const UserProfileImg = styled.div`
  width: 70px;
  height: 70px;
  cursor: pointer;
`;
const UserNickName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const MyPageBtn = styled.button`
  padding: 0.3rem 1rem;
  width: 88%;
  margin: 15px;
  border: 1px solid lightGray;
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
  padding: 0.4rem 0;
  margin: 0 0.7rem;
  border-bottom: 0.5px solid lightGray;
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
  background-color: #fad5c3;
  border: none;
  padding: 0.4rem 0;
  &:hover {
    background-color: #ddb8a8;
  }
`;
const HeaderLinkText = styled.div`
  font-weight: 300;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Header() {
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
  const [InputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, users, loading, loginId, userId } = useAppSelector(
    (state) => state.userInfo
  );

  const handelSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchActions.getKeyword(InputValue)); //헤더 input값 전역상태에 저장
    navigate('/programs'); // 엔터 시 질문목록 메인페이지로 이동
    setInputValue(''); // input창 초기화
  };
  const handleLogoutBtn = async () => {
    dispatch(logoutUser());
    setIsOpened(false);
    await axios
      .get(`${process.env.REACT_APP_DEV_URL}/logout/${userId}`)
      .then((res) => console.log(res))
      .then(() => {
        removeLocalStorage('access_token');
        removeLocalStorage('refresh_token');
        navigate('/');
      });
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <LogoContent>
            <Link to="/programs">
              <img src={Logo} alt="logo" style={{ height: 55, width: 90 }} />
            </Link>
          </LogoContent>
          <IconContainer>
            <HeaderLinkText>
              <Link to="/programs">홈</Link>
            </HeaderLinkText>
            <HeaderLinkText>
              <Link to="/">서비스 소개 </Link>
            </HeaderLinkText>

            <SearchForm onSubmit={handelSearchSubmit}>
              <SearchBtn>
                <img
                  src={Search}
                  alt="logo"
                  style={{ height: 15, width: 15 }}
                />
              </SearchBtn>
              <SearchInput
                onChange={(e) => setInputValue(e.target.value)}
                value={InputValue}
                placeholder="프로그램 / 모임을 검색해보세요"
              />
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
                  <Link to={`/users/${userId}`}>
                    <img
                      src={Message}
                      alt="logo"
                      style={{ height: 25, width: 25 }}
                    />
                  </Link>
                </Icon>
                <Icon>
                  <ProfileBtn onClick={() => setIsOpened(!isopened)}>
                    <img
                      src={
                        users?.userImages?.length !== 0
                          ? byteToBase64(
                              users?.userImages[0]?.contentType,
                              users?.userImages[0]?.bytes
                            )
                          : Profile
                      }
                      alt="profile"
                      loading="lazy"
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: '50%',
                        boxShadow:
                          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                      }}
                    />
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
                <Link to={`/users/${userId}`}>
                  <UserProfileImg onClick={() => setIsOpened(false)}>
                    <img
                      src={
                        users?.userImages?.length !== 0
                          ? byteToBase64(
                              users?.userImages[0]?.contentType,
                              users?.userImages[0]?.bytes
                            )
                          : Profile
                      }
                      alt="userImg"
                      loading="lazy"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: '50%',
                        boxShadow:
                          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                      }}
                    />
                  </UserProfileImg>
                </Link>
                <UserInfoColumnWrap>
                  <UserNickName>{users?.nickname}</UserNickName>
                  <LevelPercent percent={users?.kind} />
                </UserInfoColumnWrap>
              </UserContent>
              <Link to={`/users/${userId}`}>
                <MyPageBtn onClick={() => setIsOpened(false)}>
                  마이페이지
                </MyPageBtn>
              </Link>
              <NotificationContainer>
                <NotificationLabel>새로운 알림 {1}</NotificationLabel>
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
                <LogoutBtn onClick={handleLogoutBtn}>로그아웃</LogoutBtn>
              </NotificationContainer>
            </WrapChild>
          </WrapParent>
        ) : null}
      </HeaderContainer>
    </>
  );
}
