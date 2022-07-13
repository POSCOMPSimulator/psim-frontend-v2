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

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem('auth-token')
  if (!token) {
    return <Navigate to="/" replace />;
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
        <Route path='/perfil' element={
          <ProtectedRoute>
            <Perfil />
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
