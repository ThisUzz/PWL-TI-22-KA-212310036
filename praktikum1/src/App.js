import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  // Form state
  const [formData, setFormData] = useState({
    npm: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: null
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For NPM field - only allow numbers and max 10 digits
    if (name === 'npm') {
      if (!/^\d*$/.test(value)) {
        return;
      }
      if (value.length > 9) {
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthdate: date
    });
  };

  // Calculate age based on birthdate
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.npm) {
      newErrors.npm = 'NPM is required';
    } else if (formData.npm.length !== 9) {
      newErrors.npm = 'NPM must be 9 digits';
    }
    
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    
    if (!formData.birthdate) {
      newErrors.birthdate = 'Birthdate is required';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Clear any previous errors
    setErrors({});
    
    // Calculate age
    const age = calculateAge(formData.birthdate);
    
    // Prepare user info for modal
    const fullName = [
      formData.firstName,
      formData.middleName,
      formData.lastName
    ].filter(Boolean).join(' ');
    
    setUserInfo({
      npm: formData.npm,
      fullName: fullName,
      age: age
    });
    
    // Show modal
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Personal Data Form</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* NPM */}
                <div className="mb-3">
                  <label htmlFor="npm" className="form-label">NPM</label>
                  <input
                    type="text"
                    className={`form-control ${errors.npm ? 'is-invalid' : ''}`}
                    id="npm"
                    name="npm"
                    value={formData.npm}
                    onChange={handleChange}
                    placeholder="Enter your NPM (9 digits)"
                  />
                  {errors.npm && <div className="invalid-feedback">{errors.npm}</div>}
                </div>
                
                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your First Name"
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                
                {/* Middle Name */}
                <div className="mb-3">
                  <label htmlFor="middleName" className="form-label">Middle Name (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Enter your Middle Name (optional)"
                  />
                </div>
                
                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your Last Name"
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                
                {/* Birthdate */}
                <div className="mb-3">
                  <label htmlFor="birthdate" className="form-label">Birthdate</label>
                  <DatePicker
                    selected={formData.birthdate}
                    onChange={handleDateChange}
                    className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select your birthdate (YYYY-MM-DD)"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    id="birthdate"
                    name="birthdate"
                  />
                  {errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
                </div>
                
                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userInfo && (
            <div>
              <p><strong>NPM:</strong> {userInfo.npm}</p>
              <p><strong>Fullname:</strong> {userInfo.fullName}</p>
              <p><strong>Age:</strong> {userInfo.age}th</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;