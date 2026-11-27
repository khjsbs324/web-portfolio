// Capture image failures before parsing the body, including cached failures.
document.addEventListener("error", function (event) {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.dataset.fallback) return;
  const fallback = image.dataset.fallback;
  delete image.dataset.fallback;
  image.src = fallback;
}, true);
