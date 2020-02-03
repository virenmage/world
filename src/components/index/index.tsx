import * as React from 'react';
import './index.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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

class Index extends React.Component<any, any> {   

    public render(): JSX.Element {
        const { data: { loading, error, countries } } = this.props;

        if (loading) {
            return <p>Loading data.... </p>
        }

        if (error) {
            return <p>GraphQL error occured.... </p>
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
                {countries.map((country: ICountry, index: number) =>
                    <CountryRow key={index} country={country} index={index} />
                )}
                </tbody>
            </table>
        );
    }

}


export default graphql(gql`
    query{
        countries{
            name,
            code,
            native,
            phone,
            currency,
            emoji
        }
    }
    `,
    {
    options: props => ({
        fetchPolicy: "cache-and-network",
        variables: {
            nextPageKey: 0,
        },
    })
})(Index);
