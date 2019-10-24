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
  const [personalIncome, setPersonalIncome] = useState(0);

  const maxSalary = corporateIncome - corporatePureExpenses - corporateOtherExpenses;
  const corporateProfit = corporateIncome - corporatePureExpenses - corporateOtherExpenses - personalIncome;
  const albertaCorporateTax = corporateProfit * 0.02;
  const federalCorporateTax = corporateProfit * 0.09;
  const corporateTax = corporateProfit * 0.11;
  const corporateCash = corporateProfit - corporateTax;
  const personalDividendIncome = corporateCash;
  const grossedUpDividendIncome = personalDividendIncome * 1.38;
  const personalPreTaxIncome = personalIncome + grossedUpDividendIncome;
  const personalAfterTaxIncome = personalPreTaxIncome * 0.65 + corporateOtherExpenses;

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
            <FormLabel>Salary Paid Out ($0-{maxSalary.toLocaleString()}):</FormLabel>
            <Slider value={personalIncome} onChange={value => setPersonalIncome(value)} min={0} max={maxSalary} step={1000}>
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
            <StatNumber>${corporateProfit.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Alberta Corporate Tax:
            </StatLabel>
            <StatNumber>${albertaCorporateTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Federal Corporate Tax:
            </StatLabel>
            <StatNumber>${federalCorporateTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Total Corporate Tax:
            </StatLabel>
            <StatNumber>${corporateTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
          <StatLabel>
            Corporate After-tax Cash:
          </StatLabel>
            <StatNumber>${corporateCash.toLocaleString()}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>
              Dividend Income:
            </StatLabel>
              <StatNumber>${personalDividendIncome.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Grossed Up Dividend Income:
            </StatLabel>
              <StatNumber>${grossedUpDividendIncome.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Personal Pre-tax Income:
            </StatLabel>
              <StatNumber>${personalPreTaxIncome.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Personal After-tax Income:
            </StatLabel>
              <StatNumber>${personalAfterTaxIncome.toLocaleString()}</StatNumber>
          </Stat>
        </Container>
      </Page>
    </ThemeProvider>
  );
}

export default App;
