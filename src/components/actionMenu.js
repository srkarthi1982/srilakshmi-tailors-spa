import { ActionIcon, Menu, rem } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { DELETE, EDIT } from '../constants';

const ICON_STYLE = { width: rem(14), height: rem(14) };
function ActionMenu({ onAction, data }) {
    return (
        <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => onAction(EDIT, data)} leftSection={<IconEdit style={ICON_STYLE} />}>
                    {EDIT}
                </Menu.Item>
                <Menu.Item onClick={() => onAction(DELETE, data)} leftSection={<IconTrash style={ICON_STYLE} />} color="red">
                    {DELETE}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default ActionMenu;