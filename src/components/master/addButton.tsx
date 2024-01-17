"use client";
import React from 'react'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks';
import ActionModel from './actionModel';

function AddButton(props: any) {
    const [opened, { open, close }] = useDisclosure(false);
    const initialValues = { id: 0, name: '', counter: 0 };
    return (
        <>
            <Button size='xs' onClick={open} title={`Create ${props.shortName}`} variant="default"><IconPlus /></Button>
            {opened && <ActionModel initialValues={initialValues} opened={opened} close={close} shortName={props.shortName} table={props.table} />}
        </>
    )
}
export default AddButton;