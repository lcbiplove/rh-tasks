import { useState } from "react";
import { Modal, Table, Form } from "@/components";
import styles from "./home.module.css";
import { InferResponseCallback, CsvInferResponseData, ModalData } from "@/types";

const index = () => {
  const [modal, setShowModal] = useState<ModalData>({showModal: false, component: null});
  // This will launch only if propName value has chaged.
  const [newData, setNewData] = useState<CsvInferResponseData>({
    rows: {},
    columns: {},
    title: "",
    id: 0,
  });

  const handleAddFile = (response: InferResponseCallback) => {
    if (!response.error) {
      setShowModal({showModal: false, component: null});
      setNewData(response.data.data);
    }
  };

  return (
    <div className={styles.container}>
      {modal.showModal && (
        <Modal component={modal.component} setShowModal={setShowModal} />
      )}
      <div className={styles.innerContainer}>
        <h1 className="text-center">Rhombus Data Converter</h1>
        <div className={styles.btnsWrap}>
          <button
            onClick={() => {
              setShowModal({showModal: true, component: <Form dataCallBack={handleAddFile} />});
            }}
          >
            Add Files
          </button>
        </div>
        {newData.title && <h2 className={styles.title}>{newData.title}</h2>}
        {newData.columns && <Table data={newData} />}
      </div>
    </div>
  );
};

export default index;
