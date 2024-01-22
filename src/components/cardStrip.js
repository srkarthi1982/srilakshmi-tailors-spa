import { Badge, Card, Group, Text } from '@mantine/core';
import { IconCircleArrowRight } from '@tabler/icons-react';
import React from 'react'
import ActionMenu from './actionMenu';

function CardStrip({ name, counter, onAction, data }) {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Group>
                        <IconCircleArrowRight />
                        <Text>{name}</Text>
                    </Group>
                    <Group>
                        <Badge size='md' variant='default'>{counter}</Badge>
                        <ActionMenu onAction={onAction} data={data} />
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}

export default CardStrip;