
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NovelDetail from './pages/NovelDetail'
import Profile from './pages/Profile'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel/:id" element={<NovelDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App