import { apolloClient } from '../apollo-client';
import { getAddressFromSigner } from '../../ethers.service';
import { gql } from '@apollo/client/core';
import { login } from '../authentication/login';
import { prettyJSON } from '../../utils/helpers';

const ENABLED_CURRENCIES = `
  query {
    enabledModuleCurrencies {
      name
      symbol
      decimals
      address
    }
  }
`;

const enabledCurrenciesRequest = () => {
  return apolloClient.query({
    query: gql(ENABLED_CURRENCIES),
  });
};

export const enabledCurrencies = async () => {
  const address = getAddressFromSigner();
  console.log('enabled currencies: address', address);

  await login(address);

  const result = await enabledCurrenciesRequest();

  prettyJSON('enabled currencies: result', result.data);

  return result.data;
};