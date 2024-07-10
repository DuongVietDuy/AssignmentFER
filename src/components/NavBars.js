import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DiApple } from 'react-icons/di';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { FaUser, FaCaretDown, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Search from './Search';

const NavBars = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra sessionStorage để xác định trạng thái đăng nhập
    const email = sessionStorage.getItem('email');
    if (email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin session
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant='dark' expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <DiApple className='me-2' />
          DuxngBui Shop
        </Navbar.Brand>
        <Form className="d-flex align-items-center me-2" style={{ paddingTop: '10px', width: '100%' }}>
          <Search className="w-100" />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
              <div onClick={() => setShowUser(!showUser)} className="flex">
                <FaUser color='white'/>
                <FaCaretDown color='white'/>
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                >
                  {isLoggedIn ? (
                    <>
                      <button
                        className="btn btn-primary px-3 py-1"
                        style={{ width: 'fit-content' }}
                        onClick={() => {
                          handleLogout();
                          setShowUser(false);
                        }}>
                      
                        Log Out
                      </button>
                      <Link to="/profile" className="text-decoration-none">
                        <button className="btn btn-primary px-4 py-1 mt-2">
                          Profile
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/signin">
                        <button className="btn btn-primary px-4 py-1" style={{ width: 'fit-content' }}>
                          Login
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="btn btn-primary px-3 py-1 mt-2 me-1"
                        >
                          SignUp
                        </button>
                      </Link>
                    </>
                  )}
                </motion.ul>
              )}
              {isLoggedIn && (
                <Link to="/cart">
                  <div className="relative">
                    <FaShoppingCart color='white'/>
                    <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                      {/* Add cart item count here if needed */}
                    </span>
                  </div>
                </Link>
              )}
            </div>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBars;
