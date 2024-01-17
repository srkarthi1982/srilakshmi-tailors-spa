import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from '../styles/NavbarLinksGroup.module.css';
import { Link } from 'react-router-dom';

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }) {
    const hasLinks = Array.isArray(links);
    // const pathname = usePathname();
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map(l => (
        <Link
            className={classes.link}
            href={l.link}
            // data-active={pathname === l.link}
            key={l.label}>
            {l.label}
        </Link>
    ));

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

