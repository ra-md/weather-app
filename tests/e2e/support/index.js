import { singapore, amsterdam } from './utils';
import './commands';

function coordToString({ lat, lon }) {
  return `lat=${lat}&lon=${lon}`;
}

const flags = 'ig';

beforeEach(() => {

  [
    {
      regex: new RegExp(`/weather|q=amsterdam|${coordToString(amsterdam.coord)}`, flags),
      json: 'amsterdamCurrentWeather.json',
    },
    {
      regex: new RegExp(`/onecall|${coordToString(amsterdam.coord)}`, flags),
      json: 'amsterdamOnecall.json',
    },
    {
      regex: new RegExp(`/weather|q=singapore|${coordToString(singapore.coord)}`, flags),
      json: 'singaporeCurrentWeather.json',
    },
    {
      regex: new RegExp(`/onecall|${coordToString(singapore.coord)}`, flags),
      json: 'singaporeOnecall.json',
    }
  ].forEach(({ regex, json }) => {
    cy.intercept(regex, { fixture: json }).as('mock');
  });

});
