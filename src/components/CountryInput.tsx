import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';

import { allowedCountries } from '../data/allowedCountries';

import { colors } from '../styles/variables';

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 0;
`;

const InputField = styled.input`
    width: 85%;
    height: 2.5rem;
`;

const SubmitButton = styled.button`
    border: none;
    border-radius: 0.5rem;
    background-color: ${colors.black};
    color: ${colors.white};
    margin: 1rem;
    height: 2.5rem;
`;

interface Props {
    updateCountryInputValue: Function;
}

export const CountryInput: FunctionComponent<Props> = props => {
    const [countryNameField, updateCountryNameField] = useState(
        localStorage.getItem('inputFieldValue') || '',
    );

    const countriesAutocompleteOptions = allowedCountries.map((country: { name: string }) => (
        <option key={country.name} value={upperCaseFirstLetter(country.name)} />
    ));

    return (
        <FormWrapper
            onSubmit={event => {
                event.preventDefault();
                props.updateCountryInputValue(countryNameField);
            }}
        >
            <InputField
                type="text"
                list="countries"
                placeholder="Country..."
                value={countryNameField}
                onChange={event => {
                    updateCountryNameField(event.target.value);
                    localStorage.setItem('inputFieldValue', event.target.value);
                }}
            />
            <datalist id="countries">{countriesAutocompleteOptions}</datalist>
            <SubmitButton>Submit</SubmitButton>
        </FormWrapper>
    );
};

const upperCaseFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
