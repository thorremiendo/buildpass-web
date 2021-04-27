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
    state: 'dashboard/feedback',
    name: 'Feedback',
    type: 'link',
    icon: 'feedback',
    outlet: 'modal',
  },
  {
    state: 'dashboard/checklists',
    name: 'Forms',
    type: 'link',
    icon: 'file_download',
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
];

const ADMINMENUITEMS = [
  {
    state: 'admin/dashboard/users/employees',
    name: 'Evaluator List',
    type: 'link',
    icon: 'badge',
  },

  {
    state: 'admin/dashboard/users/applicants',
    name: 'Applicant List',
    type: 'link',
    icon: 'people',
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
    }

    return menu;
  }
}
