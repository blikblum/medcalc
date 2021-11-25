import { isPositiveNumber } from './utils.js'

export const ckdEpi = ({ creat, isBlack = false, gender, age } = {}) => {
  // eGFR =
  // 141 x min(SCr/κ, 1) ** α x
  // max(SCr /κ, 1) ** -1.209 x
  // 0.993 ** Age x
  // 1.018 [if female] x
  // 1.159 [if Black]

  // Abbreviations / Units
  // eGFR (estimated glomerular filtration rate) = mL/min/1.73 m2
  // SCr (standardized serum creatinine) = mg/dL
  // κ = 0.7 (females) or 0.9 (males)
  // α = -0.329 (females) or -0.411 (males)

  // todo: replace gender by isMale

  if (
    typeof gender !== 'string' ||
    !isPositiveNumber(creat) ||
    !isPositiveNumber(age)
  ) {
    return undefined
  }

  const isMale = gender === 'M'

  const { k, a } = isMale ? { k: 0.9, a: -0.411 } : { k: 0.7, a: -0.329 }
  const creatFactor = creat / k
  let result =
    141 *
    Math.min(creatFactor, 1) ** a *
    Math.max(creatFactor, 1) ** -1.209 *
    0.993 ** age
  if (!isMale) {
    result *= 1.018
  }
  if (isBlack) {
    result *= 1.159
  }
  return Math.round(result * 10) / 10
}
