import _ from 'lodash'
import Inputs from '@/enums/inputs.js'

/* eslint-disable camelcase */
export default {
  abw: adjustedBodyWeight,
  bmi: bodyMassIndexResult
}

function convert(unitData = [], value = 0, fromUnit = '', toUnit = '') {
  const unitFactor = unit =>
    _.get(unitData.find(x => x.symbol === unit), 'factor')
  const multiplyFactor = unitFactor(fromUnit)
  const divideFactor = unitFactor(toUnit)
  if (!divideFactor) return undefined
  return (value / divideFactor) * multiplyFactor
}

function getConvertedInputs(unitData = [], inputs = [], target = {}) {
  return Object.assign(
    ...Object.entries(target).map(([id, toUnit]) => {
      const input = inputs.find(x => x.id === id)
      const value = convert(unitData, input.value, input.selectedUnit, toUnit)
      return { [`${id}_${toUnit}`]: value }
    })
  )
}

function processEquation(
  unitData = [],
  inputs = [],
  target = {},
  equation = () => {}
) {
  const converted = getConvertedInputs(unitData, inputs, target)
  const result = equation(converted)
  // TODO: convert to result unit if needed
  const rounded = result ? result.toFixed(1) : result
  return rounded
}

function bodyMassIndexResult(unitData = [], inputs = []) {
  const target = {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'm'
  }
  return processEquation(unitData, inputs, target, bodyMassIndex)
}

function idealBodyWeight({ gender, height_in }) {
  if (!gender || !height_in || height_in <= 0) {
    return undefined
  }

  const _gender = gender.toLowerCase()
  const deltaFiveFeet = height_in - 60
  return _gender === 'male'
    ? 48 + 2.7 * deltaFiveFeet
    : _gender === 'female'
    ? 45.5 + 2.2 * deltaFiveFeet
    : undefined
}

function adjustedBodyWeight({ gender, weight_kg, height_in }) {
  if (!gender || !weight_kg || !height_in || weight_kg <= 0 || height_in <= 0) {
    return undefined
  }

  const ibw = idealBodyWeight({ gender, height_in })
  return ibw ? 0.25 * (weight_kg - ibw) + ibw : undefined
}

function bodyMassIndex({ weight_kg, height_m }) {
  if (!weight_kg || !height_m || weight_kg <= 0 || height_m <= 0)
    return undefined

  return weight_kg / (height_m * height_m)
}
