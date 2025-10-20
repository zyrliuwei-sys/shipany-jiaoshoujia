import { ReactNode } from 'react';

import { ConsoleLayout } from '@/shared/blocks/console/layout';
import { getPathname } from '@/shared/lib/browser';
import { Nav } from '@/shared/types/blocks/common';

export default async function ActivityLayout({
  children,
}: {
  children: ReactNode;
}) {
  // settings title
  const title = 'Activity';

  const pathname = await getPathname();

  // settings nav
  const nav: Nav = {
    title: 'Activity',
    items: [
      {
        title: 'Tasks',
        url: '/activity/tasks',
        icon: 'Task',
        is_active: pathname === '/activity/tasks',
      },
      {
        title: 'Chats',
        url: '/activity/chats',
        icon: 'Chat',
        is_active: pathname === '/activity/chats',
      },
      {
        title: 'Feedbacks',
        url: '/activity/feedbacks',
        icon: 'Feedback',
        is_active: pathname === '/activity/feedbacks',
      },
    ],
  };

  const topNav: Nav = {
    items: [
      {
        title: 'Activity',
        url: '/activity',
        icon: 'Activity',
        is_active: true,
      },
      {
        title: 'Settings',
        url: '/settings',
        icon: 'Settings',
        is_active: false,
      },
    ],
  };

  return (
    <ConsoleLayout
      title={title}
      nav={nav}
      topNav={topNav}
      className="py-16 md:py-20"
    >
      {children}
    </ConsoleLayout>
  );
}
