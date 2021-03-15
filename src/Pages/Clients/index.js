import { useEffect, useState } from 'react';
import { FaEye, FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

import { LoaderSpinner } from '../../components';
import ClientForm from './ClientForm';

import { useAuth } from '../../hooks';
import { modalStyles } from '../../utils';
import { listClients, removeClient } from '../../services/client';

import {
  Container,
  Button,
  Card,
  Table,
  Title,
  Text,
} from '../../styles/pages';
import { Content } from './styles';

const Clients = () => {
  const { signOut } = useAuth();

  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleCreate = () => {
    setActionType('create');
    setClientId(0);
    toggleModal();
  };

  const handleView = id => {
    setActionType('view');
    setClientId(id);
    toggleModal();
  };

  const handleEdit = id => {
    setActionType('edit');
    setClientId(id);
    toggleModal();
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      await removeClient({ id });
      const data = await listClients();
      setClients(data.clients);
    } catch ({ response }) {
      console.log(response?.data);
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Modal.setAppElement('body');

    const loadClients = async () => {
      setLoading(true);

      try {
        const data = await listClients();
        setClients(data.clients);
      } catch ({ response }) {
        console.log(response?.data);
        response?.data?.error === 'Invalid JWT token' && signOut();
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  return (
    <Container>
      <Card alignItems="center" justifyContent="space-between">
        <Title marginBottom="0px">Clientes</Title>
        <Button
          marginTop="0px"
          marginLeft="0px"
          marginRight="0px"
          onClick={handleCreate}
        >
          <FaPlus size={16} />
          <Text title="Clique para criar um novo cliente">Novo</Text>
        </Button>
      </Card>
      <Content isLoading={loading}>
        {loading ? (
          <LoaderSpinner size={128} />
        ) : (
          <>
            <Modal
              style={modalStyles}
              isOpen={modalIsOpen}
              onRequestClose={toggleModal}
            >
              <ClientForm
                clientId={clientId}
                actionType={actionType}
                setClients={setClients}
                toggleModal={toggleModal}
              />
            </Modal>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Endereço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      Nenhum cliente cadastrado. Para cadastrar um cliente
                      clique em Novo
                    </td>
                    <td></td>
                  </tr>
                )}
                {clients.map(({ id, name, cpf, phone, address }) => (
                  <tr key={`${id}`}>
                    <td>{name}</td>
                    <td>{cpf}</td>
                    <td>{phone}</td>
                    <td>{address}</td>
                    <td>
                      <FaEye
                        size={16}
                        title="Visualizar"
                        onClick={() => handleView(id)}
                      />
                      <FaPen
                        size={14}
                        title="Editar"
                        onClick={() => handleEdit(id)}
                      />
                      <FaTrash
                        size={14}
                        title="Excluir"
                        onClick={() => handleDelete(id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Clients;
