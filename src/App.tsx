import React, { useState, useEffect } from 'react';
import { ThemeProvider, CSSReset, FormLabel, FormControl, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberInput, Stat, StatLabel, StatNumber } from '@chakra-ui/core';
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

const App = () => {
  const [corporateIncome, setCorporateIncome] = useState(100000);
  const [corporatePureExpenses, setCorporatePureExpenses] = useState(10000);
  const [corporateOtherExpenses, setCorporateOtherExpenses] = useState(10000);
  const [maxSalary, setMaxSalary] = useState(0);
  const [corporateProfit, setCorporateProfit] = useState(0);
  const [albertaCorporateTax, setAlbertaCorporateTax] = useState(0);
  const [federalCorporateTax, setFederalCorporateTax] = useState(0);
  const [corporateTax, setCorporateTax] = useState(0);
  const [corporateCash, setCorporateCash] = useState(0);
  const [personalIncome, setPersonalIncome] = useState(0);
  const [personalDividendIncome, setPersonalDividendIncome] = useState(0);
  const [grossedUpDividendIncome, setGrossedUpDividendIncome] = useState(0);
  const [personalPreTaxIncome, setPersonalPreTaxIncome] = useState(0);
  const [personalAfterTaxIncome, setPersonalAfterTaxIncome] = useState(0);

  useEffect(() => {
    setMaxSalary(corporateIncome - corporatePureExpenses - corporateOtherExpenses);
    setCorporateProfit(corporateIncome - corporatePureExpenses - corporateOtherExpenses - personalIncome);
  }, [corporateIncome, corporatePureExpenses, corporateOtherExpenses, personalIncome]);

  useEffect(() => {
    setAlbertaCorporateTax(corporateProfit * 0.02);
    setFederalCorporateTax(corporateProfit * 0.09);
    setCorporateTax(corporateProfit * 0.11);
  }, [corporateProfit]);

  useEffect(() => {
    setCorporateCash(corporateProfit - corporateTax);
  }, [corporateProfit, corporateTax]);

  useEffect(() => {
    setPersonalDividendIncome(corporateCash);
  }, [corporateCash]);

  useEffect(() => {
    setGrossedUpDividendIncome(personalDividendIncome * 1.38);
  }, [personalDividendIncome]);

  useEffect(() => {
    setPersonalPreTaxIncome(personalIncome + grossedUpDividendIncome);
  })

  useEffect(() => {
    setPersonalAfterTaxIncome(personalPreTaxIncome * 0.65 + corporateOtherExpenses);
  }, [personalPreTaxIncome, corporateOtherExpenses]);

  return (
    <ThemeProvider>
      <CSSReset />
      <Page>
        <Container>
          <FormControl>
            <FormLabel>
              Business Income:
            </FormLabel>
            <NumberInput value={corporateIncome} onChange={(value: any) => setCorporateIncome(value)} />
          </FormControl>
          <FormControl>
            <FormLabel>
              Pure Business Expenses (accountants, filings, etc):
            </FormLabel>  
            <NumberInput value={corporatePureExpenses} onChange={(value: any) => setCorporatePureExpenses(value)} />
          </FormControl>
          <FormControl>
            <FormLabel>
              Other Business Expenses (meals, utilities, hw/sw, etc):
            </FormLabel>
            <NumberInput value={corporateOtherExpenses} onChange={(value: any) => setCorporateOtherExpenses(value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Salary Paid Out:</FormLabel>
            <Slider value={personalIncome} onChange={value => setPersonalIncome(value)} min={0} max={maxSalary}>
              <SliderTrack />
              <SliderFilledTrack />
              <SliderThumb
                fontSize="sm"
                width="72px"
                height="20px"
                children={`$${personalIncome}`}
              />
            </Slider>
          </FormControl>
          <Stat>
            <StatLabel>
              Corporate Profit:
            </StatLabel>
            <StatNumber>${corporateProfit}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Alberta Corporate Tax:
            </StatLabel>
            <StatNumber>${albertaCorporateTax}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Federal Corporate Tax:
            </StatLabel>
            <StatNumber>${federalCorporateTax}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Total Corporate Tax:
            </StatLabel>
            <StatNumber>${corporateTax}</StatNumber>
          </Stat>
          <Stat>
          <StatLabel>
            Corporate After-tax Cash:
          </StatLabel>
            <StatNumber>${corporateCash}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>
              Dividend Income:
            </StatLabel>
              <StatNumber>${personalDividendIncome}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Grossed Up Dividend Income:
            </StatLabel>
              <StatNumber>${grossedUpDividendIncome}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Personal Pre-tax Income:
            </StatLabel>
              <StatNumber>${personalPreTaxIncome}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Personal After-tax Income:
            </StatLabel>
              <StatNumber>${personalAfterTaxIncome}</StatNumber>
          </Stat>
        </Container>
      </Page>
    </ThemeProvider>
  );
}

export default App;
