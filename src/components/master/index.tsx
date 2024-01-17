"use client";
import React, { useEffect, useState } from 'react'
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import { SingleInput } from '../../types'
import sortBy from 'lodash/sortBy';
import { Button, Group } from '@mantine/core';
import { IconRefresh, IconTableExport } from '@tabler/icons-react';
import ActionMenu from './actionMenu';
import AddButton from './addButton';
import { useRouter } from 'next/navigation';
import { reloadPath } from 'serverActions';
import { toTitleCase } from 'utils';

const PAGE_SIZE = 5;
const PAGE_SIZES = [5, 10, 15, 20, 50, 100];

export default function Master(props: any) {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<SingleInput[]>(sortBy(props.data, 'id').slice(0, PAGE_SIZE));
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<SingleInput>>({
        columnAccessor: 'id',
        direction: 'asc'
    });
    function onSortStatusChange(sortStatus: DataTableSortStatus<SingleInput>) {
        setPage(1);
        setSortStatus(sortStatus);
        onMounted(1, sortStatus, pageSize);
    }
    function onPageChange(page: number) {
        setPage(page);
        onMounted(page, sortStatus, pageSize);
    }
    function onRecordsPerPageChange(pageSize: number) {
        setPage(1);
        setPageSize(pageSize);
        onMounted(1, sortStatus, pageSize);
    }
    function onMounted(page: number, sortStatus: DataTableSortStatus<SingleInput>, pageSize: number) {
        const masterData = sortBy(props.data, sortStatus.columnAccessor) as SingleInput[];
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const data = sortStatus.direction === 'desc' ? masterData.reverse() : masterData;
        setRecords(data.slice(from, to));
    }
    useEffect(() => onMounted(page, sortStatus, pageSize), [props.data]);
    return (
        <>
            <Group align='center' justify="space-between">
                <h3>{toTitleCase(props.table)}</h3>
                <Button.Group>
                    <AddButton shortName={props.shortName} table={props.table} />
                    <Button size='xs' title='Export All' variant="default"><IconTableExport /></Button>
                    <Button size='xs' onClick={() => reloadPath(props.path)} title='Reload' variant="default"><IconRefresh /></Button>
                </Button.Group>
            </Group>
            <DataTable
                striped={true}
                highlightOnHover={true}
                height={'calc(100vh - 230px)'}
                withTableBorder={true}
                records={records}
                columns={[
                    { accessor: 'actions', title: '@', textAlign: 'center', width: 40, render: (item) => <ActionMenu item={item} shortName={props.shortName} table={props.table} /> },
                    { accessor: 'id', title: 'ID', width: 80, sortable: true },
                    { accessor: 'name', title: props.shortName, sortable: true },
                    { accessor: props.counterName, width: 100, textAlign: 'center', sortable: true },
                ]}
                sortStatus={sortStatus}
                onSortStatusChange={onSortStatusChange}
                totalRecords={props.data.length}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={onPageChange}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={onRecordsPerPageChange}
            />
        </>
    )
}