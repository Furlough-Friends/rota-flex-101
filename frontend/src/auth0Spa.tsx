import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  getIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  RedirectLoginResult,
} from '@auth0/auth0-spa-js';
import React, { useContext, useEffect, useState } from 'react';
import toastr from 'toastr';

// This file creates the Auth0Client and gives access to various hooks which can
// be used in other components.
// This file is provided by Auth0:
// https://github.com/auth0/auth0-spa-js/issues/39#issuecomment-505901626
interface Auth0Context {
  isAuthenticated: boolean;
  user?: User;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup(options: PopupLoginOptions): Promise<void>;
  handleRedirectCallback(): Promise<RedirectLoginResult>;
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>;
  loginWithRedirect(o: RedirectLoginOptions): Promise<void>;
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>;
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>;
  logout(o?: LogoutOptions): void;
}
interface Auth0ProviderOptions {
  children: React.ReactElement;
  onRedirectCallback?(result: RedirectLoginResult): void;
}

interface User {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<Auth0Context | null>(null);
export const useAuth0 = () => useContext(Auth0Context)!;

// A hack to access auth0Client from outside the react wrapper
export const authWrapper = { authClient: { getTokenSilently: async () => '' } };

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      authWrapper.authClient = auth0FromHook;
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const checkIsAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(checkIsAuthenticated);

      if (checkIsAuthenticated) {
        const checkUser = await auth0FromHook.getUser();
        setUser(checkUser);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (o: PopupLoginOptions) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(o);
    } catch (error) {
      toastr.error(error);
    } finally {
      setPopupOpen(false);
    }
    const checkUser = await auth0Client!.getUser();
    setUser(checkUser);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    const result = await auth0Client!.handleRedirectCallback();
    const checkUser = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(checkUser);
    return result;
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (o: getIdTokenClaimsOptions | undefined) =>
          auth0Client!.getIdTokenClaims(o),
        loginWithRedirect: (o: RedirectLoginOptions) =>
          auth0Client!.loginWithRedirect(o),
        getTokenSilently: (o: GetTokenSilentlyOptions | undefined) =>
          auth0Client!.getTokenSilently(o),
        getTokenWithPopup: (o: GetTokenWithPopupOptions | undefined) =>
          auth0Client!.getTokenWithPopup(o),
        logout: (o: LogoutOptions | undefined) => auth0Client!.logout(o),
      }}>
      {children}
    </Auth0Context.Provider>
  );
};
