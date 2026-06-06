const storageKey = "traen-app-state-v1";

const exerciseBank = {
  bodyweight: {
    push: ["Push-ups", "Pike push-ups", "Diamond push-ups", "Dips paa stol"],
    pull: ["Inverted row under bord", "Doorframe row", "Superman pull", "Handklaede row"],
    legs: ["Squats", "Bulgarian split squat", "Lunges", "Glute bridge"],
    core: ["Planke", "Dead bug", "Mountain climbers", "Sideplanke"],
    cardio: ["Interval loeb", "Burpees", "High knees", "Step-ups"]
  },
  dumbbells: {
    push: ["DB bench press", "DB shoulder press", "DB floor press", "DB lateral raise"],
    pull: ["DB row", "Renegade row", "DB pullover", "Rear delt fly"],
    legs: ["Goblet squat", "DB Romanian deadlift", "DB lunges", "DB calf raise"],
    core: ["Weighted plank", "Russian twist", "Suitcase carry", "Dead bug"],
    cardio: ["DB complexes", "Farmer carry intervals", "Jump rope", "Bike intervals"]
  },
  gym: {
    push: ["Bench press", "Incline DB press", "Overhead press", "Cable fly"],
    pull: ["Lat pulldown", "Seated row", "Pull-ups", "Face pulls"],
    legs: ["Squat", "Romanian deadlift", "Leg press", "Hamstring curl"],
    core: ["Cable crunch", "Hanging knee raise", "Pallof press", "Planke"],
    cardio: ["Rower intervals", "Incline walk", "Bike sprints", "Sled push"]
  }
};

const splitNames = {
  2: ["Full body A", "Full body B"],
  3: ["Push", "Pull", "Legs"],
  4: ["Upper", "Lower", "Push", "Pull + legs"],
  5: ["Push", "Pull", "Legs", "Upper", "Conditioning"],
  6: ["Push", "Pull", "Legs", "Push volume", "Pull volume", "Legs + core"]
};

const state = loadState();
let activeDay = 0;
let deferredInstallPrompt = null;

const elements = {
  tabs: document.querySelectorAll(".tab"),
  views: {
    setup: document.querySelector("#setupView"),
    plan: document.querySelector("#planView"),
    progress: document.querySelector("#progressView")
  },
  form: document.querySelector("#profileForm"),
  days: document.querySelector("#days"),
  daysLabel: document.querySelector("#daysLabel"),
  bmiValue: document.querySelector("#bmiValue"),
  bmiText: document.querySelector("#bmiText"),
  focusValue: document.querySelector("#focusValue"),
  planTitle: document.querySelector("#planTitle"),
  weekStrip: document.querySelector("#weekStrip"),
  workoutCard: document.querySelector("#workoutCard"),
  regenerateButton: document.querySelector("#regenerateButton"),
  completionTitle: document.querySelector("#completionTitle"),
  meterFill: document.querySelector("#meterFill"),
  volumeStat: document.querySelector("#volumeStat"),
  calorieStat: document.querySelector("#calorieStat"),
  resetWeekButton: document.querySelector("#resetWeekButton"),
  notes: document.querySelector("#notes"),
  exportButton: document.querySelector("#exportButton"),
  importFile: document.querySelector("#importFile"),
  installButton: document.querySelector("#installButton")
};

function defaultState() {
  const profile = {
    age: 28,
    weight: 82,
    height: 182,
    days: 4,
    duration: 45,
    goal: "muscle",
    level: "intermediate",
    equipment: "gym"
  };
  return {
    profile,
    plan: generatePlan(profile),
    completed: {},
    notes: ""
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.profile && saved?.plan) return saved;
  } catch {
    localStorage.removeItem(storageKey);
  }
  return defaultState();
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function getProfileFromForm() {
  const data = new FormData(elements.form);
  return {
    age: Number(data.get("age")),
    weight: Number(data.get("weight")),
    height: Number(data.get("height")),
    days: Number(data.get("days")),
    duration: Number(data.get("duration")),
    goal: data.get("goal"),
    level: data.get("level"),
    equipment: data.get("equipment")
  };
}

