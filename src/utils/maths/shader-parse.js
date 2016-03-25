/**
 * Replace THREE chunk
 *
 * @param  {string} a Match
 * @param  {string} b First match
 * @return {string}   Parsed GLSL
 */
function replaceThreeChunkFn(a, b) {
  return THREE.ShaderChunk[b] + '\n';
}

/**
 * Parse shader and replace THREE chunk
 * 
 * @param  {string} glsl GLSL
 * @return {string}      Parsed GLSL
 */
export default function shaderParse(glsl) {
  return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
}