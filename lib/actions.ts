"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async <T>(
  state: T,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  // Form verilerinden başlık, açıklama, kategori ve bağlantıyı (image) al, pitch'i hariç tut
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch") // Pitch dışındaki veriler
  );

  // Başlık bilgisinden slug (URL dostu kısa metin) oluştur
  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // Yeni startup verisini hazırlıyoruz
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        // Slug bilgisi
        _type: slug, // Slug türü
        current: slug, // Slug'un geçerli hali
      },
      author: {
        // Yazar bilgisi (kullanıcı)
        _type: "reference", // Referans tipi
        _ref: session?.id, // Kullanıcı oturum ID'si
      },
      pitch, // Kullanıcının girdiği pitch (öneri) metni
    };

    // Sanity CMS'ye yeni bir "startup" kaydı oluştur
    const result = await writeClient.create({ _type: "startup", ...startup });

    // Başarı durumunda, sonucu döndür
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
