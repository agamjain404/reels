import './App.css';
import Signup from './Components/Signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Feed from './Components/Feed/Feed';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/signup" element={
              <Signup/>
            }>
            </Route>
            <Route exact path="/login" element={
              <Login/>
            }>
            </Route>
            <Route exact path="/" element={
              <PrivateRoute />
            }>
              <Route exact path='/' element={<Feed/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
