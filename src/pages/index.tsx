import { GetStaticProps } from "next";
import { api } from "../services/api";

type IEpisodes = {
  id: string;
  title: string;
  members: string;
};

type IHomeProps = {
  episodes: IEpisodes[];
};

function Home(props: IHomeProps) {
  return (
    <>
      <h1>index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

/* vai gerar uma versão estática, html puro, para todos */
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // vai refazer a cada 8 horas
  };
};

// vai carregar de forma estática, sempre que for acessada a HOME
/*
  export async function getServerSideProps() {
    const response = await fetch("http://localhost:3333/episodes");
    const data = await response.json();

    return {
      props: {
        episodes: data,
      },
    };
  }
*/

export default Home;
