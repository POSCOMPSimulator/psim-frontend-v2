import App from './App';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import Header from './layouts/header/Header';
// import Footer from './layouts/footer/Footer';
import styled from 'styled-components';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const AppBody = styled.div`
  background-color: #f6f6f6 !important;
`

const AllButFooter = styled.div`
    min-height: calc(100vh - 21px);
`;

root.render(
  <>
    <BrowserRouter>
      <AppBody>
        <AllButFooter>
          <Header />
          <App />
        </AllButFooter>
        {/* <Footer /> */}
      </AppBody>
    </BrowserRouter>
  </>,
);
