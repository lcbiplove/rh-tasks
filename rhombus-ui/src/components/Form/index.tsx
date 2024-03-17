import { ChangeEvent, FormEvent, useState } from "react";
import client from "@/api";
import styles from "./form.module.css";
import { Loader } from "@/components";

interface FormError {
  title?: string;
  file?: string;
}

const index = () => {
  const [error, setError] = useState<FormError>({}); // This is an object with two optional properties [title, file
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("file", file || ""); // Provide a default value for file when it is null
      setLoading(true);
      let response = await client.post("/type-infer/csv/", data);
      console.log(response.data);
    } catch (error: any) {
      const message = error.response.data.error.message;
      setError(message);
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
