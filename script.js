var slider = document.getElementById("slider");

noUiSlider.create(slider, {
  start: [5, 8],
  connect: true,
  range: {
    min: 0,
    max: 10,
  },
});
