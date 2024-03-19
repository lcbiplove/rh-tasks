import { useState } from "react";
import { Modal, Table, Form, EditColumnForm } from "@/components";
import styles from "./home.module.css";
import {
  InferResponseCallback,
  CsvInferResponseData,
  ModalData,
} from "@/types";

const index = () => {
  const handleEditColumn = (response: InferResponseCallback) => {
    if (!response.error) {
      setShowModal({ showModal: false, component: null });
      setNewData(response.data.data);
    }
  };

  const handleAddFile = (response: InferResponseCallback) => {
    if (!response.error) {
      setShowModal({ showModal: false, component: null });
      setNewData(response.data.data);
    }
  };

  const [modal, setShowModal] = useState<ModalData>({
    showModal: false,
    component: null,
  });
  // This will launch only if propName value has chaged.
  const [newData, setNewData] = useState<CsvInferResponseData>({
    rows: {},
    columns: {},
    title: "",
    id: 0,
  });

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
              setShowModal({
                showModal: true,
                component: <Form dataCallBack={handleAddFile} />,
              });
            }}
          >
            Add Files
          </button>
          {newData.id != 0 && (
            <button
              onClick={() => {
                setShowModal({
                  showModal: true,
                  component: (
                    <EditColumnForm
                      id={newData.id}
                      title={newData.title}
                      columns={Object.keys(newData.columns)}
                      dataCallBack={handleEditColumn}
                    />
                  ),
                });
              }}
            >
              Edit Columns
            </button>
          )}
        </div>
        {newData.title && <h2 className={styles.title}>{newData.title}</h2>}
        {newData.columns && <Table data={newData} />}
      </div>
    </div>
  );
};

export default index;
