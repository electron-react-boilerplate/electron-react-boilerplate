import React from 'react';

function AppRow() {
  return (
    <>
      <p>Terve</p>
      <p>Moi</p>
    </>
  );
}

function ActiveAppList() {
  return (
    <div>
      <h3>Active App List</h3>
      <AppRow />
      {/* Add your list of active apps here */}
    </div>
  );
}

export default ActiveAppList;
