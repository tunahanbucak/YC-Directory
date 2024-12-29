import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  //const posts = await client.fetch(STARTUPS_QUERY);
  //console.log(JSON.stringify(posts, null, 2));  verilerin, eklemelerin aninda ekranda gozukmesi icin sanityfetch kullandik diger durumda yeni eklenen seylerin ekranda gozukmesi icin  refleshlemek zorunda kaliyoruduk
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          {" "}
          Başlangıç Adımınızı Atın
          <br />
          GİRİŞİMCİLERLE Bağlantı Kurun
        </h1>
        <p className="sub-heading !max-w-3xl">
          Fikirlerinizi paylaşın, önerilere oy verin ve sanal yarışmalarda
          kendinizi gösterin.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `"${query}" İçin arama sonucu` : "Tüm Startuplar"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ?
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          : <p className="no-result">Startup bulunamadı.</p>}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
