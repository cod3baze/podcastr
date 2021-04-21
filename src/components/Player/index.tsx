import styles from "./styles.module.scss";

function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img draggable={false} src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider}></div>
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img draggable={false} src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button type="button">
            <img
              draggable={false}
              src="/play-previous.svg"
              alt="Tocar anterior"
            />
          </button>

          <button type="button" className={styles.playButton}>
            <img draggable={false} src="/play.svg" alt="Tocar" />
          </button>

          <button type="button">
            <img draggable={false} src="/play-next.svg" alt="Tocar próximo" />
          </button>

          <button type="button">
            <img draggable={false} src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export { Player };
