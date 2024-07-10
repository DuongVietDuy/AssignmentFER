import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import NavBars from "../components/NavBars";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentUserPassword, setCurrentUserPassword] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [username, setUsername] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:9999/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error(error));
        }
    }, []);

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    const handlePasswordChange = () => {
        setShowPasswordModal(true);
    };

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
        // Clear input fields when modal closes
        setCurrentUserPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleEditProfile = () => {
        setShowEditModal(true);
        setDob(user.dateOfBirth);
        setUsername(user.username);
        setPhoneNumber(user.number);
        setAddress(user.address);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        // Clear input fields when modal closes
        setDob("");
        setUsername("");
        setPhoneNumber("");
        setAddress("");
    };

    const handleSavePassword = () => {
        if (currentUserPassword !== user.password) {
            alert("Current password does not match.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match.");
            return;
        }

        if (newPassword.length < 6) {
            alert("New Password must be at least 6 characters.");
            return;
        }

        // Update password in the backend
        axios.put(`http://localhost:9999/users/${user.id}`, {
            ...user,
            password: newPassword,
        })
            .then(response => {
                setShowPasswordModal(false);
                alert("Password updated successfully.");
                // Optional: Update user state with new data if needed
                setUser(response.data);
            })
            .catch((error) => console.error("Change failed:", error));
    };

    const handleSaveProfile = () => {
        // Handle saving profile changes
        // Example: Update user data in the backend
        axios.put(`http://localhost:9999/users/${user.id}`, {
            ...user,
            dateOfBirth: dob,
            username: username,
            number: phonenumber,
            address: address,
        })
            .then(response => {
                setShowEditModal(false);
                alert("Profile updated successfully.");
                // Optional: Update user state with new data if needed
                setUser(response.data);
            })
            .catch((error) => console.error("Change failed:", error));
    };

    return (
        <>
            <NavBars />
            <Container className="rounded bg-white mt-5 mb-5">
                <Row>
                    <Col md={3} className="border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-5"
                                width="150px"
                                src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                                alt="Profile"
                            />
                            <span className="font-weight-bold">Avatar</span>
                            <span className="text-black-50">{user.email}</span>
                        </div>
                    </Col>
                    <Col md={5} className="border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile</h4>
                            </div>
                            <Form>
                                <Row className="mt-2">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="Name"
                                                value={user.username}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="mobileNumber"
                                                value={user.number}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="dateOfBirth"
                                                value={user.dob}
                                               readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={user.address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value="******"
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mt-5 text-center d-flex justify-content-center gap-3">
                                    <Button className="profile-button btn btn-warning" type="button" onClick={handlePasswordChange}>
                                        Change Password
                                    </Button>
                                    <Button variant="info" onClick={handleEditProfile}>
                                        Edit Profile
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Change Password Modal */}
            <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCurrentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter current password"
                                value={currentUserPassword}
                                onChange={(e) => setCurrentUserPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePasswordModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSavePassword}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Edit Profile Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your User Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Phone Number"
                                value={phonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter your Date of Birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSaveProfile}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
