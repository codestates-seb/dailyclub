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

const ClubBookmarkBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: -1px;
  border: none;
  background-color: transparent;
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
              <Link to={`/programs/${el?.program?.id}`}>
                <ClubImg>
                  <img
                    src={
                      el?.program?.programImages?.length === 0
                        ? BasicImg
                        : `data:${el?.program?.programImages[0].contentType};base64,${el?.program?.programImages[0].bytes}`
                    }
                    alt="basicImg"
                    style={{ height: 40, width: 40, borderRadius: 50 }}
                    loading="lazy"
                  />
                </ClubImg>
              </Link>
              <Link to={`/programs/${el?.program?.id}`}>
                <ClubInfo>
                  <ClubTitle>
                    [{el?.program?.location}] {el?.program?.title.slice(0, 16)}
                  </ClubTitle>
                  <ClubBody>{el?.program?.text.slice(0, 18)}</ClubBody>
                  <ClubDate>{el?.program?.programDate}</ClubDate>
                </ClubInfo>
              </Link>
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
