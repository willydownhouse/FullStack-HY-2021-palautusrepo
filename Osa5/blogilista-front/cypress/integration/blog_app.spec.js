/* eslint-disable */

import { func } from 'prop-types';

describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/testing/init');

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  //LOGIN
  describe('Login', function () {
    it('Login succeeded with correct credentials', () => {
      cy.get('#username').type('keke');
      cy.get('#password').type('test1234');

      cy.contains('Login').click();

      cy.contains('keke logged in');
    });
    it('Login fail with wrong username', () => {
      cy.get('#username').type('ke');
      cy.get('#password').type('test1234');

      cy.contains('Login').click();

      cy.contains('Wrong username or password.');
    });
    it('Login fail with wrong password', () => {
      cy.get('#username').type('ke');
      cy.get('#password').type('test1234');

      cy.contains('Login').click();

      cy.contains('Wrong username or password.');
    });
    it('Login fail without username or password', () => {
      cy.get('#username');
      cy.get('#password');

      cy.contains('Login').click();

      cy.contains('Please enter username and password');
    });
    it('Notification color is red after failed loggin', function () {
      cy.intercept('http://localhost:3001/api/users/login').as('Login');

      cy.get('#username');
      cy.get('#password');

      cy.contains('Login').click();

      cy.wait(['@Login']);

      cy.get('#notification')
        .invoke('attr', 'class')
        .should('eq', 'ui error message');
    });
  });

  //AFTER LOGGED IN
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'keke', password: 'test1234' });
    });

    it('A blog can be created', function () {
      cy.get('#btnCreateBlog').click();

      cy.get('#title').type('Cypress Blog');
      cy.get('#author').type('willydownhouse');
      cy.get('#url').type('wwww.tsau.it');

      cy.get('#btnCreateBlogSubmit').click();

      cy.contains('Cypress Blog');
    });

    it('A blog can be liked', function () {
      cy.get('#btnShow0').click();
      cy.get('#btnLike0').click();

      cy.get('#likes0').invoke('attr', 'value').should('eq', '3');
    });

    it('A blog can be deleted', function () {
      cy.get('#btnDelete1').click();
      cy.contains('Blog 1').should('not.exist');
    });

    it('A blog DELETE button does not exist', function () {
      cy.get('#btnDelete0').should('not.exist');
    });

    it('Blogs in order based on likes', function () {
      let likes1;
      let likes2;
      cy.get('#likes0')
        .invoke('attr', 'value')
        .then(val => {
          likes1 = +val;
        });
      cy.get('#likes1')
        .invoke('attr', 'value')
        .then(val => {
          likes2 = +val;

          expect(likes1).to.be.greaterThan(likes2);
        });
    });
  });
});
