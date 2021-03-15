import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import {
  getDailyAppointments,
  listAppointments,
} from '../../services/appointment';
import { getDailyServices, listServices } from '../../services/service';
import { lastSettings } from '../../services/setting';
import { format } from '../../utils';

import { Container, Card, Button, Title, Text } from '../../styles/pages';
import { Content, HR, Body, Image, Info, Revenues } from './styles';

import leftWoman from '../../assets/img/left-woman.png';
import rightMan from '../../assets/img/right-man.png';
import leftMan from '../../assets/img/left-man.png';
import rightWoman from '../../assets/img/right-woman.png';

const Home = () => {
  const [setting, setSetting] = useState({});
  const [dailyServices, setDailyServices] = useState([]);
  const [monthlyServices, setMonthlyServices] = useState([]);
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);

  const history = useHistory();
  const handleRedirect = path => {
    history.push(path, { initialView: 'timeGridDay' });
  };

  const servicesTotalPrice = (acc, { price }) => acc + price;

  const loadAppointments = async () => {
    const data = await getDailyAppointments();
    setDailyAppointments(data.dailyAppointments);

    const { appointments } = await listAppointments();
    setMonthlyAppointments(
      appointments.filter(appointment => {
        const currentMonth = new Date().getMonth();
        const dateMonth = new Date(appointment.date).getMonth();

        return dateMonth === currentMonth;
      })
    );
  };

  const loadServices = async () => {
    const data = await getDailyServices();
    setDailyServices(data.dailyServices);

    const { services } = await listServices();
    setMonthlyServices(
      services.filter(service => {
        const currentMonth = new Date().getMonth();
        const initialMonth = new Date(service.initial_date).getMonth();
        const finalMonth = new Date(service.final_date).getMonth();

        return initialMonth <= currentMonth && finalMonth >= currentMonth;
      })
    );
  };

  const loadSettings = async () => {
    const data = await lastSettings();
    setSetting(data.setting);
  };

  useEffect(() => {
    loadAppointments();
    loadServices();
    loadSettings();
  }, []);

  return (
    <Container>
      <Card>
        <Content>
          <Title>Consultas do dia</Title>
          <Body>
            <Image src={leftWoman} alt="leftWoman" />
            <Info>
              <Text>
                {dailyAppointments.length} Consulta
                {dailyAppointments.length === 1 ? '' : 's'}
              </Text>
              <Button
                marginTop="0px"
                onClick={() => handleRedirect('/appointments')}
              >
                <FaPlus size={16} />
                <Text title="Clique para criar uma nova Consulta">Novo</Text>
              </Button>
            </Info>
            <Image src={rightMan} alt="rightMan" />
          </Body>
        </Content>
        <HR />
        <Content>
          <Title>Serviços do dia</Title>
          <Body>
            <Image src={leftMan} alt="leftMan" />
            <Info>
              <Text>
                {dailyServices.length} Serviço
                {dailyServices.length === 1 ? '' : 's'}
              </Text>
              <Button
                marginTop="0px"
                onClick={() => handleRedirect('/services')}
              >
                <FaPlus size={16} />
                <Text title="Clique para criar um novo Serviço">Novo</Text>
              </Button>
            </Info>
            <Image src={rightWoman} alt="rightWoman" />
          </Body>
        </Content>
      </Card>
      <Card>
        <Content>
          <Title>Faturamento diário - {new Date().toLocaleDateString()}</Title>
          <Revenues>
            <p>
              {dailyAppointments.length} Consulta
              {dailyAppointments.length === 1 ? '' : 's'}
            </p>
            <p>
              {format.currency(
                dailyAppointments.length * setting.appointmentPrice || 0
              )}
            </p>
          </Revenues>
          <Revenues>
            <p>
              {dailyServices.length} Serviço
              {dailyServices.length === 1 ? '' : 's'}
            </p>
            <p>
              {format.currency(dailyServices.reduce(servicesTotalPrice, 0))}
            </p>
          </Revenues>
          <Revenues>
            <p></p>
            <p>
              <span>Total</span>{' '}
              {format.currency(
                dailyAppointments.length * setting.appointmentPrice +
                  dailyServices.reduce(servicesTotalPrice, 0) || 0
              )}
            </p>
          </Revenues>
        </Content>
        <HR />
        <Content>
          <Title>
            Faturamento mensal -{' '}
            {new Date().toLocaleDateString().replace(/\d{2}\//, '')}
          </Title>
          <Revenues>
            <p>
              {monthlyAppointments.length} Consulta
              {monthlyAppointments.length === 1 ? '' : 's'}
            </p>
            <p>
              {format.currency(
                monthlyAppointments.length * setting.appointmentPrice || 0
              )}
            </p>
          </Revenues>
          <Revenues>
            <p>
              {monthlyServices.length} Serviço
              {monthlyServices.length === 1 ? '' : 's'}
            </p>
            <p>
              {format.currency(monthlyServices.reduce(servicesTotalPrice, 0))}
            </p>
          </Revenues>
          <Revenues>
            <p></p>
            <p>
              <span>Total</span>{' '}
              {format.currency(
                monthlyAppointments.length * setting.appointmentPrice +
                  monthlyServices.reduce(servicesTotalPrice, 0) || 0
              )}
            </p>
          </Revenues>
        </Content>
      </Card>
    </Container>
  );
};

export default Home;
