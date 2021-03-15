import styled from 'styled-components';

import { Container as ContainerBase } from '../../styles/pages';

import bgLogin from '../../assets/img/bg-login.jpeg';

export const Container = styled(ContainerBase)`
  background-image: url(${bgLogin});
  background-repeat: no-repeat;
  background-size: cover;
  max-width: initial;
  height: 100vh;
  margin: 0;
`;

export const Image = styled.img`
  position: absolute;
  z-index: 100;
  top: 22px;
`;

export const Form = styled.form`
  position: absolute;
  top: 160px;
  background-color: #fff;
  width: 100%;
  max-width: 445px;
  padding: 4rem;
  border-radius: 50px;
  border: 2px solid #cdd4d9;
  box-shadow: 4px 4px 16px #0007;
`;
