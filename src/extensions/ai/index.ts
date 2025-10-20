/**
 * AI Configs to use AI functions
 */
export interface AIConfigs {
  [key: string]: any;
}

/**
 * ai generate content type
 */
export enum AIGenerateType {
  MUSIC = 'music',
  IMAGE = 'image',
  VIDEO = 'video',
  TEXT = 'text',
  SPEECH = 'speech',
}

/**
 * AI generate request
 */
export interface AIGenerateRequest {
  provider: string;
  mediaType: AIGenerateType;
  model: string;
  prompt: string;
  options?: any;
  // receive notify result
  callbackUrl: string;
  // is return stream
  stream?: boolean;
  // is async
  async?: boolean;
}

/**
 * AI generate task result
 */
export interface AIGenerateResult {
  success: boolean;
  error?: string;
  taskId?: string;
  status?: string;
  provider: string;
  providerResult?: any;
}

/**
 * AI query task request
 */
export interface AIQueryRequest {
  provider?: string;
  taskId: string;
}

/**
 * AI query task result
 */
export interface AIQueryResult {}

/**
 * AI Provider provide AI functions
 */
export interface AIProvider {
  // provider name
  readonly name: string;

  // provider configs
  configs: AIConfigs;

  // generate content
  generate(request: AIGenerateRequest): Promise<AIGenerateResult>;

  // query task
  query?(request: AIQueryRequest): Promise<AIQueryResult>;
}

/**
 * AI Manager to manage all AI providers
 */
export class AIManager {
  // ai providers
  private providers: AIProvider[] = [];
  // default ai provider
  private defaultProvider?: AIProvider;

  // add ai provider
  addProvider(provider: AIProvider, isDefault = false) {
    this.providers.push(provider);
    if (isDefault) {
      this.defaultProvider = provider;
    }
  }

  // get provider by name
  getProvider(name: string): AIProvider | undefined {
    return this.providers.find((p) => p.name === name);
  }

  // get all provider names
  getProviderNames(): string[] {
    return this.providers.map((p) => p.name);
  }

  // get all types
  getGenerateTypes(): string[] {
    return Object.values(AIGenerateType);
  }

  getDefaultProvider(): AIProvider | undefined {
    // set default provider if not set
    if (!this.defaultProvider && this.providers.length > 0) {
      this.defaultProvider = this.providers[0];
    }

    return this.defaultProvider;
  }

  // generate content
  generate(request: AIGenerateRequest): Promise<AIGenerateResult> {
    let defaultProvider = this.getDefaultProvider();

    if (request.provider) {
      const provider = this.getProvider(request.provider);
      if (!provider) {
        throw new Error(`AI provider '${request.provider}' not found`);
      }

      defaultProvider = provider;
    }

    if (!defaultProvider) {
      throw new Error('No AI provider configured');
    }

    return defaultProvider.generate(request);
  }

  // query content
  query(request: AIQueryRequest): Promise<AIQueryResult> {
    let defaultProvider = this.getDefaultProvider();

    if (request.provider) {
      const provider = this.getProvider(request.provider);
      if (!provider) {
        throw new Error(`AI provider '${request.provider}' not found`);
      }

      defaultProvider = provider;
    }

    if (!defaultProvider) {
      throw new Error('No AI provider configured');
    }

    if (!defaultProvider.query) {
      throw new Error(`AI provider '${request.provider}' no query method`);
    }

    return defaultProvider.query(request);
  }
}

// ai manager
export const aiManager = new AIManager();

export * from './kie';
