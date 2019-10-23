import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Page = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

const Container = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0px;
  width: 100%;
`;

const Input = styled.input`
  padding: 5px;
  float: right;
  background-color: ${props => props.readOnly ? '#eee' : 'white'}
`;

const App = () => {
  const [corporateIncome, setCorporateIncome] = useState(100000);
  const [corporatePureExpenses, setCorporatePureExpenses] = useState(10000);
  const [corporateOtherExpenses, setCorporateOtherExpenses] = useState(10000);
  const [corporateProfit, setCorporateProfit] = useState(0);
  const [albertaCorporateTax, setAlbertaCorporateTax] = useState(0);
  const [federalCorporateTax, setFederalCorporateTax] = useState(0);
  const [corporateTax, setCorporateTax] = useState(0);
  const [corporateCash, setCorporateCash] = useState(0);
  const [personalIncome, setPersonalIncome] = useState(0);
  const [personalDividendIncome, setPersonalDividendIncome] = useState(0);
  const [grossedUpDividendIncome, setGrossedUpDividendIncome] = useState(0);
  const [personalAfterTaxIncome, setPersonalAfterTaxIncome] = useState(0);

  useEffect(() => {
    setCorporateProfit(corporateIncome - corporatePureExpenses - corporateOtherExpenses);
  }, [corporateIncome, corporatePureExpenses, corporateOtherExpenses]);

  useEffect(() => {
    setAlbertaCorporateTax(corporateProfit * 0.02);
    setFederalCorporateTax(corporateProfit * 0.09);
    setCorporateTax(corporateProfit * 0.11);
  }, [corporateProfit]);

  useEffect(() => {
    setCorporateCash(corporateProfit - corporateTax);
  }, [corporateProfit, corporateTax]);

  useEffect(() => {
    setPersonalIncome(corporateCash / 2);
    setPersonalDividendIncome(corporateCash / 2);
  }, [corporateCash]);

  useEffect(() => {
    setGrossedUpDividendIncome(personalDividendIncome * 1.38);
  }, [personalDividendIncome]);

  useEffect(() => {
    setPersonalAfterTaxIncome(personalIncome * 0.65 + corporateOtherExpenses);
  }, [personalIncome, corporateOtherExpenses]);

  return (
    <Page>
      <Container>
        <Label>
          Business Income:
          <Input type="text" value={corporateIncome} onChange={e => {
            const parsed = Number.parseInt(e.target.value)
            if (!isNaN(parsed)) {
              setCorporateIncome(parsed)}
            }
          } />
        </Label>
        <Label>
          Pure Business Expenses (accountants, filings, etc):
          <Input type="text" value={corporatePureExpenses} onChange={e => {
            const parsed = Number.parseInt(e.target.value)
            if (!isNaN(parsed)) {
              setCorporatePureExpenses(parsed)}
            }
          } />
        </Label>
        <Label>
          Other Business Expenses (meals, utilities, hw/sw, etc):
          <Input type="text" value={corporateOtherExpenses} onChange={e => {
            const parsed = Number.parseInt(e.target.value)
            if (!isNaN(parsed)) {
              setCorporateOtherExpenses(parsed)}
            }
          } />
        </Label>
        <Label>
          Corporate Profit:
          <Input type="text" value={corporateProfit} readOnly />
        </Label>
        <Label>
          Alberta Corporate Tax:
          <Input type="text" value={albertaCorporateTax} readOnly />
        </Label>
        <Label>
          Federal Corporate Tax:
          <Input type="text" value={federalCorporateTax} readOnly />
        </Label>
        <Label>
          Total Corporate Tax:
          <Input type="text" value={corporateTax} readOnly />
        </Label>
        <Label>
          Corporate After-tax Cash:
          <Input type="text" value={corporateCash} readOnly />
        </Label>
        <Label>
          Salary Income:
          <Input type="text" value={personalIncome} readOnly />
        </Label>
        <Label>
          Dividend Income:
          <Input type="text" value={personalDividendIncome} readOnly />
        </Label>
        <Label>
          Grossed Up Dividend Income:
          <Input type="text" value={grossedUpDividendIncome} readOnly />
        </Label>
        <Label>
          Personal After-tax Income:
          <Input type="text" value={personalAfterTaxIncome} readOnly />
        </Label>
      </Container>
    </Page>
  );
}

export default App;
