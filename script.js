function makeDraggable(el) {
  let offsetX;
  let offsetY;

  el.addEventListener('pointerdown', event => {
    const mapBounds = mapArea.getBoundingClientRect();
    const nodeBounds = el.getBoundingClientRect();

    el.setPointerCapture(event.pointerId);
    el.classList.add('dragging');
    offsetX = event.clientX - nodeBounds.left;
    offsetY = event.clientY - nodeBounds.top;

    const moveNode = moveEvent => {
      el.style.left = `${moveEvent.clientX - mapBounds.left - offsetX}px`;
      el.style.top = `${moveEvent.clientY - mapBounds.top - offsetY}px`;
    };

    const stopDragging = () => {
      el.classList.remove('dragging');
      el.removeEventListener('pointermove', moveNode);
      el.removeEventListener('pointerup', stopDragging);
      el.removeEventListener('pointercancel', stopDragging);
    };

    el.addEventListener('pointermove', moveNode);
    el.addEventListener('pointerup', stopDragging);
    el.addEventListener('pointercancel', stopDragging);
  });
}

const mapArea = document.getElementById('mapArea');
let nodeCount = mapArea.querySelectorAll('.node').length;

function createNode() {
  nodeCount++;

  const node = document.createElement('div');
  node.classList.add('node');
  node.id = 'node' + nodeCount;
  node.textContent = 'New thought';
  node.contentEditable = 'true';
  node.setAttribute('role', 'textbox');

  node.style.left = `${80 + (nodeCount % 4) * 150}px`;
  node.style.top = `${100 + Math.floor(nodeCount / 4) * 90}px`;

  mapArea.appendChild(node);

  makeDraggable(node);
  node.focus();
}

document.getElementById('addNodeBtn').addEventListener('click', createNode);

mapArea.addEventListener('dblclick', event => {
  nodeCount++;

  const node = document.createElement('div');
  node.classList.add('node');
  node.id = 'node' + nodeCount;
  node.textContent = 'New thought';
  node.contentEditable = 'true';
  node.setAttribute('role', 'textbox');

  const mapBounds = mapArea.getBoundingClientRect();
  node.style.left = `${event.clientX - mapBounds.left}px`;
  node.style.top = `${event.clientY - mapBounds.top}px`;

  mapArea.appendChild(node);
  makeDraggable(node);
  node.focus();
});

mapArea.querySelectorAll('.node').forEach(makeDraggable);
