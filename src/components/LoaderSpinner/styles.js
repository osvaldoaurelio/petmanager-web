import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Image = styled.img`
  margin-right: 0.5rem;
  height: ${({ size }) => `${size}px`};
`;

export const Title = styled.p`
  color: ${({ titleColor }) => titleColor};
`;
