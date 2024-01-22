import "@mantine/core/styles.css";
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.css';
import "./styles/layout.css";
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, useSafeMantineTheme, Tabs } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';
import AppHeader from "./components/appHeader";
import AppNavbar from './components/appNavbar'
import { IconBell, IconHeart, IconSettings, IconShoppingCart } from "@tabler/icons-react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import Stores from './pages/Stores';
import Academy from './pages/Academy';
import Support from './pages/Support';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound';
import Roles from "./pages/Roles";

function App() {
  const theme = useSafeMantineTheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [asideMobileOpened, { toggle: asideToggleMobile }] = useDisclosure();
  const [asideDesktopOpened, { toggle: asideToggleDesktop }] = useDisclosure(true);
  return (
    <Router>
      <MantineProvider theme={theme}>
        <AppShell header={{ height: 60 }} padding="sm"
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
          aside={{ width: 300, breakpoint: 'md', collapsed: { mobile: !asideMobileOpened, desktop: !asideDesktopOpened } }}>
          <AppShell.Header>
            <AppHeader
              mobileOpened={mobileOpened}
              desktopOpened={desktopOpened}
              toggleMobile={toggleMobile}
              toggleDesktop={toggleDesktop}
              asideToggleMobile={asideToggleMobile}
              asideToggleDesktop={asideToggleDesktop}
            />
          </AppShell.Header>
          <AppShell.Navbar>
            <AppNavbar />
          </AppShell.Navbar>
          <AppShell.Main>
            <ModalsProvider>
              <Notifications />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/products" element={<Products />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/support" element={<Support />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ModalsProvider>
          </AppShell.Main>
          <AppShell.Aside p="md">
            <Tabs defaultValue="first">
              <Tabs.List justify="space-between">
                <Tabs.Tab value="first"><IconBell /></Tabs.Tab>
                <Tabs.Tab value="second"><IconHeart /></Tabs.Tab>
                <Tabs.Tab value="third"><IconShoppingCart /></Tabs.Tab>
                <Tabs.Tab value="fourth"><IconSettings /></Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="first" pt="xs">
                Notifications
              </Tabs.Panel>
              <Tabs.Panel value="second" pt="xs">
                Favorites
              </Tabs.Panel>
              <Tabs.Panel value="third" pt="xs">
                Cart List
              </Tabs.Panel>
              <Tabs.Panel value="fourth" pt="xs">
                Settings
              </Tabs.Panel>
            </Tabs>
          </AppShell.Aside>
        </AppShell>
      </MantineProvider>
    </Router>
  );
}
export default App;

