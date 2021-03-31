export const gfrStage = ({ tfg }) => {
  if (tfg === undefined) {
    return undefined
  }

  if (tfg < 15) {
    return '5'
  }

  if (tfg < 30) {
    return '4'
  }

  if (tfg < 45) {
    return '3b'
  }

  if (tfg < 60) {
    return '3a'
  }

  if (tfg < 90) {
    return '2'
  }

  return '1'
}
