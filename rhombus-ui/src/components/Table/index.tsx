import styles from "./table.module.css";

type Props = {
  data: any;
};

const index = (props: Props) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {props.data.columns.map((value: any, index: number) => (
            <th className={styles.th} key={index}>
              {value.name} ({value.type})
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.rows.map((row: any, index: number) => (
          <tr key={index}>
            {Object.values(row).map((value: any, index: number) => (
              <td className={styles.td} key={index}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default index;
