/* eslint-disable camelcase */
export function bodyMassIndex({ weight_kg, height_m }) {
  if (!weight_kg || !height_m || weight_kg <= 0 || height_m <= 0)
    return undefined

  return weight_kg / (height_m * height_m)
}

export function idealBodyWeight({ gender, height_in }) {
  console.log({ gender, height_in })

  if (!gender || !height_in || height_in <= 0) return undefined

  const _gender = gender.toLowerCase()
  const deltaFiveFeet = height_in - 60
  return _gender === 'male'
    ? 48 + 2.7 * deltaFiveFeet
    : _gender === 'female'
    ? 45.5 + 2.2 * deltaFiveFeet
    : undefined
}

export function adjustedBodyWeight({ gender, weight_kg, height_in }) {
  const ibw = idealBodyWeight({ gender, height_in })
  if (!ibw || !weight_kg || weight_kg <= 0) return undefined

  return 0.25 * (weight_kg - ibw) + ibw
}

export function mifflinStJeor({ gender, weight_kg, height_cm, age_y }) {
  if (
    !gender ||
    !weight_kg ||
    weight_kg <= 0 ||
    !height_cm ||
    height_cm <= 0 ||
    !age_y ||
    age_y <= 0
  )
    return undefined

  const _gender = gender.toLowerCase()
  return _gender === 'male'
    ? 10 * weight_kg + 6.25 * height_cm - 5 * age_y + 5
    : _gender === 'female'
    ? 10 * weight_kg + 6.25 * height_cm - 5 * age_y - 161
    : undefined
}
