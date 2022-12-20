import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

interface Process extends NodeJS.Process {
  env: {
    NODE_ENV: "development" | "production" | "test";
    GITHUB_ID: string;
    GITHUB_SECRET: string;
  };
}
declare const process: Process;

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
