import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      if (!profile || !profile.login || !profile.id) {
        return false;
      }

      const { login, id, bio } = profile;
      // Sanity CMS'de, GitHub ID'sine göre mevcut bir kullanıcıyı sorguluyoruz
      const existingUser = await client
        .withConfig({ useCdn: false }) //CDN kullanmadan verileri aliyoruz
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });
      // Eğer kullanıcı daha önce kaydedilmemişse, yeni bir kullanıcı kaydediyoruz
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        //eger bir hesap ve profil bilgisi varsa, kullanicinin ID'sini aliyoruz
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
