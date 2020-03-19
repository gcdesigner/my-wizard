/**
 * My Wizard jQuery
 */

setTimeout(function() {
  const wizard = document.querySelector('.my-wizard');
  const wizardHeader = wizard.querySelector('.my-wizard-header');
  const wizardBody = wizard.querySelector('.my-wizard-body');
  const steps = wizardBody.querySelectorAll('.my-wizard-body > section');
  const wizardFooter = wizard.querySelector('.my-wizard-footer');
  var currentStep = 0;

  const wizardWidth = wizard.offsetWidth;
  const amountStep = steps.length;
  const calcWrapper = parseInt(amountStep * wizardWidth);

  wizardBody.style.width = `${calcWrapper}px`;
  wizardBody.style.transform = 'translate(0)';
  steps[currentStep].classList.add('active');

  function calcAndSetTransformDirectionNext() {
    const currentTranslate = parseInt(
      $(wizardBody)
        .css('transform')
        .split(',')[4]
    );
    const calc = parseInt('-' + (Math.abs(currentTranslate) + wizardWidth));
    wizardBody.style.transform = `translateX(${calc}px)`;
  }

  function calcAndSetTransformDirectionPrev() {
    const currentTranslate = parseInt(
      $(wizardBody)
        .css('transform')
        .split(',')[4]
    );
    const calc = currentTranslate + wizardWidth;
    wizardBody.style.transform = `translateX(${calc}px)`;
  }

  function disableDoubleClick(e) {
    $(e.target).prop('disabled', true);
    setTimeout(function() {
      $(e.target).prop('disabled', false);
    }, 500);
  }

  function next(element) {
    const nextStep = currentStep + 1;
    setStep(nextStep);
    disableDoubleClick(element);
  }

  function prev(element) {
    const prevStep = currentStep - 1;
    setStep(prevStep);
    disableDoubleClick(element);
  }

  function setStep(step) {
    if (step < 0 || step > amountStep) return;
    if (step === currentStep) return;

    const isValid = validate(currentStep);

    if (isValid == false) return;

    activate(step);
    deactivate(currentStep);

    if (step > currentStep) {
      calcAndSetTransformDirectionNext();
    } else {
      calcAndSetTransformDirectionPrev();
    }

    currentStep = step;
  }

  function activate(step) {
    steps[step].classList.add('active');
  }

  function deactivate(step) {
    setTimeout(function() {
      steps[step].classList.remove('active');
    }, 350);
  }

  function validate(step) {
    const requiredInputs = steps[step].querySelectorAll('[required]');
    let hasValidationError = false;

    if (requiredInputs.length) {
      requiredInputs.forEach(input => {
        if (!input.value) {
          input.classList.add('input-validation-error');
          input.closest('.campo').classList.add('validation-error');

          hasValidationError = true;

          return;
        } else {
          input.classList.remove('input-validation-error');
          input.closest('.campo').classList.remove('validation-error');
        }
      });
    }

    return !hasValidationError;
  }

  $('.btn-next').click(function(e) {
    next(e);
  });

  $('.btn-prev').click(function(e) {
    prev(e);
  });

  $('.steps li').each(function(index) {
    $(this).click(function(e) {
      e.preventDefault();
      setStep(index);
    });
  });
}, 800);
