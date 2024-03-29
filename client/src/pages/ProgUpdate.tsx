import axios from 'axios';
import Layout from 'components/Layout';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImgDeleteBtnSvg from '../images/ImgDeleteBtn.svg';
import { getToday } from 'utils/getToday';
import { useMediaQuery } from 'react-responsive';

const CreateContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 10rem;
  @media screen and (max-width: 767px) {
    height: 100%;
  }
`;

const CreateForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const ProgramInfo = styled.div`
  min-width: 500px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 350px;
    min-width: 250px;
    padding: 10px;
  }
`;

const RecruitInfo = styled.div`
  min-width: 350px;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 350px;
    min-width: 250px;
    padding: 10px;
  }
`;

const ProgramInfoTitle = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    width: 100%;
    min-width: 250px;
  }
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
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0;
  }
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
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0;
  }
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
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
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
  &::-webkit-calendar-picker-indicator {
    &:hover {
      cursor: pointer;
    }
  }
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
  position: relative;
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
  &:hover {
    cursor: pointer;
  }
`;
export const ImgDeleteBtn = styled.button`
  position: absolute;
  z-index: 10;
  top: -1rem;
  right: -1rem;
  border: none;
  background-color: transparent;
`;

const MobileTextGrp = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

const MobileImgTextGrp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 25px;
`;

interface PrevProgramProps {
  id: number;
  writer?: {
    id: number;
    loginId: string;
    nickname: string;
    picture: string;
    introduction: string;
    kind: number;
    role: string;
  };
  title: string;
  text: string;
  numOfRecruits: number;
  location: string;
  programDate: string;
  minKind: number;
  programStatus: string;
  bookmarkId: number;
  createdDate: string;
  programImages?: null;
}

function ProgUpdate() {
  const URL = process.env.REACT_APP_DEV_URL;
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [numOfRecruits, setNumOfRecruits] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [programDate, setProgramDate] = useState<string>('');
  const [picture, setPicture] = useState<string | Blob>('');
  const [prev, setPrev] = useState<any>({});
  const [imagePreview, setImagePreview] = useState('');
  const [minkind, setMinKind] = useState<string>(`${prev && prev?.minKind}`);
  const [prevImgId, setPrevImgId] = useState<any>(null);

  const { programId } = useParams();
  const navigate = useNavigate();

  const firstRef = useRef<any>(null);
  const secondRef = useRef<any>(null); //focus 처리시 에러

  const getProgram = async () => {
    await axios
      .get(`${URL}/api/programs/${programId}`)
      .then(({ data }) => {
        setPrev(data);
        setTitle(data?.title);
        setText(data?.text);
        setNumOfRecruits(data?.numOfRecruits);
        setLocation(data?.location);
        setProgramDate(data?.programDate);
        setMinKind(data?.minKind);

        /** 이전이미지 있으면, 이미지 받아오기 */
        if (data?.programImages.length !== 0) {
          setPicture(
            `data:${data.programImages[0].contentType};base64,${data?.programImages[0].bytes}`
          );
          setImagePreview(
            `data:${data.programImages[0].contentType};base64,${data?.programImages[0].bytes}`
          );
          setPrevImgId(data.programImages[0].id); // 이전 img Id
        }
      })
      .catch((err) => console.log(err));
  };

  //처음 렌더링 될 때 제목인풋에 포커즈
  useEffect(() => {
    firstRef.current.focus();
    getProgram();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('id', programId!);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('numOfRecruits', numOfRecruits);
    formData.append('location', location);
    formData.append('programDate', programDate);
    formData.append('minKind', minkind);

    /** 이전이미지가 있어서 base64로 인코딩된 경우 - 이미지파일, 이미지id 추가*/
    if (typeof picture === 'string' && picture.length > 0) {
      /** 미리보기때문에 img base64인코딩 문자열을 다시 => Blob 형식으로 변환 후 전달 */
      const byteString = window.atob((picture as string).split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: `${prev && prev?.programImages[0].contentType}`,
      });
      // const file = new File([blob], 'image.png'); //이걸로 넣으면 안되서 일단 주석
      formData.append('imageFile', blob);
      formData.append('programImageId', prevImgId);
    } else {
      /** 이전이미지 O 이미지 수정할때 - id전송 */
      if (prevImgId !== null) {
        formData.append('programImageId', prevImgId);
      }
      /** 이전이미지 X 이미지 추가할때 - 파일전송*/
      formData.append('imageFile', picture);
    }

    // for (let values of formData.values()) {
    //   console.log(values); // formData 객체의 정보 확인하는 법
    // }
    axios({
      method: 'patch',
      url: `${URL}/api/programs/${programId}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
      .then((res) => {
        navigate(`/programs/${programId}`);
      })
      .catch((err) => {
        if (err.response.data.fieldErrors) {
          alert(err.response.data.fieldErrors[0].reason);
        } else if (err.response.data.message) {
          alert(err.response.data.message);
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
    setPicture((e.target as any).files[0]);
    // @ts-ignore
    setImagePreview(window.URL.createObjectURL((e.target as any).files[0]));
  };
  const handelImgDeleteBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPicture('');
    setImagePreview('');
  };

  const Mobile = ({ children }: { children?: any }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }: { children: any }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
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
              defaultValue={title}
              name="title"
              minLength={5}
              maxLength={30}
              ref={firstRef}
              onKeyUp={handleInput}
              onChange={handleTitle}
            />
            <ProgramInfoTitle>
              <Redstar>*</Redstar>
              <Label>프로그램 설명</Label>
            </ProgramInfoTitle>
            {/* 프로그램 설명 인풋입니다 */}
            <ContentsInput
              name="contents"
              defaultValue={text}
              ref={secondRef}
              minLength={1}
              maxLength={1000}
              onChange={handleText}
            />
          </ProgramInfo>
          <RecruitInfo>
            <RecruitInfoTitle>
              <Label>모집정보</Label>
              <Redstar>* 필수 입력</Redstar>
            </RecruitInfoTitle>
            <Default>
              <RecruitContents>
                <Redstar>*</Redstar>
                <RecruitName>모집인원</RecruitName>
                {/* 모집인원 인풋입니다 */}
                <RecruitInput
                  type="number"
                  min={numOfRecruits}
                  max="100"
                  name="people"
                  onChange={handleNumofRecruits}
                  defaultValue={numOfRecruits}
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
                  max="2032-12-31"
                  onChange={handleProgramDate}
                  defaultValue={programDate}
                />
              </RecruitContents>
              <RecruitContents>
                <Redstar>*</Redstar>
                <RecruitName>모집지역</RecruitName>
                <AreaSelect
                  name="area"
                  onChange={handleLocation}
                  key={location}
                  defaultValue={location}
                >
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
                    key={prev && prev?.minKind}
                    defaultValue={minkind}
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
            </Default>

            <Mobile>
              <RecruitContents>
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>모집인원</RecruitName>
                </MobileTextGrp>
                {/* 모집인원 인풋입니다 */}
                <RecruitInput
                  type="number"
                  min={numOfRecruits}
                  max="100"
                  name="people"
                  onChange={handleNumofRecruits}
                  defaultValue={numOfRecruits}
                />
              </RecruitContents>
              <RecruitContents>
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>진행날짜</RecruitName>
                </MobileTextGrp>
                {/* 진행날짜 인풋입니다 */}
                <RecruitInput
                  type="date"
                  name="date"
                  min={getToday()}
                  max="2032-12-31"
                  onChange={handleProgramDate}
                  defaultValue={programDate}
                />
              </RecruitContents>
              <RecruitContents>
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>모집지역</RecruitName>
                </MobileTextGrp>
                <AreaSelect
                  name="area"
                  onChange={handleLocation}
                  key={location}
                  defaultValue={location}
                >
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
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>친절도</RecruitName>
                </MobileTextGrp>
                {/* 친절도 인풋입니다 */}
                <KindInputWrap>
                  <KindInput
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    name="kind"
                    onChange={handleMinKindValue}
                    key={prev && prev?.minKind}
                    defaultValue={minkind}
                  />
                  <KindValue>{minkind}%</KindValue>
                </KindInputWrap>
              </RecruitContents>
              <RecruitContents>
                <MobileImgTextGrp>
                  <ImageAdd>이미지 첨부</ImageAdd>
                  <ImageRule>
                    저작권에 위배되지 않는 파일을 업로드 해주세요.
                  </ImageRule>
                </MobileImgTextGrp>
              </RecruitContents>
            </Mobile>
            {!picture ? (
              <ImageLabel htmlFor="file">
                우리 모임을 소개할 이미지를 첨부해주세요.
              </ImageLabel>
            ) : (
              <>
                <ImageLabel htmlFor="file">
                  <img width="100%" height="100%" src={imagePreview}></img>
                  <ImgDeleteBtn type="button" onClick={handelImgDeleteBtn}>
                    <img src={ImgDeleteBtnSvg} alt="delete" />
                  </ImgDeleteBtn>
                </ImageLabel>
              </>
            )}
            <ImageInput
              id="file"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImage}
            />
            <CreateBtn type="submit">수정하기</CreateBtn>
          </RecruitInfo>
        </CreateForm>
      </CreateContainer>
    </Layout>
  );
}

export default ProgUpdate;
