export default function getError(errors: any, key: string): null | string {
  try {
    return errors[key][0]
  } catch (error) {
    return null
  }
}
