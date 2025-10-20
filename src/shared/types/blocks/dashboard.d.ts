import { Brand, Nav } from './common';

export interface Dashboard {
  sidebar?: Sidebar;
}

export interface SidebarHeader {
  brand?: Brand;
  show_trigger?: boolean;
}

export interface SidebarFooter {
  nav?: Nav;
  show_locale?: boolean;
  show_theme?: boolean;
}

export interface SidebarUser {
  nav?: Nav;
  show_email?: boolean;
  show_signout?: boolean;
  signout_callback?: string;
}

export interface Sidebar {
  header?: SidebarHeader;
  main_navs?: Nav[];
  bottom_nav?: Nav;
  user?: SidebarUser;
  footer?: SidebarFooter;
  variant?: 'inset' | 'sidebar' | 'floating';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}
