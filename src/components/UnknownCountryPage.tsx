import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 2rem;
`;

export const UnknownCountryPage: FunctionComponent = () => (
    <Wrapper>
        <p>Looks like your desired country isn't allowed in this app.</p>
        <p>Make sure you typed the name correctly and try again.</p>
    </Wrapper>
);
