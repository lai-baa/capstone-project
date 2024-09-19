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
import Sidebar from './components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { NavProvider } from './context/navContext';
import FilteredNotes from './components/FilteredNotes/FilteredNotes';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {sessionUser && <Sidebar user={sessionUser} />}
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
      },
      {
        path: '/search-results',
        element: <FilteredNotes />,
      }
    ]
  }
]);

function App() {
  return (
    <NavProvider>
      <RouterProvider router={router} />
    </NavProvider>
  )
}

export default App;