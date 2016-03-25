/**
 * Distance between two points
 *
 * @param  {number} x1 X coord of the first point
 * @param  {number} y1 Y coord of the first point
 * @param  {number} x2 X coord of the second point
 * @param  {number} y2 Y coord of the second point
 * @return {number}    Computed distance
 */
export default function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}