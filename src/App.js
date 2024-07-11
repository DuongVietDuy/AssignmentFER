import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeProvider from './context/EmployeeContext';
import DepartmentList from './components/DepartmentList';
import EmployeeList from './components/EmployeeList';
import Search from './components/Search';
import EmployeeDetail from './components/EmployeeDetail';
import ShopPage from './components/ShopPage';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';

const App = () => {
  return (
    <EmployeeProvider>
      <Router>
        <Container className="mt-4">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/shop" element={ <ShopPage />} />
            <Route path="/detail/:id" element={<EmployeeDetail />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </EmployeeProvider>
  );
};

export default App;
