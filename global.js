const preventBodyScrollWhenVisible = () => {
  // When the overlay is shown, we want a fixed body
  document.body.style.overflow = 'hidden';
  //document.body.style.top = `-${window.scrollY}px`;
}

const resetBodyPositionWhenNotVisible = () => {
  // When the modal is hidden...
  // const scrollY = document.body.style.top;
  // document.body.style.position = '';
  // document.body.style.top = '';
  // window.scrollTo(0, parseInt(scrollY || '0') * -1);
  document.body.style.overflow = 'visible';
}