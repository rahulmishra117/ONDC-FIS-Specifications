// Real ONDC API service using actual data from the original static files
export interface Branch {
  name: string;
  description: string;
  status: 'active' | 'beta' | 'deprecated';
  usecase: string;
}

export interface BuildSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  paths: Record<string, any>;
  components: Record<string, any>;
  'x-enum'?: Record<string, any>;
}

// Real ONDC branches based on the actual repository structure
export const fetchBranches = async (): Promise<Branch[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      name: 'main',
      description: 'Main ONDC Financial Services specification for Gift Card services',
      status: 'active',
      usecase: 'Gift Card'
    },
    {
      name: 'credit',
      description: 'Credit services specification including Personal Loans and Invoice-based Loans',
      status: 'active',
      usecase: 'Credit'
    },
    {
      name: 'loan',
      description: 'Comprehensive loan services including personal loans and invoice financing',
      status: 'beta',
      usecase: 'Loan'
    }
  ];
};

// Load the actual ONDC build specification from the original files
export const fetchBuildSpec = async (branch: string): Promise<BuildSpec> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // This is the actual ONDC specification from build.js
  return {
    openapi: "3.0.0",
    info: {
      title: "ONDC Specification",
      description: "ONDC Specification",
      version: "2.0.0"
    },
    security: [{"SubscriberAuth": []}],
    paths: {
      "/search": {
        post: {
          tags: ["Provider Platform", "Gateway"],
          description: "Consumer Platform declares the customer's intent to buy/avail products or services",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {"properties": {"action": {"enum": ["search"]}}}
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {
                        intent: {"$ref": "#/components/schemas/Intent"}
                      }
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/select": {
        post: {
          tags: ["Provider Platform"],
          description: "Consumer Platform declares the customer's cart (or equivalent) created by selecting objects from the catalog",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["select"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {"order": {"$ref": "#/components/schemas/Order"}},
                      required: ["order"]
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/init": {
        post: {
          tags: ["Provider Platform"],
          description: "Initialize an order by providing billing and/or shipping details",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["init"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {"order": {"$ref": "#/components/schemas/Order"}},
                      required: ["order"]
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/confirm": {
        post: {
          tags: ["Provider Platform"],
          description: "Initialize an order by providing billing and/or shipping details",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["confirm"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {"order": {"$ref": "#/components/schemas/Order"}},
                      required: ["order"]
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/status": {
        post: {
          tags: ["Provider Platform"],
          description: "Fetch the latest order object",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["status"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {
                        ref_id: {"$ref": "#/components/schemas/Order/properties/id"}
                      }
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/track": {
        post: {
          tags: ["Provider Platform"],
          description: "Track an active order",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["track"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {
                        order_id: {"$ref": "#/components/schemas/Order/properties/id"},
                        callback_url: {"type": "string", "format": "uri"}
                      },
                      required: ["order_id"]
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/cancel": {
        post: {
          tags: ["Provider Platform"],
          description: "Cancel an order",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["cancel"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {
                        order_id: {"$ref": "#/components/schemas/Order/properties/id"},
                        cancellation_reason_id: {"$ref": "#/components/schemas/Option/properties/id"},
                        descriptor: {"$ref": "#/components/schemas/Descriptor"}
                      },
                      required: ["order_id"]
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/update": {
        post: {
          tags: ["Provider Platform"],
          description: "Remove object",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["update"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {
                        update_target: {
                          description: "Comma separated values of order objects being updated. For example: \"update_target\":\"item,billing,fulfillment\"",
                          type: "string"
                        },
                        order: {
                          description: "Updated order object",
                          allOf: [{"$ref": "#/components/schemas/Order"}]
                        }
                      },
                      required: ["update_target", "order"]
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/rating": {
        post: {
          tags: ["Provider Platform"],
          description: "Provide feedback on a service",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["rating"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {
                        ratings: {
                          type: "array",
                          items: {"$ref": "#/components/schemas/Rating"}
                        }
                      }
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      },
      "/support": {
        post: {
          tags: ["Provider Platform"],
          description: "Contact support",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    context: {
                      allOf: [
                        {"$ref": "#/components/schemas/Context"},
                        {
                          type: "object",
                          properties: {"action": {"enum": ["support"]}},
                          required: ["action"]
                        }
                      ]
                    },
                    message: {
                      type: "object",
                      properties: {
                        support: {"$ref": "#/components/schemas/Support"}
                      }
                    }
                  },
                  required: ["context", "message"]
                }
              }
            }
          }
        }
      }
    },
    components: {
      securitySchemes: {
        SubscriberAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Signature of message body using Consumer Platform or Provider Platform subscriber's signing public key. <br/><br/>Format:<br/><br/><code>Authorization : Signature keyId=\"{subscriber_id}|{unique_key_id}|{algorithm}\",algorithm=\"ed25519\",created=\"1606970629\",expires=\"1607030629\",headers=\"(created) (expires) digest\",signature=\"Base64(signing string)\"</code>"
        }
      },
      schemas: {
        Context: {
          description: "Every API call in beckn protocol has a context. It provides a high-level overview to the receiver about the nature of the intended transaction.",
          type: "object",
          properties: {
            domain: {
              description: "Domain code that is relevant to this transaction context",
              type: "string"
            },
            action: {
              description: "The Beckn protocol method being called by the sender and executed at the receiver.",
              type: "string"
            },
            version: {
              type: "string",
              description: "Version of transaction protocol being used by the sender."
            },
            bap_id: {
              description: "Subscriber ID of the BAP",
              type: "string"
            },
            bap_uri: {
              description: "Subscriber URL of the BAP for accepting callbacks from BPPs.",
              type: "string",
              format: "uri"
            },
            bpp_id: {
              description: "Subscriber ID of the BPP",
              type: "string"
            },
            bpp_uri: {
              description: "Subscriber URL of the BPP for accepting calls from BAPs.",
              type: "string",
              format: "uri"
            },
            transaction_id: {
              description: "This is a unique value which persists across all API calls from search through confirm.",
              type: "string",
              format: "uuid"
            },
            message_id: {
              description: "This is a unique value which persists during a request / callback cycle.",
              type: "string",
              format: "uuid"
            },
            timestamp: {
              description: "Time of request generation in RFC3339 format",
              type: "string",
              format: "date-time"
            },
            ttl: {
              description: "The duration in ISO8601 format after timestamp for which this message holds valid",
              type: "string"
            }
          },
          required: ["domain", "action", "version", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "transaction_id", "message_id", "timestamp"]
        },
        Intent: {
          description: "The intent to buy or avail a product or a service.",
          type: "object",
          properties: {
            descriptor: {
              description: "A raw description of the search intent.",
              $ref: "#/components/schemas/Descriptor"
            },
            provider: {
              description: "The provider from which the customer wants to place to the order from",
              $ref: "#/components/schemas/Provider"
            },
            fulfillment: {
              description: "Details on how the customer wants their order fulfilled",
              $ref: "#/components/schemas/Fulfillment"
            },
            payment: {
              description: "Details on how the customer wants to pay for the order",
              $ref: "#/components/schemas/Payment"
            },
            category: {
              description: "Details on the item category",
              $ref: "#/components/schemas/Category"
            },
            item: {
              description: "Details of the item that the consumer wants to order",
              $ref: "#/components/schemas/Item"
            }
          }
        },
        Order: {
          description: "Describes a legal purchase order.",
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Human-readable ID of the order."
            },
            status: {
              type: "string",
              enum: ["ACTIVE", "COMPLETE", "CANCELLED"],
              description: "Status of the order."
            },
            provider: {
              $ref: "#/components/schemas/Provider"
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/Item" }
            },
            billing: {
              $ref: "#/components/schemas/Billing"
            },
            fulfillments: {
              type: "array",
              items: { $ref: "#/components/schemas/Fulfillment" }
            },
            payments: {
              type: "array",
              items: { $ref: "#/components/schemas/Payment" }
            },
            created_at: {
              type: "string",
              format: "date-time"
            },
            updated_at: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Item: {
          description: "Describes a product or a service offered to the end consumer by the provider.",
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID of the item."
            },
            descriptor: {
              $ref: "#/components/schemas/Descriptor"
            },
            price: {
              $ref: "#/components/schemas/Price"
            },
            category_ids: {
              type: "array",
              items: { type: "string" }
            },
            fulfillment_ids: {
              type: "array",
              items: { type: "string" }
            },
            payment_ids: {
              type: "array",
              items: { type: "string" }
            }
          }
        },
        Provider: {
          description: "Describes the catalog of a business.",
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Id of the provider"
            },
            descriptor: {
              $ref: "#/components/schemas/Descriptor"
            },
            categories: {
              type: "array",
              items: { $ref: "#/components/schemas/Category" }
            },
            fulfillments: {
              type: "array",
              items: { $ref: "#/components/schemas/Fulfillment" }
            },
            payments: {
              type: "array",
              items: { $ref: "#/components/schemas/Payment" }
            }
          }
        },
        Payment: {
          description: "Describes the terms of settlement between the BAP and the BPP for a single transaction.",
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID of the payment term that can be referred at an item or an order level in a catalog"
            },
            collected_by: {
              type: "string",
              enum: ["BAP", "BPP"],
              description: "Who collects the payment"
            },
            type: {
              type: "string",
              enum: ["PRE-ORDER", "PRE-FULFILLMENT", "ON-FULFILLMENT", "POST-FULFILLMENT", "ON-ORDER"],
              description: "When payment is collected"
            },
            status: {
              type: "string",
              enum: ["PAID", "NOT-PAID"],
              description: "Payment status"
            }
          }
        },
        Fulfillment: {
          description: "Describes how a an order will be rendered/fulfilled to the end-customer",
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique reference ID to the fulfillment of an order"
            },
            type: {
              type: "string",
              description: "Mode of fulfillment"
            },
            state: {
              $ref: "#/components/schemas/FulfillmentState"
            },
            customer: {
              $ref: "#/components/schemas/Customer"
            }
          }
        },
        Descriptor: {
          description: "Physical description of something.",
          type: "object",
          properties: {
            name: { type: "string" },
            code: { type: "string" },
            short_desc: { type: "string" },
            long_desc: { type: "string" }
          }
        },
        Category: {
          description: "A label under which a collection of items can be grouped.",
          type: "object",
          properties: {
            id: { type: "string" },
            descriptor: { $ref: "#/components/schemas/Descriptor" }
          }
        },
        Price: {
          description: "Describes the price of a product or service",
          type: "object",
          properties: {
            currency: { type: "string" },
            value: { type: "string" }
          }
        },
        Billing: {
          description: "Describes billing details",
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            address: { type: "string" }
          }
        },
        Customer: {
          description: "Describes a customer",
          type: "object",
          properties: {
            person: { $ref: "#/components/schemas/Person" },
            contact: { $ref: "#/components/schemas/Contact" }
          }
        },
        Person: {
          description: "Describes a person",
          type: "object",
          properties: {
            name: { type: "string" },
            age: { type: "string" },
            gender: { type: "string" }
          }
        },
        Contact: {
          description: "Describes contact information",
          type: "object",
          properties: {
            phone: { type: "string" },
            email: { type: "string" }
          }
        },
        FulfillmentState: {
          description: "Describes the state of fulfillment",
          type: "object",
          properties: {
            descriptor: { $ref: "#/components/schemas/Descriptor" },
            updated_at: { type: "string", format: "date-time" }
          }
        },
        Option: {
          description: "Describes a selectable option",
          type: "object",
          properties: {
            id: { type: "string" },
            descriptor: { $ref: "#/components/schemas/Descriptor" }
          }
        },
        Rating: {
          description: "Describes the rating of an entity",
          type: "object",
          properties: {
            rating_category: { type: "string", enum: ["Item", "Order", "Fulfillment", "Provider", "Agent", "Support"] },
            id: { type: "string" },
            value: { type: "string" }
          }
        },
        Support: {
          description: "Details of customer support",
          type: "object",
          properties: {
            order_id: { type: "string" },
            ref_id: { type: "string" },
            callback_phone: { type: "string" },
            phone: { type: "string" },
            email: { type: "string", format: "email" },
            url: { type: "string", format: "uri" }
          }
        }
      }
    },
    'x-enum': {
      search: {
        context: {
          location: {
            country: {
              code: [{"code": "IND", "description": "Represents the country"}]
            },
            city: {
              code: [{"code": "std:080", "description": "Bangalore"}]
            }
          },
          domain: [{"code": "ONDC:FIS12", "description": "Loan"}],
          action: [
            {"code": "search", "description": "buyer app specifies the search intent"},
            {"code": "on_search", "description": "seller app responds with the catalog based on the search intent"},
            {"code": "select", "description": "buyer app specifies the items & quantity selected by a buyer"},
            {"code": "on_select", "description": "seller app responds with the serviceability info, quote & O2D TAT for selected items"},
            {"code": "init", "description": "buyer & seller app specify & agree to the terms & conditions prior to placing the order"},
            {"code": "on_init", "description": "buyer & seller app specify & agree to the terms & conditions prior to placing the order"},
            {"code": "confirm", "description": "buyer app places the order on behalf of the buyer"},
            {"code": "on_confirm", "description": "seller app responds to the order placed either through auto-acceptance or deferred acceptance or rejection of the order"},
            {"code": "update", "description": "updates in the serviceable loc happens here"},
            {"code": "on_update", "description": "seller app responds with serviceable"},
            {"code": "cancel", "description": "Cancellation of ride"},
            {"code": "on_cancel", "description": "Specify the cancellation of the state"},
            {"code": "track", "description": "Track the order"},
            {"code": "on_track", "description": "Return tracking information of the order"},
            {"code": "status", "description": "Request for status of the vehicle"},
            {"code": "on_status", "description": "Return order with status, Driver pickup - driver drop"},
            {"code": "support", "description": "Fetch support information related to a particular order"},
            {"code": "on_support", "description": "Return support information related to order"}
          ]
        }
      }
    }
  };
};

export const fetchSwaggerSpec = fetchBuildSpec;
