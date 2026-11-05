// Shared site behavior. Editable content lives in data/*.js.
const issueUrl = "https://github.com/hardikcollabs/bunkbench-gndec/issues";
const $ = (selector, root = document) => root.querySelector(selector);
const params = new URLSearchParams(location.search);
const pagePunchlines = {
  "index.html": "Attendance says 75%. Soul says present.",
  "resources.html": "One more PDF and suddenly the semester looks manageable.",
  "timetable.html": "The timetable is readable. The attendance situation is still under investigation.",
  "holidays.html": "Academic calendar said: take a break, bestie.",
  "results.html": "Open the portal. Breathe first. Refresh only with purpose.",
  "about.html": "Built by one student, powered by unreasonable PDF-hunting energy.",
  "updates.html": "Breaking news: someone finally found the official link.",
  "memes.html": "Laugh responsibly. The syllabus is still watching.",
  "subject.html": "One unit at a time. The boss fight is not going anywhere.",
  "admin-guide.html": "No fake admin panel. Just GitHub, files, and responsible chaos."
};

function renderPunchline() {
  const key = location.pathname.split("/").pop() || "index.html";
  const punchline = pagePunchlines[key] || "Student life: now with slightly better navigation.";
  const footer = $(".footer");
  if (!footer || $(".page-punchline")) return;
  const note = document.createElement("p");
  note.className = "page-punchline";
  note.textContent = punchline;
  footer.parentNode.insertBefore(note, footer);
}

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
  $("#menu-toggle")?.addEventListener("click", () => {
    const menu = $("#site-nav");
    const button = $("#menu-toggle");
    const open = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  document.querySelectorAll("#site-nav a").forEach(link => link.addEventListener("click", () => {
    $("#site-nav")?.classList.remove("open");
    $("#menu-toggle")?.setAttribute("aria-expanded", "false");
  }));
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
  const contentLines = lines.filter(line => !linePattern.test(line));
  const content = uniqueGroups.length
    ? contentLines.map(line => {
        const columns = line.split(/\s{2,}/).filter(Boolean);
        return `<div class="timetable-row">${columns.map(column => `<span>${column}</span>`).join("")}</div>`;
      }).join("")
    : contentLines.map(line => `<div>${line}</div>`).join("");
  return uniqueGroups.length
    ? `<div class="timetable-scope subgroup-scope"><span>Sub-section:</span><div class="subgroup-head subgroup-count-${uniqueGroups.length}">${uniqueGroups.map(group => `<span>${group}</span>`).join("")}</div></div><div class="subgroup-content subgroup-count-${uniqueGroups.length}">${content}</div>`
    : `<div class="timetable-scope all-scope">All sub-sections</div>${content}`;
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

function holidayCard(item) {
  return `<article class="holiday-card"><span class="eyebrow">${item[2]}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`;
}

function renderHolidays() {
  if (!$("#regular-holidays") || typeof holidays === "undefined") return;
  $("#holiday-meta").innerHTML = `<span class="eyebrow">${holidayMeta.title}</span><p>${holidayMeta.note}</p><p class="meta">${holidays.length} regular holidays · ${restrictedHolidays.length} restricted holidays · ${halfDayHolidays.length} half-working-day observances · Source document date: ${holidayMeta.sourceDate}</p>`;
  $("#regular-holidays").innerHTML = holidays.map(holidayCard).join("");
  $("#restricted-holidays").innerHTML = restrictedHolidays.map(holidayCard).join("");
  $("#halfday-holidays").innerHTML = halfDayHolidays.map(holidayCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initNav(); initFilters(); renderUpdates(); renderMemes(); renderSubject(); initTimetable(); renderHolidays(); renderPunchline();
  $("#panic-button")?.addEventListener("click", () => $("#panic-checklist")?.classList.toggle("show"));
});
