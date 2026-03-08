import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const signInSchema = z.object({
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(1, "Şifre gerekli"),
});

const phoneSchema = z.object({
  phone: z.string().min(10, "Geçerli telefon numarası girin"),
  otp: z.string().length(6, "6 haneli kod girin"),
});

const providers = [
  ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : []),
  ...(process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET
    ? [
        Apple({
          clientId: process.env.AUTH_APPLE_ID,
          clientSecret: process.env.AUTH_APPLE_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : []),
    Credentials({
      id: "phone",
      name: "Telefon",
      credentials: {
        phone: { label: "Telefon", type: "text" },
        otp: { label: "Doğrulama Kodu", type: "text" },
      },
      authorize: async (credentials) => {
        const parsed = phoneSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { phone, otp } = parsed.data;
        const normalized = phone.replace(/\D/g, "").slice(-10);
        if (normalized.length < 10) return null;
        // Demo: OTP 123456 ile her numara için giriş
        if (otp !== "123456") return null;
        const email = `phone_${normalized}@hukukai.phone`;
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: `Telefon (${normalized.slice(-4)})`,
              plan: "free",
            },
          });
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
        };
      },
    }),
    Credentials({
      id: "credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (user?.passwordHash && (await bcrypt.compare(password, user.passwordHash))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            plan: user.plan,
          };
        }

        const demoEmail = process.env.AUTH_DEMO_EMAIL ?? "demo@hukukai.com";
        const demoPassword = process.env.AUTH_DEMO_PASSWORD ?? "demo1234";
        if (email === demoEmail && password === demoPassword) {
          return {
            id: "demo-user",
            name: "Demo Kullanıcı",
            email: demoEmail,
            image: null,
            plan: "free",
          };
        }
        return null;
      },
    }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: async () => true,
    jwt: async ({ token, user }) => {
      if (user) {
        token.plan = (user as { plan?: string }).plan ?? "free";
        token.sub = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as { plan?: string }).plan = token.plan as string;
        (session.user as { id?: string }).id = token.sub as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.AUTH_SECRET,
});
