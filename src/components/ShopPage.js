import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBars from './NavBars';
import DepartmentList from './DepartmentList';
import EmployeeList from './EmployeeList';

const ShopPage = () => {
  return (
    <>
      <NavBars />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <h2>Devices</h2>
            <DepartmentList />
          </Col>
          <Col md={8}>
            <h2>Products</h2>
            <EmployeeList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShopPage;
