/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import React from 'react';
import RenderWithRouter from 'src/common/test-utils/renderWithRouter';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

import Emulator from 'src/Emulator/Emulator';

jest.mock('src/common/api/topology/requests');

describe('The emulator', () => {
  it('should render and match snapshots', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter
        path='/module/:moduleId/emulator/:emulatorId'
        initialEntries={['/module/1/emulator/1']}
      >
        <Emulator />
      </RenderWithRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});