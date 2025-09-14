import React from 'react';
import Header from './components/Header';
import BranchesPage from './pages/BranchesPage';
import './App.css';

function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <BranchesPage />
    </div>
  );
}

export default App;
