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

let nodeCount = 0;

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

function createNode() {
  nodeCount++;

  const node = document.createElement('div');
  node.classList.add('node');
  node.id = 'node' + nodeCount;
  node.textContent = 'Node ' + nodeCount;

  // random starting position
  node.style.left = (100 + Math.random() * 300) + 'px';
  node.style.top = (100 + Math.random() * 300) + 'px';

  document.getElementById('mapArea').appendChild(node);

  makeDraggable(node);
}

document.getElementById('addNodeBtn').addEventListener('click', createNode);

document.getElementById('mapArea').addEventListener('dblclick', e => {
  nodeCount++;

  const node = document.createElement('div');
  node.classList.add('node');
  node.id = 'node' + nodeCount;
  node.textContent = 'Node ' + nodeCount;

  node.style.left = e.clientX + 'px';
  node.style.top = e.clientY + 'px';

  document.getElementById('mapArea').appendChild(node);
  makeDraggable(node);
});
