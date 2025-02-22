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
import React, { FC } from 'react';
import { Divider, Flex, Link, Stack, Text, Icon, Collapse, Tooltip } from '@chakra-ui/core';
import { SubModuleIntf } from 'src/common/types/curriculum';

import { ModuleName } from './styled';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

interface Props extends SubModuleIntf {
  moduleId: number;
  index: number;
  count: number;
}

const createLink = ({ type, id, moduleId }: Pick<Props, 'moduleId' | 'type' | 'id'>) => {
  if (type === 'VALUE') {
    return `/value/${id}`;
  }

  const moduleType = type === 'LAB' ? 'emulator' : type.toString().toLowerCase();

  return `/module/${moduleId}/${moduleType}/${id}`;
};

const capitalize = (s: string): string =>
  `${s[0].toUpperCase()}${s.toLowerCase().slice(1)}`;

export const SubModule: FC<Props> = (
  {
    name,
    id,
    moduleId,
    type,
    index,
    count,
    introduction,
  },
) => {
  const [isOpen, setOpen] =
    useSessionStorage<boolean>(`submodule-${moduleId}-${id}-${index}`, false,
      value => JSON.parse(value));

  return (
    <Flex>
      <Icon
        name='star'
        size='1.5rem'
        color='green.500'
      />
      <Stack spacing={2} width='100%' marginLeft='1.5rem'>
        <Flex justifyContent='space-between'>
          <ModuleName locked={false}>
            <Tooltip
              hasArrow
              label={isOpen ? 'Show less' : 'Show more'}
              {...{'aria-label': 'More information'}}
            >
              <Text onClick={() => setOpen(open => !open)}>
                {`${capitalize(type.toString())}: ${name}`}
              </Text>
            </Tooltip>
          </ModuleName>
          <ModuleName locked={false} hoverColor='rgba(84,143,155)'>
            <Link href={createLink({ moduleId, type, id })}>
              {'Go to Submodule >'}
            </Link>
          </ModuleName>
        </Flex>
        <Collapse isOpen={isOpen}>
          {introduction}
        </Collapse>
        {index !== count -1 && <Divider />}
      </Stack>
    </Flex>
  );
};


export default SubModule;