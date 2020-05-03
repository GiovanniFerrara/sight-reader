export interface ElementsRefs {
  canvas: HTMLCanvasElement;
  mic_audio: HTMLAudioElement;
  db: Element;
  piano: HTMLCanvasElement;
}

class RefManager {
  public refs?: ElementsRefs

  constructor(refs?: ElementsRefs) {
    this.refs = refs
  }

  getRefs(): void{
    const refEls = document.querySelectorAll('[data-ref]')
    for (const refEl of refEls) {
      const ref = refEl.getAttribute('data-ref')
      this.refs[ref] = refEl
    }
  }
}

export default RefManager