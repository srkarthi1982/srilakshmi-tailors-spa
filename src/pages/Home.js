import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import { ActionIcon, Card, Group, Menu, Text, rem } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';

function Home() {
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.from('roles').select('*');
            if (error) return;
            setRoles(data);
        })();
    }, [])
    return (
        <>
            {
                roles.map(x => {
                    return (
                        <Card withBorder mb={5} shadow="sm" radius="md">
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group justify="space-between">
                                    <Text fw={500}>{x.name}</Text>
                                    <Menu withinPortal position="bottom-end" shadow="sm">
                                        <Menu.Target>
                                            <ActionIcon variant="subtle" color="gray">
                                                <IconDots style={{ width: rem(16), height: rem(16) }} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item leftSection={<IconFileZip style={{ width: rem(14), height: rem(14) }} />}>
                                                Download zip
                                            </Menu.Item>
                                            <Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}>
                                                Preview all
                                            </Menu.Item>
                                            <Menu.Item
                                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                                color="red"
                                            >
                                                Delete all
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </Card.Section>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default Home;