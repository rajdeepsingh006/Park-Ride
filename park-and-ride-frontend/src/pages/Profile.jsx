import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaCar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    licensePlate: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        licensePlate: currentUser.licensePlate || ''
      });
    }
  }, [currentUser]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateUser(formData);
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="bg-primary rounded-circle d-inline-flex p-4 mb-3">
                  <FaUser size={40} className="text-white" />
                </div>
                <h2>User Profile</h2>
              </div>

              {editMode ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>License Plate</Form.Label>
                    <Form.Control
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={onChange}
                      placeholder="Enter your vehicle license plate"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={() => setEditMode(false)}
                      disabled={loading}
                    >
                      <FaTimes className="me-2" />
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          <span className="ms-2">Saving...</span>
                        </>
                      ) : (
                        <>
                          <FaSave className="me-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <div className="mb-4">
                    <h4>
                      <FaUser className="me-2" />
                      {currentUser.name}
                    </h4>
                    <p className="text-muted">{currentUser.email}</p>
                    {currentUser.licensePlate && (
                      <p>
                        <FaCar className="me-2" />
                        <strong>License Plate:</strong> {currentUser.licensePlate}
                      </p>
                    )}
                  </div>
                  <div className="text-end">
                    <Button variant="primary" onClick={() => setEditMode(true)}>
                      <FaEdit className="me-2" />
                      Edit Profile
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;