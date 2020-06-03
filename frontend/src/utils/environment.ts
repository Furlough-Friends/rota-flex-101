interface EnvironmentVariables extends NodeJS.ProcessEnv {
  readonly NODE_ENV: 'production' | 'development';

  readonly REACT_APP_BASE_URL: string;
  readonly REACT_APP_AUTH_DOMAIN: string;
  readonly REACT_APP_AUTH_CLIENT_ID: string;
  readonly REACT_APP_AUTH_AUDIENCE: string;
  readonly REACT_APP_AUTH_CALLBACK_URI: string;
  readonly REACT_APP_AUTH_SCOPE: string;
}

interface ApplicationSettings {
  readonly baseUrl: string;
  readonly authDomain: string;
  readonly authClientId: string;
  readonly authAudience: string;
  readonly authCallbackUri: string;
  readonly authScope: string;
}

const internalEnvironment = process.env as EnvironmentVariables;

export const environment: ApplicationSettings = {
  baseUrl: internalEnvironment.REACT_APP_BASE_URL,
  authDomain: internalEnvironment.REACT_APP_AUTH_DOMAIN,
  authClientId: internalEnvironment.REACT_APP_AUTH_CLIENT_ID,
  authAudience: internalEnvironment.REACT_APP_AUTH_AUDIENCE,
  authCallbackUri: internalEnvironment.REACT_APP_AUTH_CALLBACK_URI,
  authScope: internalEnvironment.REACT_APP_AUTH_SCOPE,
};

export function isProduction(): boolean {
  return internalEnvironment.NODE_ENV === 'production';
}
