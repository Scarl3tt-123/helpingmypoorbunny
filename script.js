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
const nodes = [
  {
    id: "grandma",
    label: "Grandma",
    x: 200,
    y: 150,
    info: `
      <p>Born: 1950</p>
      <p>Hobbies: Gardening, knitting</p>
      <button onclick="showSubInfo('grandmaBio')">Biography</button>
      <button onclick="showSubInfo('grandmaStories')">Stories</button>
    `
  },
  {
    id: "uncle",
    label: "Uncle John",
    x: 400,
    y: 300,
    info: `
      <p>Born: 1975</p>
      <p>Occupation: Mechanic</p>
      <button onclick="showSubInfo('uncleCars')">Car Projects</button>
    `
  }
];
nodes.forEach(node => {
  const el = document.createElement('div');
  el.classList.add('node');
  el.id = node.id;
  el.textContent = node.label;

  el.style.left = node.x + 'px';
  el.style.top = node.y + 'px';

  el.addEventListener('click', () => openPanel(node));

  document.getElementById('mapArea').appendChild(el);

  makeDraggable(el);
});
function openPanel(node) {
  document.getElementById('panelTitle').textContent = node.label;
  document.getElementById('panelContent').innerHTML = node.info;

  const panel = document.getElementById('infoPanel');
  panel.classList.add('show');
}

document.getElementById('closePanel').addEventListener('click', () => {
  document.getElementById('infoPanel').classList.remove('show');
});
function showSubInfo(type) {
  const content = document.getElementById('panelContent');

  if (type === 'grandmaBio') {
    content.innerHTML = `
      <h3>Biography</h3>
      <p>She grew up in a small village...</p>
    `;
  }

  if (type === 'grandmaStories') {
    content.innerHTML = `
      <h3>Stories</h3>
      <p>She once rescued a stray cat...</p>
    `;
  }

  if (type === 'uncleCars') {
    content.innerHTML = `
      <h3>Car Projects</h3>
      <p>He rebuilt a 1998 Honda Civic...</p>
    `;
  }
}
