import { useEffect, useState } from 'react';
import { FaAngleDown, FaTimes } from 'react-icons/fa';

import { listPets } from '../../../services/pet';
import { LoaderSpinner } from '../../../components';

import {
  Container,
  ErrorContainer,
  Error,
  FormControl,
  Label,
  Select,
  Input,
  TextArea,
  FormGroup,
  Button,
} from '../../../styles/pages';
import { BtnClose, Form } from './styles';
import {
  removeService,
  storeService,
  updateService,
} from '../../../services/service';

const ServiceForm = ({
  toggleModal,
  service,
  setService,
  services,
  setServices,
  isLoading,
  startStr,
}) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createService = async event => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log(service);
    const {
      pet_id,
      description,
      price,
      initial_date,
      initial_time,
      final_date,
      final_time,
    } = service;
    if (
      !pet_id ||
      !price ||
      !initial_date ||
      !initial_time ||
      !final_date ||
      !final_time
    ) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const data = await storeService({
        pet_id,
        description,
        price,
        initial_date: `${initial_date}T${initial_time}:00.000Z`,
        final_date: `${final_date}T${final_time}:00.000Z`,
      });
      const service = {
        id: data.service.id,
        price: data.service.price,
        start: new Date(
          new Date(data.service.initial_date).setHours(
            new Date(data.service.initial_date).getHours() + 3
          )
        ).toISOString(),
        end: new Date(
          new Date(data.service.final_date).setHours(
            new Date(data.service.final_date).getHours() + 3
          )
        ).toISOString(),
        color: '##4af',
        title: data.service.description,
      };
      setServices([...services, service]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  const editService = async event => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const {
      pet_id,
      description,
      price,
      initial_date,
      initial_time,
      final_date,
      final_time,
      id,
    } = service;
    if (
      !pet_id ||
      !price ||
      !initial_date ||
      !initial_time ||
      !final_date ||
      !final_time
    ) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const data = await updateService(
        {
          pet_id,
          description,
          price,
          initial_date: `${initial_date}T${initial_time}:00.000Z`,
          final_date: `${final_date}T${final_time}:00.000Z`,
        },
        { id }
      );
      const newServices = services.filter(s => id !== s.id);
      newServices.push({
        id: data.service.id,
        start: new Date(
          new Date(data.service.initial_date).setHours(
            new Date(data.service.initial_date).getHours() + 3
          )
        ).toISOString(),
        end: new Date(
          new Date(data.service.final_date).setHours(
            new Date(data.service.final_date).getHours() + 3
          )
        ).toISOString(),
        color: '##8Cf',
        title: data.service.description,
      });
      setServices(newServices);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  const deleteService = async event => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { id } = service;
    try {
      await removeService({ id });
      const newServices = services.filter(s => id !== s.id);
      setServices(newServices);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setError(null);
    setService({ ...service, [name]: value });
  };

  useEffect(() => {
    const loadPets = async () => {
      const data = await listPets();
      setPets(data.pets);
    };

    loadPets();
  }, []);

  return (
    <Container>
      {loading || isLoading ? (
        <LoaderSpinner size={128} />
      ) : (
        <>
          <BtnClose title="Fechar" onClick={toggleModal}>
            <FaTimes />
          </BtnClose>
          <Form>
            <ErrorContainer>
              <Error error={error}>{error}</Error>
            </ErrorContainer>
            <FormGroup>
              <FormControl>
                <Label htmlFor="pet_id">Pet</Label>
                <Select
                  autoFocus={true}
                  id="pet_id"
                  name="pet_id"
                  onChange={handleInputChange}
                  value={service?.pet_id}
                  error={error}
                >
                  <option selected disabled value={0}>
                    -- Selecione um pet --
                  </option>
                  {pets.map(({ id, name, owner }) => (
                    <option key={`${id}`} value={id}>
                      {name} - {owner.name}
                    </option>
                  ))}
                </Select>
                <FaAngleDown size={20} />
              </FormControl>
              <FormControl>
                <Label htmlFor="price">Preço do serviço</Label>
                <Input
                  id="price"
                  onChange={handleInputChange}
                  value={service?.price}
                  error={error}
                  name="price"
                  type="number"
                  title="Entre com o preço deste serviço"
                />
              </FormControl>
            </FormGroup>
            <FormControl>
              <Label htmlFor="description">Descrição</Label>
              <TextArea
                id="description"
                onChange={handleInputChange}
                value={service?.description}
                name="description"
                placeholder="Descrição do serviço"
                title="Digite a descrição para este serviço"
              ></TextArea>
            </FormControl>
            <FormGroup>
              <FormControl>
                <Label htmlFor="initial_date">Data inicial</Label>
                <Input
                  id="initial_date"
                  onChange={handleInputChange}
                  value={service?.initial_date}
                  error={error}
                  disabled={startStr}
                  name="initial_date"
                  type="date"
                  title="Entre com a data de início do serviço"
                />
              </FormControl>
              <FormControl>
                <Label htmlFor="initial_time">Horário inicial</Label>
                <Input
                  id="initial_time"
                  onChange={handleInputChange}
                  value={service?.initial_time}
                  error={error}
                  name="initial_time"
                  type="time"
                  title="Entre com a hora de início do serviço"
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <Label htmlFor="final_date">Data de término</Label>
                <Input
                  id="final_date"
                  onChange={handleInputChange}
                  value={service?.final_date}
                  error={error}
                  name="final_date"
                  type="date"
                  title="Entre com a data de término do serviço"
                />
              </FormControl>
              <FormControl>
                <Label htmlFor="final_time">Horário de término</Label>
                <Input
                  id="final_time"
                  onChange={handleInputChange}
                  value={service?.final_time}
                  error={error}
                  name="final_time"
                  type="time"
                  title="Entre com a hora de término do serviço"
                />
              </FormControl>
            </FormGroup>
            {startStr ? (
              <FormGroup>
                <Button
                  marginTop="0.5rem"
                  marginRight="0.5rem"
                  width="100%"
                  onClick={toggleModal}
                  bgColor="#cc0"
                >
                  Cancelar
                </Button>
                <Button
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  width="100%"
                  onClick={createService}
                >
                  Criar
                </Button>
              </FormGroup>
            ) : (
              <FormGroup>
                <Button
                  marginTop="0.5rem"
                  marginRight="0.5rem"
                  width="100%"
                  onClick={deleteService}
                  bgColor="#c00"
                  color="#fff"
                >
                  Excluir
                </Button>
                <Button
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  width="100%"
                  onClick={editService}
                >
                  Salvar
                </Button>
              </FormGroup>
            )}
          </Form>
        </>
      )}
    </Container>
  );
};

export default ServiceForm;
