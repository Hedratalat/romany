import "./index.css";
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const DashBoardLayout = lazy(
  () => import("./components/DashboardLayout/DashboardLayout"),
);
const AddProjects = lazy(() => import("./pages/AddProjects"));
const ManageProjects = lazy(() => import("./pages/ManageProjects"));
const MessageDash = lazy(() => import("./pages/MessageDash"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                <DashBoardLayout />
                // </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="addProjects" replace />} />
              <Route path="addProjects" element={<AddProjects />} />
              <Route path="manageProjects" element={<ManageProjects />} />
              <Route path="messages" element={<MessageDash />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
