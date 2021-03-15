import { useLocation } from 'react-router-dom';

import Profile from './Profile';
import Menu from './Menu';
import Logo from './Logo';

import { useAuth } from '../../hooks';

import { Container } from './styles';

const Header = () => {
  const { pathname } = useLocation();
  const { isUserSignedIn } = useAuth();

  return (
    pathname !== '/login' &&
    isUserSignedIn && (
      <Container>
        <Logo />
        <Menu />
        <Profile />
      </Container>
    )
  );
};

export default Header;
