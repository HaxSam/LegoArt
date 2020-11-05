const pixelCanvas = document.querySelector('.pixel-canvas');

function makeGrid(x, y) {
  let gridHeight = y;
  let gridWidth = x;
  while (pixelCanvas.firstChild) {
    pixelCanvas.removeChild(pixelCanvas.firstChild);
  }
  for (let i = 1; i <= gridHeight; i++) {
    let gridRow = document.createElement('tr');
    pixelCanvas.appendChild(gridRow);
    for (let j = 1; j <= gridWidth; j++) {
      let gridCell = document.createElement('td');
      gridRow.appendChild(gridCell);
    }
  }
}

makeGrid(5, 5);

let down = false;

$("td").click(e => {
  const color = document.querySelector('.pick').id
  let target = e.target;
  if (target.tagName == 'TD') {
    if (color == "#00b140") {
      target.style.backgroundColor = "";
    } else {
      target.style.backgroundColor = color;
    }
  }
})

pixelCanvas.addEventListener("touchmove", e => {
  const color = document.querySelector('.pick').id
  let target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  if (target.tagName == 'TD') {
    if (color == "#00b140") {
      target.style.backgroundColor = "";
    } else {
      target.style.backgroundColor = color;
    }
  }
  e.preventDefault()
})


pixelCanvas.addEventListener('mousedown', e => {
  down = true;
  pixelCanvas.addEventListener('mouseup', () => {
    down = false;
  });
  pixelCanvas.addEventListener('mouseleave', () => {
    down = false;
  });

  pixelCanvas.addEventListener('mouseover', e => {
    const color = document.querySelector('.pick').id;
    if (down) {
      if (e.target.tagName == 'TD') {
        if (color == "#00b140") {
          e.target.style.backgroundColor = "";
        } else {
          e.target.style.backgroundColor = color;
        }
      }
    }
  });
});

$("#erase").click(() => {
  pixelCanvas.addEventListener("touchmove", e => {
    const color = document.querySelector('.color-picker').id
    let target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    if (target.tagName === 'TD') {
      target.style.backgroundColor = null;
    }
  })

  pixelCanvas.addEventListener('mousedown', function (e) {
    down = true;
    pixelCanvas.addEventListener('mouseup', function () {
      down = false;
    });
    pixelCanvas.addEventListener('mouseleave', function () {
      down = false;
    });
    pixelCanvas.addEventListener('mouseover', function (e) {
      if (down) {
        if (e.target.tagName === 'TD') {
          e.target.style.backgroundColor = null;
        }
      }
    });
  });
  pixelCanvas.addEventListener('mousedown', function (e) {
    e.target.style.backgroundColor = null;
  });
})