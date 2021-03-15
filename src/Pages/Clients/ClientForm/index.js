import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import {
  storeClient,
  showClient,
  updateClient,
  listClients,
} from '../../../services/client';
import { LoaderSpinner } from '../../../components';

import {
  Container,
  ErrorContainer,
  Error,
  FormControl,
  Label,
  Select,
  Input,
  FormGroup,
  Button,
} from '../../../styles/pages';
import { Form, BtnClose } from './styles';

const ClientForm = ({ clientId, actionType, setClients, toggleModal }) => {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState({});
  const [error, setError] = useState(null);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setError(null);
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { name, address, cpf, phone } = client;
    if (!name || !cpf) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }

    try {
      const { name: fnName } = e.target;
      const fn = { storeClient, updateClient };
      await fn[fnName]({ name, address, cpf, phone }, { id: clientId });
      const data = await listClients();
      setClients(data.clients);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadClient = async () => {
      setLoading(true);
      try {
        const data = await showClient({ id: clientId });
        setClient(data.client);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    clientId && loadClient();
  }, [clientId]);

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
                value={client?.name}
                name="name"
                readOnly={actionType === 'view'}
                error={error}
                placeholder="Nome do cliente"
                title="Digite o nome para este cliente"
              />
            </FormControl>
            <FormControl>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                onChange={handleInputChange}
                value={client?.address}
                name="address"
                readOnly={actionType === 'view'}
                placeholder={
                  actionType === 'view'
                    ? 'Não informado'
                    : 'Endereço do cliente'
                }
                title="Digite o endereço para este cliente"
              />
            </FormControl>
            <FormGroup>
              <FormControl>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  onChange={handleInputChange}
                  value={client?.cpf}
                  error={error}
                  name="cpf"
                  readOnly={actionType === 'view'}
                  placeholder="CPF do cliente"
                  title="Entre com o CPF deste cliente"
                />
              </FormControl>
              <FormControl>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  onChange={handleInputChange}
                  value={client?.phone}
                  name="phone"
                  readOnly={actionType === 'view'}
                  placeholder={
                    actionType === 'view'
                      ? 'Não informado'
                      : 'Telefone do cliente'
                  }
                  title="Entre com o telefone deste cliente"
                />
              </FormControl>
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
                  name="updateClient"
                  type="submit"
                  title="Salvar alterações deste cliente"
                >
                  Salvar alterações
                </Button>
              ) : (
                <Button
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  width="100%"
                  onClick={handleSubmit}
                  name="storeClient"
                  type="submit"
                  title="Criar um novo cliente"
                >
                  Criar cliente
                </Button>
              )}
            </FormGroup>
          </Form>
        </>
      )}
    </Container>
  );
};

export default ClientForm;
