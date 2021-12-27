import { useCallback, useState } from "react";
import Web3 from "web3";
import { Address, Contract } from "types";
import { parseTxError } from "utils";
import { SelectAccount } from "components/SelectAccount";
import styles from "./PayAirlineFundsMethod.module.scss";

export const PayAirlineFundsMethod: React.VFC<{
  airlines: Address[];
  accounts: Address[];
  contract: Contract;
}> = ({ airlines, accounts, contract }) => {
  const [selectedAirline, setSelectedAirline] = useState<Address>();
  const [funds, setFunds] = useState<number>(0);
  const [result, setResult] = useState<String>();
  const [error, setError] = useState<String>();

  const options = accounts.map((a) => ({
    address: a,
    suffix: airlines.includes(a) ? " (is airline)" : "",
  }));

  const callPayAirlineFunds = useCallback(async () => {
    try {
      await contract.methods.payAirlineFunds().send({
        from: selectedAirline,
        value: Web3.utils.toWei(funds.toString(), "ether"),
      });
      setResult(`${funds} eth were successfully funded by ${selectedAirline}`);
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
  }, [contract.methods, funds, selectedAirline]);

  return (
    <>
      <div className={styles.container}>
        <h3>Pay Airline Funds:</h3>
        <SelectAccount
          accounts={options}
          value={selectedAirline}
          onChange={setSelectedAirline}
        />
        <div>
          <input
            type="number"
            step="0.1"
            min="0"
            size={2}
            value={funds}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setFunds(!isNaN(val) ? val : funds);
            }}
          />
          ETH
        </div>
        <button
          onClick={callPayAirlineFunds}
          disabled={!selectedAirline || !funds}
        >
          Pay
        </button>
        {result && <div className={styles.result}>{result}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
};
