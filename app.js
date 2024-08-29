const submitBtn = document.querySelector("#submitBtn");
const speedInput = document.querySelector("#speedInput");
const needle = document.querySelector(".needle");
const ticksContainer = document.getElementById("ticksContainer");

const createTicks = () => {
  ticksContainer.innerHTML = "";

  const totalMarks = 6;
  const startAngle = 135;
  const angleStep = 270 / totalMarks;
  const subTickCount = 2;
  const center = 150;

  const radiiTick = 135;
  const radiiLabel = 120;

  const calculatePosition = (radius, radians) => ({
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  });

  for (let i = 0; i <= totalMarks; i++) {
    const angle = startAngle + i * angleStep;
    const radians = (angle * Math.PI) / 180;

    // Positions for main ticks and labels
    const tickStart = calculatePosition(radiiTick, radians);
    const tickEnd = calculatePosition(radiiLabel, radians);

    // main tick
    const tick = document.createElement("div");
    tick.className = "tick main-tick";
    Object.assign(tick.style, {
      width: `${Math.hypot(
        tickEnd.x - tickStart.x,
        tickEnd.y - tickStart.y
      )}px`,
      transform: `rotate(${angle}deg)`,
      left: `${tickStart.x}px`,
      top: `${tickStart.y}px`,
      position: "absolute",
      transformOrigin: "0 0",
    });

    // label
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = i * 30;
    Object.assign(label.style, {
      left: `${tickEnd.x}px`,
      top: `${tickEnd.y}px`,
      transform: "translate(-50%, -50%)",
    });

    ticksContainer.appendChild(tick);
    ticksContainer.appendChild(label);

    // Add small ticks between main ticks
    if (i < totalMarks) {
      for (let j = 1; j <= subTickCount; j++) {
        const subTickAngle = angle + j * (angleStep / (subTickCount + 1));
        const subTickRadians = (subTickAngle * Math.PI) / 180;
        const subTickStart = calculatePosition(radiiTick, subTickRadians);
        const subTickEnd = calculatePosition(radiiTick - 5, subTickRadians); // Adjusted radius for small ticks

        // Create small tick
        const subTick = document.createElement("div");
        subTick.className = "tick small-tick";
        Object.assign(subTick.style, {
          width: `${Math.hypot(
            subTickEnd.x - subTickStart.x,
            subTickEnd.y - subTickStart.y
          )}px`,
          transform: `rotate(${subTickAngle}deg)`,
          left: `${subTickStart.x}px`,
          top: `${subTickStart.y}px`,
          position: "absolute",
          transformOrigin: "0 0",
        });

        ticksContainer.appendChild(subTick);
      }
    }
  }
};

const rotateNeedle = () => {
  const input = speedInput.value;
  const value = Math.min(Math.max(Number(input), 0), 180);
  const angle = (value - 0) * (270 / 180) - 135;

  needle.style.transform = `translateX(-50%) translateY(-100%) rotate(${
    angle + 0.35
  }deg)`;
};

createTicks();

submitBtn.addEventListener("click", rotateNeedle);
speedInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    rotateNeedle();
  }
});
