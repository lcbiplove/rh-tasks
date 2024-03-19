import { FormEvent, useState } from "react";
import client from "@/api";
import styles from "./editColumnForm.module.css";
import { Loader } from "@/components";
import {AvailableDataTypes} from "@/utils";
import { InferResponseCallback } from "@/types";

type PropTypes = {
  id: number;
  title: string;
  columns: string[];
};

const index = (props: PropTypes) => {
  const [loading, setLoading] = useState(false);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    const callbackData = {
      error: false,
      data: {
        status: "",
        data: {
          columns: {},
          rows: {},
        },
      },
    };

    e.preventDefault();
    try {
      const data = new FormData();
      setLoading(true);
      let response = await client.post("/type-infer/csv/", data);
      callbackData.data = response.data;
      //   props.dataCallBack(callbackData);
    } catch (error: any) {
      callbackData.error = error.response.data.error.message;
      //   props.dataCallBack(callbackData);
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
            value={props.title}
          />
        </div>
        <div className={styles.twoRowGroup}>
          <div>
            <label className={styles.label} htmlFor="columnName">
              Column Name
            </label>
            <select className={styles.select} name="columnName" id="columnName">
              {props.columns.map((column, _) => {
                return <option value={column}>{column}</option>;
              })}
            </select>
          </div>
          <div>
            <label className={styles.label} htmlFor="columnType">
              Column Type
            </label>
            <select className={styles.select} name="columnType" id="columnType">
              {AvailableDataTypes.map((type, _) => {
                return <option value={type}>{type}</option>;
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
