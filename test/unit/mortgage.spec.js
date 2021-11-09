const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
  let mortgage = null;

  beforeEach(() => {
    mortgage = new Mortgage();
  });

  it('should have an monthlyPayment function', () => {
    expect(mortgage.monthlyPayment).to.exist;
  });

  it('should have a principal value', () => {
    expect((mortgage.principal = 300000));
    expect(mortgage.principal).to.equal(300000);
  });

  it('should have an interest value', () => {
    expect((mortgage.interest = 3.75));
    expect(mortgage.interest).to.equal(3.75);
  });

  it('should have a term value', () => {
    expect((mortgage.term = 30));
    expect(mortgage.term).to.equal(30);
  });

  it('should have a period value', () => {
    expect((mortgage.period = 12));
    expect(mortgage.period).to.equal(12);
  });

  it('should have a monthlyPayment of 1389.35', () => {
    mortgageCalculator = new Mortgage(300000, 3.75, 30, 12);
    expect(mortgageCalculator.monthlyPayment()).to.equal(1389.35);
  });
});
