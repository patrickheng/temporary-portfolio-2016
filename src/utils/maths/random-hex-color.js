/**
 * Generate a random hexadecimal color
 *
 * @return {string} Hexadecimal color
 */
export default function randomHexColor() {
  return '0x' + Math.floor( Math.random() * 16777215 ).toString( 16 );
}