import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaCommentMedical,
  FaBath,
  FaUser,
  FaDog,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';

import { useAuth } from '../../../hooks';

import { Container, Nav, NavItem } from './styles';

const Menu = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Nav>
        <NavItem>
          <NavLink
            to="/"
            exact
            activeClassName="active-link"
            title="Clique para ir para a home"
          >
            <FaHome />
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/appointments"
            exact
            activeClassName="active-link"
            title="Clique para gerenciar Consultas"
          >
            <FaCommentMedical />
            Consulta
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/services"
            activeClassName="active-link"
            title="Clique para gerenciar Serviços"
          >
            <FaBath />
            Serviço
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/clients"
            activeClassName="active-link"
            title="Clique para gerenciar Clientes"
          >
            <FaUser />
            Cliente
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/pets"
            activeClassName="active-link"
            title="Clique para gerenciar Pets"
          >
            <FaDog />
            Pet
          </NavLink>
        </NavItem>
        <NavItem onClick={() => signOut()}>
          <NavLink to="#" title="Clique para sair do sistema">
            <FaSignOutAlt />
            Sair
          </NavLink>
        </NavItem>
      </Nav>
    </Container>
  );
};

export default Menu;
