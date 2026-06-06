const storageKey = "træn-app-state-v1";

const exerciseBank = {
  bodyweight: {
    push: ["Push-ups", "Pike push-ups", "Diamond push-ups", "Dips på stol"],
    pull: ["Inverted row under bord", "Doorframe row", "Superman pull", "Håndklæde row"],
    legs: ["Squats", "Bulgarian split squat", "Lunges", "Glute bridge"],
    core: ["Planke", "Dead bug", "Mountain climbers", "Sideplanke"],
    cardio: ["Interval løb", "Burpees", "High knees", "Step-ups"]
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

const weekDays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
const trainingDaySlots = {
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 1, 3, 5],
  5: [0, 1, 2, 4, 5],
  6: [0, 1, 2, 3, 4, 5]
};

const groupExplanations = {
  push: "Pres-øvelser træner bryst, skuldre og triceps.",
  pull: "Træk-øvelser træner ryg, biceps og kropsholdning.",
  legs: "Ben-øvelser bygger lår, baller og stabilitet.",
  core: "Core gør mave, lænd og balance stærkere.",
  cardio: "Kondition får pulsen op og forbedrer udholdenhed."
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
  formMessage: document.querySelector("#formMessage"),
  planTitle: document.querySelector("#planTitle"),
  calendarGrid: document.querySelector("#calendarGrid"),
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
    if (saved?.profile && saved?.plan) {
      saved.profile.age = Math.max(10, Number(saved.profile.age) || 10);
      saved.profile.duration = Number(saved.profile.duration) || 45;
      return saved;
    }
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
    fatloss: { reps: "10-15", rest: "45-75 sek", focus: "Fedtforbrænding" },
    fitness: { reps: "12-18", rest: "30-60 sek", focus: "Kondition" }
  };
  const levelSets = { beginner: 3, intermediate: 4, advanced: 5 };
  const goalData = repMap[profile.goal];
  const split = splitNames[profile.days];
  const bank = exerciseBank[profile.equipment];
  const intensity = calculateIntensity(profile);

  return split.map((name, index) => {
    const pattern = getPattern(name, profile.goal, profile.duration);
    const exercises = pattern.map((group, exerciseIndex) => {
      const names = bank[group];
      const exerciseName = names[(index + exerciseIndex) % names.length];
      const baseSets = levelSets[profile.level] + (intensity === "high" && exerciseIndex < 2 ? 1 : 0);
      const sets = Math.max(1, baseSets + getDurationSetAdjustment(profile.duration, exerciseIndex));
      return {
        group,
        name: exerciseName,
        sets,
        reps: group === "cardio" ? getCardioDose(profile) : goalData.reps,
        rest: group === "cardio" ? "aktiv pause" : goalData.rest,
        explanation: groupExplanations[group]
      };
    });

    return {
      id: makeId(),
      name,
      focus: goalData.focus,
      duration: profile.duration,
      weekday: trainingDaySlots[profile.days][index],
      exercises
    };
  });
}

function getPattern(name, goal, duration) {
  let pattern;
  if (goal === "fitness") pattern = ["cardio", "legs", "push", "pull", "core"];
  else if (goal === "fatloss") pattern = ["legs", "push", "pull", "cardio", "core"];
  else if (name.includes("Push")) pattern = ["push", "push", "core", "cardio"];
  else if (name.includes("Pull")) pattern = ["pull", "pull", "legs", "core"];
  else if (name.includes("Leg")) pattern = ["legs", "legs", "core", "cardio"];
  else if (name.includes("Lower")) pattern = ["legs", "legs", "core", "cardio"];
  else if (name.includes("Conditioning")) pattern = ["cardio", "legs", "core", "push"];
  else pattern = ["push", "pull", "legs", "core"];

  if (duration <= 10) return pattern.slice(0, 2);
  if (duration <= 15) return pattern.slice(0, 3);
  if (duration <= 25) return pattern.slice(0, 4);
  return pattern;
}

function getDurationSetAdjustment(duration, exerciseIndex) {
  if (duration <= 10) return exerciseIndex === 0 ? -1 : -2;
  if (duration <= 15) return -1;
  if (duration <= 25) return exerciseIndex > 1 ? -1 : 0;
  return 0;
}

function getCardioDose(profile) {
  if (profile.duration <= 10) return "3 x 30 sek";
  if (profile.duration <= 15) return "5 x 30 sek";
  if (profile.duration <= 25) return "6-8 min";
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
    fatloss: "Forbrænding",
    fitness: "Kondition"
  }[profile.goal];
  validateAge(profile.age);
}

function validateAge(age) {
  const isTooYoung = age < 10;
  elements.formMessage.textContent = isTooYoung ? "Alderen skal være mindst 10 år for at lave en plan." : "";
  elements.formMessage.classList.toggle("is-visible", isTooYoung);
  return !isTooYoung;
}

function renderPlan() {
  const profile = state.profile;
  const focus = state.plan[0]?.focus || "Personlig";
  elements.planTitle.textContent = `${profile.days}-dages ${focus.toLowerCase()}`;
  elements.weekStrip.innerHTML = "";
  renderCalendar();

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

function renderCalendar() {
  const daysBySlot = new Map(state.plan.map((day, index) => [day.weekday ?? trainingDaySlots[state.profile.days][index], { day, index }]));
  elements.calendarGrid.innerHTML = "";

  weekDays.forEach((weekday, slot) => {
    const training = daysBySlot.get(slot);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";

    if (!training) {
      button.classList.add("is-rest");
      button.innerHTML = `<span>${weekday}</span><strong>Hviledag</strong><small>Gåtur, mobilitet eller fri</small>`;
      elements.calendarGrid.appendChild(button);
      return;
    }

    const isActive = training.index === activeDay;
    const isDone = state.completed[training.day.id];
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-done", isDone);
    button.innerHTML = `
      <span>${weekday}</span>
      <strong>${training.day.name}</strong>
      <small>${training.day.duration} min · ${training.day.focus}${isDone ? " · klaret" : ""}</small>
    `;
    button.addEventListener("click", () => {
      activeDay = training.index;
      renderPlan();
    });
    elements.calendarGrid.appendChild(button);
  });
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
    item.querySelector(".exercise-meta").textContent = `${exercise.sets} sæt x ${exercise.reps} · pause ${exercise.rest}`;
    const help = document.createElement("small");
    help.className = "exercise-help";
    help.textContent = exercise.explanation || groupExplanations[exercise.group] || "Hold god teknik og stop ved smerte.";
    item.querySelector(".exercise-meta").after(help);
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
  const profile = getProfileFromForm();
  if (!validateAge(profile.age)) return;
  state.profile = profile;
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
  link.download = "træningsplan.json";
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
