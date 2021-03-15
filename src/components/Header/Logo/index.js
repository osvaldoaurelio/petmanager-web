import { NavLink } from 'react-router-dom';

import { Image } from './styles';

import logo from '../../../assets/img/logo.png';

const Logo = () => (
  <NavLink
    to="/"
    exact
    activeClassName="active-link"
    title="Clique para ir para a home"
  >
    <Image src={logo} alt="logo" />
  </NavLink>
);

export default Logo;
