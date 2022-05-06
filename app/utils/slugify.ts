export function slugify(input: string): string {
  const str = input.replace(" ", "-")
  .toLowerCase()

  return str
}
