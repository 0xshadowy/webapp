import { get } from './http-client';
import type { Repository, Issue } from '@/types/types';

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
    const url = `${this.baseUrl}/user/repos?affiliation=owner&per_page=6&sort=updated`;
    return get<Repository[]>(url, { headers: this.headers });
  }

  async getRepositoryIssues(owner: string, repo: string) {
    const url = `${this.baseUrl}/repos/${owner}/${repo}/issues`;
    return get<Issue[]>(url, { headers: this.headers });
  }
}

export default Github;
