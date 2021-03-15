import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Nav = styled.nav`
  display: flex;
`;

export const NavItem = styled.div`
  a {
    text-decoration: none;
    display: flex;
    color: #333;
    padding: 0.75rem 1rem;
    transition: all 0.3s;
    font-size: 1.5rem;

    svg {
      margin-right: 0.25rem;
    }

    &:hover {
      opacity: 0.6;
    }
  }
`;
