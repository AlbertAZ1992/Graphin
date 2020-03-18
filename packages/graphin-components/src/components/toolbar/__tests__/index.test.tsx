import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Graphin from '@antv/graphin/src/Graphin';

import Toolbar from '../index';

describe('<Toolbar />', () => {
  it('You shall pass', () => {
    const data = {
      nodes: [],
      edges: [],
    };
    const layout = {
      name: 'force',
    };

    render(
      <Graphin data={data} layout={layout}>
        <Toolbar style={{ position: 'fixed', right: 68, top: 68 }} />
      </Graphin>,
    );
  });
});
