import { ReactNode, useCallback, useEffect, useRef } from "react";
import { getIdString } from "utils";
import "./Step.scss";
import { StepAction } from "./types";
import { getFirstStep, getLastStep, getNextStep, getPrevStep } from "./utils";

export default function Step({
  scrollOptions = { behavior: "smooth", block: "center" },
  children,
}: {
  scrollOptions?: ScrollIntoViewOptions;
  children:
    | ((args: {
        goToStart: StepAction;
        goToEnd: StepAction;
        goToNext: StepAction;
        goToPrev: StepAction;
      }) => ReactNode)
    | ReactNode;
}) {
  const idRef = useRef(getIdString(Math.random()));
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const goTo = useCallback(
    (goToEl?: Element) => {
      timeoutRef.current = setTimeout(() => {
        if (goToEl) {
          goToEl?.scrollIntoView(scrollOptions);
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }
      }, 10);
    },
    [scrollOptions]
  );

  const goToStart = useCallback(() => {
    const firstEl = getFirstStep();
    goTo(firstEl);
  }, [goTo]);

  const goToEnd = useCallback(() => {
    const lastEl = getLastStep();
    goTo(lastEl);
  }, [goTo]);

  const goToNext = useCallback(() => {
    const nextEl = getNextStep(idRef.current);
    goTo(nextEl);
  }, [goTo]);

  const goToPrev = useCallback(() => {
    const prevEl = getPrevStep(idRef.current);
    goTo(prevEl);
  }, [goTo]);

  return (
    <div className="step" data-is-step="true" id={idRef.current}>
      {typeof children === "function"
        ? children({ goToStart, goToEnd, goToNext, goToPrev })
        : children}
    </div>
  );
}
