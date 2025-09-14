import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';import React, { useState, useEffect } from 'react';
import SwaggerUI from '../components/SwaggerUI';
import FlowUI from '../components/FlowUI';
import AttributeUI from '../components/AttributeUI';
import ErrorUI from '../components/ErrorUI';
import SandboxUI from '../components/SandboxUI';

interface BranchesPageProps {}

const BranchesPage: React.FC<BranchesPageProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [swaggerSpec, setSwaggerSpec] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBranchesTable, setShowBranchesTable] = useState<boolean>(true);
  const [availableUIs, setAvailableUIs] = useState<string[]>([]);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'swagger', label: 'API Docs' },
    { id: 'flow', label: 'Flow Diagrams' },
    { id: 'attribute', label: 'Attributes' },
    { id: 'error', label: 'Error Codes' },
    { id: 'sandbox', label: 'Sandbox' }
  ];

  // Branches data matching ONDC-FIS-Specifications format
  useEffect(() => {
    setTimeout(() => {
      setBranches([
        {
          code: "release-FIS10-2.0.0",
          name: "Gift Card",
          short_desc: "Gift - Card",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/gift-card"
        },
        {
          code: "draft-FIS11-2.0.0",
          name: "Recharge",
          short_desc: "Metro Card Recharge",
          status: "DRAFT",
          url: "https://api.ondc.org/fis/recharge"
        },
        {
          code: "release-FIS12-2.0.0",
          name: "Personal Loan",
          short_desc: "Credit - Personal Loan use case",
          status: "DEPRECATED",
          url: "https://api.ondc.org/fis/personal-loan"
        },
        {
          code: "release-FIS12-2.0.1",
          name: "Personal Loan",
          short_desc: "Credit - Personal Loan use case patch to 2.0.0",
          status: "TO_BE_DEPRECATED",
          url: "https://api.ondc.org/fis/personal-loan-v2"
        },
        {
          code: "release-FIS12-2.0.2",
          name: "Personal Loan",
          short_desc: "Credit - Personal Loan use case",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/personal-loan-v3"
        },
        {
          code: "release-FIS12-invoice-2.1.0",
          name: "Invoice Loan",
          short_desc: "Credit - GST Invoice Based Loan use case",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/invoice-loan"
        },
        {
          code: "release-FIS12-2.2.0",
          name: "Purchase Finance",
          short_desc: "Credit - Purchase Finance use case",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/purchase-finance"
        },
        {
          code: "release-FIS12-2.3.0",
          name: "Credit Line",
          short_desc: "Credit - Working Capital Line use case",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/credit-line"
        },
        {
          code: "",
          name: "Sachet Insurance",
          short_desc: "Insurance Sachet",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/sachet-insurance"
        },
        {
          code: "release-FIS13-health",
          name: "Health Insurance",
          short_desc: "Insurance - Health Insurance",
          status: "TO_BE_DEPRECATED",
          url: "https://api.ondc.org/fis/health-insurance"
        },
        {
          code: "release-FIS13-marine",
          name: "Marine Insurance",
          short_desc: "Insurance - Marine Insurance",
          status: "TO_BE_DEPRECATED",
          url: "https://api.ondc.org/fis/marine-insurance"
        },
        {
          code: "release-FIS13-motor",
          name: "Motor Insurance",
          short_desc: "Insurance - Motor Insurance",
          status: "TO_BE_DEPRECATED",
          url: "https://api.ondc.org/fis/motor-insurance"
        },
        {
          code: "release-FIS13-2.0.1-health",
          name: "Health Insurance",
          short_desc: "Insurance - Health Insurance",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/health-insurance-v2"
        },
        {
          code: "release-FIS13-2.0.1-marine",
          name: "Marine Insurance",
          short_desc: "Insurance - Marine Insurance",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/marine-insurance-v2"
        },
        {
          code: "release-FIS13-2.0.1-motor",
          name: "Motor Insurance",
          short_desc: "Insurance - Motor Insurance",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/motor-insurance-v2"
        },
        {
          code: "release-FIS14-2.0.0",
          name: "Mutual Funds",
          short_desc: "Investments - Mutual Funds",
          status: "TO_BE_DEPRECATED",
          url: "https://api.ondc.org/fis/mutual-funds"
        },
        {
          code: "release-FIS14-2.1.0",
          name: "Mutual Funds",
          short_desc: "Investments - Mutual Funds",
          status: "RELEASED",
          url: "https://api.ondc.org/fis/mutual-funds-v2"
        }
      ]);

      // Demo specification data
      const demoSpec = {
        openapi: '3.0.0',
        info: {
          title: 'ONDC Financial Services API',
          version: '2.0.0',
          description: 'Open Network for Digital Commerce Financial Services API Specification'
        },
        servers: [
          {
            url: 'https://api.ondc.org/fis',
            description: 'Production server'
          },
          {
            url: 'https://api-sandbox.ondc.org/fis',
            description: 'Sandbox server'
          }
        ],
        paths: {
          '/search': {
            post: {
              summary: 'Search for financial services',
              description: 'Search for available financial services based on criteria',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        context: {
                          type: 'object',
                          properties: {
                            domain: { type: 'string', example: 'ONDC:FIS12' },
                            action: { type: 'string', example: 'search' },
                            transaction_id: { type: 'string', example: 'a9aaecca-10b7-4d19-b640-b047a7c62196' }
                          }
                        },
                        message: {
                          type: 'object',
                          properties: {
                            intent: {
                              type: 'object',
                              properties: {
                                item: {
                                  type: 'object',
                                  properties: {
                                    descriptor: {
                                      type: 'object',
                                      properties: {
                                        name: { type: 'string', example: 'Personal Loan' }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              responses: {
                '200': {
                  description: 'Successful search response',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          context: { type: 'object' },
                          message: { type: 'object' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        'x-flows': [
          {
            summary: 'Personal Loan',
            details: [
              {
                description: 'Discovery of Funds',
                mermaid: `sequenceDiagram
    title Personal Loan Discovery
    Borrower Platform (BAP)->>Gateway (BG): search
    Gateway (BG) ->> Borrower Platform (BAP): ACK
    Gateway (BG)->>Registry: Lookup Lender Platforms (lookup)
    Registry->>Gateway (BG): List of Lender Platforms (200 OK)
    Gateway (BG)->>Lender Platform(BPP): search
    Lender Platform(BPP)->>Gateway (BG) : ACK
    Lender Platform(BPP)->>Borrower Platform (BAP): Publish Catalog of Lender 1 (on_search)
    Borrower Platform (BAP)->>Lender Platform(BPP): ACK`
              }
            ],
            steps: [
              {
                step: 1,
                title: 'Search Request',
                description: 'Borrower platform sends search request for personal loans',
                yaml: `context:
  domain: "ONDC:FIS12"
  action: "search"
  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196"
message:
  intent:
    item:
      descriptor:
        name: "Personal Loan"`
              },
              {
                step: 2,
                title: 'Search Response',
                description: 'Lender platforms respond with available loan offers',
                yaml: `context:
  domain: "ONDC:FIS12"
  action: "on_search"
  transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c62196"
message:
  catalog:
    descriptor:
      name: "Personal Loan Offers"`
              }
            ]
          }
        ],
        'x-attributes': {
          'search': {
            attribute_set: {
              'context': {
                'domain': {
                  'required': 'mandatory',
                  'usage': 'ONDC:FIS12',
                  'owner': 'Network',
                  'type': 'string',
                  'description': 'Domain of the ONDC Network',
                  'reference': 'if any'
                },
                'transaction_id': {
                  'required': 'mandatory',
                  'usage': 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                  'owner': 'Network',
                  'type': 'string',
                  'description': 'Unique transaction ID',
                  'reference': 'if any'
                },
                'action': {
                  'required': 'mandatory',
                  'usage': 'search',
                  'owner': 'Network',
                  'type': 'string',
                  'description': 'Action being performed',
                  'reference': 'if any'
                }
              },
              'message': {
                'intent': {
                  'item': {
                    'descriptor': {
                      'name': {
                        'required': 'mandatory',
                        'usage': 'Personal Loan',
                        'owner': 'Network',
                        'type': 'string',
                        'description': 'Name of the financial service',
                        'reference': 'if any'
                      }
                    }
                  }
                }
              },
              'required_attributes': ['context.domain', 'context.transaction_id', 'context.action', 'message.intent.item.descriptor.name']
            }
          },
          'init': {
            attribute_set: {
              'context': {
                'domain': {
                  'required': 'mandatory',
                  'usage': 'ONDC:FIS12',
                  'owner': 'Network',
                  'type': 'string',
                  'description': 'Domain of the ONDC Network',
                  'reference': 'if any'
                },
                'action': {
                  'required': 'mandatory',
                  'usage': 'init',
                  'owner': 'Network',
                  'type': 'string',
                  'description': 'Action being performed',
                  'reference': 'if any'
                }
              },
              'message': {
                'order': {
                  'provider': {
                    'id': {
                      'required': 'mandatory',
                      'usage': 'df5a0d61-f3f5-46ac-ad1d-21b2b60b18ab',
                      'owner': 'Network',
                      'type': 'string',
                      'description': 'Unique human readable ID',
                      'reference': 'if any'
                    }
                  }
                }
              },
              'required_attributes': ['context.domain', 'context.action', 'message.order.provider.id']
            }
          }
        },
        'x-errorcodes': {
          code: [
            {
              Event: 'search',
              Description: 'Search request failed due to invalid parameters',
              From: 'Gateway',
              code: 'SEARCH_001'
            },
            {
              Event: 'select',
              Description: 'Selection failed due to item unavailability',
              From: 'Provider',
              code: 'SELECT_001'
            }
          ]
        },
        'x-sandboxui': {
          dropdown: ['Credit', 'Insurance', 'Gift Card']
        }
      };
      
      setSwaggerSpec(demoSpec);
      
      const available = [];
      if (demoSpec['x-flows']) available.push('flow');
      if (demoSpec['x-attributes']) available.push('attribute');
      if (demoSpec['x-errorcodes']) available.push('error');
      if (demoSpec['x-sandboxui']) available.push('sandbox');
      
      setAvailableUIs(available);
      setActiveTab('home');
      setLoading(false);
    }, 300);
  }, [selectedBranch]);

  const loadBranchContent = (branchCode: string) => {
    setSelectedBranch(branchCode);
    setLoading(true);
    
    setTimeout(() => {
      const branch = branches.find(b => b.code === branchCode);
      let branchSpec: any = {};
      
      if (branch) {
        if (branch.name.includes("Gift Card")) {
          branchSpec = {
            openapi: "3.0.0",
            info: {
              title: "ONDC Gift Card Services API",
              version: "2.0.0",
              description: "Gift card services for digital commerce - Purchase, redeem, and manage digital gift cards"
            },
            servers: [
              { url: "https://api.ondc.org/fis/gift-card", description: "Gift Card Production" },
              { url: "https://api-sandbox.ondc.org/fis/gift-card", description: "Gift Card Sandbox" }
            ],
            paths: {
              "/search": {
                post: {
                  summary: "Search Gift Cards",
                  description: "Search for available gift card products from various merchants",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS10" },
                                action: { type: "string", example: "search" },
                                transaction_id: { type: "string", example: "gift-card-search-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                intent: {
                                  type: "object",
                                  properties: {
                                    item: {
                                      type: "object",
                                      properties: {
                                        descriptor: {
                                          type: "object",
                                          properties: {
                                            name: { type: "string", example: "Amazon Gift Card" },
                                            category: { type: "string", example: "Digital Gift Card" }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Gift card search results",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: {
                                type: "object",
                                properties: {
                                  catalog: {
                                    type: "object",
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        properties: {
                                          name: { type: "string", example: "Gift Card Catalog" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "/select": {
                post: {
                  summary: "Select Gift Card",
                  description: "Select a specific gift card product for purchase",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS10" },
                                action: { type: "string", example: "select" },
                                transaction_id: { type: "string", example: "gift-card-select-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                order: {
                                  type: "object",
                                  properties: {
                                    items: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          id: { type: "string", example: "gift-card-001" },
                                          descriptor: {
                                            type: "object",
                                            properties: {
                                              name: { type: "string", example: "Amazon Gift Card" },
                                              value: {
                                                type: "object",
                                                properties: {
                                                  amount: { type: "number", example: 1000 },
                                                  currency: { type: "string", example: "INR" }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Gift card selection confirmed",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: { type: "object" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        } else if (branch.name.includes("Personal Loan") || branch.name.includes("Invoice Loan") || branch.name.includes("Purchase Finance") || branch.name.includes("Credit Line")) {
          branchSpec = {
            openapi: "3.0.0",
            info: {
              title: "ONDC Credit Services API",
              version: "2.0.0",
              description: "Credit services including Personal Loans, Business Loans, and Invoice Financing"
            },
            servers: [
              { url: "https://api.ondc.org/fis/credit", description: "Credit Services Production" },
              { url: "https://api-sandbox.ondc.org/fis/credit", description: "Credit Services Sandbox" }
            ],
            paths: {
              "/search": {
                post: {
                  summary: "Search Credit Products",
                  description: "Search for available credit products like personal loans, business loans",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS12" },
                                action: { type: "string", example: "search" },
                                transaction_id: { type: "string", example: "credit-search-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                intent: {
                                  type: "object",
                                  properties: {
                                    item: {
                                      type: "object",
                                      properties: {
                                        descriptor: {
                                          type: "object",
                                          properties: {
                                            name: { type: "string", example: "Personal Loan" },
                                            category: { type: "string", example: "Credit" }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Credit product search results",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: {
                                type: "object",
                                properties: {
                                  catalog: {
                                    type: "object",
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        properties: {
                                          name: { type: "string", example: "Credit Products Catalog" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "/init": {
                post: {
                  summary: "Initialize Credit Application",
                  description: "Initialize a credit application process",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS12" },
                                action: { type: "string", example: "init" },
                                transaction_id: { type: "string", example: "credit-init-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                order: {
                                  type: "object",
                                  properties: {
                                    provider: {
                                      type: "object",
                                      properties: {
                                        id: { type: "string", example: "lender-001" }
                                      }
                                    },
                                    items: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          id: { type: "string", example: "loan-product-001" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Credit application initialized",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: { type: "object" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        } else if (branch.name.includes("Insurance")) {
          branchSpec = {
            openapi: "3.0.0",
            info: {
              title: "ONDC Insurance Services API",
              version: "2.0.0",
              description: "Insurance services for Health, Motor, Marine, and other insurance products"
            },
            servers: [
              { url: "https://api.ondc.org/fis/insurance", description: "Insurance Services Production" },
              { url: "https://api-sandbox.ondc.org/fis/insurance", description: "Insurance Services Sandbox" }
            ],
            paths: {
              "/search": {
                post: {
                  summary: "Search Insurance Products",
                  description: "Search for available insurance products",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS13" },
                                action: { type: "string", example: "search" },
                                transaction_id: { type: "string", example: "insurance-search-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                intent: {
                                  type: "object",
                                  properties: {
                                    item: {
                                      type: "object",
                                      properties: {
                                        descriptor: {
                                          type: "object",
                                          properties: {
                                            name: { type: "string", example: "Health Insurance" },
                                            category: { type: "string", example: "Insurance" }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Insurance product search results",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: {
                                type: "object",
                                properties: {
                                  catalog: {
                                    type: "object",
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        properties: {
                                          name: { type: "string", example: "Insurance Products Catalog" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "/quote": {
                post: {
                  summary: "Get Insurance Quote",
                  description: "Get insurance premium quote",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS13" },
                                action: { type: "string", example: "quote" },
                                transaction_id: { type: "string", example: "insurance-quote-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                order: {
                                  type: "object",
                                  properties: {
                                    items: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          id: { type: "string", example: "health-insurance-001" },
                                          descriptor: {
                                            type: "object",
                                            properties: {
                                              name: { type: "string", example: "Health Insurance Plan" }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Insurance quote provided",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: {
                                type: "object",
                                properties: {
                                  quote: {
                                    type: "object",
                                    properties: {
                                      price: {
                                        type: "object",
                                        properties: {
                                          value: { type: "string", example: "5000" },
                                          currency: { type: "string", example: "INR" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        } else if (branch.name.includes("Mutual Funds")) {
          branchSpec = {
            openapi: "3.0.0",
            info: {
              title: "ONDC Investment Services API",
              version: "2.0.0",
              description: "Investment services for mutual funds, SIP, and securities trading"
            },
            servers: [
              { url: "https://api.ondc.org/fis/investment", description: "Investment Services Production" },
              { url: "https://api-sandbox.ondc.org/fis/investment", description: "Investment Services Sandbox" }
            ],
            paths: {
              "/search": {
                post: {
                  summary: "Search Investment Products",
                  description: "Search for available mutual funds and investment products",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS14" },
                                action: { type: "string", example: "search" },
                                transaction_id: { type: "string", example: "investment-search-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                intent: {
                                  type: "object",
                                  properties: {
                                    item: {
                                      type: "object",
                                      properties: {
                                        descriptor: {
                                          type: "object",
                                          properties: {
                                            name: { type: "string", example: "Mutual Fund" },
                                            category: { type: "string", example: "Investment" }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Investment product search results",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: {
                                type: "object",
                                properties: {
                                  catalog: {
                                    type: "object",
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        properties: {
                                          name: { type: "string", example: "Investment Products Catalog" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "/order": {
                post: {
                  summary: "Place Investment Order",
                  description: "Place an order for mutual fund investment",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS14" },
                                action: { type: "string", example: "order" },
                                transaction_id: { type: "string", example: "investment-order-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                order: {
                                  type: "object",
                                  properties: {
                                    items: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          id: { type: "string", example: "mf-001" },
                                          descriptor: {
                                            type: "object",
                                            properties: {
                                              name: { type: "string", example: "Equity Fund" }
                                            }
                                          },
                                          quantity: {
                                            type: "object",
                                            properties: {
                                              count: { type: "number", example: 1000 }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Investment order placed",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: { type: "object" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        } else if (branch.name.includes("Recharge")) {
          branchSpec = {
            openapi: "3.0.0",
            info: {
              title: "ONDC Recharge Services API",
              version: "2.0.0",
              description: "Recharge services for metro cards, mobile, and utility payments"
            },
            servers: [
              { url: "https://api.ondc.org/fis/recharge", description: "Recharge Services Production" },
              { url: "https://api-sandbox.ondc.org/fis/recharge", description: "Recharge Services Sandbox" }
            ],
            paths: {
              "/search": {
                post: {
                  summary: "Search Recharge Services",
                  description: "Search for available recharge services",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS11" },
                                action: { type: "string", example: "search" },
                                transaction_id: { type: "string", example: "recharge-search-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                intent: {
                                  type: "object",
                                  properties: {
                                    item: {
                                      type: "object",
                                      properties: {
                                        descriptor: {
                                          type: "object",
                                          properties: {
                                            name: { type: "string", example: "Metro Card Recharge" },
                                            category: { type: "string", example: "Recharge" }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Recharge service search results",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: {
                                type: "object",
                                properties: {
                                  catalog: {
                                    type: "object",
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        properties: {
                                          name: { type: "string", example: "Recharge Services Catalog" }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "/init": {
                post: {
                  summary: "Initialize Recharge",
                  description: "Initialize a recharge transaction",
                  requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          type: "object",
                          properties: {
                            context: {
                              type: "object",
                              properties: {
                                domain: { type: "string", example: "ONDC:FIS11" },
                                action: { type: "string", example: "init" },
                                transaction_id: { type: "string", example: "recharge-init-001" }
                              }
                            },
                            message: {
                              type: "object",
                              properties: {
                                order: {
                                  type: "object",
                                  properties: {
                                    items: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          id: { type: "string", example: "metro-card-001" },
                                          descriptor: {
                                            type: "object",
                                            properties: {
                                              name: { type: "string", example: "Metro Card" }
                                            }
                                          },
                                          quantity: {
                                            type: "object",
                                            properties: {
                                              count: { type: "number", example: 1 }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  responses: {
                    "200": {
                      description: "Recharge transaction initialized",
                      content: {
                        "application/json": {
                          schema: {
                            type: "object",
                            properties: {
                              context: { type: "object" },
                              message: { type: "object" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        } else {
          branchSpec = swaggerSpec;
        }
      }
      
      setSwaggerSpec(branchSpec);
      setLoading(false);
      
      // Automatically switch to Swagger-UI tab after loading
      setActiveTab("swagger");
    }, 500);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RELEASED': return '#28a745';
      case 'DRAFT': return '#ffc107';
      case 'DEPRECATED': return '#dc3545';
      case 'TO_BE_DEPRECATED': return '#fd7e14';
      default: return '#6c757d';
    }
  };

  const renderBranchesTable = () => (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '2rem', color: '#333' }}>Branches</h3>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '0.95rem',
          fontFamily: 'arial, sans-serif'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#f8f9fa', 
              color: '#333',
              fontSize: '1rem'
            }}>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left', 
                fontWeight: '600',
                borderBottom: '1px solid #e5e7eb',
                borderRight: '1px solid #e5e7eb'
              }}>
                Usecase
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left', 
                fontWeight: '600',
                borderBottom: '1px solid #e5e7eb',
                borderRight: '1px solid #e5e7eb'
              }}>
                Description
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left', 
                fontWeight: '600',
                borderBottom: '1px solid #e5e7eb',
                borderRight: '1px solid #e5e7eb'
              }}>
                Status
              </th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left', 
                fontWeight: '600',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Branch name
              </th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr 
                key={branch.code}
                style={{ 
                  backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                  borderBottom: '1px solid #e5e7eb',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8f9fa';
                }}
              >
                <td style={{ 
                  padding: '1rem', 
                  fontWeight: '600', 
                  color: '#333',
                  fontSize: '1rem',
                  borderRight: '1px solid #e5e7eb'
                }}>
                  {branch.name}
                </td>
                <td style={{ 
                  padding: '1rem', 
                  lineHeight: '1.6',
                  color: '#374151',
                  borderRight: '1px solid #e5e7eb'
                }}>
                  {branch.short_desc}
                </td>
                <td style={{ 
                  padding: '1rem', 
                  borderRight: '1px solid #e5e7eb'
                }}>
                  <span style={{
                    backgroundColor: getStatusColor(branch.status),
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    {branch.status}
                  </span>
                </td>
                <td style={{ 
                  padding: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      color: '#333',
                      fontWeight: '500'
                    }}>
                      {branch.code}
                    </span>
                    <button
                      onClick={() => loadBranchContent(branch.code)}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0056b3';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#007bff';
                      }}
                    >
                      Load
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Branch Information</h4>
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: '#666' }}>
            Each branch represents a different financial service specification within the ONDC ecosystem. 
            Select a branch to view its specific API documentation, flows, attributes, and error codes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {branches.slice(0, 6).map(branch => (
              <div key={branch.code} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '1rem',
                backgroundColor: '#f8f9fa'
              }}>
                <h5 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{branch.name}</h5>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  {branch.short_desc}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  <p style={{ margin: '0.25rem 0' }}><strong>Code:</strong> {branch.code}</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Status:</strong> 
                    <span style={{
                      backgroundColor: getStatusColor(branch.status),
                      color: 'white',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '3px',
                      fontSize: '0.7rem',
                      marginLeft: '0.5rem'
                    }}>
                      {branch.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return renderBranchesTable();
      case 'swagger':
        return <SwaggerUI spec={swaggerSpec} />;
      case 'flow':
        return <FlowUI flows={swaggerSpec?.['x-flows'] || []} />;
      case 'attribute':
        return <AttributeUI attributes={swaggerSpec?.['x-attributes']} />;
      case 'error':
        return <ErrorUI errorCodes={swaggerSpec?.['x-errorcodes']} />;
      case 'sandbox':
        return <SandboxUI sandboxData={swaggerSpec?.['x-sandboxui']} />;
      default:
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#666' }}>Content for {activeTab} coming soon...</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #8250df',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading ONDC FIS Specifications...</p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Navigation Bar - Top Position */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div style={{ padding: '1rem' }}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default BranchesPage;