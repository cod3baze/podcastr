import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./styles.module.scss";

function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img draggable={false} src="/logo.svg" alt="Podcastr" />

      <p>O melhor para voçê ouvir sempre</p>

      <span>{currentDate}</span>
    </header>
  );
}

export { Header };
