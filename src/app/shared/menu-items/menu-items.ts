import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Separator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  separator?: Separator[];
  children?: ChildrenItems[];
}

const USERMENUITEMS = [
  {
    state: 'dashboard/home',
    name: 'Home',
    type: 'link',
    icon: 'home',
  },
  {
    state: 'dashboard/new/step-one',
    name: 'New Application',
    type: 'link',
    icon: 'note_add',
  },
  {
    state: 'dashboard/applications',
    name: 'My Applications',
    type: 'link',
    icon: 'pageview',
  },
  {
    state: 'dashboard/edit-profile',
    name: 'Edit Profile',
    type: 'link',
    icon: 'manage_accounts',
  },
  {
    state: 'dashboard/checklists',
    name: 'Downloadables',
    type: 'link',
    icon: 'file_download',
  },
  {
    state: 'dashboard/feedback',
    name: 'Feedback',
    type: 'link',
    icon: 'feedback',
    outlet: 'modal',
  },
];
const EVALUATORMENUITEMS = [
  {
    state: 'evaluator/home/table',
    name: 'Dashboard',
    type: 'link',
    icon: 'home',
  },
  {
    state: 'evaluator/schedule',
    name: 'Schedule',
    type: 'link',
    icon: 'event_available',
  },
  {
    state: 'evaluator/new-tasks',
    name: 'Chat Box',
    type: 'link',
    icon: 'textsms',
    // badge: [{ type:"warning", value:'5'}]
  },
  {
    state: 'evaluator/edit-profile',
    name: 'Edit Profile',
    type: 'link',
    icon: 'manage_accounts',
  },
  {
    state: 'evaluator/feedback',
    name: 'Feedback',
    type: 'link',
    icon: 'feedback',
    outlet: 'modal',
  },
  {
    state: 'evaluator/report-issue',
    name: 'Report Issue',
    type: 'link',
    icon: 'report',
    outlet: 'modal',
  },
  // {
  //   state: 'evaluator/nov',
  //   name: 'Notice of Violation',
  //   type: 'link',
  //   icon: 'cancel',
  // },
];

const ADMINMENUITEMS = [
  {
    state: 'admin/dashboard/application',
    name: 'Application',
    type: 'link',
    icon: 'description',
  },

  {
    state: 'admin',
    name: 'Users',
    type: 'sub',
    icon: 'people',

    children: [
      {
        state: 'employees',
        name: 'Evaluator',
        type: 'link',
        icon: 'badge',
      },

      {
        state: 'applicants',
        name: 'Applicant',
        type: 'link',
        icon: 'people',
      },
    ],
  },

  {
    state: 'admin/dashboard/announcement',
    name: 'Announcement',
    type: 'link',
    icon: 'campaign',
  },
  {
    state: 'admin/dashboard/analytics',
    name: 'Analytics',
    type: 'link',
    icon: 'analytics',
  },
  {
    state: 'admin/dashboard/feedback',
    name: 'Feedback',
    type: 'link',
    icon: 'feedback',
  },
];

const TREASURYMENUITEMS = [
  {
    state: 'treasury/dashboard/home',
    name: 'Home',
    type: 'link',
    icon: 'description',
  },
];

const NOVMENUITEMS = [
  {
    state: 'treasury/dashboard/home',
    name: 'Home',
    type: 'link',
    icon: 'description',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(type = ''): Menu[] {
    let menu = [];

    switch (type) {
      case 'user':
        menu = USERMENUITEMS;
        break;
      case 'evaluator':
        menu = EVALUATORMENUITEMS;
        break;
      case 'super admin':
        menu = ADMINMENUITEMS;
        break;
      case 'treasury':
        menu = TREASURYMENUITEMS;
        break;
      case 'nov':
        menu = NOVMENUITEMS;
        break;
    }

    return menu;
  }
}
