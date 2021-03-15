import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FaEye, FaPen, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

import { LoaderSpinner } from '../../components';
import UserForm from './UserForm';

import { listUsers, removeUser } from '../../services/user';
import { lastSettings, storeSettings } from '../../services/setting';
import { modalStyles } from '../../utils';
import { useAuth } from '../../hooks';

import {
  Container,
  Card,
  Button,
  Title,
  Label,
  Input,
  FormControl,
  FormGroup,
  Text,
  Table,
} from '../../styles/pages';
import { Content, Form } from './styles';

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [setting, setSetting] = useState({});
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { signOut } = useAuth();
  const history = useHistory();

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleCreate = () => {
    setActionType('create');
    setUserId(0);
    toggleModal();
  };

  const handleView = id => {
    setActionType('view');
    setUserId(id);
    toggleModal();
  };

  const handleEdit = id => {
    setActionType('edit');
    setUserId(id);
    toggleModal();
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      await removeUser({ id });
      const data = await listUsers();
      setUsers(data.users);
    } catch ({ response }) {
      console.log(response?.data);
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSaveAndLeave = async () => {
    setLoading(true);
    try {
      const data = await storeSettings(setting);
      setSetting(data.setting);
      history.push('/');
    } catch ({ response }) {
      console.log(response?.data);
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await listUsers();
      setUsers(data.users);
    } catch ({ response }) {
      console.log(response?.data);
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await lastSettings();
      setSetting(data.setting);
    } catch ({ response }) {
      console.log(response?.data);
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadSettings();
  }, []);

  return (
    <Container>
      <Card flexDirecion="column">
        <Content>
          <Title>Área de configurações</Title>
          <Button
            marginTop="0px"
            marginLeft="0px"
            marginRight="0px"
            marginBottom="2.5rem"
            onClick={handleSaveAndLeave}
            title="Salvar todas as configurações e retona à tela inicial"
          >
            <FaSave size={16} />
            <Text>Salvar e sair</Text>
          </Button>
        </Content>
        <Form>
          <FormControl>
            <Input
              id="appointmentHalftime"
              name="appointmentHalftime"
              type="checkbox"
              checked={setting.appointmentHalftime}
              onChange={({ target: { name, checked } }) => {
                setSetting({ ...setting, [name]: checked });
              }}
            />
            <Label htmlFor="appointmentHalftime">
              A consulta dura meia hora ao invés de uma hora completa?
            </Label>
          </FormControl>
          <FormGroup>
            <FormControl>
              <Label htmlFor="appointmentPrice">Valor da consulta</Label>
              <Input
                id="appointmentPrice"
                name="appointmentPrice"
                type="number"
                min="1"
                value={setting.appointmentPrice}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Label htmlFor="maxServiceDayly">
                Número máximo de serviços diários
              </Label>
              <Input
                id="maxServiceDayly"
                name="maxServiceDayly"
                type="number"
                min="1"
                value={setting.maxServiceDayly}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormGroup>
        </Form>
      </Card>
      <Card flexDirecion="column">
        <Content>
          <Title>Funcinários cadastrados no sistema</Title>
          <Button
            marginTop="0px"
            marginLeft="0px"
            marginRight="0px"
            marginBottom="2.5rem"
            onClick={handleCreate}
            title="Salvar todas as configurações e retona à tela inicial"
          >
            <FaPlus size={16} />
            <Text title="Clique para criar um novo funcionário">Novo</Text>
          </Button>
        </Content>
        <Modal
          style={modalStyles}
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
        >
          <UserForm
            userId={userId}
            actionType={actionType}
            setUsers={setUsers}
            toggleModal={toggleModal}
          />
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="2">
                  Nenhum funcionário cadastrado. Para cadastrar um funcionário
                  clique em Novo
                </td>
                <td></td>
              </tr>
            )}
            {loading ? (
              <tr>
                <td colSpan="3">
                  <LoaderSpinner size={128} />
                </td>
              </tr>
            ) : (
              users.map(({ id, name, username }) => (
                <tr key={`${id}`}>
                  <td>{name}</td>
                  <td>{username}</td>
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
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Settings;
