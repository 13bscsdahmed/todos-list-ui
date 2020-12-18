import { Component, OnInit } from '@angular/core';


/**
 * Board component
 */
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
  }
  
  onDragStart(event: any) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  
  onDragOver(event: any) {
    event.preventDefault();
  }
  
  onDrop(event: any) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    let dropzone = event.target;
    if (!event.target.parentElement.classList.contains('droppable')) {
      dropzone = event.target.parentElement;
    }
    const childToAppend = this.getDragAfterElement(dropzone, event.clientY);
  
    
    if (!childToAppend) {
      dropzone.appendChild(draggableElement);
    } else {
      dropzone.insertBefore(draggableElement, childToAppend);
    }
    
    event.dataTransfer.clearData();
  }
  
  getDragAfterElement(container: any, y: any) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  
}
