import styles from "./form.module.css";

const index = () => {
  return (
    <div className={styles.container}>
      <h2 className="text-center">Add Files</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input className={styles.input} type="text" id="title" />
          <div className={styles.error}>Error message</div>
        </div>
        <div className={styles.fileInput}>
          <input type="file" id="file" className={styles.file} />
          <label htmlFor="file">Select file</label>
          <div className={styles.error}>Error message</div>
        </div>
        <div className={styles.formGroup}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default index;
