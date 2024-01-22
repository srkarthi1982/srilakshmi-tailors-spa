import React, { useState, useEffect, Fragment } from 'react';
import supabase from '../config/supabaseClient';
import { CloseButton, Group, Input, SimpleGrid, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CardStrip from '../components/cardStrip';
function Roles() {
    const [roles, setRoles] = useState([]);
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const onAction = function (action, data) {
        console.log('action', action, data);
    }
    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.from('roles').select('*');
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
                    <Input
                        placeholder="Search"
                        value={value}
                        w={180}
                        onChange={(event) => setValue(event.currentTarget.value)}
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
            <SimpleGrid cols={{ base: 1, md: 1, lg: 2, xl: 3 }}>
                {
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