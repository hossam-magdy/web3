import { useEffect, useState } from 'react';
import { config, FlightSuretyApp } from '../config';
import { useWeb3 } from './useWeb3';

export const useFlightSuretyAppContract = () => {
  const {
    web3,
    accounts,
    defaultAccount,
    isInitialized: isWeb3Initialized,
  } = useWeb3();

  const [contract] = useState(
    () => new web3.eth.Contract(FlightSuretyApp.abi as any, config.appAddress)
  );
  const [isOperational, setIsOperational] = useState<boolean>();

  useEffect(() => {
    if (!isWeb3Initialized) return;

    console.log('calling isOperational()', { defaultAccount, isOperational });
    contract.methods
      .isOperational()
      .call({ from: defaultAccount }, (_e: any, result?: boolean) => {
        console.log('[isOperational]', result);
        result !== undefined && setIsOperational(!!result);
      });

    // Watch events.FlightStatusInfo
    contract.events.FlightStatusInfo(
      { filter: {} },
      (error: any, event: any) => {
        console.log('[event:FlightStatusInfo]', { error, event });
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Initialized]);

  return {
    contract,
    accounts,
    defaultAccount,
    isWeb3Initialized,
    isOperational,
  };
};
