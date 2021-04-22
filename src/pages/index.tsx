import { GetStaticProps } from "next";
import Image from "next/Image";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from "./home.module.scss";

type IEpisodes = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  publishedAt: string;
  duration: Number;
  durationAsString: string;
  description: string;
  url: string;
};

type IHomeProps = {
  allEpisodes: IEpisodes[];
  latestEpisodes: IEpisodes[];
};

function Home({ latestEpisodes, allEpisodes }: IHomeProps) {
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode) => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                draggable={false}
                src={episode.thumbnail}
                alt={episode.title}
              />

              <div className={styles.episodeDetails}>
                <a href="#">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button">
                <img
                  draggable={false}
                  src={episode.thumbnail}
                  alt="tocar episódio"
                />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
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

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      latestEpisodes,
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
