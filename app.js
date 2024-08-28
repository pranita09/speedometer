const submitBtn = document.querySelector("#submitBtn");
const speedInput = document.querySelector("#speedInput");
const needle = document.querySelector(".needle");

const rotateNeedle = () => {
  const input = speedInput.value;

  // Convert input value to a number and validate the range
  const value = Math.min(Math.max(Number(input), 0), 180); // Clamp between 0 and 180

  // Calculate the angle: -135deg corresponds to 0, and 135deg corresponds to 180
  const angle = (value - 0) * (270 / 180) - 135;

  // Rotate the needle to the calculated angle
  needle.style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg)`;
};

submitBtn.addEventListener("click", rotateNeedle);
speedInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    rotateNeedle();
  }
});
