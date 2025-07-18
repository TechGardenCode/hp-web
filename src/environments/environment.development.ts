export const environment = {
  production: false,
  gatewayApiUrl: 'http://localhost:8000',
  local: true,
  keycloak: {
    authority: 'http://10.0.60.60:9000',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    realm: 'techgarden',
    clientId: 'houseparty-web',
  },
};
