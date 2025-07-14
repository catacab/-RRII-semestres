const courses = [
  // PRIMER SEMESTRE
  { code: "RRII101", name: "Introducción a las RRII", semester: 1, prerequisites: [] },
  { code: "RRII102", name: "Derechos Sociales", semester: 1, prerequisites: [] },
  { code: "RRII103", name: "Principios del Derecho Constitucional", semester: 1, prerequisites: [] },
  { code: "RRII104", name: "Teoría General del Derecho", semester: 1, prerequisites: [] },

  // SEGUNDO SEMESTRE
  { code: "RRII201", name: "Economía: Conceptos Fundamentales", semester: 2, prerequisites: [] },
  { code: "RRII202", name: "Historia de las RRII I", semester: 2, prerequisites: ["RRII101"] },
  { code: "RRII203", name: "Introducción a la Investigación", semester: 2, prerequisites: [] },
  { code: "RRII204", name: "Nociones Derecho Privado", semester: 2, prerequisites: [] },
  { code: "RRII205", name: "Taller de Metodología de la Investigación", semester: 2, prerequisites: ["RRII203"] },

  // TERCER SEMESTRE
  { code: "RRII301", name: "Derecho Internacional Público I", semester: 3, prerequisites: ["RRII103", "RRII104"] },
  { code: "RRII302", name: "Régimen Jurídico del Comercio Ext. I", semester: 3, prerequisites: ["RRII204"] },
  { code: "RRII303", name: "Organización Empresarial", semester: 3, prerequisites: [] },
  { code: "RRII304", name: "Comercio Internacional", semester: 3, prerequisites: ["RRII201"] },
  { code: "RRII305", name: "Estadística: Técnicas y Métodos", semester: 3, prerequisites: ["RRII205"] },

  // CUARTO SEMESTRE
  { code: "RRII401", name: "Régimen Jurídico del Comercio Ext. II", semester: 4, prerequisites: ["RRII302"] },
  { code: "RRII402", name: "Organización del Comercio", semester: 4, prerequisites: ["RRII304"] },
  { code: "RRII403", name: "Historia de las RRII en América", semester: 4, prerequisites: ["RRII202"] },
  { code: "RRII404", name: "Estadística Aplicada", semester: 4, prerequisites: ["RRII305"] },

  // QUINTO SEMESTRE
  { code: "RRII501", name: "Derecho Internacional Privado I", semester: 5, prerequisites: ["RRII204"] },
  { code: "RRII502", name: "Comercialización Internacional", semester: 5, prerequisites: [] },
  { code: "RRII503", name: "Historia de las RRII II", semester: 5, prerequisites: ["RRII403", "RRII202", "RRII101"] },
  { code: "RRII504", name: "Práctica de Comercio Exterior", semester: 5, prerequisites: ["RRII401"] },
  { code: "RRII505", name: "Taller de Técnicas de Investigación", semester: 5, prerequisites: ["RRII404"] },

  // SEXTO SEMESTRE
  { code: "RRII601", name: "Derecho Internacional Público II", semester: 6, prerequisites: ["RRII301"] },
  { code: "RRII602", name: "Derecho Internacional Privado II", semester: 6, prerequisites: ["RRII501"] },
  { code: "RRII603", name: "Finanzas Internacionales", semester: 6, prerequisites: ["RRII304"] },
  { code: "RRII604", name: "Teoría de las RRII III", semester: 6, prerequisites: ["RRII503"] },
  { code: "RRII605", name: "Técnicas de Negociación", semester: 6, prerequisites: [] },

  // SÉPTIMO SEMESTRE
  { code: "RRII701", name: "Economía Mundial y RRII", semester: 7, prerequisites: ["RRII201"] },
  { code: "RRII702", name: "Laboratorio de Competitividad", semester: 7, prerequisites: ["RRII603", "RRII505"] },
  { code: "RRII703", name: "Derecho Diplomático y Consular", semester: 7, prerequisites: ["RRII601"] },
  { code: "RRII704", name: "Cooperación Internacional", semester: 7, prerequisites: ["RRII601"] },

  // OCTAVO SEMESTRE
  { code: "RRII801", name: "Funciones Universitarias: Enseñanza e Investigación", semester: 8, prerequisites: ["RRII505"] },
  { code: "RRII802", name: "Política Exterior Uruguaya", semester: 8, prerequisites: [] },
  { code: "RRII803", name: "Análisis de Coyuntura Internacional", semester: 8, prerequisites: ["RRII701"] },
  { code: "RRII804", name: "Teoría de las RRII II", semester: 8, prerequisites: ["RRII604"] },
  { code: "RRII805", name: "Teoría RRII III + Taller + DIP II", semester: 8, prerequisites: ["RRII604", "RRII505", "RRII602"] }
];

const malla = document.getElementById("malla");

function createCourseCard(course) {
  const div = document.createElement("div");
  div.className = "course locked";
  div.innerText = `${course.name}\n(Semestre ${course.semester})`;
  div.dataset.code = course.code;
  div.dataset.completed = "false";

  if (course.prerequisites.length === 0) {
    div.classList.remove("locked");
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("locked")) return;
    const isCompleted = div.classList.contains("completed");
    div.classList.toggle("completed", !isCompleted);
    div.dataset.completed = !isCompleted;
    updateAvailability();
  });

  return div;
}

function updateAvailability() {
  document.querySelectorAll(".course").forEach(courseDiv => {
    const code = courseDiv.dataset.code;
    const course = courses.find(c => c.code === code);
    if (course.prerequisites.length === 0) return;

    const prereqMet = course.prerequisites.every(prereq => {
      const prereqDiv = document.querySelector(`.course[data-code="${prereq}"]`);
      return prereqDiv?.dataset.completed === "true";
    });

    courseDiv.classList.toggle("locked", !prereqMet);
  });
}

function renderMalla() {
  courses
    .sort((a, b) => a.semester - b.semester)
    .forEach(course => {
      const courseCard = createCourseCard(course);
      malla.appendChild(courseCard);
    });
}

renderMalla();
