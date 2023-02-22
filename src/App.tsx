import PageContent from "components/PageContent/PageContent";
import Quiz from "components/Quiz";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Quiz />
      <PageContent>
        <div className="acknowledgements">
          <p>Copyright © {new Date().getFullYear()}</p>
        </div>
      </PageContent>
    </div>
  );
}

export default App;
