/**
 * Provider boundary. UI never talks to providers directly.
 * Add adapters here later without changing the product UI.
 */
export const providerRegistry = {
  chat: [],
  research: [],
  image: [],
  video: [],
  files: [],
  coding: []
};

export function resolveCapability(request){
  return {capability: request?.mode || "auto", provider: null};
}
