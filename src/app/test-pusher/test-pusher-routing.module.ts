import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPusherComponent } from './dashboard-pusher/dashboard-pusher.component';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
    {
        path: "pusher",
        children:[

            {
                path:'',
                component:DashboardPusherComponent,

            },

            {
                path: "feed",
                component: FeedComponent,

            },

            {
                path: "feed-form",
                component: FeedFormComponent,
            }
    ]
    },

    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class TestPusherRouting { }
