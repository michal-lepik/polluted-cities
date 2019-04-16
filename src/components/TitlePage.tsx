import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 2rem;
`;

export const TitlePage: FunctionComponent = () => (
    <Wrapper>
        <p>
            Type country name to get 10 most polluted cities in this country based on NO2 density (µg/m³)
        </p>

        <p>Allowed countries are:</p>
        <li>Germany</li>
        <li>France</li>
        <li>Poland</li>
        <li>Spain</li>
    </Wrapper>
);
