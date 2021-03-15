import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 20px;
  background-color: ${({ isLoading }) => {
    return isLoading ? 'transparent' : '#fff';
  }};
  box-shadow: 4px 4px 16px
    ${({ isLoading }) => {
      return isLoading ? 'transparent' : '#0007';
    }};
`;
