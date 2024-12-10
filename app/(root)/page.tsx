import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

  //console.log(JSON.stringify(posts, null, 2));

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
          {posts?.length > 0 ?
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          : <p className="no-result">Girişim bulunamadı.</p>}
        </ul>
      </section>
    </>
  );
}
