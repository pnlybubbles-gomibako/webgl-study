const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');
gl.clearColor(1, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.finish();

const vertices = [0, 0, 0, 0.8, 0.8, 0, -0.8, 0.8, 0];
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const vs = '\
attribute vec3 position;\
void main(void) {\
  gl_Position = vec4(position, 1);\
}\
';

const fs = '\
void main(void) {\
  gl_FragColor = vec4(1, 0, 0, 1);\
}\
';

const vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vShader, vs);
gl.compileShader(vShader);

const fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fShader, fs);
gl.compileShader(fShader);

if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
  console.error('getShaderInfoLog v', gl.getShaderInfoLog(vShader));
}
if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
  console.error('getShaderInfoLog f', gl.getShaderInfoLog(fShader));
}

const p = gl.createProgram();
gl.attachShader(p, vShader);
gl.attachShader(p, fShader);
gl.linkProgram(p);

if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
  console.error('getProgramInfoLog p', gl.getProgramInfoLog(p));
}
