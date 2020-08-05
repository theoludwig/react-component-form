/*! fromentries. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
export function fromEntries<T = any> (
  iterable: Iterable<readonly [PropertyKey, T]>
) {
  return [...iterable].reduce((object, [key, value]) => {
    object[key] = value
    return object
  }, {})
}
