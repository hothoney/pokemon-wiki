import NextAuth, { type AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Process extends NodeJS.Process {
  env: {
    NODE_ENV: "development" | "production" | "test";
    GITHUB_ID: string;
    GITHUB_SECRET: string;
  };
}
declare const process: Process;

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      const { user } = session;
      if (user?.email) {
        // console.log("AuthCallback: 查找是否已存在对应用户...");
        const result = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });
        if (!result) {
          // console.log("AuthCallback: 未查到用户，开始创建用户");
          try {
            await prisma.user.create({
              data: {
                name: user.name || user.email,
                email: user.email,
                roleCode: "",
              },
            });
            // console.log("AuthCallback: 创建用户成功！");
          } catch (error) {
            // console.log("AuthCallback: 创建用户失败");
            console.log(error);
          }
        } else {
          // console.log("AuthCallback: 用户已存在, callback结束");
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
