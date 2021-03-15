import { useState } from 'react';

import { useAuth } from '../../hooks';

import login from '../../assets/img/login.png';

import {
  FormControl,
  Label,
  Input,
  Button,
  ErrorContainer,
  Error,
} from '../../styles/pages';
import { Container, Form, Image } from './styles';

const LogIn = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    inputErr: '',
  });

  const { logIn, error, setError } = useAuth();

  const handleInputChange = ({ target }) => {
    setError(null);
    setValues({
      ...values,
      inputErr: '',
      [target.name]: target.value,
    });
  };

  const handleLogIn = event => {
    event.preventDefault();
    const { username, password } = values;

    if (!username || !password) {
      setError(null);
      setValues({
        ...values,
        inputErr: 'Preenchimento obrigatório',
      });
      return;
    }

    logIn({ username, password });
  };

  return (
    <Container>
      <Image src={login} alt="login" />
      <Form onSubmit={handleLogIn}>
        <ErrorContainer>
          <Error error={error}>{error?.data.error} *</Error>
          <Error error={values.inputErr}>{values.inputErr} *</Error>
        </ErrorContainer>
        <FormControl>
          <Label htmlFor="username">Usuário</Label>
          <Input
            autoFocus={true}
            id="username"
            name="username"
            placeholder="Usuário"
            title="Digite o Usuário"
            error={values.inputErr}
            value={values.username}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            placeholder="Senha"
            title="Digite a Senha"
            type="password"
            error={values.inputErr}
            value={values.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button
          width="200px"
          type="submit"
          title="Clique para entrar no sistema"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LogIn;
