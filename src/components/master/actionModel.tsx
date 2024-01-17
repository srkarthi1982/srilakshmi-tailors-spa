'use client';
import React, { useState } from 'react'
import { Button, Group, Modal, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { SingleInput } from '../../types';
import { saveMaster } from 'serverActions';
import { notifications } from '@mantine/notifications';
import { toTitleCase } from 'utils';
interface ActionModelProps {
    initialValues: SingleInput;
    opened: boolean;
    shortName: string;
    table: string;
    close: () => void;
}
export default function ActionModel({ initialValues, opened, shortName, table, close }: ActionModelProps) {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues,
        validate: { name: value => value.length < 3 }
    });
    const onSubmit = async function ({ id, name }: SingleInput) {
        setLoading(true);
        const rows = await saveMaster(id, name, table);
        setLoading(false);
        notifications.show({ title: toTitleCase(table), message: rows[0].message });
        close();
    }
    return (
        <Modal opened={opened} onClose={close} title={(<Text>{form.values.id ? 'Update' : 'Create'} {shortName}</Text>)} centered>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    maxLength={20}
                    value={form.values.name}
                    onChange={(event: any) => form.setFieldValue('name', event.currentTarget.value)}
                    error={form.errors.name && `${shortName} should be minimum 3 characters.`}
                    label={shortName}
                    placeholder="Type atleast 3 characters" />
                <Group justify="flex-end" mt="md">
                    <Button type="button" variant="default" onClick={close}>Cancel</Button>
                    <Button variant='filled' disabled={!form.isTouched()} loading={loading} type="submit">Save</Button>
                </Group>
            </form>
        </Modal>
    )
}
