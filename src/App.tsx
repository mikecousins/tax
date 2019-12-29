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


// 2020: https://www.taxtips.ca/taxrates/ab.htm 
const calculateProvincialTax = (income: number): number => {
  if (income > 314928) {
    return (income - 314928) * 0.15 + calculateProvincialTax(314928);
  }
  if (income > 209952) {
    return (income - 209952) * 0.14 + calculateProvincialTax(209952);
  }
  if (income > 157464) {
    return (income - 157464) * 0.13 + calculateProvincialTax(157464);
  }
  if (income > 131220) {
    return (income - 131220) * 0.12 + calculateProvincialTax(131220);
  }
  return income * 0.1;
}


// 2020:  https://www.taxtips.ca/taxrates/canada.htm
const calculateFederalTax = (income: number): number => {
  if (income > 210371) {
    return (income - 210371) * 0.33 + calculateFederalTax(210371);
  }
  if (income > 147667) {
    return (income - 147667) * 0.29 + calculateFederalTax(147667);
  }
  if (income > 95259) {
    return (income - 95259) * 0.26 + calculateFederalTax(95259);
  }
  if (income > 47630) {
    return (income - 47630) * 0.205 + calculateFederalTax(47630);
  }
  return income * 0.15;
}

const App = () => {
  const [corporateIncome, setCorporateIncome] = useState(200000);
  const [corporatePureExpenses, setCorporatePureExpenses] = useState(10000);
  const [corporateOtherExpenses, setCorporateOtherExpenses] = useState(10000);
  const [personalIncome, setPersonalIncome] = useState(0);

  const maxCppAmount = 58700; // https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2019/cra-announces-maximum-pensionable-earnings-2020.html
  const maxEiAmount = 54200; // https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2019/cra-announces-maximum-pensionable-earnings-2020.html
  const maxSalary = corporateIncome - corporatePureExpenses - corporateOtherExpenses;
  const corporateProfit = corporateIncome - corporatePureExpenses - corporateOtherExpenses - personalIncome;
  const albertaCorporateTax = corporateProfit * 0.02; // https://www.taxtips.ca/smallbusiness/corporatetax/corporate-tax-rates-2019.htm
  const federalCorporateTax = corporateProfit * 0.09; // https://www.taxtips.ca/smallbusiness/corporatetax/corporate-tax-rates-2019.htm
  const corporateTax = albertaCorporateTax + federalCorporateTax;
  const corporateCash = corporateProfit - corporateTax;
  const personalDividendIncome = corporateCash;
  const grossedUpDividendIncome = personalDividendIncome * 1.15;
  const personalGrossedUpTotalIncome = personalIncome + grossedUpDividendIncome;
  const personalPreTaxIncome = personalIncome + personalDividendIncome;

  // https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2019/cra-announces-maximum-pensionable-earnings-2020.html
  const cpp = Math.max(0, Math.min(personalIncome, maxCppAmount) - 3500) * .0525; // Should maybe be 2x this if corporation has to pay too? I think there was an exemption for that
  // https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/reports/premium/rates2020.html
  const ei = Math.max(0, Math.min(personalIncome, maxEiAmount)) * .0158; // Should be more if employer pays too?
  const payrollTaxes = cpp + ei;

  const federalTaxBeforePersonalAmount = calculateFederalTax(personalGrossedUpTotalIncome);
  const canadaEmploymentAmountTaxCredit = Math.min(1245, personalIncome); // https://www.taxtips.ca/filing/canadaemployment.htm
  const federalTax = Math.max(federalTaxBeforePersonalAmount - .15 * (12298 + canadaEmploymentAmountTaxCredit + payrollTaxes), 0); // https://www.taxtips.ca/taxrates/ab.htm

  const provincialTaxBeforePersonalAmount = calculateProvincialTax(personalGrossedUpTotalIncome);
  const provincialTax = Math.max(provincialTaxBeforePersonalAmount - .1 * (19369 + payrollTaxes), 0); // https://www.taxtips.ca/taxrates/ab.htm

  const dividendTaxCredit = grossedUpDividendIncome * (0.090301 + 0.0218); // https://www.taxtips.ca/dtc/smallbusdtc.htm
  const netTaxes = federalTax + provincialTax + payrollTaxes - dividendTaxCredit;
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
              Alberta Corporate Tax (2020):
            </StatLabel>
            <StatNumber>${albertaCorporateTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Federal Corporate Tax (2020):
            </StatLabel>
            <StatNumber>${federalCorporateTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Total Corporate Tax (2020):
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
              Federal Taxes (2020):
            </StatLabel>
              <StatNumber>${federalTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Alberta Taxes (2020):
            </StatLabel>
              <StatNumber>${provincialTax.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              CPP/EI (2020):
            </StatLabel>
              <StatNumber>${payrollTaxes.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Dividend Tax Credit (2020):
            </StatLabel>
              <StatNumber>${dividendTaxCredit.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>
              Net Taxes (2020):
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
              {/* https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2019/cra-announces-maximum-pensionable-earnings-2020.html */}
              <Badge variantColor={personalIncome > maxCppAmount ? 'green' : 'red'}>{personalIncome > maxCppAmount ? 'Maxes CPP benefits' : 'Does not max CPP benefits'}</Badge>
              {/* // https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2019/cra-announces-maximum-pensionable-earnings-2020.html */}
              <Badge variantColor={personalIncome > maxEiAmount ? 'green' : 'red'}>{personalIncome > maxEiAmount ? 'Maxes EI benefits' : 'Does not max EI benefits'}</Badge>
              {/* https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html */}
              <Badge variantColor={personalIncome > 151277 ? 'green' : 'red'}>{personalIncome > 151277 ? 'Maxes RRSP headroom ($27,230)' : `Does not max RRSP headroom ($${(personalIncome * 0.18).toLocaleString()})`}</Badge>
            </Stack>
          </Box>
        </Container>
      </Page>
    </ThemeProvider>
  );
}

export default App;
