window.addEventListener('load', start);


function start() {
  var red = document.querySelector('#range-red').value;
  var green = document.querySelector('#range-green').value;
  var blue = document.querySelector('#range-blue').value;

  document.querySelector('#text-r').value = red;
  document.querySelector('#text-g').value = green;
  document.querySelector('#text-b').value = blue;

  changeColor(red, green, blue);

  document.getElementById('range-red').addEventListener('input', start);
  document.getElementById('range-green').addEventListener('input', start);
  document.getElementById('range-blue').addEventListener('input', start);
}

function changeColor(red, green, blue) {
  var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
  result.style.backgroundColor = color;
}