import { ChangeEvent, FormEvent, useState } from "react";
import client from "@/api";
import styles from "./form.module.css";
import { Loader } from "@/components";
import { InferResponseCallback } from "@/types";

type PropTypes = {
  dataCallBack: (params: InferResponseCallback) => void;
};

interface FormError {
  title?: string;
  file?: string;
}

const index = (props: PropTypes) => {
  const [error, setError] = useState<FormError>({}); // This is an object with two optional properties [title, file
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
        }
      },
    };

    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("file", file || ""); // Provide a default value for file when it is null
      setLoading(true);
      let response = await client.post("/type-infer/csv/", data);
      callbackData.data = response.data;
      props.dataCallBack(callbackData);
    } catch (error: any) {
      const message = error.response.data.error.message;
      setError(message);
      callbackData.error = error.response.data.error.message;
      props.dataCallBack(callbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return loading ? (
    <Loader color="#000" />
  ) : (
    <div className={styles.container}>
      <h2 className="text-center">Add Files</h2>
      <form className={styles.form} onSubmit={(e) => handleSubmission(e)}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            type="text"
            id="title"
            value={title}
          />
          {error.title && <div className={styles.error}>{error.title}</div>}
        </div>
        <div className={styles.fileInput}>
          <input
            onChange={handleFileChange}
            type="file"
            id="file"
            className={styles.file}
          />
          <label htmlFor="file">Select file {file && `(${file.name})`} </label>
          {error.file && <div className={styles.error}>{error.file}</div>}
        </div>
        <div className={styles.formGroup}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default index;
