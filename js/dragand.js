//  Navbar


function menuOnClick() {
    console.log('Hello');
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }
  

// Drag and drop souris 4 

const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.containerbis')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(containerbis => {
    containerbis.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(containerbis, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
        containerbis.appendChild(draggable)
    } else {
        containerbis.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(containerbis, y) {
  const draggableElements = [...containerbis.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}