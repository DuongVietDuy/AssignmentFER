import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from "react-icons/ai";
import { Table, Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeEmployeeFromTeam, updateQuantity } = useContext(EmployeeContext);

    const total = cart.reduce((sum, product1) => sum + (product1.price * product1.quantity), 0);

    const navigate = useNavigate();

    const handleQuantityChange = (id, value) => {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity) && quantity >= 0) {
            updateQuantity(id, quantity);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={10}>
                    <h2 className="mb-4">My Cart</h2>
                    <Table striped bordered hover responsive className="text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(product1 => (
                                <tr key={product1.id}>
                                    <td><Image src={product1.image} /></td>
                                    <td>{product1.name}</td>
                                    <td>{product1.price}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            value={product1.quantity}
                                            onChange={(e) => handleQuantityChange(product1.id, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <Button variant="success" onClick={() => increaseQuantity(product1.id)} className="me-2">
                                            +
                                        </Button>
                                        <Button variant="warning" onClick={() => decreaseQuantity(product1.id)} className="me-2">
                                            -
                                        </Button>
                                        <Button variant="danger" onClick={() => removeEmployeeFromTeam(product1.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <Row>
                        <Col md={9}>
                            <Button onClick={() => navigate('/shop')}><AiOutlineLeft />Back to Shop</Button>
                        </Col>
                        <Col md={3}>
                            <h3 className='mb-3'>Total: {total}</h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart