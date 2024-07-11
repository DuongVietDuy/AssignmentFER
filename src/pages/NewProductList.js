import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import { Link } from 'react-router-dom';

const NewProductList = () => {
  const { latestProducts, cart, addToCart } = useContext(EmployeeContext);

  const handleAdd = (product1) => {
    const quantity = 1;
    addToCart(product1, quantity);

  };
  return (
    <div>
      <h2 className='text-center'>Latest Products</h2>
      <Container>
        <Row>
          {
            latestProducts.map((product) => (
              <Card className='mx-3' key={product.id} style={{ width: '18rem', marginBottom: '20px' }}>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    Price: ${product.price}
                  </Card.Text>
                  <div>
                  &nbsp; <Button as={Link} to={`/detail/${product.id}`} variant="danger">Detail</Button> &nbsp; &nbsp; &nbsp; &nbsp; 
                  <Button variant="dark" onClick={() => handleAdd(product)}>Add to Cart</Button>
                  </div>
                  
                </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
    </div>
  )
}

export default NewProductList