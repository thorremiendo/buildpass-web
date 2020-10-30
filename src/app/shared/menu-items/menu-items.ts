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
      state: 'dashboard/home',
      name: 'New Application',  
      type: 'link',                    
      icon: 'note_add',
    },
    {
      state: 'dashboard/home',
      name: 'Existing Applications',  
      type: 'link',                    
      icon: 'pageview',
    },
    {
      state: 'dashboard/home',
      name: 'Forms',  
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
    }

    return menu;
  }
}