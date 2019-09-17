import Calcs from '@/enums/calcs.js'
import Inputs from '@/enums/inputs.js'
import {
  bodyMassIndex,
  idealBodyWeight,
  adjustedBodyWeight,
  mifflinStJeor
} from '@/services/equations.js'

export function equationProcessor({
  unitData = [],
  inputs = [],
  selects = []
}) {
  return (calc) => {
    const equation = equationMap[calc.key]
    return !equation ? undefined : equation({ unitData, inputs, selects, calc })
  }
}

const equationMap = {
  [Calcs.Body_Mass_Index]: processEquation(bodyMassIndex, {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'm'
  }),
  [Calcs.Ideal_Body_Weight]: processEquation(idealBodyWeight, {
    [Inputs.Height]: 'in'
  }),
  [Calcs.Adjusted_Body_Weight]: processEquation(adjustedBodyWeight, {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'in'
  }),
  [Calcs.Mifflin_St_Jeor]: processEquation(mifflinStJeor, {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'cm',
    [Inputs.Age]: 'y'
  })
}

function processEquation(equation = () => 0, targetUnits = {}) {
  return ({ unitData = [], inputs = [], selects = [], calc = {} }) => {
    const result = equation({
      ...getConvertedInputs(unitData, inputs, targetUnits),
      ...getSelectData(selects)
    })

    const canConvertResult = unitData
      .map((x) => x.symbol)
      .includes(calc.defaultUnit)
    return canConvertResult
      ? convert({
          unitData,
          value: result,
          fromUnit: calc.defaultUnit,
          toUnit: calc.selectedUnit
        })
      : result
  }
}

function getConvertedInputs(unitData = [], inputs = [], targetUnits = {}) {
  return Object.assign(
    ...Object.entries(targetUnits).map(([name, toUnit]) => {
      const input = inputs.find((x) => x.name === name)
      const value = convert({
        unitData,
        value: input.value,
        fromUnit: input.selectedUnit,
        toUnit
      })
      return { [`${name.toLowerCase()}_${toUnit}`]: value }
    })
  )
}

export function convert({
  unitData = [],
  value = 0,
  fromUnit = '',
  toUnit = ''
}) {
  const unitFactor = (unit) =>
    (unitData.find((x) => x.symbol === unit) || {}).factor
  const fromFactor = unitFactor(fromUnit)
  const toFactor = unitFactor(toUnit)
  if (!toFactor) return undefined
  return (value / toFactor) * fromFactor
}

function getSelectData(selects = []) {
  return selects.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.name.toLowerCase()]: cur.value
    }),
    {}
  )
}
