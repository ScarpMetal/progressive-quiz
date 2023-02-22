export function getStepEls() {
  return document.querySelectorAll('[data-is-step="true"]');
}

export function getPrevStep(currentStepId: string) {
  const steps = getStepEls();
  let passedCurrentStep = false;
  for (let i = steps.length - 1; i >= 0; i--) {
    const step = steps[i];
    if (!passedCurrentStep && step.id === currentStepId) {
      passedCurrentStep = true;
    } else if (passedCurrentStep) {
      return step;
    }
  }
}

export function getNextStep(currentStepId: string): Element | undefined {
  const steps = getStepEls();
  let passedCurrentStep = false;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (!passedCurrentStep && step.id === currentStepId) {
      passedCurrentStep = true;
    } else if (passedCurrentStep) {
      return step;
    }
  }
}

export function getFirstStep(): Element | undefined {
  const steps = getStepEls();
  if (steps.length > 0) {
    return steps[0];
  }
}

export function getLastStep(): Element | undefined {
  const steps = getStepEls();
  if (steps.length > 0) {
    return steps[steps.length - 1];
  }
}
