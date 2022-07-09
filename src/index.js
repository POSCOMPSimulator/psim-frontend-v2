import App from './App';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import Header from './layouts/header/Header';
import Footer from './layouts/footer/Footer';
import styled from 'styled-components';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const AllButFooter = styled.div`
    min-height: calc(100vh - 21px);
`;

root.render(
  <>
    <BrowserRouter>
      <AllButFooter>
        <Header />
        <App />
      </AllButFooter>
      <Footer />
    </BrowserRouter>
  </>,
);
