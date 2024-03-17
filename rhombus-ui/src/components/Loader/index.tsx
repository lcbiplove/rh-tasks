import styles from "./loader.module.css";

interface Proptypes {
  color?: string;
}

const index = (props: Proptypes) => {
  const color = props.color || "var(--white)";
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default index;
