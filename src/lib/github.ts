import { get, post } from './http-client';
import type { Repository, Issue, PullRequest } from '@/types/types';

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
    const url = `${this.baseUrl}/user/repos?affiliation=owner&per_page=7&sort=updated`;
    return get<Repository[]>(url, { headers: this.headers });
  }

  async getAuthenticatedUserOrganizations() {
    const url = `${this.baseUrl}/user/orgs`;
    return get<any[]>(url, { headers: this.headers });
  }

  async getOrganizationRepositories(organization: string) {
    const url = `${this.baseUrl}/orgs/${organization}/repos`;
    return get<any[]>(url, { headers: this.headers });
  }

  async getRepositoryIssues(fullName: string) {
    const url = `${this.baseUrl}/repos/${fullName}/issues?direction=asc`;
    return get<Issue[]>(url, { headers: this.headers });
  }

  async getRepositoryPullRequests(fullName: string) {
    const url = `${this.baseUrl}/repos/${fullName}/pulls?direction=asc`;
    return get<PullRequest[]>(url, { headers: this.headers });
  }

  async createIssue(fullName: string, title: string, description: string) {
    const url = `${this.baseUrl}/repos/${fullName}/issues`;
    const body = { title, description };
    return post<any>(url, { headers: this.headers, body: JSON.stringify(body) });
  }
}

export default Github;
