import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { getEntertainerByID, deleteEntertainer } from '../api/FinalAPI';
import EditEntertainerForm from '../components/EditEntertainerForm';
import '../styles/EntertainerDetails.css';

const EntertainerDetailsPage: React.FC = () => {
  const { entertainerID } = useParams<{ entertainerID: string }>();
  const navigate = useNavigate();

  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const load = async () => {
    if (!entertainerID) return;
    try {
      setLoading(true);
      const data = await getEntertainerByID(Number(entertainerID));
      setEntertainer(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [entertainerID]);

  const handleDelete = async () => {
    if (!entertainer) return;
    if (!window.confirm('Delete this entertainer?')) return;
    try {
      await deleteEntertainer(entertainer.entertainerID);
      navigate('/entertainers');
    } catch (err) {
      alert('Error deleting entertainer: ' + (err as Error).message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!entertainer) return <div>No entertainer found.</div>;

  if (isEditing) {
    return (
      <EditEntertainerForm
        entertainer={entertainer}
        onSuccess={() => {
          setIsEditing(false);
          load();
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="entertainer-details-wrapper mt-5">
      <div className="card entertainer-details-card">
        <h3 className="card-title">{entertainer.entStageName}</h3>

        <div className="card-body">
          <div className="detail-row">
            <strong>Bookings:</strong> {entertainer.timesBooked ?? 0}
          </div>
          {entertainer.timesBooked ? (
            <div className="detail-row">
              <strong>Last Booked:</strong>{' '}
              {entertainer.lastBooked?.slice(0, 10)}
            </div>
          ) : null}

          <div className="detail-row">
            <strong>SSN:</strong> {entertainer.entSSN}
          </div>
          <div className="detail-row">
            <strong>Phone:</strong> {entertainer.entPhoneNumber}
          </div>
          <div className="detail-row">
            <strong>Address:</strong>{' '}
            {`${entertainer.entStreetAddress}, ${entertainer.entCity}, ${entertainer.entState} ${entertainer.entZipCode}`}
          </div>
          <div className="detail-row">
            <strong>Email:</strong> {entertainer.entEMailAddress}
          </div>
          <div className="detail-row">
            <strong>Web Page:</strong>{' '}
            <a
              href={entertainer.entWebPage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entertainer.entWebPage}
            </a>
          </div>
          <div className="detail-row">
            <strong>Date Entered:</strong>{' '}
            {entertainer.dateEntered && entertainer.dateEntered.slice(0, 10)}
          </div>

          <div className="mt-3">
            <button
              className="btn btn-primary me-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="back-button-wrapper">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default EntertainerDetailsPage;
