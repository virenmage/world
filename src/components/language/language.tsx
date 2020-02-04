import * as React from 'react';
import gql from 'graphql-tag';
import '../index//index.scss';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { useQuery} from '@apollo/react-hooks';

import ReactDOM from 'react-dom';

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

const LIST_COUNTRIES = gql`
  {
    countries {
        emoji
        name
        code
        native
        phone
        currency
    }
  }
`;

function CountryRow(props: any) {
    const country: ICountry = props.country

    return (
      <tr key={props.index}>
        <td>{country.emoji}</td>
        <td>{country.name}</td>
        <td>{country.code}</td>
        <td>{country.native}</td>
        <td>{country.phone}</td>
        <td>{country.currency}</td>
      </tr>
    )
}

interface ICountry {
    emoji: string;
    name: string;
    code: string;
    native: string;
    phone: string;
    currency: string;
}

export default function Languages() {
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
    if (loading || error) {
      return <p>{error ? error.message : 'Loading...'}</p>;
    }
  
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Native</th>
                    <th>Phone</th>
                    <th>Currency</th>
                </tr>
            </thead>
            <tbody>
            {data.countries.map((country: ICountry, index: number) =>
                <CountryRow key={index} country={country} index={index} />
            )}
            </tbody>
        </table>
    );
  }
  
  ReactDOM.render(<Languages />, document.getElementById('root'));