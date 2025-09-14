import React, { useState, useEffect, useRef } from 'react';

interface FlowDetail {
  description: string;
  mermaid: string;
}

interface Flow {
  summary: string;
  details: FlowDetail[];
  steps: Array<{
    api: string;
    summary: string;
    stepName?: string;
    details?: FlowDetail[];
    example: {
      value: any;
    };
  }>;
}

interface FlowUIProps {
  flows?: Flow[];
}

const FlowUI: React.FC<FlowUIProps> = ({ flows }) => {
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [mermaidLoaded, setMermaidLoaded] = useState<boolean>(false);
  const diagramRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Load Mermaid dynamically
    const loadMermaid = async () => {
      if (typeof window !== 'undefined' && !mermaidLoaded) {
        try {
          const mermaid = await import('mermaid');
          mermaid.default.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true
            },
            sequence: {
              diagramMarginX: 50,
              diagramMarginY: 10,
              actorMargin: 50,
              width: 150,
              height: 65,
              boxMargin: 10,
              boxTextMargin: 5,
              noteMargin: 10,
              messageMargin: 35,
              mirrorActors: true,
              bottomMarginAdj: 1,
              useMaxWidth: true,
              rightAngles: false,
              showSequenceNumbers: false
            }
          });
          setMermaidLoaded(true);
        } catch (error) {
          console.error('Failed to load Mermaid:', error);
        }
      }
    };

    loadMermaid();
  }, [mermaidLoaded]);

  useEffect(() => {
    if (!flows || flows.length === 0) {
      const demoFlows: Flow[] = [
        {
          summary: 'Personal Loan Discovery',
          details: [
            {
              description: 'Personal Loan Discovery Flow - Complete end-to-end flow from loan search to disbursement',
              mermaid: `sequenceDiagram
    title Personal Loan Discovery Flow
    participant BAP as Borrower Platform (BAP)
    participant BG as Gateway (BG)
    participant Registry as Registry
    participant BPP as Lender Platform (BPP)
    
    BAP->>BG: search (Personal Loan Request)
    BG->>BAP: ACK
    BG->>Registry: Lookup Lender Platforms
    Registry->>BG: List of Lender Platforms
    BG->>BPP: search (Forward Request)
    BPP->>BG: ACK
    BPP->>BAP: on_search (Loan Offers)
    BAP->>BPP: ACK
    BAP->>BPP: select (Choose Loan Offer)
    BPP->>BAP: on_select (Quote & Terms)
    BAP->>BPP: init (Initialize Application)
    BPP->>BAP: on_init (Application Form)
    BAP->>BPP: confirm (Submit Application)
    BPP->>BAP: on_confirm (Application Confirmed)
    BAP->>BPP: status (Check Status)
    BPP->>BAP: on_status (Application Status)`
            }
          ],
          steps: [
            {
              api: 'search',
              summary: 'Search Personal Loans',
              stepName: 'Loan Discovery',
              details: [
                {
                  description: 'Borrower platform searches for personal loan products',
                  mermaid: `sequenceDiagram
    participant BAP as Borrower Platform
    participant BG as Gateway
    participant BPP as Lender Platform
    
    BAP->>BG: search (Loan Request)
    BG->>BPP: Forward Request
    BPP->>BAP: on_search (Available Loans)`
                }
              ],
              example: {
                value: {
                  context: {
                    domain: "ONDC:FIS12",
                    action: "search",
                    transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196"
                  },
                  message: {
                    intent: {
                      item: {
                        descriptor: {
                          name: "Personal Loan"
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              api: 'select',
              summary: 'Select Loan Offer',
              stepName: 'Offer Selection',
              details: [
                {
                  description: 'Borrower selects preferred loan offer from available options',
                  mermaid: `sequenceDiagram
    participant BAP as Borrower Platform
    participant BPP as Lender Platform
    
    BAP->>BPP: select (Chosen Offer)
    BPP->>BAP: on_select (Quote Details)`
                }
              ],
              example: {
                value: {
                  context: {
                    domain: "ONDC:FIS12",
                    action: "select",
                    transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196"
                  },
                  message: {
                    order: {
                      items: [
                        {
                          id: "loan-offer-123"
                        }
                      ]
                    }
                  }
                }
              }
            }
          ]
        },
        {
          summary: 'Gift Card Purchase',
          details: [
            {
              description: 'Gift Card Purchase Flow - Complete flow from search to delivery',
              mermaid: `sequenceDiagram
    title Gift Card Purchase Flow
    participant BAP as Buyer Platform (BAP)
    participant BG as Gateway (BG)
    participant BPP as Seller Platform (BPP)
    
    BAP->>BG: search (Gift Card Request)
    BG->>BAP: ACK
    BG->>BPP: search (Forward Request)
    BPP->>BG: ACK
    BPP->>BAP: on_search (Gift Card Catalog)
    BAP->>BPP: ACK
    BAP->>BPP: select (Choose Gift Card)
    BPP->>BAP: on_select (Quote & Terms)
    BAP->>BPP: init (Initialize Order)
    BPP->>BAP: on_init (Payment Details)
    BAP->>BPP: confirm (Confirm Purchase)
    BPP->>BAP: on_confirm (Order Confirmed)
    BAP->>BPP: status (Check Order Status)
    BPP->>BAP: on_status (Order Status)`
            }
          ],
          steps: [
            {
              api: 'search',
              summary: 'Search Gift Cards',
              stepName: 'Gift Card Discovery',
              details: [
                {
                  description: 'Buyer searches for available gift cards',
                  mermaid: `sequenceDiagram
    participant BAP as Buyer Platform
    participant BG as Gateway
    participant BPP as Seller Platform
    
    BAP->>BG: search (Gift Card Request)
    BG->>BPP: Forward Request
    BPP->>BAP: on_search (Gift Card Catalog)`
                }
              ],
              example: {
                value: {
                  context: {
                    domain: "ONDC:FIS12",
                    action: "search",
                    transaction_id: "gift-card-search-123"
                  },
                  message: {
                    intent: {
                      item: {
                        descriptor: {
                          name: "Gift Card"
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              api: 'confirm',
              summary: 'Confirm Gift Card Purchase',
              stepName: 'Purchase Confirmation',
              details: [
                {
                  description: 'Buyer confirms gift card purchase',
                  mermaid: `sequenceDiagram
    participant BAP as Buyer Platform
    participant BPP as Seller Platform
    
    BAP->>BPP: confirm (Purchase Confirmation)
    BPP->>BAP: on_confirm (Order Confirmed)`
                }
              ],
              example: {
                value: {
                  context: {
                    domain: "ONDC:FIS12",
                    action: "confirm",
                    transaction_id: "gift-card-confirm-123"
                  },
                  message: {
                    order: {
                      id: "gift-card-order-456"
                    }
                  }
                }
              }
            }
          ]
        },
        {
          summary: 'Insurance Policy Purchase',
          details: [
            {
              description: 'Insurance Policy Purchase Flow - Complete flow from policy search to activation',
              mermaid: `sequenceDiagram
    title Insurance Policy Purchase Flow
    participant BAP as Buyer Platform (BAP)
    participant BG as Gateway (BG)
    participant BPP as Insurer Platform (BPP)
    
    BAP->>BG: search (Insurance Policy Request)
    BG->>BAP: ACK
    BG->>BPP: search (Forward Request)
    BPP->>BG: ACK
    BPP->>BAP: on_search (Policy Options)
    BAP->>BPP: ACK
    BAP->>BPP: select (Choose Policy)
    BPP->>BAP: on_select (Policy Details)
    BAP->>BPP: init (Initialize Policy)
    BPP->>BAP: on_init (Payment & Documents)
    BAP->>BPP: confirm (Confirm Policy)
    BPP->>BAP: on_confirm (Policy Activated)`
            }
          ],
          steps: [
            {
              api: 'search',
              summary: 'Search Insurance Policies',
              stepName: 'Policy Discovery',
              details: [
                {
                  description: 'Buyer searches for insurance policies',
                  mermaid: `sequenceDiagram
    participant BAP as Buyer Platform
    participant BG as Gateway
    participant BPP as Insurer Platform
    
    BAP->>BG: search (Policy Request)
    BG->>BPP: Forward Request
    BPP->>BAP: on_search (Available Policies)`
                }
              ],
              example: {
                value: {
                  context: {
                    domain: "ONDC:FIS12",
                    action: "search",
                    transaction_id: "insurance-search-123"
                  },
                  message: {
                    intent: {
                      item: {
                        descriptor: {
                          name: "Health Insurance"
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      ];
      setSelectedFlow(demoFlows[0]);
    } else {
      setSelectedFlow(flows[0]);
    }
  }, [flows]);

  const renderMermaidDiagram = async (mermaidCode: string, id: string) => {
    if (!mermaidLoaded) return null;

    try {
      const mermaid = await import('mermaid');
      const element = diagramRefs.current[id];
      if (element) {
        element.innerHTML = '';
        const { svg } = await mermaid.default.render(id, mermaidCode);
        element.innerHTML = svg;
      }
    } catch (error) {
      console.error('Mermaid rendering error:', error);
    }
  };

  useEffect(() => {
    if (selectedFlow && mermaidLoaded) {
      selectedFlow.details.forEach((detail, index) => {
        if (detail.mermaid) {
          renderMermaidDiagram(detail.mermaid, `main-diagram-${index}`);
        }
      });
    }
  }, [selectedFlow, mermaidLoaded]);

  useEffect(() => {
    if (selectedFlow && selectedFlow.steps[selectedStep] && mermaidLoaded) {
      const step = selectedFlow.steps[selectedStep];
      if (step.details) {
        step.details.forEach((detail, index) => {
          if (detail.mermaid) {
            renderMermaidDiagram(detail.mermaid, `step-diagram-${selectedStep}-${index}`);
          }
        });
      }
    }
  }, [selectedStep, selectedFlow, mermaidLoaded]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!selectedFlow) {
    return (
      <div className="flow-ui">
        <div className="loading">Loading flow diagrams...</div>
      </div>
    );
  }

  return (
    <div className="flow-ui">
      <div className="flow-header">
        <h2>Flow Diagrams</h2>
        <p>Interactive flow diagrams showing the complete API sequence for each service</p>
      </div>

      {/* Flow Selection */}
      <div className="flow-selection">
        <label htmlFor="flow-dropdown" className='flow'>Select Flow:</label>
        <select
          id="flow-dropdown"
          value={selectedFlow.summary}
          onChange={(e) => {
            const flow = flows?.find(f => f.summary === e.target.value) || 
                        (flows ? flows[0] : null);
            setSelectedFlow(flow);
            setSelectedStep(0);
          }}
        >
          {flows?.map((flow, index) => (
            <option key={index} value={flow.summary}>
              {flow.summary}
            </option>
          ))}
        </select>
      </div>

      {/* Main Flow Description */}
      <div className="flow-description">
        <h3>{selectedFlow.summary}</h3>
        {selectedFlow.details.map((detail, index) => (
          <div key={index} className="flow-detail">
            <p>{detail.description}</p>
            <div 
              ref={(el) => { diagramRefs.current[`main-diagram-${index}`] = el; }}
              className="mermaid-diagram"
            />
          </div>
        ))}
      </div>

      {/* Steps Navigation */}
      <div className="steps-navigation">
        <h3>API Steps</h3>
        <div className="step-list">
          {selectedFlow.steps.map((step, index) => (
            <button
              key={index}
              className={`step-list-btn step-item ${selectedStep === index ? 'active' : ''}`}
              onClick={() => setSelectedStep(index)}
            >
              {index + 1}. {step.api}
              {step.stepName && (
                <span className="step-name">{step.stepName}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step Details */}
      <div className="step-content">
        {selectedFlow.steps[selectedStep] && (
          <div className="step-detail">
            <h3>{selectedFlow.steps[selectedStep].summary}</h3>
            
            {/* Step Description */}
            <div className="step-description">
              <p>{selectedFlow.steps[selectedStep].summary}</p>
            </div>

            {/* Step Diagrams */}
            {selectedFlow.steps[selectedStep].details && (
              <div className="step-diagrams">
                {selectedFlow.steps[selectedStep].details!.map((detail, index) => (
                  <div key={index} className="step-diagram">
                    <p>{detail.description}</p>
                    <div 
                      ref={(el) => { diagramRefs.current[`step-diagram-${selectedStep}-${index}`] = el; }}
                      className="mermaid-diagram"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step Example */}
            <div className="step-example">
              <h4>Example Request/Response</h4>
              <div className="code-section">
                <pre className="yaml-content">
                  {JSON.stringify(selectedFlow.steps[selectedStep].example.value, null, 2)}
                </pre>
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard(JSON.stringify(selectedFlow.steps[selectedStep].example.value, null, 2))}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`

        .flow{
          color:black;
        }
        .flow-ui {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .flow-header {
          margin-bottom: 30px;
        }

        .flow-header h2 {
        color : black
        }

        .flow-header p {
          margin-bottom: 15px;
          color: #333;
        }          color: #333;
          margin-bottom: 10px;
        }

        .flow-selection {
          margin-bottom: 30px;
        }

        .flow-selection label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .flow-selection select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        .flow-description {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .flow-description h3 {
          color: #333;
          margin-bottom: 15px;
        }

        .flow-detail {
          margin-bottom: 20px;
        }

        .flow-detail p {
          margin-bottom: 15px;
          color: #333;
        }

        .mermaid-diagram {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 20px;
          margin: 15px 0;
          overflow-x: auto;
        }

        .steps-navigation {
          margin-bottom: 30px;
        }

        .steps-navigation h3 {
          color: #333;
          margin-bottom: 15px;
        }
        .step-list-btn{
        color:black;
        }

        .step-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          color: black !important;
        }

        .step-item {
          padding: 10px 15px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .step-item:hover {
          background: #f8f9fa;
        }

        .step-item.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .step-name {
          display: block;
          font-size: 12px;
          color: #333;
          margin-top: 5px;
        }

        .step-item.active .step-name {
          color: white;
        }

        .step-content {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
        }

        .step-detail h3 {
          color: #333;
          margin-bottom: 15px;
        }

        .step-description {
          margin-bottom: 20px;
        }

        .step-description p {
          margin-bottom: 15px;
          color: #333;
        }

        .step-description {
        }

        .step-description p {
          margin-bottom: 15px;
          color: #333;
        }          margin-bottom: 20px;
        }

        .step-diagrams {
          margin-bottom: 20px;
        }

        .step-diagram {
          margin-bottom: 20px;
        }

        .step-diagram p {
          margin-bottom: 15px;
          color: #333;
        }

        .step-example h4 {
          color: #333;
          margin-bottom: 15px;
        }

        .code-section {
          position: relative;
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }

        .yaml-content {
          margin: 0;
          padding: 20px;
          background:rgb(1, 9, 16);
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.5;
        }

        .copy-button {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }

        .copy-button:hover {
          background: #0056b3;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default FlowUI;
