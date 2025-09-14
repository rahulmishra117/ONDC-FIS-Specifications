import React, { useState, useEffect } from 'react';

interface SandboxEnvironment {
  'environment-name': string;
  link: string;
}

interface SandboxUIProps {
  sandboxData?: {
    dropdown: SandboxEnvironment[];
  };
}

const SandboxUI: React.FC<SandboxUIProps> = ({ sandboxData }) => {
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [availableVersions, setAvailableVersions] = useState<SandboxEnvironment[]>([]);
  const [iframeUrl, setIframeUrl] = useState<string>('');

  useEffect(() => {
    if (sandboxData && sandboxData.dropdown && sandboxData.dropdown.length > 0) {
      // Check if dropdown contains objects with environment-name and link
      if (typeof sandboxData.dropdown[0] === 'object' && 'environment-name' in sandboxData.dropdown[0]) {
        setAvailableVersions(sandboxData.dropdown as SandboxEnvironment[]);
        setSelectedVersion((sandboxData.dropdown[0] as SandboxEnvironment)['environment-name']);
      } else {
        // Convert string array to environment objects for demo
        const demoEnvironments: SandboxEnvironment[] = (sandboxData.dropdown as string[]).map(env => ({
          'environment-name': env,
          link: `https://sandbox.ondc.org/${env.toLowerCase().replace(' ', '-')}`
        }));
        setAvailableVersions(demoEnvironments);
        setSelectedVersion(demoEnvironments[0]['environment-name']);
      }
    } else {
      // Demo data
      const demoEnvironments: SandboxEnvironment[] = [
        { 'environment-name': 'Credit', link: 'https://sandbox.ondc.org/credit' },
        { 'environment-name': 'Insurance', link: 'https://sandbox.ondc.org/insurance' },
        { 'environment-name': 'Gift Card', link: 'https://sandbox.ondc.org/gift-card' }
      ];
      setAvailableVersions(demoEnvironments);
      setSelectedVersion(demoEnvironments[0]['environment-name']);
    }
  }, [sandboxData]);

  useEffect(() => {
    // Update iframe URL based on selected version
    if (selectedVersion && availableVersions.length > 0) {
      const selectedEnv = availableVersions.find(env => env['environment-name'] === selectedVersion);
      if (selectedEnv) {
        setIframeUrl(selectedEnv.link);
      }
    }
  }, [selectedVersion, availableVersions]);

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
  };

  if (!availableVersions.length) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>No sandbox data available for this branch</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '1rem', 
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Version Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '1rem'
        }}>
          <label htmlFor="sandbox-dropdown" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333'
          }}>
            Version:
          </label>
          <select
            id="sandbox-dropdown"
            value={selectedVersion}
            onChange={(e) => handleVersionChange(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              minWidth: '200px',
              backgroundColor: 'white'
            }}
          >
            {availableVersions.map((env, index) => (
              <option key={index} value={env['environment-name']}>
                {env['environment-name']}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sandbox Iframe */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          color: '#333',
          fontSize: '1.2rem'
        }}>
          {selectedVersion} Sandbox Environment
        </h3>
        
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            height="800px"
            width="100%"
            title={`${selectedVersion} Sandbox`}
            style={{
              border: '1px solid #e9ecef',
              borderRadius: '4px'
            }}
            onError={() => {
              console.log('Iframe failed to load:', iframeUrl);
            }}
          />
        ) : (
          <div style={{
            height: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '4px',
            color: '#666'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>Sandbox Preview</h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>
                This would display the {selectedVersion} sandbox environment
              </p>
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                margin: '1rem 0',
                textAlign: 'left'
              }}>
                <h5 style={{ margin: '0 0 1rem 0', color: '#333' }}>Available API Endpoints:</h5>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#666' }}>
                  <li>POST /search - Search for {selectedVersion.toLowerCase()} products</li>
                  <li>POST /select - Select a specific product</li>
                  <li>POST /init - Initialize transaction</li>
                  <li>POST /confirm - Confirm transaction</li>
                  <li>POST /status - Check transaction status</li>
                </ul>
              </div>
              <div style={{
                backgroundColor: '#e3f2fd',
                border: '1px solid #2196f3',
                borderRadius: '8px',
                padding: '1rem',
                margin: '1rem 0'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1976d2' }}>
                  <strong>Note:</strong> In a real implementation, this would load the actual sandbox iframe 
                  with interactive API testing capabilities.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ 
          margin: 0, 
          color: '#666',
          fontSize: '0.9rem'
        }}>
          <strong>Sandbox Environment:</strong> {selectedVersion} - {availableVersions.length} versions available
        </p>
        <p style={{ 
          margin: '0.5rem 0 0 0', 
          color: '#888',
          fontSize: '0.8rem'
        }}>
          This sandbox allows you to test API endpoints and explore the {selectedVersion} service functionality.
        </p>
      </div>
    </div>
  );
};

export default SandboxUI;
