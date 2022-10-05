import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import CheckBox from 'components/CheckBox';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewContainer = styled.div`
  margin-bottom: 15rem;
`;
const ReviewHead = styled.div`
  color: ${(props) => props.theme.accent};
`;
const WantAgainWrap = styled.div`
  margin-bottom: 2rem;
`;
const WantAgainContent = styled.div``;
const WantAgainHead = styled.div`
  margin-top: 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
`;
const ProgSurveyWrap = styled.div`
  margin-top: 15px;
  font-size: 1rem;
  padding-bottom: 10px;
  line-height: 150%;
`;
const ReviewBtnWrap = styled.div`
  margin-top: 20px;
  float: right;
`;
const CreateBtn = styled.button`
  border-radius: 5px;
  border: none;
  padding: 0.8rem 1rem;
  background-color: ${(props) => props.theme.accent};
  color: white;
  font-weight: 600;
`;
const MemberRowWapper = styled.div`
  display: flex;
`;
const MemberNickName = styled.div``;
const MemberInput = styled.input`
  appearance: none;
  width: 3rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
`;

export default function ReviewCreate() {
  const { programId, applyId } = useParams();
  const URL = process.env.REACT_APP_DEV_URL;
  const [members, setMembers] = useState<any>([]);
  const [ischecked, setIsChecked] = useState<boolean>(false);
  const [goodMember, setGoodMember] = useState<any>([]);

  const surveyMemberList = ['스티브', '제임스', '데이비드', '케이트'];
  const secondSurveyMember = ['안녕', '제임스', '데이비드', '케이트'];
  const surveyScoreList = [
    '매우 만족',
    '만족',
    '보통',
    '불만족',
    '매우 불만족',
  ];
  const [checkedSurvey, setCheckedSurvey] = useState<string[]>([]);
  const onSurveyChecked = (checked: string[]) => {
    setCheckedSurvey(checked);
    console.log(checked);
  };

  const getProgramApplyList = async () => {
    await axios
      .get(`${URL}/api/applies?page=1&size=4&programId=${programId}`)
      .then((res) => {
        setMembers(res.data.data);
      });
  };

  useEffect(() => {
    getProgramApplyList();
  }, []);
  //   console.log('멤버 :', members && members, goodMember);

  const handleReviewSubmit = async () => {
    await axios.post(`${URL}/api/reviews`, {
      applyId: applyId,
      likes: [0],
      hate: 0,
      score: -2,
    });
  };

  return (
    <Layout>
      <ReviewContainer>
        <ReviewHead>* 는 필수로 요구되는 사항입니다</ReviewHead>
        <WantAgainWrap>
          <WantAgainContent>
            <WantAgainHead>
              다시 함께하고 싶은 멤버 (복수 선택 가능)
            </WantAgainHead>
            <ProgSurveyWrap>
              <CheckBox
                checkedSurvey={checkedSurvey}
                onCheck={onSurveyChecked}
                surveyName={surveyMemberList}
              />
              {members &&
                members.map((el: any) => (
                  <MemberRowWapper key={el?.id}>
                    <MemberNickName>&nbsp; {el?.user?.nickname}</MemberNickName>
                  </MemberRowWapper>
                ))}
            </ProgSurveyWrap>
          </WantAgainContent>
          <WantAgainContent>
            <WantAgainHead>다신 함께하고 싶지 않은 멤버</WantAgainHead>
            <ProgSurveyWrap>
              <CheckBox
                checkedSurvey={checkedSurvey}
                onCheck={onSurveyChecked}
                surveyName={secondSurveyMember}
              />
              {members &&
                members.map((el: any) => (
                  <MemberRowWapper key={el?.id}>
                    <input type="checkbox" />
                    <MemberNickName>&nbsp; {el?.user?.nickname}</MemberNickName>
                  </MemberRowWapper>
                ))}
            </ProgSurveyWrap>
          </WantAgainContent>
          <WantAgainContent>
            <WantAgainHead>이 프로그램은 어땠나요? *</WantAgainHead>
            <ProgSurveyWrap>
              <CheckBox
                checkedSurvey={checkedSurvey}
                onCheck={onSurveyChecked}
                surveyName={surveyScoreList}
              />
            </ProgSurveyWrap>
          </WantAgainContent>
        </WantAgainWrap>
        <ReviewBtnWrap>
          <CreateBtn onClick={handleReviewSubmit}>작성완료</CreateBtn>
        </ReviewBtnWrap>
      </ReviewContainer>
    </Layout>
  );
}
