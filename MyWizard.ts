class MyWizard {
  public widthWizard: number;
  public stepsAmount: number;
  private calcWrapper: number;
  public steps: Array<WizardStep>;
  private currentStep: number;

  private body: Element;
  private header: Element;
  private footer: Element;

  constructor(element: Element) {
    this.widthWizard = element.clientWidth;
    this.stepsAmount = element.querySelectorAll(
      '.my-wizard-body > section'
    ).length;
    this.calcWrapper = this.stepsAmount * this.widthWizard;

    this.setWidthAndTransformToWrapperDiv();
    this.setActiveClassToFirstStep();

    this.steps = new Array<WizardStep>();

    const section = element.querySelectorAll('.my-wizard-body > section');
    [].forEach.call(section, step => this.steps.push(new WizardStep(step)));

    this.currentStep = 0;

    this.steps[this.currentStep].activate();
  }

  public next(): void {
    const nextStep: number = this.currentStep + 1;
    this.setStep(nextStep);
  }

  public prev(): void {
    const prevStep: number = this.currentStep - 1;
    this.setStep(prevStep);
  }

  public setStep(step: number): void {
    if (step < 0 || step > this.stepsAmount) return;

    if (step === this.currentStep) return;

    const isValid = this.steps[this.currentStep].validate();

    if (isValid === false) return;

    this.steps[step].activate();
    this.steps[this.currentStep].deactivate();
    this.currentStep = step;
  }

  private calcTransformDirection(): number {
    return 0;
  }

  private setTransformDirection(): void {}

  private setActiveClassToNextStep(): void {}

  private setWidthAndTransformToWrapperDiv(): void {}

  private setActiveClassToFirstStep(): void {}
}

class WizardStep {
  private step: Element;

  constructor(step: Element) {
    this.step = step;
  }

  public activate(): void {
    this.step.classList.add('active');
  }

  public deactivate(): void {
    this.step.classList.remove('active');
  }

  public validate(): boolean {
    return true;
  }
}
