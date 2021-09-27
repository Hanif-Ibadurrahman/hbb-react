import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import Datatable from 'react-bs-datatable';

// Create table headers consisting of 4 columns.
export const header = [
    {
        title: 'Username (filterable)',
        prop: 'username',
        sortable: true
    },
    {
        title: 'Name',
        prop: 'realname',
        sortable: true,
        // Add classes and styles by objects and strings.
        cellProps: {
            style: { background: '#fafafa' },
            className: 'realname-class'
        }
    },
    {
        title: 'Name Uppercased',
        prop: 'realnameuppercase',
        cell: row => row.realname.toUpperCase()
    },
    {
        title: 'Location',
        prop: 'location',
        cellProps: {
            style: { background: '#fafafa' },
            className: 'realname-class'
        }
        // Add classes and styles by function.
    }
];

export const customLabels = {
    first: '<<',
    last: '>>',
    prev: '<',
    next: '>',
    show: 'Display',
    entries: 'rows',
    noResults: 'There is no data to be displayed'
};

export const classes = {
    table: 'table-striped table-hover mb-5',
    thead: `bg-primary-5 ta-center`,
    theadCol: `mt-5 pb-3 pt-3 p-lg`,
    tbodyRow: `h-10 p-md`,
    filterCol: `d-none`,
    controlRow: `jc-end`,
    paginationOptsFormControl: `w-auto cur-p`,
    paginationOptsFormGroup: `d-flex ai-center jc-center`,
    paginationCol: `w-auto`,
    paginationButton: `bg-dark bd-c-dark`,

};

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.
export const body = Array.from(new Array(57), () => {
    const rd = (Math.random() * 10).toFixed(1);

    if (rd > '0.5') {
        return {
            username: 'i-am-billy',
            realname: `Billy ${rd}`,
            location: 'Mars',
        };
    }

    return {
        username: 'john-nhoj',
        realname: `John ${rd}`,
        location: 'Saturn',
    };
});

export function DataTables() {
    return (
        <>
            <Helmet>
                <title>Data Tables</title>
                <meta name="description" content="DataTables" />
            </Helmet>
            <div className="pos-r p-8 d-flex fd-col-r">
                <Datatable
                    tableHeaders={header}
                    tableBody={body}
                    rowsPerPage={8}
                    rowsPerPageOption={[5, 10, 15, 20]}
                    initialSort={{ prop: 'username', isAscending: true }}
                    labels={customLabels}
                    classes={classes}
                />
            </div>
        </>
    );
}

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;
