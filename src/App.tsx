import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Integrantes from './pages/Integrantes'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Faq from './pages/Faq'
import Contato from './pages/Contato'
import Agendar from './pages/Agendar'
import Consultas from './pages/Consultas'
import ConsultaDetalhe from './pages/ConsultaDetalhe'
import Cadastro from './pages/Cadastro'
import NaoEncontrada from './pages/NaoEncontrada'

/** Rotas da SPA. Rotas com parâmetro: /integrantes/:rm e /consultas/:id */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Institucionais */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/integrantes/:rm" element={<IntegranteDetalhe />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />

        {/* Solução (integradas com a API Java) */}
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/consultas/:id" element={<ConsultaDetalhe />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}
