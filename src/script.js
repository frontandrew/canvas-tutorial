const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

console.log('CANVAS: ', canvasContext);

canvas.width = 400;
canvas.height = 400;

canvasContext.fillStyle = 'white';

canvasContext.fillRect(10, 10, 100, 16);
canvasContext.fillRect(10, 30, 16, 150);
