import Entry from './Entry'
import anime from 'animejs'

export default class Slideshow {
  constructor(el) {
    this.DOM = {el};
    this.init()
  }

  init() {
    // slides
    this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.section'), slide => new Entry(slide))
    this.slidesTotal = this.DOM.slides.length;
    // navigation
    this.DOM.navigation = this.DOM.el.querySelector('.sections__controls');
    this.DOM.navigation.prevCtrl = this.DOM.navigation.querySelector('button.sections__controls-item--prev');
    this.DOM.navigation.nextCtrl = this.DOM.navigation.querySelector('button.sections__controls-item--next');

    this.currentPos = 0;
    this.layout()
    this.initEvents()
  }

  layout() {
    this.currentEntry = this.DOM.slides[this.currentPos]
  }

  initEvents() {
    this.onPrevClick = () => this.navigate('prev')
    this.onNextClick = () => this.navigate('next')

    this.DOM.navigation.prevCtrl.addEventListener('click', this.onPrevClick);
    this.DOM.navigation.nextCtrl.addEventListener('click', this.onNextClick);
  }

  navigate(direction) {
    if (this.isEntriesAnimating) return

    this.isEntriesAnimating = true
    this.direction = direction
    const newPos = this.currentPos = this.direction === 'next' ?
      this.currentPos < this.slidesTotal - 1 ? this.currentPos + 1 : 0 :
      this.currentPos = this.currentPos > 0 ? this.currentPos - 1 : this.slidesTotal - 1;
    const newEntry = this.DOM.slides[newPos]
    this.update(newEntry)
  }

  update(newEntry) {
    Promise.all([
      this.currentEntry.hide(this.direction),
      newEntry.show(this.direction)
    ]).then(() => {
      this.currentEntry.DOM.el.classList.remove('section--current');
      newEntry.DOM.el.classList.add('section--current');
      this.currentEntry = newEntry;
      this.isEntriesAnimating = false;
    })
  }
}