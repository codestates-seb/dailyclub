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
import MenuBar from '../images/MenuBar.svg';
import MenuBarClose from '../images/MenuBarClose.svg';
import { logoutUser } from 'stores/userInfoSlice';
import { removeLocalStorage } from 'apis/localStorage';
import { byteToBase64 } from 'utils/byteToBase64';
import axios from 'axios';
import LevelPercent from './LevelPercent';
import { timeForToday } from 'utils/timeForToday';
import { useEffect } from 'react';
import Pagination from 'pagination/Pagination';
import { useMediaQuery } from 'react-responsive';

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
  @media screen and (max-width: 767px) {
    min-width: 0;
    width: 100%;
    position: absolute;
    top: 0;
    justify-content: space-between;
  }
`;
const IconContainer = styled.div`
  display: flex;
`;
const LogoContent = styled.div`
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
  }
`;
const Icon = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
`;
const SearchForm = styled.form`
  height: 35px;
  padding: 0.3rem;
  background-color: #f4f4f4;
  border-radius: 15px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const SearchBtn = styled.button`
  background-color: #f4f4f4;
  border: none;
  margin-left: 0.5rem;
  color: rgba(143, 143, 143, 0.8);
  @media screen and (max-width: 767px) {
    display: none;
  }
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
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const LoginText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 1.1rem;
  padding: 0 15px;
  color: #ff5924;
`;
const ProfileBtn = styled.div`
  cursor: pointer;
  @media screen and (max-width: 767px) {
    margin: 0 15px;
  }
`;
/* 프로필 클릭 시 나오는 Wrapper */
const WrapParent = styled.div`
  position: relative;
  @media screen and (max-width: 767px) {
    position: static;
  }
`;
const WrapChild = styled.div`
  position: absolute;
  top: 22px;
  right: 0px;
  width: 270px;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  @media screen and (max-width: 767px) {
    top: 52px;
  }
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
const NotificationRead = styled.div`
  width: 7px;
  height: 7px;
  background-color: grey;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const NotificationUnRead = styled.div`
  width: 7px;
  height: 7px;
  background-color: #ff5924;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const NotificationContent = styled.span`
  font-size: 11px;
  margin-right: 0.5rem;
  flex: 2;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
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
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const NotiCounter = styled.div`
  display: inline-block;
  background-color: #ff5924;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  vertical-align: text-top;
  line-height: 1.2rem;
`;
const MenuBoxBackDrop = styled.div`
  &.active {
    background: rgba(28, 28, 28, 0.607);
    position: absolute;
    left: 0;
    top: -1px;
    width: 100%;
    height: 100vh;
  }
`;
const MenuBarBtn = styled.button`
  border: none;
  padding: 10px 15px;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 1px;
  transform: translateX(100%);
  &:focus {
    outline: none;
  }
`;
const MenuBoxLink = styled.div`
  font-size: 1.2rem;
  margin: 15px 15px;
  &:hover {
    font-weight: 700;
  }
`;
const SideNavBar = styled.div`
  background-color: #fff;
  padding: 20px 20px;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  &.active {
    transform: translateX(0);
  }
`;
const MemuImg = styled.img`
  display: block;
  &.active {
    display: none;
  }
`;
const MemuCloseImg = styled.img`
  display: none;
  &.active {
    display: block;
  }
`;
const MobileSearchBtn = styled.button`
  border: none;
  position: absolute;
  right: 75px;
  background-color: transparent;
  z-index: 1;
`;
const MobileSearchContainer = styled.div`
  position: absolute;
  top: 59px;
  left: 0;
  height: 100vh; //// 이상 수정해야함
  width: 101%; // 이상 수정해야함
  background-color: #fff;
  display: flex;
  justify-content: center;
`;
const MobileForm = styled.form`
  height: 35px;
  width: 75%;
  padding: 10px;
  margin: 20px;
  background-color: #f4f4f4;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;
const MobileButton = styled.button`
  background-color: #f4f4f4;
  border: none;
  margin-left: 0.5rem;
  color: rgba(143, 143, 143, 0.8);
`;
const MobileInput = styled.input`
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

const Mobile = ({ children }: { children?: any }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }: { children: any }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

