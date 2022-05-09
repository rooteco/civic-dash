export function deslugify(slug: string) : string {
  const str = slug.replace("-", " ")
   .split(' ')
   .filter(word => word.trim().length > 0) // captures error when you have trailing/leading dashes
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
   return str
}
