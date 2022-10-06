import axios from 'axios';
import Layout from 'components/Layout';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getToday } from 'utils/getToday';

const CreateContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 10rem;
`;

const CreateForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgramInfo = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RecruitInfo = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProgramInfoTitle = styled.div`
  display: flex;
`;

const Redstar = styled.div`
  color: red;
  margin-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  font-size: 20px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleInput = styled.input`
  all: unset;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  width: 90%;
  height: 30px;
`;

const ContentsInput = styled.textarea`
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  width: 90%;
  height: 600px;
  resize: none;
`;

const RecruitInfoTitle = styled.div`
  display: flex;
  height: 30px;
  margin-bottom: 10px;
`;

const RecruitContents = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
`;

const RecruitName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  font-size: 15px;
  margin-right: 20px;
`;

const RecruitInput = styled.input`
  all: unset;
  height: 100%;
  width: 100%;
  padding-left: 5px;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KindInputWrap = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 5px;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KindInput = styled.input`
  all: unset;
  width: 80%;
  height: 3px;
  margin: 1rem;
  background: #ff5924;
`;

const KindValue = styled.div`
  width: 20%;
  font-size: 1.1rem;
`;

const ImageAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-right: 30px;
`;

const ImageRule = styled.div`
  color: #9d9d9d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-right: 30px;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  height: 200px;
  width: 100%;
  border: 1px solid #e2e6e8;
  color: #9d9d9d;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #9d9d9d;
  }
`;

const CreateBtn = styled.button`
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #ff5924;
  color: white;
  font-size: 20px;
`;

const AreaSelect = styled.select`
  height: 100%;
  width: 100%;
  border: 1px solid #e2e6e8;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
`;

function ProgCreate() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [numOfRecruits, setNumOfRecruits] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [programDate, setProgramDate] = useState<string>('');
  const [imageFile, setImageFile] = useState<string | Blob>(''); //기본이미지일때 구현이 필요함
  const [minkind, setMinKind] = useState<string>('50');
  const [imagePreview, setImagePreview] = useState('');

  const DEV_URL = process.env.REACT_APP_DEV_URL;
  const firstRef = useRef<any>(null);
  const secondRef = useRef<any>(null); //focus 처리시 에러

  const navigate = useNavigate();

  //처음 렌더링 될 때 제목인풋에 포커즈
  useEffect(() => {
    firstRef.current.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('text', text);
    formData.append('numOfRecruits', numOfRecruits);
    formData.append('location', location);
    formData.append('programDate', programDate);
    formData.append('minKind', minkind);
    formData.append('imageFile', imageFile);

    axios({
      method: 'post',
      url: `${DEV_URL}/api/programs`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
      .then((res) => {
        navigate(`/programs/${res.data.id}`);
      })
      .catch((error) => {
        if (error.response.data.fieldErrors) {
          alert(error.response.data.fieldErrors[0].reason);
        } else if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert('새로고침을 진행한 후에 로그인이 되어있다면 작성해주세요!');
        }
      });
  };

  //제목인풋에서 엔터누를시 프로그램 설명 인풋으로 포커즈
  const handleInput = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.target === firstRef.current) {
        secondRef.current.focus();
      }
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleNumofRecruits = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfRecruits(String(e.target.valueAsNumber));
  };

  const handleMinKindValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinKind(String(e.target.valueAsNumber));
  };

  const handleLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const handleProgramDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgramDate(e.target.value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageFile((e.target as any).files[0]);
    // @ts-ignore
    setImagePreview(URL.createObjectURL((e.target as any).files[0]));
  };

  return (
    <Layout>
      <CreateContainer>
        <CreateForm onSubmit={handleSubmit}>
          <ProgramInfo>
            <ProgramInfoTitle>
              <Redstar>*</Redstar>
              <Label>제목</Label>
            </ProgramInfoTitle>
            {/* 제목 인풋입니다 */}
            <TitleInput
              type="text"
              placeholder="제목을 입력해주세요. (5 글자 이상 30 글자 이하)"
              name="title"
              minLength={5}
              maxLength={30}
              ref={firstRef}
              onKeyPress={handleInput}
              required
              onChange={handleTitle}
            />
            <ProgramInfoTitle>
              <Redstar>*</Redstar>
              <Label>프로그램 설명</Label>
            </ProgramInfoTitle>
            {/* 프로그램 설명 인풋입니다 */}
            <ContentsInput
              name="contents"
              placeholder="프로그램 설명을 입력해주세요.
              ex) 모이는 장소, 진행시간, 회비, 오픈 카카오톡 링크 등"
              ref={secondRef}
              onChange={handleText}
              minLength={1}
              maxLength={1000}
              required
            />
          </ProgramInfo>
          <RecruitInfo>
            <RecruitInfoTitle>
              <Label>모집정보</Label>
              <Redstar>* 필수 입력</Redstar>
            </RecruitInfoTitle>
            <RecruitContents>
              <Redstar>*</Redstar>
              <RecruitName>모집인원</RecruitName>
              {/* 모집인원 인풋입니다 */}
              <RecruitInput
                type="number"
                min="1"
                max="100"
                name="people"
                onChange={handleNumofRecruits}
                required
              />
            </RecruitContents>
            <RecruitContents>
              <Redstar>*</Redstar>
              <RecruitName>진행날짜</RecruitName>
              {/* 진행날짜 인풋입니다 */}
              <RecruitInput
                type="date"
                name="date"
                min={getToday()}
                onChange={handleProgramDate}
                required
              />
            </RecruitContents>
            <RecruitContents>
              <Redstar>*</Redstar>
              <RecruitName>모집지역</RecruitName>
              <AreaSelect name="area" onChange={handleLocation}>
                <option value="지역">지역</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="강원">강원</option>
                <option value="인천">인천</option>
                <option value="대전/충청">대전/충청</option>
                <option value="대구/경북">대구/경북</option>
                <option value="부산/울산/경남">부산/울산/경남</option>
                <option value="광주/전라">광주/전라</option>
                <option value="제주">제주</option>
              </AreaSelect>
            </RecruitContents>
            <RecruitContents>
              <Redstar>*</Redstar>
              <RecruitName>친절도</RecruitName>
              {/* 친절도 인풋입니다 */}
              <KindInputWrap>
                <KindInput
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  name="kind"
                  onChange={handleMinKindValue}
                  required
                />
                <KindValue>{minkind}%</KindValue>
              </KindInputWrap>
            </RecruitContents>
            <RecruitContents>
              <ImageAdd>이미지 첨부</ImageAdd>
              <ImageRule>
                저작권에 위배되지 않는 파일을 업로드 해주세요.
              </ImageRule>
            </RecruitContents>
            {!imageFile ? (
              <ImageLabel htmlFor="file">
                우리 모임을 소개할 이미지를 첨부해주세요.
              </ImageLabel>
            ) : (
              <ImageLabel htmlFor="file">
                <img width="100%" height="100%" src={imagePreview}></img>
              </ImageLabel>
            )}
            <ImageInput
              id="file"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImage}
            />
            <CreateBtn type="submit">등록하기</CreateBtn>
          </RecruitInfo>
        </CreateForm>
      </CreateContainer>
    </Layout>
  );
}

export default ProgCreate;
