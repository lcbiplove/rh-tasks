import { useState } from "react";
import { Modal, Table, Form } from "@/components";
import styles from "./home.module.css";
import { InferResponseCallback, CsvInferResponseData } from "@/types";

const index = () => {
  const [isModal, setShowModal] = useState(false);
  // This will launch only if propName value has chaged.
  const [newData, setNewData] = useState<CsvInferResponseData>({
    rows: {},
    columns: {},
  });

  const handleAddFile = (response: InferResponseCallback) => {
    if (!response.error) {
      setShowModal(false);
      console.log(response.data.data)
      setNewData(response.data.data);
    }
  };

  return (
    <div className={styles.container}>
      {isModal && (
        <Modal setShowModal={setShowModal}>
          {<Form dataCallBack={handleAddFile} />}
        </Modal>
      )}
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
       {
        newData.columns && <Table data={newData} />
       }
      </div>
    </div>
  );
};

export default index;
