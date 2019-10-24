import React, { useState } from 'react';
import { ThemeProvider, CSSReset, FormLabel, FormControl, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberInput, Stat, StatLabel, StatNumber, Badge, Stack, Box } from '@chakra-ui/core';
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

const calculateProvincialTax = (income: number): number => {
  if (income > 320597) {
    return (income - 320597) * 0.15 + calculateProvincialTax(320597);
  }
  if (income > 213731) {
    return (income - 213731) * 0.14 + calculateProvincialTax(213731);
  }
  if (income > 160298) {
    return (income - 160298) * 0.13 + calculateProvincialTax(160298);
  }
  if (income > 133582) {
    return (income - 133582) * 0.12 + calculateProvincialTax(133582);
  }
  return income * 0.1;
}

const calculateFederalTax = (income: number): number => {
  if (income > 210371) {
    return (income - 210371) * 0.33 + calculateProvincialTax(210371);
  }
  if (income > 147667) {
    return (income - 147667) * 0.29 + calculateProvincialTax(147667);
  }
  if (income > 95259) {
    return (income - 95259) * 0.26 + calculateProvincialTax(95259);
  }
  if (income > 47630) {
    return (income - 47630) * 0.205 + calculateProvincialTax(47630);
  }
  return income * 0.15;
}

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
  const grossedUpDividendIncome = personalDividendIncome * 1.15;
  const personalGrossedUpTotalIncome = personalIncome + grossedUpDividendIncome;
  const personalPreTaxIncome = personalIncome + personalDividendIncome;
  const federalTax = calculateFederalTax(personalGrossedUpTotalIncome);
  const provincialTax = calculateProvincialTax(personalGrossedUpTotalIncome);
  const dividendTaxCredit = grossedUpDividendIncome * 0.0218;
  const netTaxes = federalTax + provincialTax - dividendTaxCredit;
  const personalAfterTaxIncome = personalPreTaxIncome - netTaxes + corporateOtherExpenses;

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
              Grossed Up Total Pre-tax Income:
            </StatLabel>
              <StatNumber>${personalGrossedUpTotalIncome.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Federal Taxes:
            </StatLabel>
              <StatNumber>${federalTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Provincial Taxes:
            </StatLabel>
              <StatNumber>${provincialTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Dividend Tax Credit:
            </StatLabel>
              <StatNumber>${dividendTaxCredit.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Net Taxes:
            </StatLabel>
              <StatNumber>${netTaxes.toLocaleString()}</StatNumber>
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
          <Box pt={5}>
            <Stack spacing={2}>
              <Badge variantColor={personalIncome > 52000 ? 'green' : 'red'}>{personalIncome > 52000 ? 'Maxes CPP benefits' : 'Does not max CPP benefits'}</Badge>
              <Badge variantColor={personalIncome > 144000 ? 'green' : 'red'}>{personalIncome > 144000 ? 'Maxes RRSP headroom ($23,500)' : `Does not max RRSP headroom ($${(personalIncome * 0.18).toLocaleString()})`}</Badge>
            </Stack>
          </Box>
        </Container>
      </Page>
    </ThemeProvider>
  );
}

export default App;
