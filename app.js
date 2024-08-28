const submitBtn = document.querySelector("#submitBtn");
const speedInput = document.querySelector("#speedInput");
const needle = document.querySelector(".needle");
const ticksContainer = document.getElementById("ticksContainer");

const createTicks = () => {
  ticksContainer.innerHTML = "";

  const totalMarks = 6;
  const startAngle = 135;
  const angleStep = 270 / totalMarks;

  const radii = {
    arc: 145,
    tick: 132.5,
    label: 115,
  };

  const center = 150; // center coordinates

  for (let i = 0; i <= totalMarks; i++) {
    const angle = startAngle + i * angleStep;
    const radians = (angle * Math.PI) / 180; // Pre-calculate radians

    // Calculate positions for ticks and labels
    const tickStart = {
      x: center + radii.tick * Math.cos(radians),
      y: center + radii.tick * Math.sin(radians),
    };

    const tickEnd = {
      x: center + radii.label * Math.cos(radians),
      y: center + radii.label * Math.sin(radians),
    };

    // Create tick mark
    const tick = document.createElement("div");
    tick.className = "tick";
    tick.style.width = `${Math.hypot(
      tickEnd.x - tickStart.x,
      tickEnd.y - tickStart.y
    )}px`;
    tick.style.transform = `rotate(${angle}deg)`;
    tick.style.left = `${tickStart.x}px`;
    tick.style.top = `${tickStart.y}px`;
    tick.style.position = "absolute";
    tick.style.transformOrigin = "0 0";

    // Create label
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = i * 30;
    label.style.left = `${tickEnd.x}px`;
    label.style.top = `${tickEnd.y}px`;
    label.style.transform = `translate(-50%, -50%)`;

    ticksContainer.appendChild(tick);
    ticksContainer.appendChild(label);
  }
};

const rotateNeedle = () => {
  const input = speedInput.value;
  const value = Math.min(Math.max(Number(input), 0), 180);
  const angle = (value - 0) * (270 / 180) - 135;

  needle.style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg)`;
};

createTicks();

submitBtn.addEventListener("click", rotateNeedle);
speedInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    rotateNeedle();
  }
});
