const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go
  it('should contain a <h1> element for the page title', () => pageObject
     .evaluate(() => document.querySelector('h1').innerText)
     .then((headerText) => {
       expect(headerText).to.not.be.null;
       expect(headerText).to.equal('Mortgage Calculator');
     }));

  it('should contain an input element with a name attribute of principal', () => pageObject
     .evaluate(() => document.querySelector('input[name="principal"]'))
     .then((principalInput) => {
       expect(principalInput).to.not.be.null;
       expect(principalInput).to.exist;
     }));

  it('should contain an input element with a name attribute of interestRate', () =>
    pageObject
      .evaluate(() => document.querySelector('input[name="interestRate"]'))
      .then((interestRateInput) => {
        expect(interestRateInput).to.not.be.null;
        expect(interestRateInput).to.exist;
      }));

  it('should contain an input element with a name attribute of loanTerm', () =>
    pageObject
      .evaluate(() => document.querySelector('input[name="loanTerm"]'))
      .then((loanTermInput) => {
        expect(loanTermInput).to.not.be.null;
        expect(loanTermInput).to.exist;
      }));

  it('should contain a select element with a name attribute of period', () =>
    pageObject
      .evaluate(() => document.querySelector('select[name="period"]'))
      .then((periodSelect) => {
        expect(periodSelect).to.not.be.null;
        expect(periodSelect).to.exist;
      }));

  it('should contain an option element with a value attribute of 12 and text content of Monthly', () =>
    pageObject
      .evaluate(() => document.querySelector('option[value="12"]').innerText)
      .then((monthlyOption) => {
        expect(monthlyOption).to.not.be.null;
        expect(monthlyOption).to.exist;
        expect(monthlyOption).to.equal('Monthly');
      }));

  it('should contain an option element with a value attribute of 4 and text content of Quarterly', () =>
      pageObject
        .evaluate(() => document.querySelector('option[value="4"]').innerText)
        .then((quarterlyOption) => {
          expect(quarterlyOption).to.not.be.null;
          expect(quarterlyOption).to.exist;
          expect(quarterlyOption).to.equal('Quarterly');
        }));

  it('should contain a button element with an id attribute of calculate and text content of Calculator', () =>
    pageObject
      .evaluate(() => document.querySelector('button[id="calculate"]').innerText)
      .then((calculateButton) => {
        expect(calculateButton).to.not.be.null;
        expect(calculateButton).to.exist;
        expect(calculateButton).to.equal('Calculate');
      }));

  it('should contain a p element with an id attribute of output', () =>
    pageObject
      .evaluate(
        () => document.querySelector('p[id="output"]'))
      .then((outputP) => {
        expect(outputP).to.not.be.null;
        expect(outputP).to.exist;
      }));

  it('should correctly calculate mortgage', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 300000)
      .type('input[name=interestRate]', 3.75)
      .type('input[name=loanTerm]', 30)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('$1389.35');
      })).timeout(6500);
});
