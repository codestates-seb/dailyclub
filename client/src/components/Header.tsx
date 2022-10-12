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
import { timeForToday } from 'utils/timeForToday';
import { useEffect } from 'react';
import Pagination from 'pagination/Pagination';

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
    getNotification();
    coutNum();
  }, [notiPage]);

  //헤더 프로필 버튼 누를때 알림 조회
  const handleProfileBtn = () => {
    setIsOpened(!isopened);
    getNotification();
    coutNum();
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
                <NotificationLabel>새로운 알림 {unReadNum}</NotificationLabel>
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
                <LogoutBtn onClick={handleLogoutBtn}>로그아웃</LogoutBtn>
              </NotificationContainer>
            </WrapChild>
          </WrapParent>
        ) : null}
      </HeaderContainer>
    </>
  );
}
