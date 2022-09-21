import Layout from 'components/Layout';
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

const NoticeTitleInput = styled.input`
  justify-content: center;
  width: 75%;
  border: 1px solid #ddd;
  padding: 10px;
`
const Label = styled.div`
  margin-bottom: 10px;
`;

const NoticeBody = styled.div`
  height: 100%;
  margin-top: 10px;
`
const NoticeBodyInput = styled.input`
  width: 75%;
  height: 100%;
  border: 1px solid #ddd;
  padding: 10px;
`
const NoticeBtnWrap = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  float: right;
`
const CreateBtn = styled.button`
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #000;
  color: #fff;
  padding: 5px;
`
const CancleBtn = styled.button`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #aaa;
  color: #fff;
  padding: 5px;
`


function NoticeCreate() {
  return (
    <Layout>
      <NoticeWrap>
        <NoticeHead>공지사항</NoticeHead>
        <NoticeCreateWrap>
          <Label>제목</Label>
          <NoticeTitleInput
            id="inputTitle"
            type="text"
            placeholder="제목을 입력해주세요."
            name="title"
            ></NoticeTitleInput>
          <NoticeBody>
            <NoticeBodyInput
              type="text"
              placeholder="내용을 입력해주세요."
              name="contents"
              ></NoticeBodyInput>
          </NoticeBody>
        </NoticeCreateWrap>
        <NoticeBtnWrap>
          <CancleBtn>취소하기</CancleBtn>
          <CreateBtn>등록하기</CreateBtn>
        </NoticeBtnWrap>
      </NoticeWrap>
    </Layout>
  )
}

export default NoticeCreate;
