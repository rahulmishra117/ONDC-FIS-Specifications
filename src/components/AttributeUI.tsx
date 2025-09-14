import React, { useState, useEffect } from 'react';

interface AttributeData {
  required: string;
  usage: string;
  owner: string;
  type: string;
  description: string;
  reference?: string;
}

interface AttributeSet {
  [key: string]: AttributeData | any;
  required_attributes?: string[];
}

interface AttributeUIProps {
  attributes?: {
    [key: string]: {
      attribute_set: AttributeSet;
    };
  };
}

const AttributeUI: React.FC<AttributeUIProps> = ({ attributes }) => {
  const [selectedAttribute, setSelectedAttribute] = useState<string>('');
  const [selectedAttributeSet, setSelectedAttributeSet] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [flattenedAttributes, setFlattenedAttributes] = useState<Array<{
    path: string;
    data: AttributeData;
  }>>([]);
  const [availableAttributes, setAvailableAttributes] = useState<string[]>([]);
  const [availableAttributeSets, setAvailableAttributeSets] = useState<string[]>([]);

  useEffect(() => {
    if (attributes && Object.keys(attributes).length > 0) {
      const attrKeys = Object.keys(attributes);
      setAvailableAttributes(attrKeys);
      setSelectedAttribute(attrKeys[0]);
      loadAttributeSets(attrKeys[0]);
    } else {
      // Demo data
      const demoAttributes = {
        search: {
          attribute_set: {
            context: {
              domain: {
                required: 'mandatory',
                usage: 'ONDC:FIS12',
                owner: 'Network',
                type: 'string',
                description: 'Domain of the ONDC Network',
                reference: 'if any'
              },
              transaction_id: {
                required: 'mandatory',
                usage: 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                owner: 'Network',
                type: 'string',
                description: 'Unique transaction ID',
                reference: 'if any'
              },
              action: {
                required: 'mandatory',
                usage: 'search',
                owner: 'Network',
                type: 'string',
                description: 'Action being performed',
                reference: 'if any'
              }
            },
            message: {
              intent: {
                item: {
                  descriptor: {
                    name: {
                      required: 'mandatory',
                      usage: 'Personal Loan',
                      owner: 'Network',
                      type: 'string',
                      description: 'Name of the financial service',
                      reference: 'if any'
                    }
                  }
                }
              }
            },
            required_attributes: ['context.domain', 'context.transaction_id', 'context.action', 'message.intent.item.descriptor.name']
          }
        },
        init: {
          attribute_set: {
            context: {
              domain: {
                required: 'mandatory',
                usage: 'ONDC:FIS12',
                owner: 'Network',
                type: 'string',
                description: 'Domain of the ONDC Network',
                reference: 'if any'
              },
              action: {
                required: 'mandatory',
                usage: 'init',
                owner: 'Network',
                type: 'string',
                description: 'Action being performed',
                reference: 'if any'
              }
            },
            message: {
              order: {
                provider: {
                  id: {
                    required: 'mandatory',
                    usage: 'df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab',
                    owner: 'Network',
                    type: 'string',
                    description: 'Unique human readable ID',
                    reference: 'if any'
                  }
                }
              }
            },
            required_attributes: ['context.domain', 'context.action', 'message.order.provider.id']
          }
        }
      };

      setAvailableAttributes(Object.keys(demoAttributes));
      setSelectedAttribute('search');
      loadAttributeSets('search', demoAttributes);
    }
  }, [attributes]);

  const loadAttributeSets = (attributeKey: string, data?: any) => {
    const attributeData = data || attributes;
    if (!attributeData || !attributeData[attributeKey]) return;

    const sets = Object.keys(attributeData[attributeKey].attribute_set);
    setAvailableAttributeSets(sets);
    setSelectedAttributeSet(sets[0]);
    
    loadAttributeSetData(attributeKey, sets[0], attributeData);
  };

  const loadAttributeSetData = (attributeKey: string, setKey: string, data?: any) => {
    const attributeData = data || attributes;
    if (!attributeData || !attributeData[attributeKey] || !attributeData[attributeKey].attribute_set[setKey]) return;

    const setData = attributeData[attributeKey].attribute_set[setKey];
    const requiredAttributes = setData.required_attributes || [];
    
    const flattened = flattenObject(setData, '', [], requiredAttributes);
    setFlattenedAttributes(flattened);
  };

  const flattenObject = (obj: any, prefix: string = '', result: Array<{path: string, data: AttributeData}> = [], requiredAttr?: string[]): Array<{path: string, data: AttributeData}> => {
    if (obj && typeof obj === 'object' && 'required' in obj && 'usage' in obj && 'owner' in obj && 'type' in obj && 'description' in obj) {
      const isSearchMatched = searchTerm 
        ? prefix.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      if (isSearchMatched && (requiredAttr === undefined || requiredAttr.includes(prefix))) {
        result.push({
          path: prefix,
          data: {
            required: obj.required,
            usage: obj.usage,
            owner: obj.owner,
            type: obj.type,
            description: obj.description,
            reference: obj.reference
          }
        });
      }

      if (Object.keys(obj).length === 5 || Object.keys(obj).length === 6) {
        return result;
      }
    }

    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        continue;
      }

      if (obj.hasOwnProperty(key) && key !== 'required_attributes') {
        const newKey = prefix ? prefix + '.' + key : key;
        if (Array.isArray(obj[key])) {
          continue;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (key !== '_description') {
            flattenObject(obj[key], newKey, result, requiredAttr);
          }
        }
      }
    }

    return result;
  };

  const handleAttributeChange = (attributeKey: string) => {
    setSelectedAttribute(attributeKey);
    loadAttributeSets(attributeKey);
  };

  const handleAttributeSetChange = (setKey: string) => {
    setSelectedAttributeSet(setKey);
    loadAttributeSetData(selectedAttribute, setKey);
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (attributes && selectedAttribute && selectedAttributeSet) {
      loadAttributeSetData(selectedAttribute, selectedAttributeSet);
    }
  };

  if (!availableAttributes.length) {
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
        <p style={{ color: '#666', fontSize: '1.1rem' }}>No attribute data available for this branch</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '1rem', 
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Controls */}
      <div style={{ marginBottom: '2rem' }}>
        <table style={{ width: '100%', marginBottom: '1rem' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '0.5rem' }}>Attribute Set</td>
              <td>
                <select
                  value={selectedAttributeSet}
                  onChange={(e) => handleAttributeSetChange(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    minWidth: '150px',
                    backgroundColor: 'white'
                  }}
                >
                  {availableAttributeSets.map(set => (
                    <option key={set} value={set}>{set}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={selectedAttribute}
                  onChange={(e) => handleAttributeChange(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    minWidth: '150px',
                    backgroundColor: 'white'
                  }}
                >
                  {availableAttributes.map(attr => (
                    <option key={attr} value={attr}>{attr}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Search Input */}
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search Attribute.."
          style={{
            width: '100%',
            fontSize: '16px',
            padding: '12px 20px',
            border: '1px solid #ddd',
            marginBottom: '12px',
            marginTop: '12px',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Attributes Table */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <table 
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            fontFamily: 'arial, sans-serif'
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#8250df', color: 'white' }}>
              <th style={{ 
                padding: '8px',
                border: '1px solid #dddddd',
                textAlign: 'left',
                fontWeight: '600'
              }}>
                Attribute Path
              </th>
              <th style={{ 
                padding: '8px',
                border: '1px solid #dddddd',
                textAlign: 'left',
                fontWeight: '600'
              }}>
                Required
              </th>
              <th style={{ 
                padding: '8px',
                border: '1px solid #dddddd',
                textAlign: 'left',
                fontWeight: '600'
              }}>
                Sample Usage
              </th>
              <th style={{ 
                padding: '8px',
                border: '1px solid #dddddd',
                textAlign: 'left',
                fontWeight: '600'
              }}>
                Owner
              </th>
              <th style={{ 
                padding: '8px',
                border: '1px solid #dddddd',
                textAlign: 'left',
                fontWeight: '600'
              }}>
                Type
              </th>
              <th style={{ 
                padding: '8px',
                border: '1px solid #dddddd',
                textAlign: 'left',
                fontWeight: '600'
              }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {flattenedAttributes.map((attr, index) => (
              <tr 
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
                }}
              >
                <td style={{ 
                  padding: '8px',
                  border: '1px solid #dddddd',
                  wordBreak: 'break-all',
                  fontWeight: '600',
                  color: '#8250df',
                  fontFamily: 'monospace'
                }}>
                  {attr.path}
                </td>
                <td style={{ 
                  padding: '8px',
                  border: '1px solid #dddddd',
                  fontWeight: '500'
                }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    backgroundColor: attr.data.required === 'mandatory' ? '#dc3545' : '#6c757d',
                    color: 'white'
                  }}>
                    {attr.data.required}
                  </span>
                </td>
                <td style={{ 
                  padding: '8px',
                  border: '1px solid #dddddd',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem'
                }}>
                  {attr.data.usage}
                </td>
                <td style={{ 
                  padding: '8px',
                  border: '1px solid #dddddd',
                  fontWeight: '500'
                }}>
                  {attr.data.owner}
                </td>
                <td style={{ 
                  padding: '8px',
                  border: '1px solid #dddddd',
                  fontWeight: '500'
                }}>
                  {attr.data.type}
                </td>
                <td style={{ 
                  padding: '8px',
                  border: '1px solid #dddddd',
                  lineHeight: '1.5'
                }}>
                  {attr.data.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <strong>Total Attributes:</strong> {flattenedAttributes.length} attributes in {selectedAttributeSet} set
          {searchTerm && ` (filtered by "${searchTerm}")`}
        </p>
      </div>
    </div>
  );
};

export default AttributeUI;
