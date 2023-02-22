import PageContent from "components/PageContent/PageContent";
import Question from "components/Question";
import Results from "components/Results";
import { Step, Steps } from "components/Stepper";
import questions from "data/questions";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Steps>
        <Step>
          {({ goToNext }) => (
            <PageContent>
              <h1>Welcome traveler</h1>
              <button type="button" className="start-button" onClick={goToNext}>
                Start
              </button>
            </PageContent>
          )}
        </Step>
        {questions.map((question, index) => {
          return (
            <Step key={question.id}>
              {({ goToNext }) => (
                <Question
                  question={question}
                  goToNext={goToNext}
                  questions={questions}
                  index={index}
                />
              )}
            </Step>
          );
        })}
        <Step>
          {({ goToStart, goToNext }) => (
            <Results goToStart={goToStart} goToNext={goToNext} />
          )}
        </Step>
      </Steps>
      <PageContent>
        <div className="acknowledgements">
          <p>Copyright © {new Date().getFullYear()}</p>
        </div>
      </PageContent>
    </div>
  );
}

export default App;
