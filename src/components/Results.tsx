import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Location } from './Location';
import { TitlePage } from './TitlePage';
import { UnknownCountryPage } from './UnknownCountryPage';

import { allowedCountries } from '../data/allowedCountries';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5rem;
`;

interface ResultsInterface {
    countryInputValue: string;
}

interface MeasurementInterface {
    lastUpdated: string;
    value: number;
}

interface FetchedLocationInterface {
    measurements: Array<MeasurementInterface>;
    city: string;
}

export const Results: FunctionComponent<ResultsInterface> = props => {
    const [fetchedData, updateFetchedData] = useState([]);
    const [isError, setIsError] = useState(false);

    const fetchErrorMessage =
        'Looks like there is a problem with getting measurements. Please try again in a second.';

    const country = allowedCountries.find(
        country => country.name === props.countryInputValue.toLowerCase(),
    );

    useEffect(() => {
        updateFetchedData([]);
        if (!country) return;

        setIsError(false);

        const url = `https://api.openaq.org/v1/latest?country=${
            country.code
        }&parameter=no2&limit=2000&has_geo=true`;

        const fetchData = async () => {
            const data = await fetch(url)
                .then(response => response.json())
                .catch(error => setIsError(true));
            updateFetchedData(data.results);
        };

        fetchData();
    }, [country]);

    if (props.countryInputValue === '') return <TitlePage />;
    if (!country) return <UnknownCountryPage />;

    const topResults = sortData(fetchedData);

    const fetchedDataList = topResults.map((location: FetchedLocationInterface, index: number) => (
        <Location
            key={location.city}
            index={index + 1}
            city={location.city}
            pollution={location.measurements[0].value}
        />
    ));

    return <Wrapper>{isError ? fetchErrorMessage : fetchedDataList}</Wrapper>;
};

const compareMeasurements = (a: FetchedLocationInterface, b: FetchedLocationInterface) => {
    const valueA = a.measurements[0].value;
    const valueB = b.measurements[0].value;

    return valueB - valueA;
};

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
};

const sortData = (data: Array<FetchedLocationInterface>) => {
    const recentResults = data.filter(result =>
        result.measurements[0].lastUpdated.startsWith(getCurrentDate()),
    );

    const sortedResults = [...recentResults].sort(compareMeasurements);

    const uniqueResults = sortedResults.filter(
        (result, resultIndex) =>
            sortedResults.findIndex(data => data.city === result.city) === resultIndex,
    );

    return uniqueResults.slice(0, 10);
};
