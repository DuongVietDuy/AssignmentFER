import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeProvider from './context/EmployeeContext';
import DepartmentList from './components/DepartmentList';
import EmployeeList from './components/EmployeeList';
import Search from './components/Search';
import EmployeeDetail from './components/EmployeeDetail';
import NavBars from './components/NavBars';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <EmployeeProvider>
      <Router>
        <NavBars />
        <Container className="mt-4">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/shop" element=
              {
                <Row>
                  <Col md={4}>
                    <h2>Devices</h2>
                    <DepartmentList/>
                  </Col>
                  <Col md={8}>
                    <h2>Products</h2>
                    <Search />
                    <EmployeeList />
                  </Col>
                </Row>
              }
            />
            <Route path="/detail/:id" element={<EmployeeDetail />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </EmployeeProvider>
  );
};

export default App;
