import { Routes, Route, Link } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      {/* Меню навигации */}
      <nav style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <Link to="/">Главная</Link>
        <Link to="/about">О нас</Link>
      </nav>

      {/* Здесь будут отображаться компоненты в зависимости от URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App