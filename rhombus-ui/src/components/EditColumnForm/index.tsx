import { FormEvent, useState } from "react";
import client from "@/api";
import styles from "./editColumnForm.module.css";
import { Loader } from "@/components";
import { AvailableDataTypes } from "@/utils";
import { InferResponseCallback } from "@/types";

type PropTypes = {
  id: number;
  title: string;
  columns: string[];
  dataCallBack: (response: InferResponseCallback) => void;
};

const index = (props: PropTypes) => {
  const [loading, setLoading] = useState(false);
  const [columnName, setColumnName] = useState(props.columns[0]);
  const [columnType, setColumnType] = useState(AvailableDataTypes[0]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    const callbackData = {
      error: false,
      data: {
        status: "",
        data: {
          columns: {},
          rows: {},
          title: "",
          id: 0,
        },
      },
    };

    e.preventDefault();
    try {
      const data = new FormData();
      data.append("column", columnName);
      data.append("type", columnType);
      setLoading(true);
      let response = await client.post(
        `/type-infer/csv/${props.id}/edit`,
        data
      );
      callbackData.data.data = response.data;
      props.dataCallBack(callbackData);
    } catch (error: any) {
      callbackData.error = error.response.data.error.message;
        props.dataCallBack(callbackData);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader color="#000" />
  ) : (
    <div className={styles.container}>
      <h2 className="text-center">Edit Columns</h2>
      <form className={styles.form} onSubmit={(e) => handleSubmission(e)}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            className={`${styles.input} ${styles.disabled}`}
            type="text"
            id="title"
            placeholder={props.title}
          />
        </div>
        <div className={styles.twoRowGroup}>
          <div>
            <label className={styles.label} htmlFor="columnName">
              Column Name
            </label>
            <select
              onChange={(e) => setColumnName(e.target.value)}
              className={styles.select}
              name="columnName"
              id="columnName"
              value={columnName}
            >
              {props.columns.map((column, _) => {
                return (
                  <option key={column} value={column}>
                    {column}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className={styles.label} htmlFor="columnType">
              Column Type
            </label>
            <select
              onChange={(e) => setColumnType(e.target.value)}
              className={styles.select}
              name="columnType"
              id="columnType"
              value={columnType}
            >
              {AvailableDataTypes.map((type, _) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default index;
