import axios from 'axios';
import Layout from 'components/Layout';
import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getToday } from 'utils/getToday';

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
  line-height: 20px;
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

function ProgCreate() {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [numOfRecruits, setNumOfRecruits] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [programDate, setProgramDate] = useState<string>('');
  const [imageFile, setImageFile] = useState<string | Blob>(''); //????????????????????? ????????? ?????????
  const [minkind, setMinKind] = useState<string>('50');
  const [imagePreview, setImagePreview] = useState('');

  const DEV_URL = process.env.REACT_APP_DEV_URL;
  const firstRef = useRef<any>(null);
  const secondRef = useRef<any>(null); //focus ????????? ??????

  const navigate = useNavigate();

  //?????? ????????? ??? ??? ??????????????? ?????????
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
          alert('??????????????? ????????? ?????? ???????????? ??????????????? ??????????????????!');
        }
      });
  };

  //?????????????????? ??????????????? ???????????? ?????? ???????????? ?????????
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
              <Label>??????</Label>
            </ProgramInfoTitle>
            {/* ?????? ??????????????? */}
            <TitleInput
              type="text"
              placeholder="????????? ??????????????????. (5 ?????? ?????? 30 ?????? ??????)"
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
              <Label>???????????? ??????</Label>
            </ProgramInfoTitle>
            {/* ???????????? ?????? ??????????????? */}
            <ContentsInput
              name="contents"
              placeholder="???????????? ????????? ??????????????????.
              ex) ????????? ??????, ????????????, ??????, ?????? ???????????? ?????? ???"
              ref={secondRef}
              onChange={handleText}
              minLength={1}
              maxLength={1000}
              wrap="hard"
              required
            />
          </ProgramInfo>
          <RecruitInfo>
            <RecruitInfoTitle>
              <Label>????????????</Label>
              <Redstar>* ?????? ??????</Redstar>
            </RecruitInfoTitle>

            <Default>
              <RecruitContents>
                <Redstar>*</Redstar>
                <RecruitName>????????????</RecruitName>
                {/* ???????????? ??????????????? */}
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
                <RecruitName>????????????</RecruitName>
                {/* ???????????? ??????????????? */}
                <RecruitInput
                  type="date"
                  name="date"
                  id="date"
                  min={getToday()}
                  max="2032-12-31"
                  onChange={handleProgramDate}
                  required
                />
              </RecruitContents>
              <RecruitContents>
                <Redstar>*</Redstar>
                <RecruitName>????????????</RecruitName>
                <AreaSelect name="area" onChange={handleLocation}>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????/??????">??????/??????</option>
                  <option value="??????/??????">??????/??????</option>
                  <option value="??????/??????/??????">??????/??????/??????</option>
                  <option value="??????/??????">??????/??????</option>
                  <option value="??????">??????</option>
                </AreaSelect>
              </RecruitContents>
              <RecruitContents>
                <Redstar>*</Redstar>
                <RecruitName>?????????</RecruitName>
                {/* ????????? ??????????????? */}
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
                <ImageAdd>????????? ??????</ImageAdd>
                <ImageRule>
                  ???????????? ???????????? ?????? ????????? ????????? ????????????.
                </ImageRule>
              </RecruitContents>
            </Default>

            <Mobile>
              <RecruitContents>
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>????????????</RecruitName>
                </MobileTextGrp>
                {/* ???????????? ??????????????? */}
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
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>????????????</RecruitName>
                </MobileTextGrp>
                {/* ???????????? ??????????????? */}
                <RecruitInput
                  type="date"
                  name="date"
                  id="date"
                  min={getToday()}
                  max="2032-12-31"
                  onChange={handleProgramDate}
                  required
                />
              </RecruitContents>
              <RecruitContents>
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>????????????</RecruitName>
                </MobileTextGrp>
                <AreaSelect name="area" onChange={handleLocation}>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????">??????</option>
                  <option value="??????/??????">??????/??????</option>
                  <option value="??????/??????">??????/??????</option>
                  <option value="??????/??????/??????">??????/??????/??????</option>
                  <option value="??????/??????">??????/??????</option>
                  <option value="??????">??????</option>
                </AreaSelect>
              </RecruitContents>
              <RecruitContents>
                <MobileTextGrp>
                  <Redstar>*</Redstar>
                  <RecruitName>?????????</RecruitName>
                </MobileTextGrp>
                {/* ????????? ??????????????? */}
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
                <MobileImgTextGrp>
                  <ImageAdd>????????? ??????</ImageAdd>
                  <ImageRule>
                    ???????????? ???????????? ?????? ????????? ????????? ????????????.
                  </ImageRule>
                </MobileImgTextGrp>
              </RecruitContents>
            </Mobile>

            {!imageFile ? (
              <ImageLabel htmlFor="file">
                ?????? ????????? ????????? ???????????? ??????????????????.
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
            <CreateBtn type="submit">????????????</CreateBtn>
          </RecruitInfo>
        </CreateForm>
      </CreateContainer>
    </Layout>
  );
}

export default ProgCreate;
