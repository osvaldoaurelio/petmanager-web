import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import { LoaderSpinner, FullCalendar } from '../../components';
import ServiceForm from './ServiceForm';

import { useAuth } from '../../hooks';
import { modalStyles } from '../../utils';
import { listServices, showService } from '../../services/service';

import { Container } from '../../styles/pages';
import { Content } from './styles';

const Services = () => {
  const { signOut } = useAuth();
  const { location } = useHistory();

  const [startStr, setStartStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState({});
  const [services, setServices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
    modalIsOpen && setStartStr('');
    setService({
      ...service,
      description: '',
      price: 0,
      final_date: '',
      final_time: '',
    });
  };

  const select = ({ startStr, start, endStr, end }) => {
    const [
      initial_date,
      initial_time = new Date().toLocaleTimeString().slice(0, 5),
    ] = startStr.split('T');
    setStartStr(initial_date);

    const isPresent =
      initial_date >= new Date().toISOString().replace(/T.*$/, '');
    const isWeekday = [1, 2, 3, 4, 5].includes(start.getDay());
    isPresent && isWeekday && toggleModal();

    setService({
      initial_date,
      initial_time: initial_time?.replace(/:\d{2}-\d{2}:\d{2}$/, ''),
    }); // :00-03:00
  };

  const eventClick = async ({ event }) => {
    toggleModal();
    setFormLoading(true);

    try {
      const data = await showService(event);
      const service = {
        id: data.service.id,
        pet_id: data.service.pet_id,
        price: data.service.price,
        initial_date: data.service.initial_date.replace(/T.*$/, ''),
        initial_time: data.service.initial_date
          .replace(/^.*T/, '')
          .replace(/:\d{2}\.\d{3}Z$/, ''),
        final_date: data.service.final_date.replace(/T.*$/, ''),
        final_time: data.service.final_date
          .replace(/^.*T/, '')
          .replace(/:\d{2}\.\d{3}Z$/, ''),
        description: data.service.description,
      };
      setService(service);
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

    const loadService = async () => {
      setLoading(true);

      try {
        const data = await listServices();
        const services = data.services.map(
          ({ id, initial_date, final_date, price, description }) => ({
            id,
            price,
            start: new Date(
              new Date(initial_date).setHours(
                new Date(initial_date).getHours() + 3
              )
            ).toISOString(),
            end: new Date(
              new Date(final_date).setHours(
                new Date(final_date).getHours() + 3.5
              )
            ).toISOString(),
            color: '#4af',
            title: description,
          })
        );
        setServices(services);
      } catch ({ response }) {
        console.log(response?.data);
        response?.data?.error === 'Invalid JWT token' && signOut();
      } finally {
        setLoading(false);
      }
    };

    loadService();
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
              <ServiceForm
                toggleModal={toggleModal}
                service={service}
                setService={setService}
                services={services}
                setServices={setServices}
                isLoading={formLoading}
                startStr={startStr}
              />
            </Modal>
            <FullCalendar
              select={select}
              events={services}
              eventClick={eventClick}
              initialView={location.state?.initialView}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default Services;
