import React, { FunctionComponent, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { CountryInput } from './components/CountryInput';
import { Results } from './components/Results';

import { fonts } from './styles/variables';
import backgroundImage from './img/background.png';

const GlobalStyle = createGlobalStyle`
    body {
        font-size: 20px;
        font-family: ${fonts.sourceSansPro};
        background: url(${backgroundImage}) no-repeat center center fixed;
        background-size: cover;
    }
`;

const Header = styled.h1`
    padding: 1rem;
    text-align: center;
`;

export const App: FunctionComponent = () => {
    const [countryInputValue, updateCountryInputValue] = useState('');

    return (
        <div>
            <GlobalStyle />
            <Header>Polluted Cities</Header>
            <CountryInput updateCountryInputValue={updateCountryInputValue} />
            <Results countryInputValue={countryInputValue} />
        </div>
    );
};
