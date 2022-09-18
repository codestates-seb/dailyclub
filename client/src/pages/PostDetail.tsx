import Layout from 'components/Layout';
import styled from 'styled-components';

const DetailContainer = styled.div`

`
const DetailTitle = styled.div`
    
`
const DetailBody = styled.div`

`
const DetailSide = styled.div`

`

export default function PostDetail() {
    return (
        <Layout>
            <DetailContainer>
                <DetailTitle>
                    <h1>글 제목</h1>
                </DetailTitle>
                <DetailBody>

                </DetailBody>
                <DetailSide>
                    
                </DetailSide>
            </DetailContainer>
        </Layout>
    )
}