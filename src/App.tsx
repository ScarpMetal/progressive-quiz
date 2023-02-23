import PageContent from "components/PageContent/PageContent";
import { LoginPage, NotFoundPage, QuizMakerPage, QuizPage } from "pages";
import { Route } from "react-router";
import { Outlet, Routes } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<QuizPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<QuizMakerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function AppLayout() {
  return (
    <>
      <Outlet />
      <PageContent>
        <div className="acknowledgements">
          Copyright © {new Date().getFullYear()}
        </div>
      </PageContent>
    </>
  );
}

export default App;
