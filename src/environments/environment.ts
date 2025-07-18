export const environment = {
  production: false,
  gatewayApiUrl: 'https://api.houseparty.techgarden.gg',
  local: false,
  keycloak: {
    authority: 'http://localhost:8010',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200/logout',
    realm: 'techgarden-keycloak',
    clientId: 'techgarden-keycloak-confidential',
  },
};
