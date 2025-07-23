
document.addEventListener('DOMContentLoaded', () => {
  const cursos = document.querySelectorAll('.course');

  function checkUnlocked(curso) {
    const prereq = curso.dataset.prereq;
    if (!prereq) return true;
    const prereqList = prereq.split(',');
    return prereqList.every(id =>
      document.querySelector(`[data-id='${id}']`).classList.contains('completed')
    );
  }

  function updateLocks() {
    cursos.forEach(curso => {
      if (curso.classList.contains('completed')) return;
      if (checkUnlocked(curso)) {
        curso.classList.remove('locked');
      } else {
        curso.classList.add('locked');
      }
    });
  }

  cursos.forEach(curso => {
    if (!checkUnlocked(curso)) {
      curso.classList.add('locked');
    }

    curso.addEventListener('click', () => {
      if (curso.classList.contains('locked') || curso.classList.contains('completed')) return;
      curso.classList.add('completed');
      updateLocks();
    });
  });

  document.getElementById('reset').addEventListener('click', () => {
    cursos.forEach(curso => curso.classList.remove('completed'));
    updateLocks();
  });
});
