import React, { useState, useEffect, Fragment } from 'react';
import supabase from '../config/supabaseClient';
import { ActionIcon, CloseButton, Group, Input, SimpleGrid, Text } from '@mantine/core';
import { IconArrowLeft, IconPlus, IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CardStrip from '../components/cardStrip';
import CardStripSkeleton from '../components/cardStripSkeleton';
function Roles() {
    const [roles, setRoles] = useState([]);
    const [value, setValue] = useState('');
    const [ascending, setAscending] = useState(true);
    const navigate = useNavigate();
    const onAction = function (action, data) {
        console.log('action', action, data);
    }
    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.from('roles').select('*').order('name', { ascending });
            if (error) return;
            setRoles(data);
        })();
    }, [])
    return (
        <Fragment>
            <Group justify='space-between' align='center' mb={15}>
                <Group onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                    <IconArrowLeft />
                    <Text fw={700}>Roles ({roles.length})</Text>
                </Group>
                <Group>
                    <ActionIcon.Group>
                        <ActionIcon aria-label="Sorting" variant='default' onClick={async () => {
                            const { data, error } = await supabase.from('roles').select('*').order('name', { ascending: !ascending });
                            if (error) return;
                            setRoles(data);
                            setAscending(!ascending)
                        }}>
                            {ascending ? <IconSortAscending /> : <IconSortDescending />}
                        </ActionIcon>
                        <ActionIcon aria-label="Sorting" variant='default' onClick={async () => { }}>
                            <IconPlus />
                        </ActionIcon>
                    </ActionIcon.Group>
                    <Input
                        placeholder="Search"
                        value={value}
                        w={125}
                        onChange={async (event) => {
                            setValue(event.currentTarget.value);
                            const { data, error } = await supabase
                                .from('roles')
                                .select('*')
                                .ilike('name', `%${event.currentTarget?.value}%`)
                                .order('name', { ascending: !ascending });
                            if (error) return;
                            setRoles(data);

                        }}
                        rightSectionPointerEvents="all"
                        rightSection={
                            <CloseButton
                                aria-label="Search"
                                onClick={() => setValue('')}
                                style={{ display: value ? undefined : 'none' }}
                            />
                        }
                    />
                </Group>
            </Group>

            <SimpleGrid cols={{ base: 1, md: 1, lg: 2, xl: 3 }} spacing={5} verticalSpacing={5}>
                {
                    roles.length === 0 ?
                        Array.from({ length: 6 }, (_, index) => <CardStripSkeleton key={index} />) :
                        roles.map(role =>
                            <CardStrip
                                key={role.id}
                                name={role.name}
                                onAction={onAction}
                                counter={`${10} Users`}
                                data={role}
                            />
                        )
                }
            </SimpleGrid>
        </Fragment>
    )
}

export default Roles;