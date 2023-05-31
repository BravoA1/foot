import styles from "./Footer.module.scss";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div onClick={scrollToTop} className={`${styles.topPage}`}>
        <p>Return to top</p>
      </div>
      <footer>
        <h2>footer</h2>
      </footer>
    </>
  );
}
