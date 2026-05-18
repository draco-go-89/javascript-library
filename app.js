// Tabs behavior extracted from index.html

function show(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // inline onclick provides event.target
  if (typeof event !== 'undefined' && event?.target) {
    event.target.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keep global for onclick="show('...')"
window.show = show;

// Smooth expand/collapse for all lib cards
function toggleLibCard(card) {
  const isOpen = card.getAttribute('aria-expanded') === 'true';
  card.setAttribute('aria-expanded', String(!isOpen));
}

function toggleFlowBox(flowBox) {
  const id = flowBox.getAttribute('data-detail-id');
  if (!id) return;

  const panel = document.querySelector(`[data-flow-panel="${CSS.escape(id)}"]`);
  if (!panel) return;

  const isOpen = flowBox.getAttribute('aria-expanded') === 'true';

  // close other open boxes (accordion behavior)
  document.querySelectorAll('.flow-box[aria-expanded="true"]').forEach(b => {
    if (b !== flowBox) {
      b.setAttribute('aria-expanded', 'false');
    }
  });

  flowBox.setAttribute('aria-expanded', String(!isOpen));
  const nextOpen = !isOpen;
  panel.hidden = !nextOpen;
  panel.setAttribute('aria-hidden', String(!nextOpen));
}

// Make lib cards interactive (existing)
document.addEventListener('click', (e) => {
  const card = e.target.closest('.lib-card');
  if (card) {
    toggleLibCard(card);
    return;
  }

  const flowBox = e.target.closest('.flow-box[data-detail-id]');
  if (flowBox) {
    toggleFlowBox(flowBox);
    return;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;

  const card = e.target.closest('.lib-card');
  if (card) {
    e.preventDefault();
    toggleLibCard(card);
    return;
  }

  const flowBox = e.target.closest('.flow-box[data-detail-id]');
  if (flowBox) {
    e.preventDefault();
    toggleFlowBox(flowBox);
  }
});

{
  // Show the first tab by default
  document.addEventListener('DOMContentLoaded', () => {
    const firstTab = document.querySelector('.tab');
    if (firstTab) {
      firstTab.click();
    }
  });   
}

