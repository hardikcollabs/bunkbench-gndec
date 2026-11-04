// Shared site behavior. Editable content lives in data/*.js.
const issueUrl = "https://github.com/hardikcollabs/bunkbench-gndec/issues";
const $ = (selector, root = document) => root.querySelector(selector);
const params = new URLSearchParams(location.search);

function resourceLink(item) {
  return item.officialSourceLink || item.fileLink || "#";
}

function officialLabel(item) {
  return item.officialSourceLink ? '<span class="badge official">Official source link</span>' : "";
}

function resourceCard(item) {
  return `<article class="resource-card">
    <div class="card-top"><span class="badge">${item.type}</span>${officialLabel(item)}</div>
    <h3>${item.title}</h3><p>${item.description}</p>
    <div class="meta">${item.subject} · ${item.semester}</div>
    <a class="text-link" href="${resourceLink(item)}" ${resourceLink(item).startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>Open resource ↗</a>
  </article>`;
}

function renderResources() {
  const grid = $("#resource-grid");
  if (!grid) return;
  const semester = $("#semester-filter")?.value || "all";
  const subject = $("#subject-filter")?.value || "all";
  const type = $("#type-filter")?.value || "all";
  const query = ($("#resource-search")?.value || "").toLowerCase();
  const filtered = resources.filter(item =>
    (semester === "all" || item.semester === semester) &&
    (subject === "all" || item.subject === subject) &&
    (type === "all" || item.type === type) &&
    `${item.title} ${item.description} ${item.subject}`.toLowerCase().includes(query)
  );
  grid.innerHTML = filtered.length ? filtered.map(resourceCard).join("") : '<div class="empty-state">No resources found. The bench is searching.</div>';
  const count = $("#resource-count");
  if (count) count.textContent = `${filtered.length} resource${filtered.length === 1 ? "" : "s"} found`;
}

function renderUpdates() {
  const target = $("#updates-list");
  if (!target) return;
  target.innerHTML = updates.map(update => `<article class="update-card"><span class="badge ${update.isOfficialSource ? "official" : ""}">${update.category}</span><h3>${update.title}</h3><p>${update.description}</p><div class="meta">${update.date}</div><a class="text-link" href="${update.link}" ${update.link.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>Open update ↗</a></article>`).join("");
}

function renderMemes() {
  const target = $("#meme-grid");
  if (!target) return;
  target.innerHTML = memes.filter(meme => meme.isApproved).map(meme => `<article class="meme-card">${meme.imagePath !== "#" ? `<img src="${meme.imagePath}" alt="${meme.caption}">` : '<div class="meme-art">MECH<br>MODE</div>'}<div class="meme-copy"><p>${meme.caption}</p><small>Credit: ${meme.credit}</small></div></article>`).join("");
}

function renderSubject() {
  const target = $("#subject-detail");
  if (!target) return;
  const slug = params.get("subject") || subjects[0].slug;
  const subject = subjects.find(item => item.slug === slug) || subjects[0];
  const subjectResources = resources.filter(item => item.subject === subject.name);
  target.innerHTML = `<a class="back-link" href="index.html#semester">← Back to Semester 3</a>
    <div class="subject-hero"><span class="subject-icon">${subject.icon}</span><div><span class="eyebrow">${subject.semester}</span><h1>${subject.name}</h1><p>${subject.intro}</p></div></div>
    <section class="detail-grid"><div class="panel"><span class="eyebrow">Syllabus units</span><h2>Know the battlefield</h2>${subject.units.length ? `<ul class="unit-list">${subject.units.map(unit => `<li>${unit}</li>`).join("")}</ul>` : '<p>Units will be added from an uploaded, verified syllabus document. No invented academic content on this bench.</p>'}</div><div class="panic-box"><span class="eyebrow">Before you panic</span><h2>Do one small thing.</h2><p>Open one resource, write one page, then take the next sensible step. Momentum is a study technique.</p><a class="button button-dark" href="resources.html?subject=${encodeURIComponent(subject.name)}">Open resources</a></div></section>
    <section><div class="section-heading"><div><span class="eyebrow">Subject vault</span><h2>Everything for ${subject.name}</h2></div></div><div class="resource-grid">${subjectResources.map(resourceCard).join("")}</div></section>`;
}

