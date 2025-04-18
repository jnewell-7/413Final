import React, { useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { addEntertainer } from '../api/FinalAPI';
import '../styles/AddForm.css';

interface AddEntertainerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddEntertainerForm: React.FC<AddEntertainerFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Entertainer>({
    entertainerID: 0,
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEntertainer(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="add-entertainer-form" noValidate>
      <h2>Add New Entertainer</h2>

      <label>
        Stage Name:
        <input
          type="text"
          name="entStageName"
          value={formData.entStageName}
          onChange={handleChange}
        />
      </label>

      <label>
        SSN:
        <input
          type="text"
          name="entSSN"
          value={formData.entSSN}
          onChange={handleChange}
        />
      </label>

      <label>
        Street Address:
        <input
          type="text"
          name="entStreetAddress"
          value={formData.entStreetAddress}
          onChange={handleChange}
        />
      </label>

      <label>
        City:
        <input
          type="text"
          name="entCity"
          value={formData.entCity}
          onChange={handleChange}
        />
      </label>

      <label>
        State:
        <input
          type="text"
          name="entState"
          value={formData.entState}
          onChange={handleChange}
        />
      </label>

      <label>
        Zip Code:
        <input
          type="text"
          name="entZipCode"
          value={formData.entZipCode}
          onChange={handleChange}
        />
      </label>

      <label>
        Phone Number:
        <input
          type="text"
          name="entPhoneNumber"
          value={formData.entPhoneNumber}
          onChange={handleChange}
        />
      </label>

      <label>
        Web Page:
        {/* text type so no URL validation required */}
        <input
          type="text"
          name="entWebPage"
          value={formData.entWebPage}
          onChange={handleChange}
        />
      </label>

      <label>
        Email Address:
        <input
          type="email"
          name="entEMailAddress"
          value={formData.entEMailAddress}
          onChange={handleChange}
        />
      </label>

      <label>
        Date Entered:
        <input
          type="date"
          name="dateEntered"
          value={formData.dateEntered.slice(0, 10)}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="btn btn-success me-2">
        Add Entertainer
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddEntertainerForm;
