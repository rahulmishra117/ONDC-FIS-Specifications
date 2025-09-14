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

export interface ApiEndpoint {
  path: string;
  method: string;
  description: string;
  tags: string[];
}

export interface SchemaProperty {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
  enum?: string[];
}
