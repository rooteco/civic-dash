export function deslugify(slug: string) : string {
  const str = slug.replace("-", " ")
   .split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
   return str
}
