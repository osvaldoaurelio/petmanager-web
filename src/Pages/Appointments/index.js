import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import { LoaderSpinner, FullCalendar } from '../../components';
import AppointmentForm from './AppointmentForm';

import { useAuth } from '../../hooks';
import { modalStyles } from '../../utils';
import { listAppointments, showAppointment } from '../../services/appointment';
import { lastSettings } from '../../services/setting';

import { Container } from '../../styles/pages';
import { Content } from './styles';

const Appointments = () => {
  const { signOut } = useAuth();
  const { location } = useHistory();

  const [setting, setSetting] = useState({});
  const [startStr, setStartStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
    modalIsOpen && setStartStr('');
    setAppointment({ ...appointment, description: '' });
  };

  const select = ({ startStr, start }) => {
    const [
      date,
      time = new Date().toLocaleTimeString().slice(0, 5),
    ] = startStr.split('T');
    setStartStr(date);

    const isPresent = date >= new Date().toISOString().replace(/T.*$/, '');
    const isWeekday = [1, 2, 3, 4, 5].includes(start.getDay());
    isPresent && isWeekday && toggleModal();

    setAppointment({ date, time: time?.replace(/:\d{2}-\d{2}:\d{2}$/, '') }); // :00-03:00
  };

  const eventClick = async ({ event }) => {
    toggleModal();
    setFormLoading(true);

    try {
      const data = await showAppointment(event);
      const appointment = {
        id: data.appointment.id,
        pet_id: data.appointment.pet_id,
        date: data.appointment.date.replace(/T.*$/, ''),
        time: data.appointment.date
          .replace(/^.*T/, '')
          .replace(/:\d{2}\.\d{3}Z$/, ''),
        description: data.appointment.description,
      };
      setAppointment(appointment);
    } catch (err) {
      toggleModal();
      console.log(err);
      err?.response?.data.error === 'Invalid JWT token' && signOut();
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    Modal.setAppElement('body');

    const loadAppointment = async () => {
      setLoading(true);

      try {
        const data = await listAppointments();
        const appointments = data.appointments.map(
          ({ id, date, description }) => ({
            id,
            start: new Date(
              new Date(date).setHours(new Date(date).getHours() + 3)
            ).toISOString(),
            end: new Date(
              new Date(
                new Date(date).setHours(new Date(date).getHours() + 3)
              ).setMinutes(setting.appointmentHalftime ? 30 : 60)
            ).toISOString(),
            color: '#492',
            title: description,
          })
        );
        console.log(appointments);
        setAppointments(appointments);
      } catch ({ response }) {
        console.log(response);
        response?.data?.error === 'Invalid JWT token' && signOut();
      } finally {
        setLoading(false);
      }
    };

    const loadSettings = async () => {
      const data = await lastSettings();
      setSetting(data.setting);
    };

    loadAppointment();
    loadSettings();
  }, []);

  return (
    <Container>
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
              <AppointmentForm
                toggleModal={toggleModal}
                appointment={appointment}
                setAppointment={setAppointment}
                appointments={appointments}
                setAppointments={setAppointments}
                isLoading={formLoading}
                startStr={startStr}
                setting={setting}
              />
            </Modal>
            <FullCalendar
              select={select}
              events={appointments}
              eventClick={eventClick}
              initialView={location.state?.initialView}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default Appointments;
