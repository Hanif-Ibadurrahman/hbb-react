import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';

export function Accordions() {
  return (
    <>
      <Helmet>
        <title>Accordions</title>
        <meta name="description" content="Accordions" />
      </Helmet>
      <div className="pos-r p-8">
        <h1>Accordion</h1>
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
