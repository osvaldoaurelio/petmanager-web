import styled from 'styled-components';

export const Form = styled.form`
  width: 600px;
  margin: 1rem;
  display: flex;
  max-height: 75vh;
  overflow-y: auto;
  flex-direction: column;
  background-color: #fff;
`;

export const BtnClose = styled.div`
  transition: 0.3s all;
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;

  &:hover {
    opacity: 0.6;
  }
`;
