import { getCurrentWeather, amsterdam, singapore } from '../support/utils';

describe('Weather app', () => {

  it('get coordinates from geolocation', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          return cb({ coords: { longitude: singapore.coord.lon, latitude: singapore.coord.lat } });
        });
      }
    });

    getCurrentWeather().should('to.visible');
  });

  it('get coordinates from localStorage', () => {
    cy.setItemToLocalStorage('currentLocation', singapore.coord);
    cy.visit('/');
    getCurrentWeather().should('to.visible')
  });

  it('change location', () => {
    cy.visit('/search')
    cy.get('[data-test="search-input"]').type('Amsterdam{enter}')
    cy.get('[data-test="select-location"]').click();
    getCurrentWeather().should('to.visible');
  });

  it('delete location', () => {
    cy.setItemToLocalStorage('locationList', [
      { name: "Singapore", coord: singapore.coord },
      { name: "Amsterdam", coord: amsterdam.coord }
    ]);

    cy.visit('/search');
    cy.get('[data-test="btn-remove"]')
      .should('have.length', 2)
      .eq(0).click()
      .should('have.length', 1);
  });

});
