import { Routes, Route } from 'react-router-dom'

import BancoQuestoes from './components/banco-questoes/BancoQuestoes'
import Sobre from './components/sobre/Sobre'
import CriadorSimulado from './components/criador-simulado/CriadorSimulado'
import AmbienteSimulacao from './components/ambiente-simulacao/AmbienteSimulacao'
import ResultadoSimulado from './components/resultado-simulado/ResultadoSimulado'
import NoMatch from './components/errors/NoMatch'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' exact element={<Sobre />} />
        <Route path='/questoes' element={<BancoQuestoes />} />
        <Route path='/simulado/novo' element={<CriadorSimulado />} />
        <Route path='/simulado/realizar/:id' element={<AmbienteSimulacao />} />
        <Route path='/simulado/resultado/:id' element={<ResultadoSimulado />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
