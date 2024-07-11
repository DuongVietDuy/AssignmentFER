import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Col, Row, Form } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeDetail = () => {
  const { employees, cart, addToCart } = useContext(EmployeeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find(emp => emp.id == parseInt(id));

  const handleAdd = (product1) => {
    const quantity = 1;
    addToCart(product1, quantity);
  };

  if (!employee) {
    return <h2>Product not found</h2>;
  }

  const imageStyles = {
    width: '300px', 
    height: 'auto', 
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto' 
  };

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/shop')}>
        Back to List
      </Button>
      
        <Card><Row>
          <Col md={8}>
            <Card.Img
              variant="top"
              src={employee.image || 'default-image-url'}
              alt="Employee"
              style={imageStyles} 
            />
          </Col>
          <Col md={4}>
            <Card.Body>
              <Card.Title>{employee.name}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${employee.price}<br />
                <strong>DeviceID:</strong> {employee.deviceID}<br />
                <strong>Brand:</strong> {employee.brand}<br />
                <strong>Model:</strong> {employee.model}<br />
                <strong>Specifications:</strong> {JSON.stringify(employee.specifications)}<br />
              </Card.Text>
              <Button variant='primary' onClick={() => handleAdd(employee)}>Add to Cart</Button>
            </Card.Body>
          </Col></Row>
        </Card>
      
    </div>
  );
};

export default EmployeeDetail;
