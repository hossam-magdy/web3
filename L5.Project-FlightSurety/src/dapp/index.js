import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';

const display = (title, description, results) => {
  const displayDiv = DOM.elid('display-wrapper');
  const section = DOM.section();
  section.appendChild(DOM.h2(title));
  section.appendChild(DOM.h5(description));
  results.map((result) => {
    const row = section.appendChild(DOM.div({ className: 'row' }));
    row.appendChild(DOM.div({ className: 'col-sm-4 field' }, result.label));
    row.appendChild(
      DOM.div(
        { className: 'col-sm-8 field-value' },
        result.error ? String(result.error) : String(result.value)
      )
    );
    section.appendChild(row);
  });
  displayDiv.append(section);
};

(async () => {
  const contract = new Contract('localhost', () => {
    // Read transaction
    contract.isOperational((error, result) => {
      display('Operational Status', 'Check if contract is operational', [
        {
          label: 'Operational Status',
          error,
          value: result,
        },
      ]);
    });

    // User-submitted transaction
    DOM.elid('submit-oracle').addEventListener('click', () => {
      const [flight, airline] = JSON.parse(DOM.elid('flight-number').value);
      // const airline = DOM.elid('flight-number').getAttribute('data-airline');
      // Write transaction
      contract.fetchFlightStatus(flight, airline, (error, result) => {
        console.log('[fetchFlightStatus]', result);
        display('Oracles', 'Trigger oracles', [
          {
            label: 'Fetch Flight Status',
            error: error,
            value: result.flight + ' ' + result.timestamp,
          },
        ]);

        contract.onNextFlightStatusInfo((results) => {
          display('FlightStatusInfo', 'FlightStatusInfo', [
            { label: 'FlightStatusInfo', value: JSON.stringify(results) },
          ]);
        });
      });
    });
  });
})();

// Fetch list of flights or UI
window.addEventListener('load', () => {
  const FLIGHT_LISTING_API_URL = 'http://localhost:3000/api';
  fetch(FLIGHT_LISTING_API_URL)
    .then((r) => r.json())
    .then(({ flights }) => {
      if (!flights || !flights.length) {
        throw new Error('Can not find flights for listing');
      }

      console.log('Listing flights:', flights);

      document
        .getElementById('flight-number')
        .insertAdjacentHTML('beforeend', `<option selected disabled></option>`);
      for (const flight of flights) {
        const { flightNumber, airline } = flight;
        document
          .getElementById('flight-number')
          .insertAdjacentHTML(
            'beforeend',
            `<option value='${JSON.stringify([
              flightNumber,
              airline,
            ])}'>${flightNumber}</option>`
          );
      }
    })
    .catch(console.error);
});
