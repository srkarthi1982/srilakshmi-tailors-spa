"use client";
import cx from 'clsx';
import "@mantine/core/styles.css";
import React, { useState } from "react";
import { Text, Flex, UnstyledButton, ThemeIcon, rem, Button, Center, Box, Divider, SimpleGrid, useSafeMantineTheme, Menu, Avatar, Stack, Popover } from "@mantine/core";
import { Burger, Group } from '@mantine/core';
import classes from '../styles/HeaderMegaMenu.module.css';
import Logo from '../favicon.png';
import {
    IconNotification,
    IconChevronDown,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconSwitchHorizontal,
    IconLogout,
    IconPlayerPause,
    IconTrash,
    IconCategory,
    IconLogin,
    IconForms,
    IconGridDots,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
// import { usePathname, useRouter } from 'next/navigation';
// import Image from 'next/image';
const mockdata = [
    {
        icon: IconCategory,
        title: 'Categories',
        description: 'Explore a diverse range of items tailored to suit your style and interests',
        link: '/categories',
        isUser: null
    },
    {
        icon: IconStar,
        title: 'Brands',
        description: 'Discover a collection of premium and trusted brands that define quality and style',
        link: '/brands',
        isUser: null
    },
    {
        icon: IconHeart,
        title: 'Favorites',
        description: 'Create your personalized collection of favorites',
        link: '/favorites',
        isUser: true
    },
    {
        icon: IconSettings,
        title: 'Personalization',
        description: 'Manage and fine-tune your product preferences effortlessly. ',
        link: '/personalization',
        isUser: true
    },
    {
        icon: IconForms,
        title: 'RFQ',
        description: 'Submit your inquiry easily with our Request For Quotation feature.',
        link: '/rfq',
        isUser: true
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Stay updated effortlessly with our notification system. ',
        link: '/notifications',
        isUser: true
    },
];
const user = {
    name: 'Vijayalakshmi Karthikeyan',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
    role: 'Customer'
};
function AppHeader({ mobileOpened, desktopOpened, toggleMobile, toggleDesktop, asideToggleMobile, asideToggleDesktop }) {
    const theme = useSafeMantineTheme();
    const navigate = useNavigate();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    // const pathname = usePathname();
    const openAside = function () {
        asideToggleDesktop();
        asideToggleMobile();
    }
    const links = mockdata.filter(x => x.isUser === isLoggedIn || x.isUser === null).map((item) => (
        <UnstyledButton
            // data-active={pathname === item.link}         
            onClick={() => navigate(item.link)} className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));
    return (
        <Group h="100%" pl={10} pr={10} justify="space-between">
            <Group gap={0}>
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                <Flex>
                    <img src={Logo} width={36} height={36} alt='favicon' />
                    <Text size='xl' fw={700}>Srilakshmi Tailors</Text>
                </Flex>
            </Group>
            <Group h="100%" gap={0} visibleFrom="md">
                <Link to="/"
                    // data-active={pathname === '/'} 
                    className={classes.link}>
                    Home
                </Link>
                <Popover width={600} opened={openProduct} onClose={() => setOpenProduct(false)} position="bottom" radius="md" shadow="md" withinPortal>
                    <Popover.Target>
                        <Link href="#" onClick={() => setOpenProduct(!openProduct)}
                            // data-active={mockdata.some(item => item.link === pathname) || pathname === '/products'} 
                            className={classes.link}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Products
                                </Box>
                                <IconChevronDown
                                    style={{ width: rem(16), height: rem(16) }}
                                    color={theme.colors.blue[6]}
                                />
                            </Center>
                        </Link>
                    </Popover.Target>
                    <Popover.Dropdown style={{ overflow: 'hidden' }}>
                        <Group justify="space-between" px="md">
                            <Text fw={500}>Products</Text>
                            <Link to="/products" onClick={() => setOpenProduct(false)}>
                                View all
                            </Link>
                        </Group>
                        <Divider my="sm" />
                        <SimpleGrid cols={2} spacing={0} onClick={() => setOpenProduct(false)}>
                            {links}
                        </SimpleGrid>
                        <div className={classes.dropdownFooter}>
                            <Group justify="space-between">
                                <div>
                                    <Text size="xs" c="dimmed">
                                        Get started on your journey towards exquisite fashion and design.
                                    </Text>
                                </div>
                                <Button variant="default" onClick={() => {
                                    navigate('/products');
                                    setOpenProduct(false)
                                }}>Get started</Button>
                            </Group>
                        </div>
                    </Popover.Dropdown>
                </Popover>
                <Link to='/stores'
                    // data-active={pathname === '/stores'} 
                    className={classes.link}>
                    Stores
                </Link>
                <Link to="/academy"
                    // data-active={pathname === '/academy'} 
                    className={classes.link}>
                    Academy
                </Link>
                <Link to="/support"
                    // data-active={pathname === '/support'} 
                    className={classes.link}>
                    Support
                </Link>
                <Link to="/careers"
                    // data-active={pathname === '/careers'} 
                    className={classes.link}>
                    Careers
                </Link>
            </Group>
            <Group align='center' gap='xs'>
                <IconGridDots style={{ cursor: 'pointer' }} onClick={openAside} />
                {
                    isLoggedIn ?
                        <Menu
                            width={260}
                            position="bottom-end"
                            transitionProps={{ transition: 'pop-top-right' }}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            withinPortal>
                            <Menu.Target>
                                <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                                    <Avatar src={user.image} alt={user.name} radius="xl" />
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>
                                    <Stack gap={10}>
                                        <Text fw={500} size="md" lh={1} mr={3}>{user.name}</Text>
                                        <Text fw={500} size="sm" lh={1} mr={3}>{user.role}</Text>
                                    </Stack>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    leftSection={
                                        <IconHeart
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.red[6]}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Liked products
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconStar
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.yellow[6]}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Saved products
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconMessage
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.blue[6]}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Your comments
                                </Menu.Item>

                                <Menu.Label>Settings</Menu.Label>
                                <Menu.Item
                                    leftSection={
                                        <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                >
                                    Account settings
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                >
                                    Change account
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                    onClick={() => setIsLoggedIn(false)}
                                >
                                    Logout
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                    leftSection={
                                        <IconPlayerPause style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    }
                                >
                                    Pause subscription
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                >
                                    Delete account
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu> :
                        <>
                            <Group hiddenFrom='md'>
                                <IconLogin onClick={() => setIsLoggedIn(true)} />
                            </Group>
                            <Button visibleFrom='md' onClick={() => setIsLoggedIn(true)}>Login</Button>
                        </>
                }
            </Group>
        </Group>
    )
}
export default AppHeader;