import { FunctionComponent } from "react";

interface Props {
    checkedSurvey ?: string[];
    onCheck: (checked : string[]) => void;
    surveyName ?: string[];
}
 
const CheckBoxList : FunctionComponent<Props> = ({
    checkedSurvey =[],
    onCheck,
    surveyName =[]
}) => {

    return (<ol>{surveyName.map((survey, idx)=>
        <li key={survey + '-' + idx}>
            <input type='checkbox' checked={checkedSurvey?.includes(survey)}onChange={(e)=>{
                if(e.target.checked){
                    onCheck([...checkedSurvey!, survey])
                } else{
                    onCheck(checkedSurvey.filter((_survey)=> _survey !== survey));
                }
            }}/>
            <span>{survey}</span>
        </li>
    )}
    </ol>  ); 
}
 
export default CheckBoxList;