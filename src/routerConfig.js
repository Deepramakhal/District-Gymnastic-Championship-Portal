import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../Components/HomePage'

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterConfig
