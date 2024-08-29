import "@testing-library/jest-dom";
const {
  createTicks,
  rotateNeedle,
  updateFromForm,
  updateFromScale,
} = require("./app");

describe("createTicks function", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="ticksContainer"></div>
    `;
  });

  it("should create 7 main ticks and 12 small ticks", () => {
    createTicks();
    const ticksContainer = document.getElementById("ticksContainer");
    const mainTicks = ticksContainer.querySelectorAll(".main-tick");
    const smallTicks = ticksContainer.querySelectorAll(".small-tick");

    expect(mainTicks.length).toBe(7);
    expect(smallTicks.length).toBe(12);
  });

  it("should have correct labels on main ticks", () => {
    createTicks();
    const labels = Array.from(
      document.getElementById("ticksContainer").querySelectorAll(".label")
    ).map((label) => parseInt(label.textContent));

    expect(labels).toEqual([0, 30, 60, 90, 120, 150, 180]);
  });
});

describe("rotateNeedle function", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="needle" style="transform: rotate(-134.3deg)"></div>
    `;
  });

  it("should rotate needle to the correct position for 0 speed", () => {
    const needle = document.querySelector(".needle");
    rotateNeedle(0);
    expect(needle.style.transform).toContain("rotate(-135deg)");
  });

  it("should rotate needle to the correct position for 90 speed", () => {
    const needle = document.querySelector(".needle");
    rotateNeedle(90);
    expect(needle.style.transform).toContain("rotate(0deg)");
  });

  it("should rotate needle to the correct position for 180 speed", () => {
    const needle = document.querySelector(".needle");
    rotateNeedle(180);
    expect(needle.style.transform).toContain("rotate(135deg)");
  });
});

describe("updateFromForm function", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="speedInput" value="90" />
      <input id="scaleInput" value="0" />
      <div class="needle" style="transform: rotate(-135deg)"></div>
    `;
  });

  it("should update scale input and rotate needle when speed input is submitted", () => {
    const speedInput = document.getElementById("speedInput");
    const scaleInput = document.getElementById("scaleInput");
    const needle = document.querySelector(".needle");

    speedInput.value = "90";
    updateFromForm();

    expect(scaleInput.value).toBe("90");
    expect(needle.style.transform).toContain("rotate(0deg)");
  });
});

describe("updateFromScale function", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="speedInput" value="0" />
      <input id="scaleInput" value="90" />
      <div class="needle" style="transform: rotate(-135deg)"></div>
    `;
  });

  it("should update speed input and rotate needle when scale input changes", () => {
    const speedInput = document.getElementById("speedInput");
    const scaleInput = document.getElementById("scaleInput");
    const needle = document.querySelector(".needle");

    scaleInput.value = "90";
    updateFromScale();

    expect(speedInput.value).toBe("90");
    expect(needle.style.transform).toContain("rotate(0deg)");
  });
});
