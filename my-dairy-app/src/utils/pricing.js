export const calculatePrice = (liters, fat, snf, settings) => {
  const baseRate = parseFloat(settings.baseRate) || 40;
  const stdFat = parseFloat(settings.stdFat) || 6.0;
  const pricePerLiter = (baseRate / stdFat) * fat;
  const total = pricePerLiter * liters;
  return {
    pricePerLiter: pricePerLiter.toFixed(2),
    total: total.toFixed(2),
  };
};
