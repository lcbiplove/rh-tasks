import { CsvInferResponseData } from "@/types";
import styles from "./table.module.css";

type Props = {
  data: CsvInferResponseData;
};

const index = (props: Props) => {
  const { columns, rows } = props.data;
  const columnKeys = Object.keys(columns);
  const rowKeys = Object.keys(rows);
  const elements = Object.keys(rows[rowKeys[0]] || {});

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columnKeys.map((key: string, _) => {
            return (
              <th className={styles.th} key={key}>
                {key} ({columns[key]})
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {elements.map((_, rowIndex: number) => {
          return (
            <tr key={rowIndex}>
              {columnKeys.map((column: string, index: number) => {
                return <td className={styles.td} key={`${rowIndex} ${index}`}>{rows[column][`${rowIndex}`]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default index;
