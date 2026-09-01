/**
 * DASHRIDES - INTERACTIVE PRICING CALCULATOR
 * Dynamically computes estimated rates based on model, duration slider, insurance, and extras.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPricingCalculator();
});

function initPricingCalculator() {
  const modelSelect = document.getElementById('calc-model');
  const durationRange = document.getElementById('calc-duration');
  const durationDisplay = document.getElementById('duration-val-display');
  const insuranceCheckbox = document.getElementById('calc-insurance');
  const helmetCheckbox = document.getElementById('calc-helmet');
  const rateTypeRadios = document.querySelectorAll('input[name="rate-type"]');

  // Display outputs
  const baseRateEl = document.getElementById('calc-base-rate');
  const durationCostEl = document.getElementById('calc-duration-cost');
  const addOnsCostEl = document.getElementById('calc-addons-cost');
  const depositCostEl = document.getElementById('calc-deposit-cost');
  const totalCostEl = document.getElementById('calc-total-cost');

  if (!modelSelect || !durationRange || !totalCostEl) return;

  const modelRates = {
    'phantom-pro': { hourly: 12, daily: 45, deposit: 100 },
    'cyber-scoot-x': { hourly: 15, daily: 55, deposit: 120 },
    'urban-glide-lite': { hourly: 9, daily: 35, deposit: 80 },
    'moped-classic-50': { hourly: 18, daily: 65, deposit: 150 },
    'cruiser-gt-ev': { hourly: 22, daily: 85, deposit: 200 }
  };

  function calculateTotal() {
    const selectedModel = modelSelect.value;
    const modelData = modelRates[selectedModel] || modelRates['phantom-pro'];
    const duration = parseInt(durationRange.value, 10);
    
    // Check if hourly or daily
    let isDaily = false;
    rateTypeRadios.forEach(r => {
      if (r.checked && r.value === 'daily') isDaily = true;
    });

    if (durationDisplay) {
      durationDisplay.textContent = `${duration} ${isDaily ? (duration === 1 ? 'Day' : 'Days') : (duration === 1 ? 'Hour' : 'Hours')}`;
    }

    const rate = isDaily ? modelData.daily : modelData.hourly;
    const rentalCost = rate * duration;
    
    let addonsCost = 0;
    if (insuranceCheckbox && insuranceCheckbox.checked) {
      addonsCost += isDaily ? (duration * 8) : (duration * 2);
    }
    if (helmetCheckbox && helmetCheckbox.checked) {
      addonsCost += isDaily ? 5 : 3;
    }

    const deposit = modelData.deposit;
    const grandTotal = rentalCost + addonsCost + deposit;

    if (baseRateEl) baseRateEl.textContent = `$${rate}/${isDaily ? 'day' : 'hr'}`;
    if (durationCostEl) durationCostEl.textContent = `$${rentalCost.toFixed(2)}`;
    if (addOnsCostEl) addOnsCostEl.textContent = `$${addonsCost.toFixed(2)}`;
    if (depositCostEl) depositCostEl.textContent = `$${deposit.toFixed(2)}`;
    if (totalCostEl) totalCostEl.textContent = `$${grandTotal.toFixed(2)}`;
  }

  modelSelect.addEventListener('change', calculateTotal);
  durationRange.addEventListener('input', calculateTotal);
  if (insuranceCheckbox) insuranceCheckbox.addEventListener('change', calculateTotal);
  if (helmetCheckbox) helmetCheckbox.addEventListener('change', calculateTotal);
  rateTypeRadios.forEach(r => r.addEventListener('change', calculateTotal));

  calculateTotal();
}
