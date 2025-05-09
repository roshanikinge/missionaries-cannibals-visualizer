import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AlgorithmPage from './pages/AlgorithmPage'
import VisualizationPage from './pages/VisualizationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="algorithm" element={<AlgorithmPage />} />
          <Route path="visualization" element={<VisualizationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App