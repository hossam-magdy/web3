import { useCallback, useState } from "react";
import Web3 from "web3";
import { parseTxError } from "utils";
import { Address, Contract } from "types";
import { SelectAccount } from "components/SelectAccount";
import styles from "./GetAirlineFundsMethod.module.scss";

export const GetAirlineFundsMethod: React.VFC<{
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

  const callMinAirlineFunds = useCallback(async () => {
    try {
      const output = await contract.methods
        .MIN_AIRLINE_FUNDING()
        .call({ from: selectedAirline });
      const amount = Web3.utils.fromWei(output, "ether");
      setResult(`${amount} ETH`);
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

  const callAirlineFunds = useCallback(async () => {
    try {
      const output = await contract.methods
        .airlineFunds()
        .call({ from: selectedAirline });
      const amount = Web3.utils.fromWei(output, "ether");
      setResult(`${amount} ETH`);
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
        <button onClick={callMinAirlineFunds}>Get MIN_AIRLINE_FUNDING</button> |{" "}
        <h3>Get Airline Funds:</h3>
        as{" "}
        <SelectAccount
          accounts={options}
          value={selectedAirline}
          onChange={setSelectedAirline}
        />
        <button onClick={callAirlineFunds} disabled={!selectedAirline}>
          Check
        </button>
        {result && <div className={styles.result}>{result}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
};
