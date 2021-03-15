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
import { Form, BtnClose } from './styles';
import {
  removeAppointment,
  storeAppointment,
  updateAppointment,
} from '../../../services/appointment';

const AppointmentForm = ({
  toggleModal,
  appointment,
  setAppointment,
  appointments,
  setAppointments,
  isLoading,
  startStr,
  setting,
}) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAppointment = async event => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { pet_id, description, date, time } = appointment;
    if (!pet_id || !date || !time) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const data = await storeAppointment({
        pet_id,
        description,
        date: `${date}T${time}:00.000Z`,
      });
      const halftime = v => (v ? 3.5 : 4);
      const appointment = {
        id: data.appointment.id,
        start: new Date(
          new Date(data.appointment.date).setHours(
            new Date(data.appointment.date).getHours() + 3
          )
        ).toISOString(),
        end: new Date(
          new Date(
            new Date(data.appointment.date).setHours(
              new Date(data.appointment.date).getHours() + 3
            )
          ).setMinutes(setting.appointmentHalftime ? 30 : 60)
        ).toISOString(),
        color: '#492',
        title: data.appointment.description,
      };

      setAppointments([...appointments, appointment]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  const editAppointment = async event => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { pet_id, description, date, time, id } = appointment;
    if (!pet_id || !date || !time) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const data = await updateAppointment(
        { pet_id, description, date: `${date}T${time}:00.000Z` },
        { id }
      );
      const newAppointments = appointments.filter(a => id !== a.id);
      newAppointments.push({
        id: data.appointment.id,
        start: new Date(
          new Date(data.appointment.date).setHours(
            new Date(data.appointment.date).getHours() + 3
          )
        ).toISOString(),
        end: new Date(
          new Date(
            new Date(data.appointment.date).setHours(
              new Date(data.appointment.date).getHours() + 3
            )
          ).setMinutes(setting.appointmentHalftime ? 30 : 60)
        ).toISOString(),
        color: '#492',
        title: data.appointment.description,
      });
      setAppointments(newAppointments);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      toggleModal();
      setLoading(false);
    }
  };

  const deleteAppointment = async event => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { id } = appointment;
    try {
      await removeAppointment({ id });
      const newAppointments = appointments.filter(a => id !== a.id);
      setAppointments(newAppointments);
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
    setAppointment({ ...appointment, [name]: value });
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
            <FormControl>
              <Label htmlFor="pet_id">Pet</Label>
              <Select
                autoFocus={true}
                id="pet_id"
                name="pet_id"
                onChange={handleInputChange}
                value={appointment?.pet_id}
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
              <Label htmlFor="description">Descrição</Label>
              <TextArea
                id="description"
                onChange={handleInputChange}
                value={appointment?.description}
                name="description"
                placeholder="Descrição da consulta"
                title="Digite a descrição para esta consulta"
              ></TextArea>
            </FormControl>
            <FormGroup>
              <FormControl>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  onChange={handleInputChange}
                  value={appointment?.date}
                  error={error}
                  disabled={startStr}
                  name="date"
                  type="date"
                  title="Entre com a data da consulta"
                />
              </FormControl>
              <FormControl>
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  onChange={handleInputChange}
                  value={appointment?.time}
                  error={error}
                  name="time"
                  type="time"
                  title="Entre com a hora da consulta"
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
                  onClick={createAppointment}
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
                  onClick={deleteAppointment}
                  bgColor="#c00"
                  color="#fff"
                >
                  Excluir
                </Button>
                <Button
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  width="100%"
                  onClick={editAppointment}
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

export default AppointmentForm;
