import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Layout from 'components/Layout';
import styled from 'styled-components';
import ProgressBar from 'components/ProgressBar';
import LevelPercent from 'components/LevelPercent';
import BookMarkTab, { DoneMsg } from 'components/Tab/BookMarkTab';
import MessageTab from 'components/Tab/MessageTab';
import Pagination from 'pagination/Pagination';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProfileSvg from '../images/Profile.svg';
import axios from 'axios';
import { useAppSelector } from 'stores/hooks';
import { ApplyListVal, PaginationVal, ProgramDetailVal } from 'types/programs';
import ImgDeleteBtnSvg from '../images/ImgDeleteBtn.svg';
import { ImgDeleteBtn } from './ProgUpdate';
import { useAppDispatch } from 'stores/hooks';
import { fetchUserInfo, logoutUser } from 'stores/userInfoSlice';
import BasicImg from '../images/BasicImg.jpg';
import { compareWithToday } from '../utils/compareWithToday';
import { byteToBase64 } from '../utils/byteToBase64';
import { removeLocalStorage } from 'apis/localStorage';
import KindGuide from 'components/KindGuide';
import MessageModal from 'components/MessageModal';

const MyPageContainer = styled.div`
  display: flex;
  margin-bottom: 23rem;
`;

const ResMypageContainer = styled.div`
  margin-bottom: 23rem;
  align-items: center;
`;

/* 프로필 부분 */
const Profile = styled.div`
  min-width: 210px;
  width: 30%;
  height: 100%;
  margin: 1rem;
`;

const ResProfile = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const ProfileWrap = styled.div`
  height: 43%;
  padding: 2rem 1rem 2rem 1rem;
  border: 1px solid #e2e6e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResProfileWrap = styled.div`
  align-items: center;
`;


const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResForm = styled.form`
`;

const ResImgInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const MyInfo = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.div`
  margin: 1rem;
  background-color: #e2e6e8;
  border-radius: 50%;
`;

const ResProfileImage = styled.div`
`

const ProfileNickname = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1rem;
`;

const NicknameNIntro = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
  width: 200px;
`;

const ProfileIntro = styled.div`
  font-weight: lighter;
  margin-bottom: 1rem;
`;

const ResNickname = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 1rem;
`;

const ResIntro = styled.div`
  font-weight: lighter;
  margin-top: 1rem;
`;

const ProfileUpdateBtn = styled.button`
  width: 10rem;
  height: 2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  color: #ff5924;
  margin-bottom: 1rem;
  @media screen and (max-width: 767px) {
    margin-top: 1rem;
    width: 100%;
    height: 2.5rem;
  }
`;

const SendMsgBtn = styled.button`
  width: 10rem;
  height: 2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  color: #ff5924;
  margin-bottom: 1rem;
  @media screen and (max-width: 767px) {
    margin-top: 1rem;
    width: 95%;
    height: 2.5rem;
  }
`;

const SendMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KindWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const KindRowWrap = styled.div`
  display: flex;
  text-align: center;
  
`;

const UpdateInput = styled.input`
  width: 10rem;
  height: 2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const ResInput = styled.input`
  width: 10rem;
  height: 2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  flex-direction: column;
`;

const UpdateImageInput = styled.input`
  display: none;
`;

const UpdateImageLabel = styled.label`
  position: relative;
  width: 7rem;
  height: 7rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e6e8;
  color: #9d9d9d;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #9d9d9d;
  }
  @media screen and (max-width: 767px) {
    width: 4.5rem;
    height: 4.5rem;
    margin: 0;
  }
`;

const OrgImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
/* 탭 부분 */
const TabContainer = styled.div`
  width: 70%;
  height: 100%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const TabMenu = styled.ul`
  color: #bdbdbd;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  margin-bottom: 2rem;
  .submenu {
    padding: 1rem 1rem 0.5rem 1rem;
    margin-left: 1rem;
    cursor: pointer;
    transition: 0.1s;
  }
  .focused {
    border-bottom: 2px solid #e84118;
    color: black;
  }
  @media screen and (max-width: 767px) {

  }
`;


const TabContent = styled.div`
  margin: 1rem;
`;

