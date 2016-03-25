/**
 * Get the type of an object
 *
 * @param  {object} obj Object
 * @return {string}     Type of the object
 */
export default function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}