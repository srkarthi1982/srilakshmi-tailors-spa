'use client';
import React from 'react'
import { IconDots } from '@tabler/icons-react';
import { ActionIcon, Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import ActionModel from './actionModel';
import { SingleInput } from '../../types';
import { toTitleCase } from '../../utils';
import { deleteMaster } from 'serverActions';

interface ActionMenuProps {
    item: SingleInput;
    shortName: string;
    table: string;
}
export default function ActionMenu({ item, shortName, table }: ActionMenuProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const onDelete = () => {
        const { id, name, counter } = item;
        modals.openConfirmModal({
            title: 'Delete Confirmation',
            children: (<Text size="xs">{`Are you sure, do you want to delete this '${name}' ${shortName}?`}</Text>),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                const rows = await deleteMaster(id, name, table);
                notifications.show({ title: toTitleCase(table), message: rows[0].message });
            }
        });
    };
    return (
        <>
            <Menu withArrow position="bottom-start" withinPortal>
                <Menu.Target>
                    <ActionIcon variant="subtle" size="sm"><IconDots size="20" /></ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={open}>Edit</Menu.Item>
                    <Menu.Item onClick={onDelete} color="red">Delete</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            {opened && <ActionModel initialValues={item} opened={opened} close={close} shortName={shortName} table={table} />}
        </>
    );
}