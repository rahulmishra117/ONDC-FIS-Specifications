import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'swagger', label: 'API Docs' },
    { id: 'flow', label: 'Flow Diagrams' },
    { id: 'attribute', label: 'Attributes' },
    { id: 'error', label: 'Error Codes' },
    { id: 'sandbox', label: 'Sandbox' }
  ];

  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e9ecef',
      padding: '1rem 3rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? '#8250df' : 'transparent',
              border: 'none',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              color: activeTab === tab.id ? 'white' : '#666',
              fontWeight: '500',
              fontSize: '0.9rem',
              borderRadius: activeTab === tab.id ? '6px' : '0',
              marginRight: '0.5rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = '#8250df';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = '#666';
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;
