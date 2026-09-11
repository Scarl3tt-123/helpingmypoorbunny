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
    id: "Feelings",
    label: "Feelings",
    x: 200,
    y: 150,
    info: `
      <p>1) think about what are you feeling</p>
      <p>2) why are you feeling this way</p>
      <p>3) what can you do to feel better</p>
      <button onclick="showSubInfo('FeelingsMap')">Map of Feelings</button>
      <button onclick="showSubInfo('TriggersPatterns')">Triggers & Patterns</button>
      <button onclick="showSubInfo('ActionSteps')">Action steps</button>
      <button onclick="showSubInfo('OppositeEmotionMap')">Opposite Emotion Map</button>
      <button onclick="showSubInfo('EmotionTimeline')">Emotion Timeline</button>

    `
  },
  {
    id: "comforts",
    label: "comforts",
    x: 400,
    y: 300,
    info: `
      <p>Born: 1975</p>
      <p>Occupation: Mechanic</p>
      <button onclick="showSubInfo('forAnxiety')">For Anxiety</button>
      <button onclick="showSubInfo('forSadness')">For Sadness</button>
      <button onclick="showSubInfo('forexhaustion')">For Exhaustion</button>
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

  if (type === 'FeelingsMap') {
    content.innerHTML = `
      <h3>Map of Feelings</h3>
      <p>Name the feeling, notice where it appears in your body, and rate its intensity from 1 to 10.</p>
    `;
  }

  if (type === 'TriggersPatterns') {
    content.innerHTML = `
      <h3>Triggers &amp; Patterns</h3>
      <p>What happened just before the feeling? Look for repeated places, people, thoughts, or times of day.</p>
    `;
  }

  if (type === 'ActionSteps') {
    content.innerHTML = `
      <h3>Action Steps</h3>
      <p>Choose one small action you can take in the next ten minutes: breathe, drink water, move, write, or ask for support.</p>
    `;
  }

  if (type === 'OppositeEmotionMap') {
    content.innerHTML = `
      <h3>Opposite Emotion Map</h3>
      <p>What would be a gentler or more helpful response to this feeling? Pick a response that is possible, not perfect.</p>
    `;
  }

  if (type === 'EmotionTimeline') {
    content.innerHTML = `
      <h3>Emotion Timeline</h3>
      <p>Write what you felt before, during, and after the moment. Note what changed and what helped, even a little.</p>
    `;
  }

  if (type === 'forAnxiety') {
    content.innerHTML = `
      <h3>For Anxiety</h3>
      <p>Here are some techniques to manage anxiety...</p>
    `;
  }

  if (type === 'forSadness') {
    content.innerHTML = `
      <h3>For Sadness</h3>
      <p>Here are some ways to cope with sadness...</p>
    `;
  }

  if (type === 'forexhaustion') {
    content.innerHTML = `
      <h3>For Exhaustion</h3>
      <p>Here are some strategies to deal with exhaustion...</p>
    `;
  }
}
