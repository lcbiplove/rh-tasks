import styles from "./modal.module.css";

interface Props {
  children: React.ReactElement;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const index = (props: Props) => {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        props.setShowModal(false);
      }}
      className={styles.container}
    >
      <div className={styles.innerContainer}>{props.children}</div>
    </div>
  );
};

export default index;
