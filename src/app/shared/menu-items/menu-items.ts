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
      state: 'dashboard',
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
      name: 'Existing Applications',  
      type: 'link',                    
      icon: 'pageview',
    },
    {
      state: 'dashboard/forms',
      name: 'Forms',  
      type: 'link',                    
      icon: 'folder',
    },
    {
      state: 'dashboard/edit-profile',
      name: 'Edit Profile',  
      type: 'link',                    
      icon: 'folder',
    },
  ]
  const EVALUATORMENUITEMS = [
    {
      state: 'evaluator/home/table',
      name: 'Dashboard',  
      type: 'link',                    
      icon: 'home',
    },
    {
      state: 'evaluator/new-tasks',
      name: 'New Tasks',  
      type: 'link',                    
      icon: 'note_add',
    },
    {
      state: 'evaluator/opened-tasks',
      name: 'Opened Tasks',  
      type: 'link',                    
      icon: 'pageview',
    },
    {
      state: 'evaluator/closed-tasks',
      name: 'Closed Tasks',  
      type: 'link',                    
      icon: 'folder',
    },
    {
      state: 'evaluator/edit-profile',
      name: 'Edit Profile',  
      type: 'link',                    
      icon: 'folder',
    },
  ]

  
@Injectable()
export class MenuItems {
  getMenuitem(type = ''): Menu[] {
    let menu = [];

    switch(type) {
      case 'user':
        menu = USERMENUITEMS;
        break;
        case 'evaluator':
          menu = EVALUATORMENUITEMS;
          break;
    }

    return menu;
  }
}