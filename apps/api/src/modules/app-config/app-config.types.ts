export interface AppConfigService {
  jwtSecret: string;
  webClientHostname: string;

  adminEmail: string;
  adminPassword: string;
}
