import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { NuevaConsultaPage } from "./pages/NuevaConsultaPage";
import { ResultadoPage } from "./pages/ResultadoPage";
import { DiarioPage } from "./pages/DiarioPage";
import { ReferenciaPage } from "./pages/ReferenciaPage";
import { ReferenciaDetailPage } from "./pages/ReferenciaDetailPage";

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/nueva-consulta", element: <NuevaConsultaPage /> },
      { path: "/resultado/:id", element: <ResultadoPage /> },
      { path: "/diario", element: <DiarioPage /> },
      { path: "/referencia", element: <ReferenciaPage /> },
      { path: "/referencia/:numero", element: <ReferenciaDetailPage /> },
    ],
  },
]);
