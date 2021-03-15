import { useEffect, useState } from 'react';
import { FaEye, FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

import { LoaderSpinner } from '../../components';
import PetForm from './PetForm';

import { useAuth } from '../../hooks';
import { modalStyles } from '../../utils';
import { listPets, removePet } from '../../services/pet';

import {
  Container,
  Button,
  Card,
  Table,
  Title,
  Text,
} from '../../styles/pages';
import { Content } from './styles';

const Pets = () => {
  const { signOut } = useAuth();

  const [pets, setPets] = useState([]);
  const [petId, setPetId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleCreate = () => {
    setActionType('create');
    setPetId(0);
    toggleModal();
  };

  const handleView = id => {
    setActionType('view');
    setPetId(id);
    toggleModal();
  };

  const handleEdit = id => {
    setActionType('edit');
    setPetId(id);
    toggleModal();
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      await removePet({ id });
      const data = await listPets();
      setPets(data.pets.sort((a, b) => a.owner?.name > b.owner?.name));
    } catch ({ response }) {
      console.log(response?.data);
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Modal.setAppElement('body');

    const loadPets = async () => {
      setLoading(true);

      try {
        const data = await listPets();
        setPets(data.pets.sort((a, b) => a.owner?.name > b.owner?.name));
      } catch ({ response }) {
        console.log(response?.data);
        response?.data?.error === 'Invalid JWT token' && signOut();
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  return (
    <Container>
      <Card alignItems="center" justifyContent="space-between">
        <Title marginBottom="0px">Pets</Title>
        <Button
          marginTop="0px"
          marginLeft="0px"
          marginRight="0px"
          onClick={handleCreate}
        >
          <FaPlus size={16} />
          <Text title="Clique para criar um novo pet">Novo</Text>
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
              <PetForm
                petId={petId}
                actionType={actionType}
                setPets={setPets}
                toggleModal={toggleModal}
              />
            </Modal>
            <Table>
              <thead>
                <tr>
                  <th>Dono</th>
                  <th>Nome</th>
                  <th>Especie</th>
                  <th>Raça</th>
                  <th>Gênero</th>
                  <th>Observação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pets.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      Nenhum pet cadastrado. Para cadastrar um pet clique em
                      Novo
                    </td>
                    <td></td>
                  </tr>
                )}
                {pets.map(
                  ({
                    id,
                    owner,
                    name,
                    species,
                    breed,
                    gender,
                    description,
                  }) => (
                    <tr key={`${id}`}>
                      <td>{owner.name}</td>
                      <td>{name}</td>
                      <td>{species}</td>
                      <td>{breed}</td>
                      <td>{gender}</td>
                      <td>{description}</td>
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
                  )
                )}
              </tbody>
            </Table>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Pets;
