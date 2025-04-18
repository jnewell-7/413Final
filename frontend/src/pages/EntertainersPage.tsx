import React, { useState } from 'react';
import EntertainerList from '../components/EntertainerList';
import AddEntertainerForm from '../components/AddEntertainerFrom'; /* 👈 your form */

const EntertainersPage: React.FC = () => {
  /* toggle whether we’re showing the add form */
  const [showAddForm, setShowAddForm] = useState(false);

  /* key to force EntertainerList to re‑fetch after adding */
  const [listRefreshKey, setListRefreshKey] = useState(0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Entertainers</h2>

      {/* re‑mount list when refreshKey changes to trigger a reload */}
      <EntertainerList key={listRefreshKey} />

      {showAddForm ? (
        /* ───── new‑entertainer form ───── */
        <AddEntertainerForm
          onSuccess={() => {
            setShowAddForm(false);
            setListRefreshKey((prev) => prev + 1); // force refresh list
          }}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        /* ───── add button ───── */
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            + Add Entertainer
          </button>
        </div>
      )}
    </div>
  );
};

export default EntertainersPage;