function initFilters() {
  if (!$("#resource-grid")) return;
  const subjectSelect = $("#subject-filter");
  subjects.forEach(subject => subjectSelect.insertAdjacentHTML("beforeend", `<option>${subject.name}</option>`));
  const querySubject = params.get("subject");
  if (querySubject) subjectSelect.value = querySubject;
  ["#semester-filter", "#subject-filter", "#type-filter", "#resource-search"].forEach(selector => $(selector)?.addEventListener("input", renderResources));
  if (params.get("type")) $("#type-filter").value = params.get("type");
  renderResources();
}

function initNav() {
  $("#menu-toggle")?.addEventListener("click", () => $("#site-nav").classList.toggle("open"));
  $("#theme-toggle")?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("bunkbench-theme", document.body.classList.contains("light") ? "light" : "dark");
  });
  if (localStorage.getItem("bunkbench-theme") === "light") document.body.classList.add("light");
  document.querySelectorAll("[data-issue-link]").forEach(link => link.href = issueUrl);
}

function renderTimetable(section = "MEA") {
  const target = $("#timetable-view");
  const meta = $("#timetable-meta");
  if (!target || typeof timetable === "undefined") return;
  const selected = timetable[section];
  if (meta) {
    meta.innerHTML = `<span class="eyebrow">${timetableMeta.title}</span><p><strong>${timetableMeta.period}</strong> · Generated ${timetableMeta.generated}</p><p>${timetableMeta.note}</p><a class="text-link" href="${timetableMeta.sourceUrl}" target="_blank" rel="noreferrer">${timetableMeta.sourceLabel} ↗</a>`;
  }
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  target.innerHTML = `<section class="timetable-panel"><div class="section-heading"><div><span class="eyebrow">Selected section</span><h2>${selected.label}</h2></div></div><div class="timetable-scroll"><table class="timetable"><thead><tr><th>Time</th>${timetableDays.map(day => `<th class="${day === today ? "today" : ""}">${day}${day === today ? " · today" : ""}</th>`).join("")}</tr></thead><tbody>${selected.rows.map((row, rowIndex) => `<tr><th>${timetableSlots[rowIndex]}</th>${row.map((cell, dayIndex) => `<td class="${timetableDays[dayIndex] === today ? "today" : ""}">${timetableCell(cell, section)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
}

function timetableCell(lines, section) {
  if (!lines.length) return "—";
  const text = lines.join(" ");
  const pattern = section === "MEA" ? /D2 ME A([123])/g : /D2 ME B([123])/g;
  const linePattern = section === "MEA" ? /D2 ME A[123]/ : /D2 ME B[123]/;
  const groups = [...text.matchAll(pattern)].map(match => `${section}${match[1]}`);
  const uniqueGroups = [...new Set(groups)];
  const content = lines.filter(line => !linePattern.test(line)).map(line => `<div>${line}</div>`).join("");
  return `<div class="timetable-scope ${uniqueGroups.length ? "subgroup-scope" : "all-scope"}">${uniqueGroups.length ? `Sub-section: ${uniqueGroups.join(" · ")}` : "All sub-sections"}</div>${content}`;
}

function initTimetable() {
  if (!$("#timetable-view")) return;
  document.querySelectorAll(".timetable-tab").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".timetable-tab").forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.classList.toggle("button-ghost", !active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderTimetable(button.dataset.section);
  }));
  renderTimetable();
}

document.addEventListener("DOMContentLoaded", () => {
  initNav(); initFilters(); renderUpdates(); renderMemes(); renderSubject(); initTimetable();
  $("#panic-button")?.addEventListener("click", () => $("#panic-checklist")?.classList.toggle("show"));
});
