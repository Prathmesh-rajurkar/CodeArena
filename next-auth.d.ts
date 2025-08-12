import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      image?: string | null;
      description?: string; // ✅ Added
    };
  }

  interface User {
    id: string;
    email: string;
    image?: string | null;
    description?: string; // ✅ Added
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    image?: string | null;
    description?: string; // ✅ Added
  }
}
