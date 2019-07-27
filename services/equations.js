import _ from 'lodash'
import Inputs from '@/enums/inputs.js'

/* eslint-disable camelcase */
export default {
  bmi: bodyMassIndexResult
}

function twoDecimals(value) {
  return value ? value.toFixed(2) : value
}

function unitFactor(unitData = [], unit) {
  return _.get(unitData.find(x => x.symbol === unit), 'factor')
}

function convert(unitData = [], value = 0, fromUnit = '', toUnit = '') {
  const multiplyFactor = unitFactor(unitData, fromUnit)
  console.log('multiplyFactor:', multiplyFactor)
  const divideFactor = unitFactor(unitData, toUnit)
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

function bodyMassIndexResult(unitData = [], inputs = []) {
  const target = {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'm'
  }
  const converted = getConvertedInputs(unitData, inputs, target)
  const result = bodyMassIndex(converted)
  return twoDecimals(result)
}

function bodyMassIndex({ weight_kg, height_m }) {
  if (!weight_kg || !height_m || weight_kg <= 0 || height_m <= 0)
    return undefined

  return weight_kg / (height_m * height_m)
}
