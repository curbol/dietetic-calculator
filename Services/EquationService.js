/* eslint-disable camelcase */
export default {
  bodyMassIndex({ weight_kg, height_m }) {
    if (weight_kg <= 0 || height_m <= 0) {
      return null
    }

    return weight_kg / (height_m * height_m)
  }
}
