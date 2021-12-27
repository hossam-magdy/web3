import { useCallback, useState } from "react";
import { Address, Contract } from "types";
import { parseTxError } from "utils";
import { SelectAccount } from "components/SelectAccount";
import styles from "./IsAirlineMethod.module.scss";

export const IsAirlineMethod: React.VFC<{
  airlines: Address[];
  accounts: Address[];
  contract: Contract;
}> = ({ airlines, accounts, contract }) => {
  const [selectedAirline, setSelectedAirline] = useState<Address>();
  const [result, setResult] = useState<String>();
  const [error, setError] = useState<String>();

  const options = accounts.map((a) => ({
    address: a,
    suffix: airlines.includes(a) ? " (is airline)" : "",
  }));

  const callIsAirline = useCallback(async () => {
    try {
      const output = await contract.methods.isAirline(selectedAirline).call();
      setResult(`${output}`);
      setError(undefined);
    } catch (e: any) {
      const { revertReason } = parseTxError(e);
      if (revertReason) {
        setError(revertReason);
      } else {
        setError("Unknown Error: " + e?.message);
        console.error(e);
      }
    }
  }, [contract.methods, selectedAirline]);

  return (
    <>
      <div className={styles.container}>
        <h3>Check IsAirline registered:</h3>
        <SelectAccount
          accounts={options}
          value={selectedAirline}
          onChange={setSelectedAirline}
        />
        <button onClick={callIsAirline} disabled={!selectedAirline}>
          Check
        </button>
        {result && <div className={styles.result}>{result}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
};
