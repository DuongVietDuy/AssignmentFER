import React, { useContext, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeList = () => {
  const { employees, selectedDepartment, searchTerm } = useContext(EmployeeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Lọc danh sách nhân viên
  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = selectedDepartment ? employee.deviceID == selectedDepartment : true;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  // Tính toán các sản phẩm để hiển thị trên trang hiện tại
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Row>
        {currentEmployees.map(employee => (
          <Col key={employee.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={employee.image || 'https://via.placeholder.com/150'} alt="Employee" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{employee.name}</Card.Title>
                <Card.Text>Price: {employee.price}</Card.Text>
                <Card.Text>deviceID: {employee.deviceID}</Card.Text>
                <Card.Text>Brand: {employee.brand}</Card.Text>
                <Button as={Link} to={`/detail/${employee.id}`} variant="info" size="sm">Detail</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => handleClick(index + 1)}
            variant={currentPage === index + 1 ? "primary" : "outline-primary"}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default EmployeeList;
