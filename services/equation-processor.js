import _ from 'lodash'
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
  selections = []
}) {
  return calc => {
    const equation = equationMap[calc.id]
    return !equation
      ? undefined
      : equation({ unitData, inputs, selections, calc })
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

function processEquation(equation = () => {}, targetUnits = {}) {
  return ({ unitData = [], inputs = [], selections = [], calc = {} }) => {
    const result = equation({
      ...getConvertedInputs(unitData, inputs, targetUnits),
      ...getSelectionData(selections)
    })
    const canConvertResult = unitData
      .map(x => x.symbol)
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
    ...Object.entries(targetUnits).map(([id, toUnit]) => {
      const input = inputs.find(x => x.id === id)
      const value = convert({
        unitData,
        value: input.value,
        fromUnit: input.selectedUnit,
        toUnit
      })
      return { [`${id}_${toUnit}`]: value }
    })
  )
}

function convert({ unitData = [], value = 0, fromUnit = '', toUnit = '' }) {
  const unitFactor = unit =>
    _.get(unitData.find(x => x.symbol === unit), 'factor')
  const fromFactor = unitFactor(fromUnit)
  const toFactor = unitFactor(toUnit)
  if (!toFactor) return undefined
  return (value / toFactor) * fromFactor
}

function getSelectionData(selections = []) {
  return selections.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.value }), {})
}
