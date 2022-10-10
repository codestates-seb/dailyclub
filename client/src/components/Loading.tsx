import Layout from './Layout';
import styled from 'styled-components';

const LoadingWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Loading() {
  return (
    <Layout>
      <LoadingWrap>
        <img
          className="loading"
          alt="now loading..."
          src="loading.gif"
          style={{ margin: '1rem' }}
        />
      </LoadingWrap>
    </Layout>
  );
}

export default Loading;
