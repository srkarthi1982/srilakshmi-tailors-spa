import { ActionIcon, Code, Group, ScrollArea, SegmentedControl, TextInput, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
    IconSun,
    IconMoon,
    IconSearch
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from '../styles/NavbarNested.module.css';
const mockdata = [
    {
        label: 'Dashboard',
        icon: IconGauge,
        initiallyOpened: true,
        links: [
            { label: 'Administrator', link: '/dashboard/administrator' },
            { label: 'Vendor', link: '/dashboard/vendor' },
        ]
    },
    {
        label: 'Market news',
        icon: IconNotes,
        initiallyOpened: false,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
    {
        label: 'Security',
        icon: IconLock,
        links: [
            { label: 'Roles', link: '/roles' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];
export default function AppNavbar() {
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <TextInput
                        placeholder="Search"
                        leftSection={<IconSearch size={20} stroke={1.5} />}
                        rightSectionWidth={80}
                        rightSection={<Code className={classes.searchCode}>CTRL + K</Code>}
                        styles={{ section: { pointerEvents: 'none' } }}
                    />
                </Group>
            </div>
            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
            <div className={classes.footer}>
                <Group p={10} justify="space-between">
                    <SegmentedControl color="blue" fullWidth data={['English', 'தமிழ்']} />
                    <Group gap={5}>
                        <ActionIcon onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')} variant="outline" size="lg" aria-label="Theme Color">
                            {
                                computedColorScheme === 'light' ?
                                <IconSun className={classes.iconlight} size="20" stroke={1.5} /> :
                                <IconMoon className={classes.icondark} size="20" stroke={1.5} />
                            }
                        </ActionIcon>
                    </Group>
                </Group>
            </div>
        </nav>
    );
}