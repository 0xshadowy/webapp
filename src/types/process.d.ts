declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    ALCHEMY_KEY: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
