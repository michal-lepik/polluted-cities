import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';

import { colors, fontSizes, mediaBreakpoints } from '../styles/variables';

const LocationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    width: 100%;
    padding: 1.5rem 0;
    margin: 1rem 0;

    @media (min-width: ${mediaBreakpoints.medium}) {
        flex-direction: row;
        height: 11rem;
    }

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: ${colors.shuttleGray};
        filter: opacity(0.3);
        z-index: -1;
    }
`;

const Index = styled.div`
    display: none;
    min-width: 5%;
    padding-left: 3rem;
    font-size: ${fontSizes.locationIndex};
    color: ${colors.shuttleGray};
    opacity: 0.45;

    @media (min-width: ${mediaBreakpoints.medium}) {
        display: flex;
    }
`;

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    text-align: center;
    width: 100%;
    padding: 2rem;

    @media (min-width: ${mediaBreakpoints.medium}) {
        display: flex;
        min-width: 15%;
    }
`;

const CityName = styled.div`
    padding: 1rem;
    font-size: ${fontSizes.cityName};
    z-index: 1;
`;

const Pollution = styled.div`
    font-size: ${fontSizes.pollutionValue};
`;

const Description = styled.div`
    font-size: ${fontSizes.description};
    width: 90%;
    padding: 1rem;
    text-align: center;

    @media (min-width: ${mediaBreakpoints.medium}) {
        min-width: 65%;
        font-size: ${fontSizes.descriptionLarge};
        padding-right: 3rem;
    }
`;

const WikiLink = styled.a`
    text-decoration: none;
    font-style: italic;
    color: ${colors.black};
    transition: color 0.6s ease;

    :hover {
        color: ${colors.roofTerracotta};
    }
`;

interface LocationInterface {
    index: number;
    city: string;
    pollution: number;
}

export const Location: FunctionComponent<LocationInterface> = props => {
    const [cityDescription, setCityDescription] = useState('');
    const [isError, setIsError] = useState(false);

    const errorMessage =
        'There is a problem with getting cities description. Please try again in a second.';
    const cityName = props.city.split('/')[0];

    const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=${cityName}`;
    const wikiurl = `https://en.wikipedia.org/wiki/${cityName}`;

    useEffect(() => {
        setIsError(false);
        const fetchData = async () => {
            const data = await fetch(url)
                .then(response => response.json())
                .catch(error => setIsError(true));

            setCityDescription(data.query.pages[Object.keys(data.query.pages)[0]].extract);
        };

        fetchData();
    }, [url]);

    const shortDescription = cityDescription.substring(0, 450) + '...';

    return (
        <LocationWrapper>
            <Index>{props.index}</Index>
            <ResultWrapper>
                <CityName>{props.city}</CityName>
                <Pollution>{props.pollution} µg/m³</Pollution>
            </ResultWrapper>
            <Description>
                {isError ? errorMessage : shortDescription}
                <WikiLink href={wikiurl}>(read more)</WikiLink>
            </Description>
        </LocationWrapper>
    );
};
