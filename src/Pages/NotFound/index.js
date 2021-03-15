import { Container } from '../../styles/pages';
import { Img, NotFoundText } from './styles';

import img_404 from '../../assets/img/404.png';

const NotFound = () => (
  <Container>
    <Img src={img_404} alt="Not found page" title="Not found page" />
    <NotFoundText>Au Au! Essa página não existe</NotFoundText>
  </Container>
);

export default NotFound;
