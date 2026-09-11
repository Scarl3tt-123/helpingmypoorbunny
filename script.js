function makeDraggable(el) {
  let isDown = false;
  let offsetX = 0;
  let offsetY = 0;

  el.addEventListener('mousedown', e => {
    isDown = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.cursor = 'grabbing';
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    el.style.cursor = 'grab';
  });

  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
  });
}

makeDraggable(document.getElementById('node1'));
makeDraggable(document.getElementById('node2'));
