import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage';
import NotebooksList from './components/NotebooksList';
import NotebookDetails from './components/NotebookDetails/NotebookDetails';
import NoteDetails from './components/NoteDetails/NoteDetails';
import TasksList from './components/TasksList/TasksList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import Favorites from './components/Favorites/Favorites';
import Reminders from './components/Reminders/Reminders';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/notebooks',
        element: <NotebooksList />
      },
      {
        path: '/notebooks/:id',
        element: <NotebookDetails />
      },
      {
        path: '/notes/:id',
        element: <NoteDetails />
      },
      {
        path: '/tasks',
        element: <TasksList />
      },
      {
        path: '/tasks/:id',
        element: <TaskDetails />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/reminders',
        element: <Reminders />
      },
      {
        path: '/tasks/completed',
        element: <CompletedTasks />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;