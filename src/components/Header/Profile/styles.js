import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid #eee;
`;

export const TextContainer = styled.div``;

export const AdminContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextAdmin = styled.p`
  margin: 0.5rem 0;
  text-align: center;
  font-weight: 400;
  font-size: 18px;
`;

export const BtnAdmin = styled.p`
  cursor: pointer;

  svg {
    margin-left: 0.5rem;
  }
`;

export const TextName = styled(TextAdmin)`
  font-weight: 900;
  font-size: 16px;
`;
