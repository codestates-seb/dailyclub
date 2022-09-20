import React, { useState } from "react";
import Layout from 'components/Layout';
import CheckBox from 'components/CheckBox';
import styled from 'styled-components';

const ReviewHead = styled.div`
`
const WantAgainWrap = styled.div`
`

const WantAgainContent = styled.div`
`

const WantAgainHead = styled.div`
    margin-top: 15px;
    font-size: 30px;
    font-weight: 700;
`

const ProgSurveyWrap = styled.div`
    margin-top: 15px;
    font-size: large;
    padding-bottom: 10px;
    line-height: 150%;
`

const ReviewBtnWrap = styled.div`
    margin-top: 20px;
    float: right;
`

const CreateBtn = styled.button`
    border-radius: 5px;
    background-color: #ff9100;
    padding: 5px;
`

export default function ReviewCreate () {
    const surveyMemberList = [
        '스티브',
        '제임스',
        '데이비드',
        '케이트',
    ]
    const surveyScoreList = [
        '매우 만족',
        '만족',
        '보통',
        '불만족',
        '매우 불만족',
    ]
    const [checkedSurvey, setCheckedSurvey] = useState<string[]>([])
    const onSurveyChecked = (checked : string[]) => {
        setCheckedSurvey(checked)
        console.log(checked)
    }

    return (
        <Layout>
            <ReviewHead>
                *는 필수로 요구되는 사항입니다
            </ReviewHead>
            <WantAgainWrap>
                <WantAgainContent>
                    <WantAgainHead>
                        다시 함께하고 싶은 멤버 (복수 선택 가능)
                    </WantAgainHead>
                    <ProgSurveyWrap>
                        <CheckBox
                            checkedSurvey={checkedSurvey}
                            onCheck = {onSurveyChecked}
                            surveyName = {surveyMemberList}
                            />
                    </ProgSurveyWrap>
                </WantAgainContent>
                <WantAgainContent>
                    <WantAgainHead>
                        다신 함께하고 싶지 않은 멤버
                    </WantAgainHead>
                    <ProgSurveyWrap>
                        <CheckBox
                            checkedSurvey={checkedSurvey}
                            onCheck = {onSurveyChecked}
                            surveyName = {surveyMemberList}
                            />
                    </ProgSurveyWrap>
                </WantAgainContent>
                <WantAgainContent>
                    <WantAgainHead>
                        이 프로그램은 어땠나요? *
                    </WantAgainHead>
                    <ProgSurveyWrap>
                        <CheckBox
                            checkedSurvey={checkedSurvey}
                            onCheck = {onSurveyChecked}
                            surveyName = {surveyScoreList}
                            />
                    </ProgSurveyWrap>
                </WantAgainContent>
            </WantAgainWrap>
            <ReviewBtnWrap>
                <CreateBtn>
                    작성완료
                </CreateBtn>
            </ReviewBtnWrap>
        </Layout>
    )
}