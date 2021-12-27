import { useCallback, useState } from "react";
import { Address, Contract } from "types";
import { parseTxError } from "utils";
import { SelectAccount } from "components/SelectAccount";
import styles from "./RegisterAirlineMethod.module.scss";

export const RegisterAirlineMethod: React.VFC<{
  airlines: Address[];
  accounts: Address[];
  contract: Contract;
}> = ({ airlines, accounts, contract }) => {
  const [newAirline, setNewAirline] = useState<Address>();
  const [from, setFrom] = useState<Address>();
  const [error, setError] = useState<String>();

  const options = accounts.map((a) => ({
    address: a,
    suffix: airlines.includes(a) ? " (is airline)" : "",
  }));

  const registerNewAirline = useCallback(async () => {
    try {
      await contract.methods.registerAirline(newAirline).send({ from });
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
  }, [contract.methods, from, newAirline]);

  return (
    <>
      <div className={styles.container}>
        <h3>Register new airline:</h3>
        <SelectAccount
          accounts={options}
          value={newAirline}
          onChange={setNewAirline}
        />
        as
        <SelectAccount accounts={options} value={from} onChange={setFrom} />
        <button onClick={registerNewAirline} disabled={!newAirline || !from}>
          Register
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
};
