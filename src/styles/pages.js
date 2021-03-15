import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  margin: 0 auto;
  max-width: 960px;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem;
  margin: 1rem 0;
  border-radius: 20px;
  background-color: #fff;
  border: 2px solid #cdd4d9;
  box-shadow: 4px 4px 16px #0007;
  max-width: ${({ maxWidth }) => maxWidth || 'initial'};
  align-items: ${({ alignItems }) => alignItems || 'initial'};
  flex-direction: ${({ flexDirecion }) => flexDirecion || 'initial'};
  justify-content: ${({ justifyContent }) => justifyContent || 'initial'};
`;

export const ErrorContainer = styled.div`
  margin-bottom: 0.5rem;
  min-height: 20px;
`;

export const Error = styled.p`
  color: #e81123;
  text-align: right;
  display: ${({ error }) => (error ? 'block' : 'none')};
`;

export const Button = styled.button`
  height: 36px;
  display: flex;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 16px;
  padding: 8px 16px;
  align-items: center;
  border-radius: 20px;
  transition: 0.3s all;
  justify-content: center;
  box-shadow: 1px 1px 4px #0007;
  color: ${({ color }) => color || '#333'};
  width: ${({ width }) => width || 'auto'};
  margin-top: ${({ marginTop }) => marginTop || '2.5rem'};
  margin-left: ${({ marginLeft }) => marginLeft || 'auto'};
  margin-right: ${({ marginRight }) => marginRight || 'auto'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0px'};
  background-color: ${({ bgColor }) => bgColor || '#90fd92'};

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    opacity: 0.6;
  }
`;

export const FormGroup = styled.div`
  display: flex;

  div + div {
    margin-left: 1rem;
  }
`;

export const FormControl = styled.div`
  position: relative;
  flex: 1;
  margin-bottom: ${({ marginBottom }) => marginBottom || '1.5rem'};

  select {
    z-index: 1;
    position: relative;
    background-color: transparent;

    &:disabled {
      color: #333;
    }
  }

  select + svg {
    top: 80%;
    right: 2%;
    position: absolute;
    transform: translateY(-80%);
  }
`;

export const Label = styled.label`
  font-size: ${({ fontSize }) => fontSize || '1.25rem'};
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  height: 36px;
  outline: none;
  font-size: 18px;
  line-height: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  border-color: ${({ error, value }) => {
    return error && !value ? '#e81123' : 'initial';
  }};

  &[type='checkbox'] {
    height: initial;
    width: initial;
    margin-right: 0.5rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  outline: none;
  font-size: 18px;
  resize: vertical;
  min-height: 128px;
  line-height: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  border-color: ${({ error, value }) => {
    return error && !value ? '#e81123' : 'initial';
  }};
`;

export const Select = styled.select`
  width: 100%;
  height: 36px;
  outline: none;
  font-size: 18px;
  line-height: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  appearance: none;
  border-color: ${({ error, value }) => {
    return error && !value ? '#e81123' : 'initial';
  }};
`;

export const Text = styled.p`
  font-size: 1rem;
`;

export const Title = styled(Text)`
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody {
    tr {
      &:nth-child(2n + 1) {
        background-color: #4924;
      }

      &:hover {
        td:not(:last-child) {
          transition: 0.3s all;
          opacity: 0.6;
        }

        td:last-child {
          svg {
            opacity: 0.6;
          }
        }
      }

      td:last-child {
        svg {
          transition: 0.3s all;
          margin-left: 0.25rem;

          &:hover {
            opacity: 1;
            cursor: pointer;
          }
        }
      }
    }
  }

  th {
    font-weight: bold;
    text-align: left;
    border-bottom: 1px double #999;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  th,
  td {
    padding: 0.5rem;
  }
`;
