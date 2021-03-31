const kdigoCreatinine = (baseCreat, currentCreat) => {
  if (currentCreat >= 4) {
    return 3
  }
  if (baseCreat && currentCreat) {
    const creatRatio = currentCreat / baseCreat
    if (creatRatio >= 3) return 3
    if (creatRatio >= 2) return 2
    if (creatRatio >= 1.5) return 1
    if (currentCreat - baseCreat >= 0.3) return 1
  }
  return undefined
}

const kdigoDiuresis = (diuresis, interval, weight) => {
  if (diuresis === 0 && interval >= 12) {
    return 3
  }

  if (diuresis !== undefined && interval >= 6 && weight) {
    const diuresisRate = diuresis / interval / weight
    if (diuresisRate < 0.3 && interval >= 24) {
      return 3
    }
    if (diuresisRate < 0.5) {
      if (interval < 12) {
        return 1
      }
      return 2
    }
  }
  return undefined
}

export const kdigo = ({
  baseCreat,
  currentCreat,
  inDialysis,
  interval,
  diuresis,
  weight,
}) => {
  // Stage 1
  // Serum creatinine 1.5–1.9 times baseline or ≥0.3 mg/dl (≥26.5 mmol/l) increase or Urine output <0.5 ml/kg/h for 6–12 hours
  // Stage 2
  // Serum creatinine 2.0–2.9 times baseline or <0.5 ml/kg/h for ≥12 hours
  // Stage 3
  // Serum creatinine 3.0 times baseline or Increase in serum creatinine to ≥4.0 mg/dl (≥353.6 mmol/l) or Initiation of renal replacement therapy or in patients <18 years, decrease in eGFR to <35 ml/min per 1.73 m² or Urine output <0.3 ml/kg/h for ≥24 hours or anuria for ≥12 hours

  if (inDialysis) {
    return 3
  }

  const creatinineResult = kdigoCreatinine(baseCreat, currentCreat)
  const diuresisResult = kdigoDiuresis(diuresis, interval, weight)

  if (creatinineResult) {
    return diuresisResult
      ? Math.max(creatinineResult, diuresisResult)
      : creatinineResult
  }

  return diuresisResult
}
