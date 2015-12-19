const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');
gl.clearColor(0.8, 0.8, 0.8, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.finish();

const vertices = [0, 0, 0, 0.8, 0.8, 0, -0.8, 0.8, 0];
const bufVerties = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufVerties);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const color = [0.3, 0.5, 0, 1, 0, 0.6, 0.3, 1, 0.7, 0.9, 1, 1];
const bufColor = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufColor);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

const vs = '\
attribute vec3 position;\
attribute vec4 color;\
varying vec4 color_v;\
void main(void) {\
  gl_Position = vec4(position, 1);\
  color_v = color;\
}\
';

const fs = '\
precision mediump float;\
varying vec4 color_v;\
void main(void) {\
  float g = (color_v.x + color_v.y + color_v.z) / 3.;\
  gl_FragColor = vec4(g, g, g, 1);\
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

gl.useProgram(p);

const nPos = gl.getAttribLocation(p, 'position');
gl.bindBuffer(gl.ARRAY_BUFFER, bufVerties);
gl.enableVertexAttribArray(nPos);
gl.vertexAttribPointer(nPos, 3, gl.FLOAT, false, 0, 0);

const nColor = gl.getAttribLocation(p, 'color');
gl.bindBuffer(gl.ARRAY_BUFFER, bufColor);
gl.enableVertexAttribArray(nColor);
gl.vertexAttribPointer(nColor, 4, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, 3);
gl.finish();
