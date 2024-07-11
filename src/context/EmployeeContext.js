// src/context/EmployeeContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [latestProducts, setLatestProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const deptResponse = await axios.get('http://localhost:9999/device');
      setDepartments(deptResponse.data);
      const empResponse = await axios.get('http://localhost:9999/products');
      setEmployees(empResponse.data);
      fetchLatestProducts(empResponse.data);
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

  const fetchLatestProducts = (products) => {
    const sortedProducts = products.sort((a, b) => b.id - a.id);
    const latestProducts = sortedProducts.slice(0, 4);
    setLatestProducts(latestProducts);
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : 'Unknown';
  };

  const addToCart = (product, quantity) => {
    const existingCart = cart.find(product1 => product1.id == product.id);
    if(existingCart) {
      setCart(cart.map(product1 =>
        product1.id == product.id ? {...product1, quantity: product1.quantity + quantity} : product1
      ));
    }else{
      setCart([...cart, { ...product, quantity}])
    }
  }

  const increaseQuantity = (id) => {
    setCart(cart.map(product1 =>
      product1.id == id ? { ...product1, quantity: product1.quantity + 1 } : product1 
    ));
  }
  const decreaseQuantity = (id) => {
    setCart(cart.map(product1 => {
      if (product1.id == id) {
        if (product1.quantity > 1) {
          return { ...product1, quantity: product1.quantity - 1 };
        } else {
          // return null; // Đánh dấu để xóa
        }
      }
      return product1;
    }).filter(product1 => product1 !== null));
  };

  const removeEmployeeFromTeam = (id) => {
    setCart(cart.filter(product1 => product1.id != id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(product1 => 
      product1.id == id ? { ...product1, quantity } : product1
    ));
  };
  
  return (
    <EmployeeContext.Provider value={{ departments, employees, setEmployees, selectedDepartment, setSelectedDepartment, searchTerm, setSearchTerm, addEmployee, getDepartmentName,
      latestProducts,
      cart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeEmployeeFromTeam,
      updateQuantity}}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
