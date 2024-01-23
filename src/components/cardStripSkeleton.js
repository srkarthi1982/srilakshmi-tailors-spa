import { Card, Group, Skeleton } from '@mantine/core';

function CardStripSkeleton() {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Group>
                        <Skeleton height={24} circle />
                        <Skeleton width={100} height={24} />
                    </Group>
                    <Group>
                        <Skeleton width={60} radius="xl" height={24} />
                        <Skeleton width={30} radius="xl" height={24} />
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}

export default CardStripSkeleton;
