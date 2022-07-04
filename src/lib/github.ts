import { get } from './http-client';

class Github {
  private readonly baseUrl = 'https://api.github.com';
  private readonly headers: HeadersInit;

  constructor(accessToken: string) {
    this.headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${accessToken}`,
    };
  }

  async getAuthenticatedUserRepositories() {
    const url = `${this.baseUrl}/user/repos?affiliation=owner`;
    return get(url, { headers: this.headers });
  }
}

export default Github;
