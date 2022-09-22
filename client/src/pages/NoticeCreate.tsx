import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import styled from 'styled-components';

const NoticeWrap = styled.div`
  max-width: 1200px;
  height: 100px;
  margin-bottom: 100%;
`
const NoticeHead = styled.div`
  font-size: 36px;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
`
const NoticeCreateWrap = styled.div`
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const NoticeTitle = styled.div`
  flex-direction: row;
  display: flex;
`
const Label = styled.div`
  width: 10%;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 500;
  padding-top: 25px;
  font-size: 17px;
`;

const NoticeTitleInput = styled.input`
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 10px;
  width: 80%;
  height: 30px;
`

const NoticeBodyInput = styled.textarea`
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  width: 91%;
  height: 200px;
  resize: none;
`
const NoticeBtnWrap = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  float: right;
`
const CreateBtn = styled.button`
  height: 1.9rem;
  padding: 0 1rem;
  margin-left: 1rem;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 0.8rem;
  align-items: center;
  background-color: #fd6d3d;
  &:hover {
    background-color: #e15425;
  }
`
const CancleBtn = styled.button`
  height: 1.9rem;
  padding: 0 1rem;
  margin-left: 1rem;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 0.8rem;
  align-items: center;
  background-color: #b1b1b1;
  &:hover {
    background-color: #8f8e8e;
  }
`


function NoticeCreate() {
  return (
    <Layout>
      <NoticeWrap>
        <NoticeHead>공지사항</NoticeHead>
        <NoticeCreateWrap>
          <NoticeTitle>
            <Label>제목</Label>
            <NoticeTitleInput
            placeholder="제목을 입력해주세요."
            ></NoticeTitleInput>
          </NoticeTitle>
          <form>
            <NoticeBodyInput
              name="contents"
              form="inform"
              autoFocus required wrap='hard'
              placeholder='내용을 입력해주세요.'
              ></NoticeBodyInput>
          </form>
          
        </NoticeCreateWrap>
        <NoticeBtnWrap>
          <Link to="/notice"><CancleBtn>취소하기</CancleBtn></Link>
          <CreateBtn type = "submit">등록하기</CreateBtn>
        </NoticeBtnWrap>
      </NoticeWrap>
    </Layout>
  )
}

export default NoticeCreate;
