import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1.5rem 2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo and Title Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* ONDC Logo Placeholder */}
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            O
          </div>
          
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              letterSpacing: '-0.5px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              ONDC Financial Services
            </h1>
            <p style={{
              margin: '0.25rem 0 0 0',
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '400',
              letterSpacing: '0.3px'
            }}>
              Financial Services Platform
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {/* Status Badge */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '25px',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#4ade80',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            release-FIS10-2.0.0
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </header>
  );
};

export default Header;
