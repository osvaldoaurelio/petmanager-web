import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import {
  storeUser,
  showUser,
  resetPassUser,
  updateUser,
  listUsers,
} from '../../../services/user';
import { LoaderSpinner } from '../../../components';

import {
  Container,
  ErrorContainer,
  Error,
  FormControl,
  Label,
  Input,
  FormGroup,
  Button,
} from '../../../styles/pages';
import { Form, BtnClose } from './styles';

const UserForm = ({ userId, actionType, setUsers, toggleModal }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setError(null);
    setUser({ ...user, [name]: value });
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);

    try {
      await resetPassUser({ password: user.username }, { id: userId });
      alert('Senha resetada com sucesso!');
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { name, address, username, password } = user;
    if (!name || !username) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }

    try {
      const { name: fnName } = e.target;
      const fn = { storeUser, updateUser };
      await fn[fnName]({ name, address, username, password }, { id: userId });
      const data = await listUsers();
      setUsers(data.users);
      toggleModal();
    } catch ({ response }) {
      console.log(response);
      setError(response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const data = await showUser({ id: userId });
        setUser(data.user);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    userId && loadUser();
  }, [userId]);

  return (
    <Container>
      {loading ? (
        <LoaderSpinner size={128} />
      ) : (
        <>
          <BtnClose title="Fechar" onClick={toggleModal}>
            <FaTimes />
          </BtnClose>
          <Form onSubmit={handleSubmit}>
            <ErrorContainer>
              <Error error={error}>{error}</Error>
            </ErrorContainer>
            <FormControl>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                autoFocus={true}
                onChange={handleInputChange}
                value={user?.name}
                name="name"
                readOnly={actionType === 'view'}
                error={error}
                placeholder="Nome do funcionário"
                title="Digite o nome para este funcionário"
              />
            </FormControl>
            <FormGroup>
              <FormControl>
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  onChange={handleInputChange}
                  value={user?.username}
                  error={error}
                  name="username"
                  readOnly={actionType !== 'create'}
                  placeholder="Usuário do funcionário"
                  title="Entre com o Usuário deste funcionário"
                />
              </FormControl>
              {actionType === 'edit' && (
                <FormControl>
                  <Button
                    marginTop="1.3rem"
                    bgColor="#f84"
                    width="100%"
                    onClick={handleResetPassword}
                    name="resetPassword"
                    type="submit"
                    title="Reseta a senha deste usuário"
                  >
                    Resetar senha
                  </Button>
                </FormControl>
              )}
              {actionType === 'create' && (
                <FormControl>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    onChange={handleInputChange}
                    value={user?.password}
                    name="password"
                    type="password"
                    readOnly={actionType === 'view'}
                    placeholder="Senha do funcionário"
                    title="Entre com o telefone deste funcionário"
                  />
                </FormControl>
              )}
            </FormGroup>
            <FormGroup>
              {actionType !== 'view' && (
                <Button
                  marginTop="0.5rem"
                  marginRight="0.5rem"
                  width="100%"
                  onClick={toggleModal}
                  title="Cancelar a operação e fechar este modal"
                  bgColor="#cc0"
                >
                  Cancelar
                </Button>
              )}
              {actionType === 'view' ? (
                <Button marginTop="0.5rem" width="100%" onClick={toggleModal}>
                  Fechar
                </Button>
              ) : actionType === 'edit' ? (
                <Button
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  width="100%"
                  onClick={handleSubmit}
                  name="updateUser"
                  type="submit"
                  title="Salvar alterações deste funcionário"
                >
                  Salvar alterações
                </Button>
              ) : (
                <Button
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  width="100%"
                  onClick={handleSubmit}
                  name="storeUser"
                  type="submit"
                  title="Criar um novo funcionário"
                >
                  Criar funcionário
                </Button>
              )}
            </FormGroup>
          </Form>
        </>
      )}
    </Container>
  );
};

export default UserForm;
