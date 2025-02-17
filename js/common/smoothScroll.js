export function scrollToHash(offset) {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 960) {
    offset += 30;
  }

  const hash = window.location.hash;
  const target = document.querySelector(hash);
  if (target) {
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  }
}
