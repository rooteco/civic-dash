export function unpackRoutes(route: string): string{

  const strArray: string[] = route.split("=");
  const unpackedStr: string = strArray.pop();
  return unpackedStr
}
