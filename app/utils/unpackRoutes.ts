export function unpackRoutes(route: string): string{

  const strArray = route.split("=")
  const unpackedStr = strArray.pop()
  return unpackedStr
}
