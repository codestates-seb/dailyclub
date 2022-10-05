import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ClubTabTitle,
  ClubContainer,
  ClubBody,
  ClubDate,
  ClubImg,
  ClubInfo,
  ClubItem,
  ClubTitle,
} from 'pages/MyPage';
import Pagination from 'pagination/Pagination';
import BasicImg from '../../images/BasicImg.jpg';
import Bookmarked from '../../images/Bookmarked.svg';
import { compareWithToday } from 'utils/compareWithToday';
import { byteToBase64 } from 'utils/byteToBase64';

const ClubBookmarkBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: -1px;
  border: none;
  background-color: transparent;
`;
export const DoneMsg = styled.div`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  padding: 0.85rem 0.55rem;
  color: white;
  font-weight: 300;
  font-size: 0.8rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const ClubBookmarkWrapper = styled.div`
  display: flex;
`;

function BookMarkTab() {
  const URL = process.env.REACT_APP_DEV_URL;
  const [bookmarkPage, setBookmarkPage] = useState(1);
  const [bookmarkPageList, setBookmarkPageList] = useState();
  const [bookmarkList, setBookmarkList] = useState([]);

  const getBookmarkList = async () => {
    await axios
      .get(`${URL}/api/bookmarks?page=${bookmarkPage}&size=10`)
      .then(({ data }) => {
        setBookmarkList(data?.data);
        setBookmarkPageList(data?.pageInfo);
      });
  };

  useEffect(() => {
    getBookmarkList();
  }, []);

  const handleMyPageDeleteBookmark = async (bookmarkId: number) => {
    await axios.delete(`${URL}/api/bookmarks/${bookmarkId}`);
    getBookmarkList();
  };

  return (
    <div>
      <ClubTabTitle>북마크 중인 모임</ClubTabTitle>
      <ClubContainer>
        {bookmarkList &&
          bookmarkList?.map((el: any) => (
            <ClubItem key={el.id}>
              <ClubBookmarkBtn
                onClick={() => handleMyPageDeleteBookmark(el.id)}
              >
                <img src={Bookmarked} alt="bookmark list button" />
              </ClubBookmarkBtn>
              <ClubBookmarkWrapper>
                <Link to={`/programs/${el?.program?.id}`}>
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
                  </ClubImg>
                </Link>
                <Link to={`/programs/${el?.program?.id}`}>
                  <ClubInfo>
                    <ClubTitle>
                      [{el?.program?.location}]{' '}
                      {el?.program?.title.slice(0, 16)}
                    </ClubTitle>
                    <ClubBody>{el?.program?.text.slice(0, 18)}</ClubBody>
                    <ClubDate>
                      {el?.program?.programDate} &nbsp;&nbsp;
                      {compareWithToday(el?.program?.programDate)}
                    </ClubDate>
                  </ClubInfo>
                </Link>
              </ClubBookmarkWrapper>
            </ClubItem>
          ))}
      </ClubContainer>
      <Pagination
        list={bookmarkPageList}
        page={bookmarkPage}
        setPage={setBookmarkPage}
      />
    </div>
  );
}

export default BookMarkTab;
