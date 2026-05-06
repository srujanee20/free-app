import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import QuotePage from "./pages/QuotePage.jsx";
import InkWell from "./pages/InkWell.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/quote",
                element: <QuotePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/ink-well",
                element: <InkWell />
            }
        ],
    },
]);

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default App;