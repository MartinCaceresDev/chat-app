import { Routes, Route } from 'react-router-dom';
import { RegisterPage, LoginPage, HomePage } from './pages';
import { AuthContextProvider } from './context/AuthContext';
import { ChatsContextProvider } from './context/ChatsContext';
import './scss/main.scss'

function App() {

  return (
    <AuthContextProvider>
      <ChatsContextProvider >
        <Routes>
          <Route path='register' element={<RegisterPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </ChatsContextProvider>
    </AuthContextProvider>
  )
}

export default App
