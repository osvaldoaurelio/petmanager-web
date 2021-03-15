import loading from '../../assets/img/loading.gif';
import { Container, Image, Title } from './styles';

const LoaderSpinner = ({ title, size = 28, titleColor = '#eee' }) => (
  <Container>
    <Image src={loading} size={size} alt={title || 'Carregando...'} />
    {title && <Title titleColor={titleColor}>{title}</Title>}
  </Container>
);

export default LoaderSpinner;
