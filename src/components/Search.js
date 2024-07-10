// src/components/Search.js
import React, { useContext } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const Search = () => {
  const { searchTerm, setSearchTerm, genderFilter, setGenderFilter } = useContext(EmployeeContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Form>
    <Row className="mb-3">
      <Col>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search products by name:"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Col>
    </Row>
  </Form>
  );
};

export default Search;
