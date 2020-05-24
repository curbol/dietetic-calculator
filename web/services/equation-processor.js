import Calculators from '@/enums/calculators.ts'
import Inputs from '@/enums/inputs.ts'
import {
  bodyMassIndex,
  idealBodyWeight,
  adjustedBodyWeight,
  mifflinStJeor,
} from '@/equations'

export function equationProcessor({ units = [], inputs = [], selects = [] }) {
  return (calculator) => {
    const equation = equationMap[calculator.key]
    return !equation
      ? undefined
      : equation({ units, inputs, selects, calculator })
  }
}

const equationMap = {
  [Calculators.Body_Mass_Index]: processEquation(bodyMassIndex, {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'm',
  }),
  [Calculators.Ideal_Body_Weight]: processEquation(idealBodyWeight, {
    [Inputs.Height]: 'in',
  }),
  [Calculators.Adjusted_Body_Weight]: processEquation(adjustedBodyWeight, {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'in',
  }),
  [Calculators.Mifflin_St_Jeor]: processEquation(mifflinStJeor, {
    [Inputs.Weight]: 'kg',
    [Inputs.Height]: 'cm',
    [Inputs.Age]: 'y',
  }),
}

function processEquation(equation = () => 0, targetUnits = {}) {
  return ({ units = [], inputs = [], selects = [], calculator = {} }) => {
    const result = equation({
      ...getConvertedInputs(units, inputs, targetUnits),
      ...getSelectData(selects),
    })

    const canConvertResult = units
      .map((x) => x.symbol)
      .includes(calculator.defaultOutputUnit)
    return canConvertResult
      ? convert({
          units,
          value: result,
          fromUnit: calculator.defaultOutputUnit,
          toUnit: calculator.selectedOutputUnit,
        })
      : result
  }
}

function getConvertedInputs(units = [], inputs = [], targetUnits = {}) {
  return Object.assign(
    ...Object.entries(targetUnits).map(([name, toUnit]) => {
      const input = inputs.find((x) => x.name === name)
      const value = convert({
        units,
        value: input.value,
        fromUnit: input.selectedUnit,
        toUnit,
      })
      return { [`${name.toLowerCase()}_${toUnit}`]: value }
    })
  )
}

export function convert({ units = [], value = 0, fromUnit = '', toUnit = '' }) {
  const unitFactor = (unit) =>
    (units.find((x) => x.symbol === unit) || {}).factor
  const fromFactor = unitFactor(fromUnit)
  const toFactor = unitFactor(toUnit)
  if (!toFactor) return undefined
  return (value / toFactor) * fromFactor
}

function getSelectData(selects = []) {
  return selects.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.name.toLowerCase()]: cur.value,
    }),
    {}
  )
}
