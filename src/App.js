import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/navbar/navbar";
import Home from "./Components/home/home";
import Habit from "./Components/habit/habit";
import Week from "./Components/week/week";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add",
          element: <Habit />,
        },
        {
          path: "/week/:id",
          element: <Week />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
