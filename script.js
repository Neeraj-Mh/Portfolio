const aiList = document.querySelector('#ai-list');
const docList = document.querySelector('#document-list');

const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const isVideo = file => /youtu\.?be|vimeo/.test(file);

const card = project => `<a class="document" href="${encodeURI(project.file)}" target="_blank" rel="noreferrer">
  <small>${escape(project.type)}</small>
  <strong>${escape(project.title.replace(/_/g, ' '))}</strong>
  <span>${escape(project.description)}</span>
  <em>${isVideo(project.file) ? 'Watch demo ↗' : 'Open document ↗'}</em>
</a>`;

fetch('projects.json').then(response => response.json()).then(projects => {
  const ai = projects.filter(p => /ai/i.test(p.type));
  const docs = projects.filter(p => !/ai/i.test(p.type));
  aiList.innerHTML = ai.map(card).join('') || '<p class="note">AI demos will be added soon.</p>';
  docList.innerHTML = docs.map(card).join('') || '<p class="note">Documents will be added soon.</p>';
}).catch(() => {
  docList.innerHTML = '<p class="note">Project documents will be added soon.</p>';
});
