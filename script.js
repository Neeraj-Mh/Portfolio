const list = document.querySelector('#document-list');
fetch('projects.json').then(response => response.json()).then(projects => {
  list.innerHTML = projects.map(project => `<a class="document" href="${project.file}" target="_blank" rel="noreferrer"><small>${project.type}</small><strong>${project.title}</strong><span>${project.description}</span></a>`).join('');
}).catch(() => { list.innerHTML = '<p class="note">Project documents will be added soon.</p>'; });
