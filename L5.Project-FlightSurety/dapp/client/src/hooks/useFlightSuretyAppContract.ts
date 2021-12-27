import { useEffect, useState } from "react";
import { config, FlightSuretyApp } from "../config";
import { Address } from "../types";
import { useWeb3 } from "./useWeb3";

export const useFlightSuretyAppContract = () => {
  const {
    web3,
    accounts,
    defaultAccount,
    isInitialized: isWeb3Initialized,
  } = useWeb3();

  const [contract] = useState(
    () =>
      new web3.eth.Contract(FlightSuretyApp.abi as any, config.appAddress, {
        gas: 220000,
      })
  );
  const [isOperational, setIsOperational] = useState<boolean>();
  const [airlines, setAirlines] = useState<Address[]>([]);

  useEffect(() => {
    if (!isWeb3Initialized) return;

    console.log("calling isOperational()", { defaultAccount, isOperational });
    contract.methods
      .isOperational()
      .call({ from: defaultAccount }, (_e: any, result?: boolean) => {
        console.log("[isOperational]", result);
        result !== undefined && setIsOperational(!!result);
      });

    // Watch events.OracleRequest
    contract.events.OracleRequest({}, (error: any, event: any) => {
      console.log("[event:OracleRequest]", { error, event });
    });

    // Watch events.FlightStatusInfo
    contract.events.FlightStatusInfo({}, (error: any, event: any) => {
      console.log("[event:FlightStatusInfo]", { error, event });
    });

    // Watch events.FlightStatusInfo
    contract.events.AirlineRegistered(
      { fromBlock: 0 },
      (error: any, event: { returnValues: { airline: Address } }) => {
        const newAirline = event.returnValues.airline;
        console.log("[event:AirlineRegistered]", newAirline, { error });
        setAirlines((airlines) => [...airlines, newAirline]);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Initialized]);

  return {
    contract,
    accounts,
    airlines,
    defaultAccount,
    isWeb3Initialized,
    isOperational,
  };
};