export default function Header() {
  interface NotifyList {
    id: number;
    userId: number;
    programId: number;
    title: string;
    status: string;
    type: string;
    createdDate: string;
  }

  const [isopened, setIsOpened] = useState<boolean>(false);
  const [InputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, users, loading, loginId, userId } = useAppSelector(
    (state) => state.userInfo
  );
  const [notiData, setNotiData] = useState<Array<NotifyList>>([]);
  const [unReadNum, setUnReadNum] = useState<number>(0);
  const [notiPageList, setNotiPageList] = useState();
  const [notiPage, setNotiPage] = useState<number>(1);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handelSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchActions.getKeyword(InputValue)); //헤더 input값 전역상태에 저장
    navigate('/programs'); // 엔터 시 질문목록 메인페이지로 이동
    setInputValue(''); // input창 초기화
    setIsOpenSearch(false);
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

  const getNotification = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DEV_URL}/api/notifications?page=${notiPage}&size=3`
      )
      .then((res) => {
        setNotiData(res.data.data);
        setNotiPageList(res.data.pageInfo);
      });
  };

  const coutNum = async () => {
    await axios
      .get(`${process.env.REACT_APP_DEV_URL}/api/notifications/count`)
      .then((res) => {
        setUnReadNum(res.data);
      });
  };

  const checkNotification = async (
    programId: number,
    notificationId: number
  ) => {
    await axios
      .patch(
        `${process.env.REACT_APP_DEV_URL}/api/notifications/${notificationId}`
      )
      .then((res) => navigate(`/programs/${programId}`));
  };

  useEffect(() => {
    if (isLoggedIn) {
      getNotification();
      coutNum();
    }
  }, [notiPage]);

  //헤더 프로필 버튼 누를때 알림 조회
  const handleProfileBtn = () => {
    setIsOpened(!isopened);
    getNotification();
    coutNum();
  };

  const handleOpenMenuBar = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Default>
            <LogoContent>
              <Link to="/programs">
                <img src={Logo} alt="logo" style={{ height: 55, width: 90 }} />
              </Link>
            </LogoContent>
          </Default>

          <Mobile>
            <MenuBoxBackDrop className={`${isOpenMenu ? 'active' : ''}`}>
              <SideNavBar
                className={`${isOpenMenu ? 'active' : ''}`}
                onBlur={() => setIsOpenMenu(false)}
              >
                <MenuBarBtn onClick={handleOpenMenuBar}>
                  <MemuImg
                    className={`${isOpenMenu ? 'active' : ''}`}
                    src={MenuBar}
                    alt="menu"
                    style={{ height: 35, width: 25 }}
                  />
                  <MemuCloseImg
                    className={`${isOpenMenu ? 'active' : ''}`}
                    src={MenuBarClose}
                    alt="menu close button"
                    style={{ height: 35, width: 25 }}
                  />
                </MenuBarBtn>
                <MenuBoxLink onClick={() => setIsOpenMenu(false)}>
                  <Link to="/programs">홈</Link>
                </MenuBoxLink>
                <MenuBoxLink onClick={() => setIsOpenMenu(false)}>
                  <Link to="/">서비스 소개</Link>
                </MenuBoxLink>
                {isLoggedIn ? (
                  <>
                    <MenuBoxLink onClick={() => setIsOpenMenu(false)}>
                      <Link to="/programs/create">글쓰기</Link>
                    </MenuBoxLink>
                    <MenuBoxLink onClick={() => setIsOpenMenu(false)}>
                      <Link to={`/users/${userId}`}>마이페이지</Link>
                    </MenuBoxLink>
                    <MenuBoxLink onClick={() => setIsOpenMenu(false)}>
                      <Link to={`/users/${userId}`}>메시지함</Link>
                    </MenuBoxLink>
                  </>
                ) : (
                  <MenuBoxLink onClick={() => setIsOpenMenu(false)}>
                    <Link to="/login">로그인</Link>
                  </MenuBoxLink>
                )}
              </SideNavBar>
            </MenuBoxBackDrop>
            <div></div>
            <LogoContent>
              <Link to="/programs">
                <img src={Logo} alt="logo" style={{ height: 55, width: 45 }} />
              </Link>
            </LogoContent>
            <MobileSearchBtn onClick={() => setIsOpenSearch(!isOpenSearch)}>
              <img src={Search} alt="logo" style={{ height: 15, width: 15 }} />
            </MobileSearchBtn>
            {isOpenSearch ? (
              <MobileSearchContainer>
                <MobileForm onSubmit={handelSearchSubmit}>
                  <MobileButton>
                    <img
                      src={Search}
                      alt="logo"
                      style={{ height: 15, width: 15 }}
                    />
                  </MobileButton>
                  <MobileInput
                    onChange={(e) => setInputValue(e.target.value)}
                    value={InputValue}
                    placeholder="프로그램 / 모임을 검색해보세요"
                  />
                </MobileForm>
              </MobileSearchContainer>
            ) : null}
          </Mobile>

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
                  <ProfileBtn onClick={handleProfileBtn}>
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
                    {unReadNum !== 0 ? (
                      <NotiCounter>{unReadNum}</NotiCounter>
                    ) : null}
                  </ProfileBtn>
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
                          <NotificationLabel>
                            새로운 알림 {unReadNum}
                          </NotificationLabel>
                          <Notifications>
                            {notiData
                              ? notiData.map((notification: NotifyList) => (
                                  <Notification key={notification.id}>
                                    {notification.status === 'UNREAD' ? (
                                      <NotificationUnRead />
                                    ) : (
                                      <NotificationRead />
                                    )}
                                    <NotificationContent
                                      onClick={() => {
                                        setIsOpened(false);
                                        checkNotification(
                                          notification.programId,
                                          notification.id
                                        );
                                      }}
                                    >
                                      {notification.type === 'APPLY_COMPLETE'
                                        ? notification.title.slice(0, 10) +
                                          '...에 대한 신청이 완료되었습니다'
                                        : notification.title.slice(0, 10) +
                                          '...프로그램의 모집정보가 변경되었습니다'}
                                    </NotificationContent>
                                    <NotificationTime>
                                      {timeForToday(notification.createdDate)}
                                    </NotificationTime>
                                  </Notification>
                                ))
                              : null}
                          </Notifications>
                          <Pagination
                            list={notiPageList}
                            page={notiPage}
                            setPage={setNotiPage}
                          />
                          <LogoutBtn onClick={handleLogoutBtn}>
                            로그아웃
                          </LogoutBtn>
                        </NotificationContainer>
                      </WrapChild>
                    </WrapParent>
                  ) : null}
                </Icon>
              </>
            ) : (
              <LoginText>
                <Link to="/login">로그인</Link>
              </LoginText>
            )}
          </IconContainer>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
}
