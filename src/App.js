import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import Layout from './Layout';

import { Styles } from './styles';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Layout />
      <Styles />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
