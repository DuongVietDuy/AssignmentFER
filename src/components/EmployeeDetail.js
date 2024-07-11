import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeDetail = () => {
  const { employees } = useContext(EmployeeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find(emp => emp.id == parseInt(id));

  if (!employee) {
    return <h2>Product not found</h2>;
  }

  // Định nghĩa các kiểu nội tuyến cho ảnh
  const imageStyles = {
    width: '300px', // Điều chỉnh kích thước rộng của ảnh
    height: 'auto', // Giữ tỷ lệ của ảnh
    objectFit: 'cover', // Đảm bảo ảnh luôn phù hợp trong khung
    display: 'block',
    margin: '0 auto' // Căn giữa ảnh trong thẻ
  };

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/shop')}>
        Back to List
      </Button>
      <Card>
        <Card.Img
          variant="top"
          src={employee.image || 'default-image-url'}
          alt="Employee"
          style={imageStyles} // Sử dụng kiểu nội tuyến
        />
        <Card.Body>
          <Card.Title>{employee.name}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> {employee.price}<br/>
            <strong>DeviceID:</strong> {employee.deviceID}<br/>
            <strong>Brand:</strong> {employee.brand}<br/>
            <strong>Model:</strong> {employee.model}<br/>
            <strong>Specifications:</strong> {JSON.stringify(employee.specifications)}<br/>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeDetail;
