import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const opts: NextAuthOptions = {
  providers: [
    Credentials({
      name: "mocked",
      credentials: {
        name: { type: "test" },
      },
      async authorize(credentials) {
        if (credentials) {
          return {
            id: credentials.name,
            name: credentials.name + "@mocked.com",
            email: credentials.name,
            image: null,
          };
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(opts);