function generatePlan(profile) {
  const repMap = {
    strength: { reps: "4-6", rest: "2-3 min", focus: "Styrke" },
    muscle: { reps: "8-12", rest: "75-120 sek", focus: "Hypertrofi" },
    fatloss: { reps: "10-15", rest: "45-75 sek", focus: "Fedtforbraending" },
    fitness: { reps: "12-18", rest: "30-60 sek", focus: "Kondition" }
  };
  const levelSets = { beginner: 3, intermediate: 4, advanced: 5 };
  const goalData = repMap[profile.goal];
  const split = splitNames[profile.days];
  const bank = exerciseBank[profile.equipment];
  const intensity = calculateIntensity(profile);

  return split.map((name, index) => {
    const pattern = getPattern(name, profile.goal);
    const exercises = pattern.map((group, exerciseIndex) => {
      const names = bank[group];
      const exerciseName = names[(index + exerciseIndex) % names.length];
      const sets = Math.max(2, levelSets[profile.level] + (intensity === "high" && exerciseIndex < 2 ? 1 : 0));
      const timeBox = profile.duration <= 30 && exerciseIndex > 3 ? 2 : sets;
      return {
        group,
        name: exerciseName,
        sets: timeBox,
        reps: group === "cardio" ? getCardioDose(profile) : goalData.reps,
        rest: group === "cardio" ? "aktiv pause" : goalData.rest
      };
    });

    return {
      id: makeId(),
      name,
      focus: goalData.focus,
      duration: profile.duration,
      exercises
    };
  });
}

function getPattern(name, goal) {
  if (goal === "fitness") return ["cardio", "legs", "push", "pull", "core"];
  if (goal === "fatloss") return ["legs", "push", "pull", "cardio", "core"];
  if (name.includes("Push")) return ["push", "push", "core", "cardio"];
  if (name.includes("Pull")) return ["pull", "pull", "legs", "core"];
  if (name.includes("Leg")) return ["legs", "legs", "core", "cardio"];
  if (name.includes("Lower")) return ["legs", "legs", "core", "cardio"];
  if (name.includes("Conditioning")) return ["cardio", "legs", "core", "push"];
  return ["push", "pull", "legs", "core"];
}

function getCardioDose(profile) {
  if (profile.goal === "fitness") return "8 x 45 sek";
  if (profile.goal === "fatloss") return "10-18 min";
  return "6-10 min";
}

function calculateIntensity(profile) {
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  if (profile.age < 35 && bmi < 30 && profile.level !== "beginner") return "high";
  if (profile.age > 55 || bmi > 34 || profile.level === "beginner") return "moderate";
  return "normal";
}

function renderProfile() {
  Object.entries(state.profile).forEach(([key, value]) => {
    const input = elements.form.elements[key];
    if (input) input.value = value;
  });
  updateProfileReadout();
}

function updateProfileReadout() {
  const profile = getProfileFromForm();
  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  elements.daysLabel.textContent = `${profile.days} dage`;
  elements.bmiValue.textContent = bmi.toFixed(1);
  elements.bmiText.textContent = bmi < 18.5 ? "Lav vægt" : bmi < 25 ? "Normal vægt" : bmi < 30 ? "Over normal" : "Høj vægt";
  elements.focusValue.textContent = {
    strength: "Styrke",
    muscle: "Hypertrofi",
    fatloss: "Forbraending",
    fitness: "Kondition"
  }[profile.goal];
}

function renderPlan() {
  const profile = state.profile;
  const focus = state.plan[0]?.focus || "Personlig";
  elements.planTitle.textContent = `${profile.days}-dages ${focus.toLowerCase()}`;
  elements.weekStrip.innerHTML = "";

  state.plan.forEach((day, index) => {
    const button = document.createElement("button");
    button.className = `day-pill${index === activeDay ? " is-active" : ""}${state.completed[day.id] ? " is-done" : ""}`;
    button.type = "button";
    button.innerHTML = `<span>Dag ${index + 1}</span><strong>${day.name}</strong>`;
    button.addEventListener("click", () => {
      activeDay = index;
      renderPlan();
    });
    elements.weekStrip.appendChild(button);
  });

  renderWorkout();
  renderProgress();
}

