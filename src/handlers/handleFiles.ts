import type { Ref } from 'vue'
import * as PDFJS from 'pdfjs-dist'

PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
export default async function handleFiles(files: FileList, container: HTMLElement, dropArea: HTMLElement, docsRef: any): Promise<void> {
  let currentRow = container.lastElementChild
  for (const file of files) {
    if (file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const loadingTask = PDFJS.getDocument(URL.createObjectURL(file))
      const pdf = await loadingTask.promise
      const pageNumber = 1
      const page = await pdf.getPage(pageNumber)
      const viewport = page.getViewport({ scale: 1 })
      const scale = Math.min(250 / viewport.width, 350 / viewport.height)
      const scaledViewport = page.getViewport({ scale })
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.height = 350
      canvas.width = 250
      canvas.classList.add('pdf-item')
      if (!currentRow || currentRow.children.length >= 3) {
        currentRow = document.createElement('div')
        currentRow.classList.add('row')
        container.appendChild(currentRow)
      }
      currentRow.appendChild(canvas)
      dropArea.scrollTop = dropArea.scrollHeight - dropArea.clientHeight
      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport
        }
        await page.render(renderContext).promise
        docsRef.push(file)
      } else {
        console.error('No se pudo obtener el contexto 2D del canvas.')
      }
    } else {
      alert('¡Por favor, selecciona solo archivos PDF!')
    }
  }
}