import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface SwaggerUIProps {
  spec?: any;
}

const SwaggerUIComponent: React.FC<SwaggerUIProps> = ({ spec }) => {
  const [swaggerSpec, setSwaggerSpec] = useState<any>(null);

  useEffect(() => {
    if (spec) {
      // Create branch-specific OpenAPI specification
      const title = spec.info?.title || '';
      
      let branchSpec = {
        openapi: '3.0.0',
        info: {
          title: spec.info?.title || 'ONDC Financial Services API',
          version: spec.info?.version || '2.0.0',
          description: spec.info?.description || 'Open Network for Digital Commerce Financial Services API Specification'
        },
        servers: spec.servers || [
          {
            url: 'https://api.ondc.org/fis',
            description: 'Production server'
          },
          {
            url: 'https://api-sandbox.ondc.org/fis',
            description: 'Sandbox server'
          }
        ],
        paths: {},
        components: {
          schemas: {
            Context: {
              type: 'object',
              properties: {
                domain: {
                  type: 'string',
                  example: 'ONDC:FIS12',
                  description: 'Domain of the ONDC Network'
                },
                action: {
                  type: 'string',
                  example: 'search',
                  description: 'Action being performed'
                },
                transaction_id: {
                  type: 'string',
                  example: 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                  description: 'Unique transaction ID'
                },
                message_id: {
                  type: 'string',
                  example: 'a9aaecca-10b7-4d19-b640-b047a7c62197',
                  description: 'Unique message ID'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-15T10:30:00Z',
                  description: 'Timestamp of the request'
                },
                version: {
                  type: 'string',
                  example: '2.0.0',
                  description: 'API version'
                },
                bap_uri: {
                  type: 'string',
                  example: 'https://buyer-app.com',
                  description: 'Buyer App URI'
                },
                bap_id: {
                  type: 'string',
                  example: 'buyer-app-001',
                  description: 'Buyer App ID'
                },
                bpp_id: {
                  type: 'string',
                  example: 'seller-app-001',
                  description: 'Seller App ID'
                },
                bpp_uri: {
                  type: 'string',
                  example: 'https://seller-app.com',
                  description: 'Seller App URI'
                },
                ttl: {
                  type: 'string',
                  example: 'PT30S',
                  description: 'Time to live'
                }
              },
              required: ['domain', 'action', 'transaction_id', 'message_id', 'timestamp', 'version', 'bap_uri', 'bap_id']
            },
            Message: {
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
                            name: {
                              type: 'string',
                              example: title.includes('Credit') ? 'Personal Loan' : 
                                      title.includes('Insurance') ? 'Health Insurance' : 
                                      title.includes('Payment') ? 'UPI Payment' : 'Gift Card',
                              description: 'Name of the financial service'
                            },
                            short_desc: {
                              type: 'string',
                              example: 'Short description of the service',
                              description: 'Short description'
                            },
                            long_desc: {
                              type: 'string',
                              example: 'Detailed description of the service',
                              description: 'Long description'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            SearchRequest: {
              type: 'object',
              properties: {
                context: {
                  $ref: '#/components/schemas/Context'
                },
                message: {
                  $ref: '#/components/schemas/Message'
                }
              },
              required: ['context', 'message']
            },
            SearchResponse: {
              type: 'object',
              properties: {
                context: {
                  $ref: '#/components/schemas/Context'
                },
                message: {
                  type: 'object',
                  properties: {
                    catalog: {
                      type: 'object',
                      properties: {
                        descriptor: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string',
                              example: 'Financial Services Catalog',
                              description: 'Catalog name'
                            }
                          }
                        },
                        providers: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: {
                                type: 'string',
                                example: 'provider-001',
                                description: 'Provider ID'
                              },
                              descriptor: {
                                type: 'object',
                                properties: {
                                  name: {
                                    type: 'string',
                                    example: title.includes('Credit') ? 'ICICI Bank' : 
                                            title.includes('Insurance') ? 'HDFC Life' : 
                                            title.includes('Payment') ? 'Paytm' : 'Amazon Pay',
                                    description: 'Provider name'
                                  }
                                }
                              },
                              items: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    id: {
                                      type: 'string',
                                      example: 'item-001',
                                      description: 'Item ID'
                                    },
                                    descriptor: {
                                      type: 'object',
                                      properties: {
                                        name: {
                                          type: 'string',
                                          example: title.includes('Credit') ? 'Personal Loan - Up to ₹5 Lakhs' : 
                                                  title.includes('Insurance') ? 'Health Insurance - Family Plan' : 
                                                  title.includes('Payment') ? 'UPI Payment Gateway' : 'Gift Card - ₹1000',
                                          description: 'Item name'
                                        },
                                        price: {
                                          type: 'object',
                                          properties: {
                                            currency: {
                                              type: 'string',
                                              example: 'INR',
                                              description: 'Currency code'
                                            },
                                            value: {
                                              type: 'string',
                                              example: '1000.00',
                                              description: 'Price value'
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
              required: ['context', 'message']
            }
          }
        }
      };

      // Add branch-specific endpoints
      if (title.includes('Credit')) {
        branchSpec.paths = {
          '/search': {
            post: {
              tags: ['Credit Services'],
              summary: 'Search for credit services',
              description: 'Search for available credit services including personal loans, business loans, and invoice financing',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/SearchRequest'
                    },
                    example: {
                      context: {
                        domain: 'ONDC:FIS12',
                        action: 'search',
                        transaction_id: 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                        message_id: 'a9aaecca-10b7-4d19-b640-b047a7c62197',
                        timestamp: '2024-01-15T10:30:00Z',
                        version: '2.0.0',
                        bap_uri: 'https://borrower-app.com',
                        bap_id: 'borrower-app-001',
                        bpp_id: 'lender-app-001',
                        bpp_uri: 'https://lender-app.com',
                        ttl: 'PT30S'
                      },
                      message: {
                        intent: {
                          item: {
                            descriptor: {
                              name: 'Personal Loan',
                              short_desc: 'Personal loan for various purposes',
                              long_desc: 'Personal loan with competitive interest rates and flexible repayment options'
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
                  description: 'Successful search response with available credit services',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/SearchResponse'
                      },
                      example: {
                        context: {
                          domain: 'ONDC:FIS12',
                          action: 'on_search',
                          transaction_id: 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                          message_id: 'a9aaecca-10b7-4d19-b640-b047a7c62198',
                          timestamp: '2024-01-15T10:30:05Z',
                          version: '2.0.0',
                          bap_uri: 'https://borrower-app.com',
                          bap_id: 'borrower-app-001',
                          bpp_id: 'lender-app-001',
                          bpp_uri: 'https://lender-app.com',
                          ttl: 'PT30S'
                        },
                        message: {
                          catalog: {
                            descriptor: {
                              name: 'Credit Services Catalog'
                            },
                            providers: [
                              {
                                id: 'icici-bank',
                                descriptor: {
                                  name: 'ICICI Bank'
                                },
                                items: [
                                  {
                                    id: 'personal-loan-001',
                                    descriptor: {
                                      name: 'Personal Loan - Up to ₹5 Lakhs',
                                      price: {
                                        currency: 'INR',
                                        value: '0.00'
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                '400': {
                  description: 'Bad Request - Invalid search parameters',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          error: {
                            type: 'object',
                            properties: {
                              code: { type: 'string', example: 'SEARCH_001' },
                              message: { type: 'string', example: 'Invalid search parameters' }
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
          '/select': {
            post: {
              tags: ['Credit Services'],
              summary: 'Select a credit service',
              description: 'Select a specific credit service from the search results',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        context: { $ref: '#/components/schemas/Context' },
                        message: {
                          type: 'object',
                          properties: {
                            order: {
                              type: 'object',
                              properties: {
                                items: {
                                  type: 'array',
                                  items: {
                                    type: 'object',
                                    properties: {
                                      id: { type: 'string', example: 'personal-loan-001' },
                                      descriptor: { type: 'object' }
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
                  description: 'Service selection confirmed',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          context: { $ref: '#/components/schemas/Context' },
                          message: { type: 'object' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '/init': {
            post: {
              tags: ['Credit Services'],
              summary: 'Initialize credit application',
              description: 'Initialize the credit application process',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        context: { $ref: '#/components/schemas/Context' },
                        message: {
                          type: 'object',
                          properties: {
                            order: {
                              type: 'object',
                              properties: {
                                provider: { type: 'object' },
                                items: { type: 'array' }
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
                  description: 'Credit application initialized',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          context: { $ref: '#/components/schemas/Context' },
                          message: { type: 'object' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        };
      } else if (title.includes('Insurance')) {
        branchSpec.paths = {
          '/search': {
            post: {
              tags: ['Insurance Services'],
              summary: 'Search for insurance products',
              description: 'Search for available insurance products including health, life, motor, and travel insurance',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/SearchRequest'
                    },
                    example: {
                      context: {
                        domain: 'ONDC:FIS12',
                        action: 'search',
                        transaction_id: 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                        message_id: 'a9aaecca-10b7-4d19-b640-b047a7c62197',
                        timestamp: '2024-01-15T10:30:00Z',
                        version: '2.0.0',
                        bap_uri: 'https://customer-app.com',
                        bap_id: 'customer-app-001',
                        bpp_id: 'insurer-app-001',
                        bpp_uri: 'https://insurer-app.com',
                        ttl: 'PT30S'
                      },
                      message: {
                        intent: {
                          item: {
                            descriptor: {
                              name: 'Health Insurance',
                              short_desc: 'Health insurance coverage',
                              long_desc: 'Comprehensive health insurance with cashless treatment'
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
                  description: 'Successful search response with available insurance products',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/SearchResponse'
                      }
                    }
                  }
                }
              }
            }
          },
          '/select': {
            post: {
              tags: ['Insurance Services'],
              summary: 'Select an insurance product',
              description: 'Select a specific insurance product from the search results',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        context: { $ref: '#/components/schemas/Context' },
                        message: {
                          type: 'object',
                          properties: {
                            order: {
                              type: 'object',
                              properties: {
                                items: { type: 'array' }
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
                  description: 'Insurance product selection confirmed',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          context: { $ref: '#/components/schemas/Context' },
                          message: { type: 'object' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        };
      } else if (title.includes('Payment')) {
        branchSpec.paths = {
          '/search': {
            post: {
              tags: ['Payment Services'],
              summary: 'Search for payment methods',
              description: 'Search for available payment methods including UPI, cards, wallets, and bank transfers',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/SearchRequest'
                    },
                    example: {
                      context: {
                        domain: 'ONDC:FIS12',
                        action: 'search',
                        transaction_id: 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                        message_id: 'a9aaecca-10b7-4d19-b640-b047a7c62197',
                        timestamp: '2024-01-15T10:30:00Z',
                        version: '2.0.0',
                        bap_uri: 'https://merchant-app.com',
                        bap_id: 'merchant-app-001',
                        bpp_id: 'payment-app-001',
                        bpp_uri: 'https://payment-app.com',
                        ttl: 'PT30S'
                      },
                      message: {
                        intent: {
                          item: {
                            descriptor: {
                              name: 'UPI Payment',
                              short_desc: 'UPI payment gateway',
                              long_desc: 'Secure UPI payment processing'
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
                  description: 'Successful search response with available payment methods',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/SearchResponse'
                      }
                    }
                  }
                }
              }
            }
          },
          '/init': {
            post: {
              tags: ['Payment Services'],
              summary: 'Initialize payment',
              description: 'Initialize a payment transaction',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        context: { $ref: '#/components/schemas/Context' },
                        message: {
                          type: 'object',
                          properties: {
                            order: {
                              type: 'object',
                              properties: {
                                payment: {
                                  type: 'object',
                                  properties: {
                                    amount: { type: 'string', example: '1000.00' },
                                    currency: { type: 'string', example: 'INR' }
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
                  description: 'Payment initialized successfully',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          context: { $ref: '#/components/schemas/Context' },
                          message: { type: 'object' }
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
        // Default endpoints for main/gift card
        branchSpec.paths = {
          '/search': {
            post: {
              tags: ['Gift Card Services'],
              summary: 'Search for gift card services',
              description: 'Search for available gift card services',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/SearchRequest'
                    },
                    example: {
                      context: {
                        domain: 'ONDC:FIS12',
                        action: 'search',
                        transaction_id: 'a9aaecca-10b7-4d19-b640-b047a7c62196',
                        message_id: 'a9aaecca-10b7-4d19-b640-b047a7c62197',
                        timestamp: '2024-01-15T10:30:00Z',
                        version: '2.0.0',
                        bap_uri: 'https://buyer-app.com',
                        bap_id: 'buyer-app-001',
                        bpp_id: 'seller-app-001',
                        bpp_uri: 'https://seller-app.com',
                        ttl: 'PT30S'
                      },
                      message: {
                        intent: {
                          item: {
                            descriptor: {
                              name: 'Gift Card',
                              short_desc: 'Digital gift card',
                              long_desc: 'Digital gift card for various merchants'
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
                  description: 'Successful search response with available gift card services',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/SearchResponse'
                      }
                    }
                  }
                }
              }
            }
          }
        };
      }

      setSwaggerSpec(branchSpec);
    }
  }, [spec]);

  if (!swaggerSpec) {
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
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading Swagger documentation...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <SwaggerUI 
        spec={swaggerSpec}
        docExpansion="list"
        defaultModelsExpandDepth={2}
        defaultModelExpandDepth={2}
        displayRequestDuration={true}
        tryItOutEnabled={true}
        requestInterceptor={(request) => {
          // Add any custom request headers or modifications here
          return request;
        }}
        responseInterceptor={(response) => {
          // Add any custom response handling here
          return response;
        }}
      />
    </div>
  );
};

export default SwaggerUIComponent;
