import {
  AIConfigs,
  AIGenerateRequest,
  AIGenerateResult,
  AIProvider,
  AIQueryRequest,
  AIQueryResult,
} from '.';

/**
 * Kie configs
 * @docs https://kie.ai/
 */
export interface KieConfigs extends AIConfigs {
  apiKey: string;
}

/**
 * Kie provider
 * @docs https://kie.ai/
 */
export class KieProvider implements AIProvider {
  // provider name
  readonly name = 'kie';
  // provider configs
  configs: AIConfigs;

  // api base url
  private baseUrl = 'https://api.kie.ai/api/v1';

  // init provider
  constructor(configs: AIConfigs) {
    this.configs = configs;
  }

  async generateMusic(request: AIGenerateRequest) {
    // const params = {
    //   customMode: false,
    //   instrumental: false,
    //   style: "",
    //   title: "",
    //   prompt: prompt || "",
    //   model: model || "V4_5",
    //   callBackUrl,
    //   negativeTags: "",
    //   vocalGender: "m", // m or f
    //   styleWeight: 0.65,
    //   weirdnessConstraint: 0.65,
    //   audioWeight: 0.65,
    // };
  }

  // generate task
  async generate(request: AIGenerateRequest): Promise<AIGenerateResult> {
    const apiUrl = `${this.baseUrl}/generate`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.configs.apiKey}`,
    };

    // build request params
    let params: any = {
      prompt: request.prompt,
      model: request.model,
      callBackUrl: request.callbackUrl,
    };

    if (request.options) {
      params = {
        ...params,
        ...request.options,
      };
    }

    // const params = {
    //   customMode: false,
    //   instrumental: false,
    //   style: "",
    //   title: "",
    //   prompt: prompt || "",
    //   model: model || "V4_5",
    //   callBackUrl,
    //   negativeTags: "",
    //   vocalGender: "m", // m or f
    //   styleWeight: 0.65,
    //   weirdnessConstraint: 0.65,
    //   audioWeight: 0.65,
    // };

    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });
    if (!resp.ok) {
      throw new Error(`request failed with status: ${resp.status}`);
    }

    const { code, msg, data } = await resp.json();

    if (code !== 200) {
      throw new Error(msg);
    }

    if (!data || !data.taskId) {
      throw new Error(`generate failed`);
    }

    return {
      success: true,
      error: '',
      taskId: data.taskId,
      provider: this.name,
      providerResult: data,
    };
  }

  // query task
  async query(request: AIQueryRequest): Promise<AIGenerateResult> {
    const apiUrl = `${this.baseUrl}/generate/record-info?taskId=${request.taskId}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.configs.apiKey}`,
    };

    const resp = await fetch(apiUrl, {
      method: 'GET',
      headers,
    });
    if (!resp.ok) {
      throw new Error(`request failed with status: ${resp.status}`);
    }

    const { code, msg, data } = await resp.json();

    if (code !== 200) {
      throw new Error(msg);
    }

    console.log('queru data', data);

    if (!data || !data.status) {
      throw new Error(`query failed`);
    }

    return {
      success: true,
      error: '',
      status: data.status,
      taskId: data.taskId,
      provider: this.name,
      providerResult: data,
    };
  }
}
