import React, { useState } from 'react';
import { useFlightsApi, useFlightSuretyAppContract } from '../hooks';
import { Flight } from '../types';
import './App.css';

export const App: React.FC = () => {
  const { flights, getFlightByNumber } = useFlightsApi();

  const {
    contract,
    isOperational,
    accounts,
    defaultAccount,
    isWeb3Initialized,
  } = useFlightSuretyAppContract();

  const [selectedFlight, setSelectedFlight] = useState<Flight>();

  console.log({
    flights,
    accounts,
    defaultAccount,
    contract,
    isOperational,
  });

  const handleSubmitToOracles = () => {
    console.log('sending fetchFlightStatus', { selectedFlight });
    contract.methods
      .fetchFlightStatus(
        selectedFlight?.airline,
        selectedFlight?.flightNumber,
        selectedFlight?.timestamp
      )
      .send({ from: defaultAccount }, (error: any, txHash: string) => {
        console.log({ error, txHash });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>FlightSuretyApp</h2>
        {!isWeb3Initialized ? (
          <h4>Initializing Web3 …</h4>
        ) : (
          <>
            <p>Is Operational: {`${isOperational}`}</p>
            <div>
              <label>
                Flight
                <select
                  value={selectedFlight?.flightNumber}
                  onChange={(e) =>
                    setSelectedFlight(getFlightByNumber(e.target.value))
                  }
                >
                  {flights?.map((f) => (
                    <option key={f.flightNumber} value={f.flightNumber}>
                      {f.flightNumber}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={handleSubmitToOracles}>Submit to Oracles</button>
            </div>
          </>
        )}
      </header>
    </div>
  );
};
