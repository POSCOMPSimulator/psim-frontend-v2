import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './components/home/Home'
import BancoQuestoes from './components/banco-questoes/BancoQuestoes'
import Sobre from './components/sobre/Sobre'
import Perfil from './components/perfil/Perfil'
import EditorQuestao from './components/editor-questao/EditorQuestao'
import CriadorSimulado from './components/criador-simulado/CriadorSimulado'
import AmbienteSimulacao from './components/ambiente-simulacao/AmbienteSimulacao'
import ResultadoSimulado from './components/resultado-simulado/ResultadoSimulado'
import NoMatch from './components/errors/NoMatch'
import SignUpForm from './components/registrar/Registrar'
import SignInForm from './components/entrar/Entrar'
import VerifyForm from './components/verificar/Verificar'
import Simulados from './components/simulados/Simulados'

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem('psim_access_token')
  let verified = localStorage.getItem('verificado')
  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (verified === "false") {
    return <Navigate to="/verificar" replace />;
  }

  return children;
};

function App() {

  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/questoes' element={<BancoQuestoes />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/registrar' element={<SignUpForm />} />
        <Route path='/entrar' element={<SignInForm />} />
        <Route path='/verificar' element={<VerifyForm />} />
        <Route path='/perfil' element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        } />
        <Route path='/simulado' element={
          <ProtectedRoute>
            <Simulados />
          </ProtectedRoute>
        } />
        <Route path='/simulado/novo' element={
          <ProtectedRoute>
            <CriadorSimulado />
          </ProtectedRoute>
        } />
        <Route path='/simulado/realizar/:id' element={
          <ProtectedRoute>
            <AmbienteSimulacao />
          </ProtectedRoute>
        } />
        <Route path='/simulado/resultado/:id' element={
          <ProtectedRoute>
            <ResultadoSimulado />
          </ProtectedRoute>
        } />
        <Route path='/questoes/editar' element={
          <ProtectedRoute>
            <EditorQuestao />
          </ProtectedRoute>
        } />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