const NoProg = styled.div`
  text-align: center;
`;

export const ClubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const ClubTabTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin: 2rem 0;
`;
export const ClubItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 1.4rem 1.4rem 0;
  padding: 1.2rem;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const ClubImg = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 30px;
`;
export const ClubInfo = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ClubTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;
export const ClubBody = styled.div`
  font-size: 0.6rem;
  font-weight: 300;
  color: gray;
  margin-bottom: 0.4rem;
`;
export const ClubDate = styled.div`
  font-size: 0.6rem;
  color: #767676;
`;
const UserWrapBtn = styled.div`
  margin-top: 2rem;
  text-align: center;
`;
const WithdrawalBtn = styled.button`
  border: none;
  padding-right: 0.3rem;
  &:hover {
    font-weight: 600;
  }
`;
const LogoutBtn = styled(WithdrawalBtn)`
`;
const CardLeftWrapper = styled.div`
  display: flex;
`;
const ReviewBtn = styled.button`
  border: none;
  font-size: 0.7rem;
  color: white;
  padding: 0 0.5rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.accent};
  &:hover {
    background-color: ${(props) => props.theme.darkAccent};
    transition: 0.1s ease-in-out;
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

function MyPage() {
  const DEV_URL = process.env.REACT_APP_DEV_URL;
  const params = useParams();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Array<ApplyListVal>>([]);
  const [opens, setOpens] = useState<Array<ProgramDetailVal>>([]);
  const [page, setPage] = useState<number>(1);
  const [openListPage, setOpenListPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userInfo);

  // 회원정보조회
  const [data, setData] = useState<any>();
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState<string>('');
  const [userImages, setUserImages] = useState<string | Blob>('');
  const [orgImg, setOrgImg] = useState<string>('');
  const [imgId, setImgId] = useState<any>(null);
  // 신청한 프로그램 리스트
  const [pageList, setPageList] = useState<PaginationVal>();
  const [otherPageList, setOtherPageList] = useState<PaginationVal>();
  // 개설한 프로그램 리스트
  const [openList, setOpenList] = useState<PaginationVal>();
  const [otherOpenList, setOtherOpenList] = useState<PaginationVal>();

  useEffect(() => {
    const getUserProfile = async () =>
      await axios
        .get(`${DEV_URL}/api/users/${params.userId}`, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then((res) => {
          setData(res.data);
          setNickname(res.data?.nickname);
          setIntroduction(res.data?.introduction);

          /** 이전이미지 있으면, 이미지 받아오기 */
          if (res.data?.userImages.length !== 0) {
            setImgId(res.data.userImages[0].id);
            setUserImages(
              `data:${res.data.userImages[0].contentType};base64,${res.data.userImages[0].bytes}`
            );
            setOrgImg(
              `data:${res.data.userImages[0].contentType};base64,${res.data.userImages[0].bytes}`
            );
          } else {
            setImgId(null);
          }
        });

    const getApplyList = async () => {
      await axios
        .get(
          `${DEV_URL}/api/applies/mypage?page=${page}&size=4&userId=${params.userId}`
        )
        .then((res) => {
          // console.log(res?.data.data);
          setPrograms(res.data.data);
          setPageList(res.data.pageInfo);
          setOtherPageList(res.data.pageInfo);
        });
    };

    const getOpenList = async () => {
      await axios
        .get(
          `${DEV_URL}/api/programs/mypage?page=${openListPage}&size=4&userId=${params.userId}`
        )
        .then((res) => {
          // console.log(res?.data.data);
          setOpens(res.data.data);
          setOpenList(res.data.pageInfo);
          setOtherOpenList(res.data.pageInfo);
        });
    };

    getUserProfile();
    getApplyList();
    getOpenList();
  }, [page, openListPage]);

  // 회원탈퇴
  const handleUserDelete = () => {
    if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
      axios
        .delete(`${DEV_URL}/api/users/${params.userId}`)
        .then(() => {
          localStorage.clear();
          alert('그동안 이용해주셔서 감사합니다.');
          navigate('/');
        })
        .catch((err) => alert(err.res.data.message));
    } else {
      return;
    }
  };

  const handleReviewOpen = (applyId?: number, programId?: number) => {
    navigate(`/programs/${programId}/reviews/${applyId}`);
  };

  const [currentTab, setCurrentTab] = useState<number>(0);
  const menuArr = [
    {
      name: '내 모임',
      content: (
        <div>
          <ClubTabTitle>참여 중인 모임</ClubTabTitle>
          {!programs.length ? (
          <NoProg>참여 중인 모임이 없습니다.</NoProg>)
          : (
          <ClubContainer>
            {programs?.map((el: any) => (
              <ClubItem key={el?.id}>
                <Link to={`/programs/${el?.program.id}`} key={el?.program.id}>
                  <CardLeftWrapper>
                    <ClubImg>
                      <img
                        src={
                          el?.program?.programImages?.length === 0
                            ? BasicImg
                            : byteToBase64(
                                el?.program?.programImages[0]?.contentType,
                                el?.program?.programImages[0]?.bytes
                              )
                        }
                        alt="basicImg"
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                        }}
                        loading="lazy"
                      />
                    </ClubImg>
                    <DoneMsg
                      style={{
                        backgroundColor:
                          compareWithToday(el?.program?.programDate) ===
                          '모임종료'
                            ? 'rgba(81, 81, 81, 0.469)'
                            : 'none',
                      }}
                    >
                      {compareWithToday(el?.program?.programDate) === '모임종료'
                        ? '종료'
                        : null}
                    </DoneMsg>
                    <ClubInfo>
                      <ClubTitle>
                        {el?.program.title?.length > 12
                          ? el?.program.title.slice(0, 12) + '...'
                          : el?.program?.title}
                      </ClubTitle>
                      <ClubBody>
                        {el?.program.text?.length > 16
                          ? el?.program.text.slice(0, 16) + '...'
                          : el?.program.text}
                      </ClubBody>
                      <ClubDate>
                        {el?.program.programDate}{' '}
                        {compareWithToday(el?.program?.programDate)}
                      </ClubDate>
                    </ClubInfo>
                  </CardLeftWrapper>
                </Link>
                {compareWithToday(el?.program?.programDate) === '모임종료' &&
                el?.reviewStatus === 'UNREVIEWED' ? (
                  <ReviewBtn
                    onClick={() => handleReviewOpen(el?.id, el?.program?.id)}
                  >
                    리뷰작성
                  </ReviewBtn>
                ) : null}
                {compareWithToday(el?.program?.programDate) === '모임종료' &&
                el?.reviewStatus === 'REVIEWED' ? (
                  <ReviewBtn
                    style={{ backgroundColor: 'gray', cursor: 'default' }}
                  >
                    리뷰완료
                  </ReviewBtn>
                ) : null}
              </ClubItem>
            ))}
          </ClubContainer>
          )}
          <Pagination list={pageList} page={page} setPage={setPage} />
          <ClubTabTitle>개설한 모임</ClubTabTitle>
          {!opens.length ? (
            <NoProg>개설한 모임이 없습니다.</NoProg>)
            : (
          <ClubContainer>
            {opens?.map((el: any) => (
              <ClubItem key={el?.id}>
                <Link to={`/programs/${el?.id}`} key={el?.id}>
                  <CardLeftWrapper>
                    <ClubImg>
                      {' '}
                      <img
                        src={
                          el?.programImages?.length === 0
                            ? BasicImg
                            : byteToBase64(
                                el?.programImages[0]?.contentType,
                                el?.programImages[0]?.bytes
                              )
                        }
                        alt="basicImg"
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                        }}
                        loading="lazy"
                      />
                    </ClubImg>
                    <DoneMsg
                      style={{
                        backgroundColor:
                          compareWithToday(el?.programDate) === '모임종료'
                            ? 'rgba(81, 81, 81, 0.469)'
                            : 'none',
                      }}
                    >
                      {compareWithToday(el?.programDate) === '모임종료'
                        ? '종료'
                        : null}
                    </DoneMsg>
                    <ClubInfo>
                      <ClubTitle>
                        {el?.title?.length > 18
                          ? el?.title.slice(0, 18) + '...'
                          : el?.title}
                      </ClubTitle>
                      <ClubBody>
                        {el?.text?.length > 18
                          ? el?.text.slice(0, 18) + '...'
                          : el?.text}
                      </ClubBody>
                      <ClubDate>
                        {el?.programDate} {compareWithToday(el?.programDate)}
                      </ClubDate>
                    </ClubInfo>
                  </CardLeftWrapper>
                </Link>
              </ClubItem>
            ))}
          </ClubContainer>
            )}
          <Pagination
            list={openList}
            page={openListPage}
            setPage={setOpenListPage}
          />
        </div>
      ),
    },
    {
      name: '메시지함',
      content: (
        <>
          <MessageTab />
        </>
      ),
    },
    {
      name: '북마크',
      content: (
        <>
          <BookMarkTab />
        </>
      ),
    },
  ];
  // others user
  const menuArr2 = [
    {
      name: `${data?.nickname}의 모임`,
      content: (
        <div>
          <ClubTabTitle>참여 중인 모임</ClubTabTitle>
          {!programs.length ? (
            <NoProg>참여 중인 모임이 없습니다.</NoProg>)
            : (
          <ClubContainer>
            {programs?.map((el: any) => (
              <ClubItem key={el?.id}>
                <Link to={`/programs/${el?.program.id}`} key={el?.program.id}>
                  <CardLeftWrapper>
                    <ClubImg>
                      <img
                        src={
                          el?.program?.programImages?.length === 0
                            ? BasicImg
                            : byteToBase64(
                                el?.program?.programImages[0]?.contentType,
                                el?.program?.programImages[0]?.bytes
                              )
                        }
                        alt="basicImg"
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                        }}
                        loading="lazy"
                      />
                    </ClubImg>
                    <DoneMsg
                      style={{
                        backgroundColor:
                          compareWithToday(el?.program?.programDate) ===
                          '모임종료'
                            ? 'rgba(81, 81, 81, 0.469)'
                            : 'none',
                      }}
                    >
                      {compareWithToday(el?.program?.programDate) === '모임종료'
                        ? '종료'
                        : null}
                    </DoneMsg>
                    <ClubInfo>
                      <ClubTitle>
                        {el?.program.title?.length > 18
                          ? el?.program.title.slice(0, 18) + '...'
                          : el?.program?.title}
                      </ClubTitle>
                      <ClubBody>
                        {el?.program.text?.length > 18
                          ? el?.program.text.slice(0, 18) + '...'
                          : el?.program.text}
                      </ClubBody>
                      <ClubDate>
                        {el?.program.programDate}{' '}
                        {compareWithToday(el?.program?.programDate)}
                      </ClubDate>
                    </ClubInfo>
                  </CardLeftWrapper>
                </Link>
              </ClubItem>
            ))}
          </ClubContainer>
          )}
          <Pagination list={otherPageList} page={page} setPage={setPage} />
          <ClubTabTitle>개설한 모임</ClubTabTitle>
          {!opens.length ? (
            <NoProg>개설한 모임이 없습니다.</NoProg>)
            : (
          <ClubContainer>

            {opens?.map((el: any) => (
              <ClubItem key={el?.id}>
                <Link to={`/programs/${el?.id}`} key={el?.id}>
                  <CardLeftWrapper>
                    <ClubImg>
                      {' '}
                      <img
                        src={
                          el?.programImages?.length === 0
                            ? BasicImg
                            : byteToBase64(
                                el?.programImages[0]?.contentType,
                                el?.programImages[0]?.bytes
                              )
                        }
                        alt="basicImg"
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                        }}
                        loading="lazy"
                      />
                    </ClubImg>
                    <DoneMsg
                      style={{
                        backgroundColor:
                          compareWithToday(el?.programDate) === '모임종료'
                            ? 'rgba(81, 81, 81, 0.469)'
                            : 'none',
                      }}
                    >
                      {compareWithToday(el?.programDate) === '모임종료'
                        ? '종료'
                        : null}
                    </DoneMsg>
                    <ClubInfo>
                      <ClubTitle>
                        {el?.title?.length > 18
                          ? el?.title.slice(0, 18) + '...'
                          : el?.title.slice}
                      </ClubTitle>
                      <ClubBody>
                        {el?.text?.length > 18
                          ? el?.text.slice(0, 18) + '...'
                          : el?.text}
                      </ClubBody>
                      <ClubDate>
                        {el?.programDate} {compareWithToday(el?.programDate)}
                      </ClubDate>
                    </ClubInfo>
                  </CardLeftWrapper>
                </Link>
              </ClubItem>
            ))}
            </ClubContainer>
            )}
          <Pagination
            list={otherOpenList}
            page={openListPage}
            setPage={setOpenListPage}
          />
        </div>
      ),
    },
  ];

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };
  const menuTab = menuArr.map((el, index) => (
    <li
      key={index}
      onClick={() => selectMenuHandler(index)}
      className={currentTab === index ? 'submenu focused' : 'submenu'}
    >
      {el.name}
    </li>
  ));

  // others user
  const menuTab2 = menuArr2.map((el, index) => (
    <li
      key={index}
      onClick={() => selectMenuHandler(index)}
      className={currentTab === index ? 'submenu focused' : 'submenu'}
    >
      {el.name}
    </li>
  ));

  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  //프로필 수정모드 변경 함수입니다
  const handleUpdateMode = () => {
    setIsUpdateMode(true);
  };

  //프로필 수정하는 함수입니다
  const profileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('id', String(params.userId!));
    formData.append('nickname', nickname);
    formData.append('introduction', introduction!);

    if (typeof userImages === 'string' && userImages.length > 0) {
      const byteString = window.atob((userImages as string).split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: `${data && data?.userImages[0].contentType}`,
      });
      formData.append('imageFile', blob);
      formData.append('userImageId', imgId);
    } else {
      if (imgId !== null) {
        formData.append('userImageId', imgId);
      }
      formData.append('imageFile', userImages);
    }

    await axios({
      method: 'patch',
      url: `${DEV_URL}/api/users/${params.userId}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    }).catch((err) => console.log(err));

    setIsUpdateMode(false);
    dispatch(fetchUserInfo(Number(params.userId)));

    await axios
      .get(`${DEV_URL}/api/users/${params.userId}`, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((res) => {
        setData(res.data);
        if (res.data?.userImages.length !== 0) {
          setImgId(res.data?.userImages[0].id);
        } else {
          setImgId(null);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserImages((e.target as any).files[0]);
    setOrgImg(URL.createObjectURL((e.target as any).files[0]));
  };

  const handleDeleteImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setUserImages('');
    setOrgImg('');
  };
  const handleMyPageLogout = async () => {
    dispatch(logoutUser());
    await axios
      .get(`${process.env.REACT_APP_DEV_URL}/logout/${userId}`)
      .then((res) => console.log(res))
      .then(() => {
        removeLocalStorage('access_token');
        removeLocalStorage('refresh_token');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <Mobile>
    <Layout>
        {userId === data?.id ? (
          <ResMypageContainer>
            {/* 프로필 부분 - 정석 */}
            <ResProfile>
              <MyInfo>회원 정보</MyInfo>
              <ResProfileWrap>
                {isUpdateMode ? (
                  <ResForm onSubmit={profileUpdate}>
                    <ResImgInfoWrap>
                    {orgImg ? (
                      <UpdateImageLabel htmlFor="file">
                        <OrgImage src={orgImg} alt="profile" />
                        <ImgDeleteBtn onClick={handleDeleteImg}>
                          <img src={ImgDeleteBtnSvg} alt="delete" />
                        </ImgDeleteBtn>
                      </UpdateImageLabel>
                    ) : (
                      <UpdateImageLabel htmlFor="file">
                        프로필 사진 변경
                        <ImgDeleteBtn onClick={handleDeleteImg}>
                          <img src={ImgDeleteBtnSvg} alt="delete" />
                        </ImgDeleteBtn>
                      </UpdateImageLabel>
                    )}
                    <UpdateImageInput
                      id="file"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleImage}
                    ></UpdateImageInput>
                    <NicknameNIntro>
                    <ResInput
                      type="text"
                      defaultValue={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                      }}
                    ></ResInput>
                    <ResInput
                      type="text"
                      defaultValue={introduction}
                      onChange={(e) => {
                        setIntroduction(e.target.value);
                      }}
                    ></ResInput>
                    </NicknameNIntro>
                    </ResImgInfoWrap>
                    <ProfileUpdateBtn type="submit">수정완료</ProfileUpdateBtn>
                  </ResForm>
                ) : (
                  <>
                  <ResImgInfoWrap>
                    <ResProfileImage>
                      {!orgImg ? (
                        <img
                          src={ProfileSvg}
                          alt="profile"
                          style={{ height: 75, width: 75 }}
                        />
                      ) : (
                        <img
                          src={orgImg}
                          style={{ height: 75, width: 75, borderRadius: 50 }}
                        />
                      )}
                    </ResProfileImage>
                    <NicknameNIntro>
                    <ResNickname>{data?.nickname}</ResNickname>
                    <ResIntro>{data?.introduction}</ResIntro>
                    </NicknameNIntro>
                    </ResImgInfoWrap>
                    <ProfileUpdateBtn onClick={handleUpdateMode}>
                      프로필 수정
                    </ProfileUpdateBtn>
                  </>
                )}
                <KindWrap>
                  <KindRowWrap>
                    친절도 &nbsp;
                    <KindGuide />
                  </KindRowWrap>
                  <LevelPercent percent={data?.kind}></LevelPercent>
                </KindWrap>
                <ProgressBar
                  currentPerson={data?.kind}
                  totalPerson={100}
                ></ProgressBar>
                <UserWrapBtn>
                  <WithdrawalBtn onClick={handleUserDelete}>
                    회원탈퇴
                  </WithdrawalBtn>
                  <LogoutBtn onClick={handleMyPageLogout}>로그아웃</LogoutBtn>
                </UserWrapBtn>
              </ResProfileWrap>
            </ResProfile>

            {/* 탭 모임목록부분 - 태경 */}
            <TabContainer>
              <TabMenu>{menuTab}</TabMenu>
              <TabContent>
                <div>{menuArr[currentTab].content}</div>
              </TabContent>
            </TabContainer>
          </ResMypageContainer>
        ) : (
          <ResMypageContainer>
            <ResProfile>
              <ResProfileWrap>
                <ResProfileImage>
                  {!orgImg ? (
                    <img
                      src={ProfileSvg}
                      alt="profile"
                      style={{ height: 75, width: 75 }}
                    />
                  ) : (
                    <img
                      src={orgImg}
                      style={{ height: 75, width: 75, borderRadius: 50 }}
                    />
                  )}
                </ResProfileImage>
                <ResNickname>{data?.nickname}</ResNickname>
                <ResIntro>{data?.introduction}</ResIntro>
                <SendMsgBtn
                  onClick={() => {
                    setIsMessageOpen(true);
                  }}
                >
                  <SendMsg>메시지 보내기</SendMsg>
                </SendMsgBtn>
                <KindWrap>
                  <KindRowWrap>
                    친절도 &nbsp;
                    <KindGuide />
                  </KindRowWrap>
                  <LevelPercent percent={data?.kind}></LevelPercent>
                </KindWrap>
                <ProgressBar
                  currentPerson={data?.kind}
                  totalPerson={100}
                ></ProgressBar>
              </ResProfileWrap>
            </ResProfile>
            <TabContainer>
              <TabMenu>{menuTab2}</TabMenu>
              <TabContent>
                <div>{menuArr2[currentTab].content}</div>
              </TabContent>
            </TabContainer>
          </ResMypageContainer>
        )}
      </Layout>
    </Mobile>
    <Default>
      <Layout>
        {userId === data?.id ? (
          <MyPageContainer>
            {/* 프로필 부분 - 정석 */}
            <Profile>
              <ProfileWrap>
                {isUpdateMode ? (
                  <ProfileForm onSubmit={profileUpdate}>
                    {orgImg ? (
                      <UpdateImageLabel htmlFor="file">
                        <OrgImage src={orgImg} alt="profile" />
                        <ImgDeleteBtn onClick={handleDeleteImg}>
                          <img src={ImgDeleteBtnSvg} alt="delete" />
                        </ImgDeleteBtn>
                      </UpdateImageLabel>
                    ) : (
                      <UpdateImageLabel htmlFor="file">
                        프로필 사진 변경
                        <ImgDeleteBtn onClick={handleDeleteImg}>
                          <img src={ImgDeleteBtnSvg} alt="delete" />
                        </ImgDeleteBtn>
                      </UpdateImageLabel>
                    )}
                    <UpdateImageInput
                      id="file"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleImage}
                    ></UpdateImageInput>
                    <UpdateInput
                      type="text"
                      defaultValue={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                      }}
                    ></UpdateInput>
                    <UpdateInput
                      type="text"
                      defaultValue={introduction}
                      onChange={(e) => {
                        setIntroduction(e.target.value);
                      }}
                    ></UpdateInput>
                    <ProfileUpdateBtn type="submit">수정완료</ProfileUpdateBtn>
                  </ProfileForm>
                ) : (
                  <>
                    <ProfileImage>
                      {!orgImg ? (
                        <img
                          src={ProfileSvg}
                          alt="profile"
                          style={{ height: 100, width: 100 }}
                        />
                      ) : (
                        <img
                          src={orgImg}
                          style={{ height: 100, width: 100, borderRadius: 50 }}
                        />
                      )}
                    </ProfileImage>
                    <ProfileNickname>{data?.nickname}</ProfileNickname>
                    <ProfileIntro>{data?.introduction}</ProfileIntro>
                    <ProfileUpdateBtn onClick={handleUpdateMode}>
                      프로필 수정
                    </ProfileUpdateBtn>
                  </>
                )}
                <KindWrap>
                  <KindRowWrap>
                    친절도 &nbsp;
                    <KindGuide />
                  </KindRowWrap>
                  <LevelPercent percent={data?.kind}></LevelPercent>
                </KindWrap>
                <ProgressBar
                  currentPerson={data?.kind}
                  totalPerson={100}
                ></ProgressBar>
                <UserWrapBtn>
                  <WithdrawalBtn onClick={handleUserDelete}>
                    회원탈퇴
                  </WithdrawalBtn>
                  <LogoutBtn onClick={handleMyPageLogout}>로그아웃</LogoutBtn>
                </UserWrapBtn>
              </ProfileWrap>
            </Profile>

            {/* 탭 모임목록부분 - 태경 */}
            <TabContainer>
              <TabMenu>{menuTab}</TabMenu>
              <TabContent>
                <div>{menuArr[currentTab].content}</div>
              </TabContent>
            </TabContainer>
          </MyPageContainer>
        ) : (
          <MyPageContainer>
            <Profile>
              <ProfileWrap>
                <ProfileImage>
                  {!orgImg ? (
                    <img
                      src={ProfileSvg}
                      alt="profile"
                      style={{ height: 100, width: 100 }}
                    />
                  ) : (
                    <img
                      src={orgImg}
                      style={{ height: 100, width: 100, borderRadius: 50 }}
                    />
                  )}
                </ProfileImage>
                <ProfileNickname>{data?.nickname}</ProfileNickname>
                <ProfileIntro>{data?.introduction}</ProfileIntro>
                <SendMsgBtn
                  onClick={() => {
                    setIsMessageOpen(true);
                  }}
                >
                  <SendMsg>메시지 보내기</SendMsg>
                </SendMsgBtn>
                <KindWrap>
                  <KindRowWrap>
                    친절도 &nbsp;
                    <KindGuide />
                  </KindRowWrap>
                  <LevelPercent percent={data?.kind}></LevelPercent>
                </KindWrap>
                <ProgressBar
                  currentPerson={data?.kind}
                  totalPerson={100}
                ></ProgressBar>
              </ProfileWrap>
            </Profile>
            <TabContainer>
              <TabMenu>{menuTab2}</TabMenu>
              <TabContent>
                <div>{menuArr2[currentTab].content}</div>
              </TabContent>
            </TabContainer>
          </MyPageContainer>
        )}
      </Layout>
      </Default>
      {isMessageOpen ? (
        <MessageModal setIsMessageOpen={setIsMessageOpen} />
      ) : null}
    </>
  );
}

export default MyPage;
