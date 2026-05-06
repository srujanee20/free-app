import HomePage from "./pages/HomePage.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import InkWell from "./pages/InkWell.jsx";
import PersonaDeck from "./pages/PersonaDeck.jsx";
import CraveCatalog from "./pages/CraveCatalog.jsx";
import WhiskerView from "./pages/WhiskerView.jsx";
import JestVault from "./pages/JestVault.jsx";
import BazaarBoard from "./pages/BazaarBoard.jsx";
import VidVoyage from "./pages/VidVoyage.jsx";
import GateKeeper from "./pages/GateKeeper.jsx";
import InAppLayout from "./layouts/InAppLayout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([
    {
        path: "/",
        element: <InAppLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/persona-deck",
                element: <PersonaDeck />
            },
            {
                path: "/crave-catalog",
                element: <CraveCatalog />
            },
            {
                path: "/whisker-view",
                element: <WhiskerView />
            },
            {
                path: "/jest-vault",
                element: <JestVault />
            },
            {
                path: "/ink-well",
                element: <InkWell />
            },
            {
                path: "/bazaar-board",
                element: <BazaarBoard />
            },
            {
                path: "/vid-voyage",
                element: <VidVoyage />
            },
            {
                path: "/gate-keeper",
                element: <GateKeeper />
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