import { Navigate, RouteObject } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import { lazy, Suspense } from "react";
import SuspenseLoader from "./components/SuspenseLoader";
import SignInForm from "./auth/signIn/signIn";
import SignUpForm from "./auth/signUp/signUp";


const Loader = (Component:any) => (props:any) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );

const Buttons = Loader(
    lazy(() => import('../src/content/pages/Components/Buttons'))
  );
  const Modals = Loader(
    lazy(() => import('../src/content/pages/Components/Modals'))
  );
  const Accordions = Loader(
    lazy(() => import('../src/content/pages/Components/Accordions'))
  );
  const Tabs = Loader(lazy(() => import('../src/content/pages/Components/Tabs')));
  const Badges = Loader(
    lazy(() => import('../src/content/pages/Components/Badges'))
  );
  const Tooltips = Loader(
    lazy(() => import('../src/content/pages/Components/Tooltips'))
  );
  const Avatars = Loader(
    lazy(() => import('../src/content/pages/Components/Avatars'))
  );
  const Cards = Loader(lazy(() => import('../src/content/pages/Components/Cards')));
  const Forms = Loader(lazy(() => import('../src/content/pages/Components/Forms')));

const routes: RouteObject[] = [
    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: <SignInForm/>
        },
        {
          path: 'signUp',
          element: <SignUpForm/>
        },
        {
          path: 'status',
          children: [
            {
              path: '',
              element: <Navigate to="404" replace />
            },
            // {
            //   path: '404',
            //   element: <Status404 />
            // },
            // {
            //   path: '500',
            //   element: <Status500 />
            // },
            // {
            //   path: 'maintenance',
            //   element: <StatusMaintenance />
            // },
            // {
            //   path: 'coming-soon',
            //   element: <StatusComingSoon />
            // }
          ]
        },
        // {
        //   path: '*',
        //   element: <Status404 />
        // }
      ]
    },
    {
      path: 'dashboards',
      element: <SidebarLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="crypto" replace />
        },
        // {
        //   path: 'crypto',
        //   element: <Crypto />
        // },
        // {
        //   path: 'messenger',
        //   element: <Messenger />
        // }
      ]
    },
    {
      path: 'management',
      element: <SidebarLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="transactions" replace />
        },
        // {
        //   path: 'transactions',
        //   element: <Transactions />
        // },
        {
          path: 'profile',
          children: [
            {
              path: '',
              element: <Navigate to="details" replace />
            },
            // {
            //   path: 'details',
            //   element: <UserProfile />
            // },
            // {
            //   path: 'settings',
            //   element: <UserSettings />
            // }
          ]
        }
      ]
    },
    {
      path: '/components',
      element: <SidebarLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="buttons" replace />
        },
        {
          path: 'buttons',
          element: <Buttons />
        },
        {
          path: 'modals',
          element: <Modals />
        },
        {
          path: 'accordions',
          element: <Accordions />
        },
        {
          path: 'tabs',
          element: <Tabs />
        },
        {
          path: 'badges',
          element: <Badges />
        },
        {
          path: 'tooltips',
          element: <Tooltips />
        },
        {
          path: 'avatars',
          element: <Avatars />
        },
        {
          path: 'cards',
          element: <Cards />
        },
        {
          path: 'forms',
          element: <Forms />
        }
      ]
    }
  ];
  
  export default routes;
  