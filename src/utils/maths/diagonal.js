/**
 * Diagonal of a rectangle
 * 
 * @param  {number} w Width
 * @param  {number} h Height
 * @return {number}   Diagonal length
 */
export default function diagonal(w, h) {
  return Math.sqrt(w * w + h * h);
}