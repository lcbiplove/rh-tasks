import { useState } from "react";
import { Modal, Table, Form } from "@/components";
import styles from "./home.module.css";

const data = {
  rows: [
    {
      name: "John Doe",
      age: 25,
      email: "sjkdflsj@jklfsj",
    },
    {
      name: "John Doe",
      age: 25,
      email: "sjkdflsj@jklfsj",
    },
  ],
  columns: [
    {
      name: "Name",
      type: "string",
    },
    {
      name: "Age",
      type: "number",
    },
    {
      name: "Email",
      type: "string",
    },
  ],
};

const popupContainer = (
  <div>
    <div>This is me</div>
    <div>This is me</div>
  </div>
);

const index = () => {
  const [isModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      {isModal && <Modal setShowModal={setShowModal}>{<Form />}</Modal>}
      <div className={styles.innerContainer}>
        <h1 className="text-center">Rhombus Data Converter</h1>
        <div className={styles.btnsWrap}>
          <button
            onClick={() => {
              setShowModal(!isModal);
            }}
          >
            Add Files
          </button>
        </div>
        <Table data={data} />
      </div>
    </div>
  );
};

export default index;
