import styles from "./modal.module.css";
import { ModalData } from "@/types";

interface Props {
  component: React.ReactNode;
  setShowModal: React.Dispatch<React.SetStateAction<ModalData>>;
}

const index = (props: Props) => {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        props.setShowModal({ showModal: false, component: null });
      }}
      className={styles.container}
    >
      <div className={styles.innerContainer}>{props.component}</div>
    </div>
  );
};

export default index;