function renderWorkout() {
  const day = state.plan[activeDay] || state.plan[0];
  if (!day) return;
  const completeText = state.completed[day.id] ? "Marker som ikke klaret" : "Marker som klaret";
  elements.workoutCard.innerHTML = `
    <div class="workout-summary">
      <div>
        <p class="eyebrow">${day.focus}</p>
        <h2>${day.name}</h2>
      </div>
      <span class="tag">${day.duration} min</span>
    </div>
    <div class="exercise-list"></div>
    <button class="primary-action complete-button" type="button">${completeText}</button>
  `;

  const list = elements.workoutCard.querySelector(".exercise-list");
  day.exercises.forEach((exercise, index) => {
    const item = document.querySelector("#exerciseTemplate").content.firstElementChild.cloneNode(true);
    item.querySelector(".exercise-name").textContent = exercise.name;
    item.querySelector(".exercise-meta").textContent = `${exercise.sets} saet x ${exercise.reps} · pause ${exercise.rest}`;
    item.querySelector(".decrease").addEventListener("click", () => changeSets(index, -1));
    item.querySelector(".increase").addEventListener("click", () => changeSets(index, 1));
    item.querySelector(".swap").addEventListener("click", () => swapExercise(index));
    list.appendChild(item);
  });

  elements.workoutCard.querySelector(".complete-button").addEventListener("click", () => {
    state.completed[day.id] = !state.completed[day.id];
    saveState();
    renderPlan();
  });
}

function changeSets(index, amount) {
  const exercise = state.plan[activeDay].exercises[index];
  exercise.sets = Math.min(8, Math.max(1, exercise.sets + amount));
  saveState();
  renderWorkout();
  renderProgress();
}

function swapExercise(index) {
  const exercise = state.plan[activeDay].exercises[index];
  const choices = exerciseBank[state.profile.equipment][exercise.group];
  const current = choices.indexOf(exercise.name);
  exercise.name = choices[(current + 1 + choices.length) % choices.length];
  saveState();
  renderWorkout();
}

function renderProgress() {
  const completedCount = state.plan.filter((day) => state.completed[day.id]).length;
  const total = state.plan.length || 1;
  const percent = Math.round((completedCount / total) * 100);
  const totalSets = state.plan.flatMap((day) => day.exercises).reduce((sum, exercise) => sum + exercise.sets, 0);
  const calories = Math.round(state.profile.weight * state.profile.duration * state.plan.length * 0.09);

  elements.completionTitle.textContent = `${completedCount} af ${total} pas`;
  elements.meterFill.style.width = `${percent}%`;
  elements.volumeStat.textContent = `${totalSets} sæt`;
  elements.calorieStat.textContent = `${calories} kcal`;
  elements.notes.value = state.notes || "";
}

function switchView(viewName) {
  elements.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewName));
  Object.entries(elements.views).forEach(([name, view]) => view.classList.toggle("is-active", name === viewName));
}

elements.tabs.forEach((tab) => tab.addEventListener("click", () => switchView(tab.dataset.view)));

elements.form.addEventListener("input", updateProfileReadout);

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.profile = getProfileFromForm();
  state.plan = generatePlan(state.profile);
  state.completed = {};
  activeDay = 0;
  saveState();
  renderPlan();
  switchView("plan");
});

elements.regenerateButton.addEventListener("click", () => {
  state.plan = generatePlan(state.profile);
  state.completed = {};
  activeDay = 0;
  saveState();
  renderPlan();
});

elements.resetWeekButton.addEventListener("click", () => {
  state.completed = {};
  saveState();
  renderProgress();
  renderPlan();
});

elements.notes.addEventListener("input", () => {
  state.notes = elements.notes.value;
  saveState();
});

elements.exportButton.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "traeningsplan.json";
  link.click();
  URL.revokeObjectURL(link.href);
});

elements.importFile.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const imported = JSON.parse(await file.text());
  if (!imported.profile || !imported.plan) return;
  Object.assign(state, imported);
  activeDay = 0;
  saveState();
  renderProfile();
  renderPlan();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  elements.installButton.hidden = false;
});

elements.installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    alert("På iPhone: åbn siden i Safari, tryk Del, og vælg 'Føj til hjemmeskærm'.");
    return;
  }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

renderProfile();
renderPlan();

function makeId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
