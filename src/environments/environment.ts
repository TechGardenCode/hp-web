export const environment = {
  production: true,
  gatewayApiUrl: 'https://party.api.houseparty.techgarden.gg',
  local: false,
  keycloak: {
    authority: 'https://sso.techgarden.gg',
    redirectUri: 'https://houseparty.techgarden.gg',
    postLogoutRedirectUri: 'https://houseparty.techgarden.gg',
    realm: 'techgarden',
    clientId: 'houseparty-web',
  },
};
