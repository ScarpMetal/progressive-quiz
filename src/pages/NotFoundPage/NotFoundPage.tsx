import PageContent from "components/PageContent/PageContent";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
  return (
    <PageContent className="not-found-page">
      <div>
        <h2>Uh oh!</h2>
        <h1>That page doesn't seem to exist.</h1>
      </div>
      <a href="/" className="return-home-link">
        Return Home
      </a>
    </PageContent>
  );
}
