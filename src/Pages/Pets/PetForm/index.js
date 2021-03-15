import { useEffect, useState } from 'react';
import { FaAngleDown, FaTimes } from 'react-icons/fa';

import { storePet, showPet, updatePet, listPets } from '../../../services/pet';
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
  TextArea,
} from '../../../styles/pages';
import { Form, BtnClose } from './styles';
import { listClients } from '../../../services/client';

const PetForm = ({ petId, actionType, setPets, toggleModal }) => {
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState({});
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setError(null);
    setPet({ ...pet, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { client_id, name, species, breed, gender, description } = pet;
    if (!client_id || !name || !species || !gender) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }

    try {
      const { name: fnName } = e.target;
      const fn = { storePet, updatePet };
      await fn[fnName](
        { client_id, name, species, breed, gender, description },
        { id: petId }
      );
      const data = await listPets();
      setPets(data.pets.sort((a, b) => a.owner?.name > b.owner?.name));
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPet = async () => {
      setLoading(true);
      try {
        const data = await showPet({ id: petId });
        setPet(data.pet);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const loadClients = async () => {
      setLoading(true);
      try {
        const data = await listClients();
        setClients(data.clients);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
    petId && loadPet();
  }, [petId]);

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
            <FormGroup>
              <FormControl>
                <Label htmlFor="client_id">Dono</Label>
                <Select
                  autoFocus={true}
                  id="client_id"
                  name="client_id"
                  disabled={actionType === 'view'}
                  onChange={handleInputChange}
                  value={pet?.client_id}
                  error={error}
                >
                  <option selected disabled value={0}>
                    -- Selecione --
                  </option>
                  {clients.map(({ id, name }) => (
                    <option key={`${id}`} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
                {actionType !== 'view' && <FaAngleDown size={20} />}
              </FormControl>
              <FormControl>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  autoFocus={true}
                  onChange={handleInputChange}
                  value={pet?.name}
                  name="name"
                  readOnly={actionType === 'view'}
                  error={error}
                  placeholder="Nome do pet"
                  title="Digite o nome deste pet"
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <Label htmlFor="species">Espécie</Label>
                <Input
                  id="species"
                  onChange={handleInputChange}
                  value={pet?.species}
                  name="species"
                  error={error}
                  readOnly={actionType === 'view'}
                  placeholder="Espécie do pet"
                  title="Digite a espécie deste pet"
                />
              </FormControl>
              <FormControl>
                <Label htmlFor="breed">Raça</Label>
                <Input
                  id="breed"
                  onChange={handleInputChange}
                  value={pet?.breed}
                  name="breed"
                  readOnly={actionType === 'view'}
                  placeholder="Raça do pet"
                  title="Digite a Raça deste pet"
                />
              </FormControl>
              <FormControl>
                <Label htmlFor="gender">Gênero</Label>
                <Select
                  id="gender"
                  name="gender"
                  disabled={actionType === 'view'}
                  onChange={handleInputChange}
                  value={pet?.gender}
                  error={error}
                >
                  <option selected disabled value="">
                    -- Selecione --
                  </option>
                  <option value="male">Macho</option>
                  <option value="female">Fêmea</option>
                </Select>
                {actionType !== 'view' && <FaAngleDown size={20} />}
              </FormControl>
            </FormGroup>
            <FormControl>
              <Label htmlFor="description">Observações</Label>
              <TextArea
                id="description"
                onChange={handleInputChange}
                value={pet?.description}
                name="description"
                readOnly={actionType === 'view'}
                placeholder="Digite alguma observação"
                title="Digite alguma observação relacionada ao pet aqui"
              ></TextArea>
            </FormControl>
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
                  name="updatePet"
                  type="submit"
                  title="Salvar alterações deste pet"
                >
                  Salvar alterações
                </Button>
              ) : (
                <Button
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  width="100%"
                  onClick={handleSubmit}
                  name="storePet"
                  type="submit"
                  title="Criar um novo pet"
                >
                  Criar pet
                </Button>
              )}
            </FormGroup>
          </Form>
        </>
      )}
    </Container>
  );
};

export default PetForm;
