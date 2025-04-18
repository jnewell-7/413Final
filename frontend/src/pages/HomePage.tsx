import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
<div className="homepage-container">
      <h1 className="display-4">Welcome to the Entertainment Agency</h1>
      <p className="lead">
        Find and book top entertainers for your events. View booking counts and last booked dates.
      </p>
      <Link to="/entertainers" className="btn btn-primary btn-lg">
        View Entertainers
      </Link>
    </div>
  );
};

export default HomePage;
