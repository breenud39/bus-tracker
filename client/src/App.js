
import {BrowserRouter as Router, Routes, Route} from 
'react-router-dom';
import{ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Nav from './components/Nav';
import OrderHistory from './pages/OrderHistory';
import { StoreProvider } from './utils/GlobalState';
import Detail from './pages/Detail';


function App() {
  return (
    <> 
      <Router>
          <div className = "container">
              <Header/>
                  <Routes>
                    <Route path = '/' element = { <Dashboard />} />
                    <Route path = '/login' element = { <Login />} />
                    <Route path = '/register' element = { <Register />} />
                    <Route path = '/home' element = { <Home />} />
                  </Routes>
            </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;