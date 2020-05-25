import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

main().then(() => prisma.disconnect())

async function main() {
  let count = 1
  console.log(count++, 'UnitCategory: Mass')
  const massUnitCategory = await prisma.unitCategory.create({
    data: {
      name: 'Mass',
      units: {
        create: [
          {
            name: 'Milligrams',
            symbol: 'mg',
            factor: 0.001,
          },
          {
            name: 'Grams',
            symbol: 'g',
            factor: 1,
          },
          {
            name: 'Kilograms',
            symbol: 'kg',
            factor: 1000,
          },
          {
            name: 'Ounces',
            symbol: 'oz',
            factor: 28.3495,
          },
          {
            name: 'Pounds',
            symbol: 'lb',
            factor: 453.592,
          },
          {
            name: 'Stone',
            symbol: 'st',
            factor: 6350.29,
          },
        ],
      },
    },
  })
  console.log(count++, count++, 'UnitCategory: Length')
  const lengthUnitCategory = await prisma.unitCategory.create({
    data: {
      name: 'Length',
      units: {
        create: [
          {
            name: 'Millimeters',
            symbol: 'mm',
            factor: 0.001,
          },
          {
            name: 'Centimeters',
            symbol: 'cm',
            factor: 0.01,
          },
          {
            name: 'Meters',
            symbol: 'm',
            factor: 1,
          },
          {
            name: 'Inches',
            symbol: 'in',
            factor: 0.0254,
          },
          {
            name: 'Feet',
            symbol: 'ft',
            factor: 0.3048,
          },
          {
            name: 'Yards',
            symbol: 'yd',
            factor: 0.9144,
          },
        ],
      },
    },
  })
  console.log(count++, UnitCategory: Time')
  const timeUnitCategory = await prisma.unitCategory.create({
    data: {
      name: 'Time',
      units: {
        create: [
          {
            name: 'Milliseconds',
            symbol: 'ms',
            factor: 0.001,
          },
          {
            name: 'Seconds',
            symbol: 's',
            factor: 1,
          },
          {
            name: 'Minutes',
            symbol: 'min',
            factor: 60,
          },
          {
            name: 'Hours',
            symbol: 'hr',
            factor: 3600,
          },
          {
            name: 'Days',
            symbol: 'd',
            factor: 86400,
          },
          {
            name: 'Weeks',
            symbol: 'w',
            factor: 604800,
          },
          {
            name: 'Months',
            symbol: 'mo',
            factor: 2628000,
          },
          {
            name: 'Years',
            symbol: 'y',
            factor: 31535965.44,
          },
        ],
      },
    },
  })
  console.log(count++, 'UnitCategory: Energy')
  const energyUnitCategory = await prisma.unitCategory.create({
    data: {
      name: 'Energy',
      units: {
        create: [
          {
            name: 'Calories',
            symbol: 'kcal',
            factor: 1,
          },
        ],
      },
    },
  })
  console.log(count++, 'UnitCategory: Volume')
  const volumeUnitCategory = await prisma.unitCategory.create({
    data: {
      name: 'Volume',
      units: {
        create: [
          {
            name: 'Gallons',
            symbol: 'gal',
            factor: 3.78541,
          },
          {
            name: 'Quarts',
            symbol: 'qt',
            factor: 0.946353,
          },
          {
            name: 'Pints',
            symbol: 'pt',
            factor: 0.473176,
          },
          {
            name: 'Cups',
            symbol: 'cup',
            factor: 0.24,
          },
          {
            name: 'Fluid Ounces',
            symbol: 'fl oz',
            factor: 0.0295735,
          },
          {
            name: 'Tablespoons',
            symbol: 'Tbs',
            factor: 0.0147868,
          },
          {
            name: 'Teaspoons',
            symbol: 'tsp',
            factor: 0.00492892,
          },
          {
            name: 'Milliliters',
            symbol: 'mL',
            factor: 0.001,
          },
          {
            name: 'Liters',
            symbol: 'L',
            factor: 1,
          },
        ],
      },
    },
  })

  console.log(count++, 'Select: Gender')
  const genderSelect = await prisma.select.create({
    data: {
      name: 'Gender',
      options: {
        create: [{ text: 'Male' }, { text: 'Female' }],
      },
      icon: 'mdi-human-male-female',
    },
  })
  console.log(count++, 'Input: Weight')
  const weightInput = await prisma.input.create({
    data: {
      name: 'Weight',
      unitCategory: { connect: { name: 'Mass' } },
      defaultUnit: 'kg',
      icon: 'mdi-weight',
    },
  })
  console.log(count++, 'Input: Height')
  const heightInput = await prisma.input.create({
    data: {
      name: 'Height',
      unitCategory: { connect: { name: 'Length' } },
      defaultUnit: 'cm',
      icon: 'mdi-human-male-height',
    },
  })
  console.log(count++, 'Age Input')
  const ageInput = await prisma.input.create({
    data: {
      name: 'Age',
      unitCategory: { connect: { name: 'Time' } },
      defaultUnit: 'y',
      icon: 'mdi-timer-sand',
    },
  })

  console.log(count++, 'CalculatorCategory: Anthropometric')
  const anthropometricCalculatorCategory = await prisma.calculatorCategory.create(
    {
      data: {
        name: 'Anthropometric',
        icon: 'mdi-human-handsdown',
        calculators: {
          create: [
            {
              key: 'bmi',
              name: 'Body Mass Index (BMI)',
              description: 'A measure of body fat in adults',
              inputs: { connect: [{ name: 'Height' }, { name: 'Weight' }] },
              selects: { connect: [] },
              defaultOutputUnit: 'kg/m²',
            },
            {
              key: 'ibw',
              name: 'Ideal Body Weight (IBW)',
              description: 'Estimated ideal weight for adults',
              inputs: { connect: [{ name: 'Height' }] },
              selects: { connect: [{ name: 'Gender' }] },
              defaultOutputUnit: 'kg',
            },
            {
              key: 'abw',
              name: 'Adjusted Body Weight (ABW)',
              description: 'Adjusted ideal weight for the obese',
              inputs: { connect: [{ name: 'Height' }, { name: 'Weight' }] },
              selects: { connect: [{ name: 'Gender' }] },
              defaultOutputUnit: 'kg',
            },
          ],
        },
      },
    },
  )
  console.log(count++, 'CalculatorCategory: Nutritional Needs')
  const nutritionalNeedsCalculatorCategory = await prisma.calculatorCategory.create(
    {
      data: {
        name: 'Nutritional Needs',
        icon: 'mdi-silverware-fork-knife',
        calculators: {
          create: [
            {
              key: 'mifflin',
              name: 'Mifflin St. Jeor',
              description: 'Daily calorie needs for adults',
              inputs: {
                connect: [
                  { name: 'Height' },
                  { name: 'Weight' },
                  { name: 'Age' },
                ],
              },
              selects: { connect: [{ name: 'Gender' }] },
              defaultOutputUnit: 'kcal',
            },
          ],
        },
      },
    },
  )
}
