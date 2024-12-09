import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Tunahan" },
      _id: 1,
      description: "This is a description",
      image:
        "https://www.ideasoft.com.tr/wp-content/uploads/2022/01/startup-nedir.png",
      category: "Robots",
      title: "WE robots",
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          {" "}
          Başlangıç Adımınızı Atın
          <br />
          GİRİŞİMCİLERLE Bağlantı Kurun
        </h1>

        <p className="sub_heading !max-w-3xl">
          Sanal yarışmalarda fikirlerinizi paylaşın, önerilere oy verin ve fark
          edilin!
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `"${query}" İçin arama sonucu` : "Tüm Girişimler"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">Girişim bulunamadı.</p>
          )}
        </ul>
      </section>
    </>
  );
}
