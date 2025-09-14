import React, { useState, useEffect } from 'react';

interface ErrorCode {
  Event: string;
  Description: string;
  From: string;
  code: string | number;
}

interface ErrorUIProps {
  errorCodes?: {
    code: ErrorCode[];
  };
}

const ErrorUI: React.FC<ErrorUIProps> = ({ errorCodes }) => {
  const [selectedErrorSet, setSelectedErrorSet] = useState<string>('code');
  const [availableErrorSets, setAvailableErrorSets] = useState<string[]>([]);
  const [currentErrors, setCurrentErrors] = useState<ErrorCode[]>([]);

  useEffect(() => {
    if (errorCodes && Object.keys(errorCodes).length > 0) {
      const errorSetKeys = Object.keys(errorCodes);
      setAvailableErrorSets(errorSetKeys);
      setSelectedErrorSet(errorSetKeys[0]);
      loadErrorSet(errorSetKeys[0]);
    } else {
      // Demo data
      const demoErrorCodes = {
        code: [
          {
            Event: "Application submission failure",
            Description: "Buyer application could not submit the loan application to the lender/s",
            From: "BAP",
            code: 80101
          },
          {
            Event: "AA consent creation failure",
            Description: "Lender could not create data fetch consent on account aggregator",
            From: "BPP",
            code: 80201
          },
          {
            Event: "AA data pull failure",
            Description: "Lender could not retrieve bank statement from the AA",
            From: "BPP",
            code: 80202
          },
          {
            Event: "Offer return failure",
            Description: "Lenders could not return loan offers to the buyer app",
            From: "BPP",
            code: 80203
          },
          {
            Event: "Offer acceptance failure",
            Description: "Buyer application could not submit user selected offer to the lender",
            From: "BAP",
            code: 80102
          }
        ]
      };

      setAvailableErrorSets(Object.keys(demoErrorCodes));
      setSelectedErrorSet('code');
      loadErrorSet('code', demoErrorCodes);
    }
  }, [errorCodes]);

  const loadErrorSet = (errorSetKey: string, data?: any) => {
    const errorData = data || errorCodes;
    if (!errorData || !errorData[errorSetKey]) return;

    setCurrentErrors(errorData[errorSetKey]);
  };

  const handleErrorSetChange = (errorSetKey: string) => {
    setSelectedErrorSet(errorSetKey);
    loadErrorSet(errorSetKey);
  };

  if (!availableErrorSets.length) {
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
        <p style={{ color: '#666', fontSize: '1.1rem' }}>No error codes available for this branch</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '1rem', 
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Error Set Header */}
      <div style={{ marginBottom: '2rem' }}>
        <table style={{ width: '100%', marginBottom: '1rem' }}>
          <tbody>
            <tr>
              <td style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem'
              }}>
                <div>
                  <b>Error Set</b>
                </div>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '0.9rem'
                }}>
                  <b>BPP = Seller App</b>
                  <b>BAP = Buyer App</b>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Error Codes Table */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ overflow: 'auto' }}>
          <table 
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
              fontFamily: 'arial, sans-serif',
              minWidth: '800px'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#8250df', color: 'white' }}>
                <th style={{ 
                  padding: '8px',
                    color: 'black',
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  fontWeight: '600',
                  minWidth: '65px'
                }}>
                  Code
                </th>
                <th style={{ 
                  padding: '8px',
                    color: 'black',
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  fontWeight: '600'
                }}>
                  From
                </th>
                <th style={{ 
                  padding: '8px',
                    color: 'black',
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  fontWeight: '600'
                }}>
                  Event
                </th>
                <th style={{ 
                  padding: '8px',
                    color: 'black',
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  fontWeight: '600'
                }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {currentErrors.map((error, index) => (
                <tr 
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                    wordBreak: 'break-all'
                  }}
                >
                  <td style={{ 
                    padding: '8px',
                    color: 'black',
                    border: '1px solid #dddddd',
                    fontWeight: '600',
                    fontFamily: 'monospace',
                    minWidth: '65px'
                  }}>
                    {error.code}
                  </td>
                  <td style={{ 
                    padding: '8px',
                    color: 'black',
                    border: '1px solid #dddddd',
                    fontWeight: '500'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      backgroundColor: error.From === 'BAP' ? '#28a745' : '#007bff',
                      color: 'white'
                    }}>
                      {error.From}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '8px',
                    color: 'black',
                    border: '1px solid #dddddd',
                    fontWeight: '500',
                    lineHeight: '1.4'
                  }}>
                    {error.Event}
                  </td>
                  <td style={{ 
                    padding: '8px',
                    color: 'black',
                    border: '1px solid #dddddd',
                    lineHeight: '1.5'
                  }}>
                    {error.Description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <strong>Total Error Codes:</strong> {currentErrors.length} error codes in {selectedErrorSet} set
        </p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
          <p style={{ margin: '0.25rem 0' }}>
            <span style={{ backgroundColor: '#28a745', color: 'white', padding: '0.1rem 0.3rem', borderRadius: '3px', marginRight: '0.5rem' }}>BAP</span>
            Buyer App (Client-side errors)
          </p>
          <p style={{ margin: '0.25rem 0' }}>
            <span style={{ backgroundColor: '#007bff', color: 'white', padding: '0.1rem 0.3rem', borderRadius: '3px', marginRight: '0.5rem' }}>BPP</span>
            Seller App (Server-side errors)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorUI;
