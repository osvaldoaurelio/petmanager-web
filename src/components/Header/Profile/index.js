import { useHistory } from 'react-router-dom';
import { FaWrench } from 'react-icons/fa';

import { useAuth } from '../../../hooks';

import avatar from '../../../assets/img/avatar.jpg';

import {
  Container,
  Avatar,
  TextContainer,
  AdminContainer,
  TextAdmin,
  BtnAdmin,
  TextName,
} from './styles';

const Profile = () => {
  const history = useHistory();
  const { user, isUserAdmin } = useAuth();

  return (
    <Container>
      <Avatar src={avatar} alt="avatar" />
      <TextContainer>
        {isUserAdmin && (
          <AdminContainer>
            <TextAdmin>Admin</TextAdmin>
            <BtnAdmin
              title="Clique para editar as configurações"
              onClick={() => history.push('/settings')}
            >
              <FaWrench />
            </BtnAdmin>
          </AdminContainer>
        )}
        <TextName>{user.name}</TextName>
      </TextContainer>
    </Container>
  );
};

export default Profile;
