import styled from 'styled-components';

export const Content = styled.div`
  flex: 1;
`;

export const HR = styled.hr`
  margin: 0 1rem;
  border-color: #ccc;
  background-color: #ccc;
`;

export const Body = styled.div`
  display: flex;
`;

export const Image = styled.img`
  flex: 1;
  width: auto;
  max-height: 168px;
`;

export const Info = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Revenues = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
  justify-content: space-between;

  &:last-child {
    padding-top: 0.25rem;
    border-top: 1px solid #ccc;
  }

  p > span {
    font-weight: 700;
  }
`;
