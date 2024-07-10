// src/context/EmployeeContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      const deptResponse = await axios.get('http://localhost:9999/device');
      setDepartments(deptResponse.data);
      const empResponse = await axios.get('http://localhost:9999/products');
      setEmployees(empResponse.data);
      // const cartResponse = await axios.get('http://localhost:9999/cart');
      // setCart(cartResponse.data);

      // employees.map(employee => (
      //   axios.post('http://localhost:9999/cart', {
      //     id: "" + (cart.length + 1),
      //     classId : employee.id,
      //     quantity : 0
      //   })
      // ));
    };
    fetchData();
  }, []);


  const addEmployee = async (employee) => {
    const response = await axios.post('http://localhost:9999/products', {
      ...employee,
      id: "" + employees.length + 1
    });
    setEmployees([...employees, response.data]);
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : 'Unknown';
  };
  return (
    <EmployeeContext.Provider value={{ departments, employees, setEmployees, selectedDepartment, setSelectedDepartment, searchTerm, setSearchTerm, addEmployee, getDepartmentName }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
