(() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // --------- Elementos UI ----------
  const cajaNumberEl = $("#cajaNumber");
  const cajaSelect = $("#cajaSelect");
  const btnBuscar = $("#btnBuscar");
  const btnLimpiar = $("#btnLimpiar");
  const form = $("#filtersForm");
  const tbody = $("#resultsBody");
  const clockEl = $("#clock");

  const tableFilterEl = $("#tableFilter");
  const btnClearTableFilter = $("#btnClearTableFilter");
  const resultsCountEl = $("#resultsCount");
  const chipsEl = $("#activeChips");
  const noticeEl = $("#notice");

  const btnPrev = $("#btnPrev");
  const btnNext = $("#btnNext");
  const pageInfoEl = $("#pageInfo");

  const pageSizeEl = $("#pageSize");
  const btnApplyPageSize = $("#btnApplyPageSize");
  const pageSizeHintEl = $("#pageSizeHint");

  if (!tbody) {
    // Si no existe el tbody, no podemos renderizar
    console.error("No se encontró #resultsBody. Revisa el HTML.");
    return;
  }

  // --------- Datos demo ----------
  // (Luego puedes reemplazar demoRows por datos reales del backend/API)
  const demoRows = [
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000124", fecha: "2026-01-08", eco: "12046", nombreEco: "Unidad Centro", cuenta: "1100-200-XYZ-0002", importe: 250.0, nomina: "983211", operador: "María López" },
    { caja: "1", folio: "A-000125", fecha: "2026-01-07", eco: "99801", nombreEco: "Unidad Sur", cuenta: "1100-200-XYZ-0003", importe: 98765.43, nomina: "777001", operador: "Operador con nombre largo" },
    { caja: "1", folio: "A-000126", fecha: "2026-01-06", eco: "45001", nombreEco: "Unidad Poniente", cuenta: "1100-200-XYZ-0004", importe: 18.2, nomina: "555999", operador: "Luis García" },
    { caja: "1", folio: "A-000127", fecha: "2026-01-05", eco: "12045", nombreEco: "Unidad Norte", cuenta: "2100-100-ABC-0100", importe: 3200, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000128", fecha: "2026-01-04", eco: "77777", nombreEco: "Unidad Centro - Sprinter", cuenta: "2100-100-ABC-0101", importe: 199.99, nomina: "100001", operador: "Ana Gómez" },
    { caja: "1", folio: "A-000129", fecha: "2026-01-03", eco: "33333", nombreEco: "Unidad Sur", cuenta: "2100-100-ABC-0102", importe: 890, nomina: "100002", operador: "Carlos Ruiz" },
    { caja: "1", folio: "A-000130", fecha: "2026-01-02", eco: "12046", nombreEco: "Unidad Centro", cuenta: "9999-999-ZZZ-0009", importe: 45.5, nomina: "983211", operador: "María López" },

    { caja: "2", folio: "B-000201", fecha: "2026-01-08", eco: "22001", nombreEco: "Unidad Oriente", cuenta: "3100-200-DEF-0001", importe: 1200, nomina: "200010", operador: "Pedro Sánchez" },
    { caja: "2", folio: "B-000202", fecha: "2026-01-07", eco: "22002", nombreEco: "Unidad Oriente - Pickup", cuenta: "3100-200-DEF-0002", importe: 75.25, nomina: "200011", operador: "Laura Torres" },
    { caja: "2", folio: "B-000203", fecha: "2026-01-06", eco: "12045", nombreEco: "Unidad Norte (temporal)", cuenta: "3100-200-DEF-0003", importe: 600, nomina: "983210", operador: "Juan Pérez" },
    { caja: "2", folio: "B-000204", fecha: "2026-01-05", eco: "88888", nombreEco: "Unidad Especial", cuenta: "3100-200-DEF-0004", importe: 10000, nomina: "200099", operador: "Mónica Vega" },

    { caja: "3", folio: "C-000301", fecha: "2026-01-08", eco: "33001", nombreEco: "Unidad Metropolitana", cuenta: "4100-300-GHI-0001", importe: 999.99, nomina: "300010", operador: "Diego Navarro" },
    { caja: "3", folio: "C-000302", fecha: "2026-01-07", eco: "33002", nombreEco: "Unidad Metropolitana - Van", cuenta: "4100-300-GHI-0002", importe: 12.34, nomina: "300011", operador: "Valeria Ortiz" },
    { caja: "3", folio: "C-000303", fecha: "2026-01-06", eco: "45001", nombreEco: "Unidad Poniente (traslado)", cuenta: "4100-300-GHI-0003", importe: 4500, nomina: "555999", operador: "Luis García" },
    { caja: "3", folio: "C-000304", fecha: "2026-01-05", eco: "12046", nombreEco: "Unidad Centro (apoyo)", cuenta: "4100-300-GHI-0004", importe: 300, nomina: "983211", operador: "María López" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
    { caja: "1", folio: "A-000123", fecha: "2026-01-08", eco: "12045", nombreEco: "Unidad Norte", cuenta: "1100-200-XYZ-0001", importe: 1530.5, nomina: "983210", operador: "Juan Pérez" },
  ];

  // --------- Estado ----------
  const STORAGE_KEY = "opcion1_table_state_v2";

  const state = {
    filters: {
      fechaIni: "",
      fechaFin: "",
      caja: "1",
      eco: "",
      nomina: "",
      global: "",
    },
    sort: { key: "fecha", dir: "desc" }, // asc|desc
    page: { index: 1, size: 10 }, // 1-based
  };

  // --------- Utilidades ----------
  function money(n) {
    try {
      return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(Number(n) || 0);
    } catch {
      return `$${(Number(n) || 0).toFixed(2)}`;
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeText(s) {
    return String(s ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  function parseDateISO(iso) {
    if (!iso) return null;
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }

  function rowToSearchString(r) {
    return normalizeText(
      [r.caja, r.folio, r.fecha, r.eco, r.nombreEco, r.cuenta, r.importe, r.nomina, r.operador].join(" ")
    );
  }

  function debounce(fn, wait = 200) {
    let t = null;
    return (...args) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  // 10–100 en pasos de 10
  function sanitizePageSize(raw) {
    const n = Number(String(raw ?? "").trim());
    if (!Number.isFinite(n) || n <= 0) return 10;

    const capped = Math.min(n, 100);
    const minned = Math.max(capped, 10);

    const rounded = Math.ceil(minned / 10) * 10;
    return Math.min(Math.max(rounded, 10), 100);
  }

  function setNotice(text) {
    if (!noticeEl) return;
    if (!text) {
      noticeEl.style.display = "none";
      noticeEl.textContent = "";
      return;
    }
    noticeEl.style.display = "block";
    noticeEl.textContent = text;
  }

  function highlight(text, tokens) {
    const original = String(text ?? "");
    if (!tokens || !tokens.length) return escapeHtml(original);

    const norm = normalizeText(original);
    const ranges = [];

    for (const tok of tokens) {
      const needle = normalizeText(tok);
      if (!needle) continue;

      let start = 0;
      while (true) {
        const idx = norm.indexOf(needle, start);
        if (idx === -1) break;
        ranges.push([idx, idx + needle.length]);
        start = idx + needle.length;
      }
    }

    if (!ranges.length) return escapeHtml(original);

    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [];
    for (const r of ranges) {
      if (!merged.length || r[0] > merged[merged.length - 1][1]) merged.push(r);
      else merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], r[1]);
    }

    let out = "";
    let i = 0;
    for (const [a, b] of merged) {
      out += escapeHtml(original.slice(i, a));
      out += `<mark>${escapeHtml(original.slice(a, b))}</mark>`;
      i = b;
    }
    out += escapeHtml(original.slice(i));
    return out;
  }

  function tokensForHighlight() {
    const t = [];
    if (state.filters.global) t.push(...normalizeText(state.filters.global).split(/\s+/).filter(Boolean));
    if (state.filters.eco) t.push(state.filters.eco);
    if (state.filters.nomina) t.push(state.filters.nomina);
    return Array.from(new Set(t));
  }

  // --------- Persistencia ----------
  function readFromURL() {
    const p = new URLSearchParams(location.search);
    const gotAny =
      p.has("caja") || p.has("eco") || p.has("nomina") || p.has("q") || p.has("fi") || p.has("ff") ||
      p.has("ps") || p.has("p") || p.has("sk") || p.has("sd");
    if (!gotAny) return false;

    state.filters.caja = p.get("caja") || state.filters.caja;
    state.filters.eco = p.get("eco") || "";
    state.filters.nomina = p.get("nomina") || "";
    state.filters.global = p.get("q") || "";
    state.filters.fechaIni = p.get("fi") || "";
    state.filters.fechaFin = p.get("ff") || "";

    state.page.size = sanitizePageSize(p.get("ps") || state.page.size);
    state.page.index = Math.max(1, Number(p.get("p") || 1));

    state.sort.key = p.get("sk") || state.sort.key;
    state.sort.dir = (p.get("sd") === "asc" ? "asc" : "desc");

    return true;
  }

  function readFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const saved = JSON.parse(raw);

      if (saved?.filters) Object.assign(state.filters, saved.filters);
      if (saved?.sort) Object.assign(state.sort, saved.sort);
      if (saved?.page) Object.assign(state.page, saved.page);

      state.page.size = sanitizePageSize(state.page.size);
      state.page.index = Math.max(1, Number(state.page.index || 1));
      return true;
    } catch {
      return false;
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  function writeToURL() {
    const p = new URLSearchParams();

    if (state.filters.caja) p.set("caja", state.filters.caja);
    if (state.filters.eco) p.set("eco", state.filters.eco);
    if (state.filters.nomina) p.set("nomina", state.filters.nomina);
    if (state.filters.global) p.set("q", state.filters.global);
    if (state.filters.fechaIni) p.set("fi", state.filters.fechaIni);
    if (state.filters.fechaFin) p.set("ff", state.filters.fechaFin);

    p.set("ps", String(state.page.size));
    p.set("p", String(state.page.index));
    p.set("sk", state.sort.key);
    p.set("sd", state.sort.dir);

    const newUrl = `${location.pathname}?${p.toString()}`;
    history.replaceState(null, "", newUrl);
  }

  // --------- Leer / Escribir UI ----------
  function readFiltersFromUI() {
    state.filters.fechaIni = $("#fechaIni")?.value || "";
    state.filters.fechaFin = $("#fechaFin")?.value || "";
    state.filters.caja = cajaSelect?.value || "1";
    state.filters.eco = $("#eco")?.value?.trim() || "";
    state.filters.nomina = $("#nomina")?.value?.trim() || "";
    state.filters.global = tableFilterEl?.value?.trim() || "";
  }

  function writeStateToUI() {
    const fi = $("#fechaIni");
    const ff = $("#fechaFin");
    const eco = $("#eco");
    const nomina = $("#nomina");

    if (fi) fi.value = state.filters.fechaIni || "";
    if (ff) ff.value = state.filters.fechaFin || "";
    if (eco) eco.value = state.filters.eco || "";
    if (nomina) nomina.value = state.filters.nomina || "";

    if (cajaSelect) cajaSelect.value = state.filters.caja || "1";
    if (cajaNumberEl) cajaNumberEl.textContent = state.filters.caja || "1";

    if (tableFilterEl) tableFilterEl.value = state.filters.global || "";

    if (pageSizeEl) pageSizeEl.value = String(state.page.size || 10);
    if (pageSizeHintEl) pageSizeHintEl.textContent = "10–100";
  }

  // --------- Filtros ----------
  function applyAllFilters(rows) {
    const f = state.filters;
    const dIni = parseDateISO(f.fechaIni);
    const dFin = parseDateISO(f.fechaFin);

    if (dIni && dFin && dIni > dFin) {
      setNotice("La fecha inicial es mayor que la fecha final. Corrige el rango.");
      return [];
    }
    setNotice("");

    const dFinInclusive = dFin ? new Date(dFin.getTime() + 24 * 60 * 60 * 1000 - 1) : null;

    const ecoNeedle = normalizeText(f.eco);
    const nominaNeedle = normalizeText(f.nomina);
    const tokens = normalizeText(f.global).split(/\s+/).filter(Boolean);

    return rows.filter((r) => {
      if (f.caja && String(r.caja) !== String(f.caja)) return false;

      if (dIni || dFinInclusive) {
        const rd = parseDateISO(r.fecha);
        if (!rd) return false;
        if (dIni && rd < dIni) return false;
        if (dFinInclusive && rd > dFinInclusive) return false;
      }

      if (ecoNeedle && !normalizeText(r.eco).includes(ecoNeedle)) return false;
      if (nominaNeedle && !normalizeText(r.nomina).includes(nominaNeedle)) return false;

      if (tokens.length) {
        const haystack = rowToSearchString(r);
        for (const t of tokens) {
          if (!haystack.includes(t)) return false;
        }
      }

      return true;
    });
  }

  // --------- Sorting ----------
  function compare(a, b, key) {
    const av = a[key];
    const bv = b[key];

    if (key === "importe") return (Number(av) || 0) - (Number(bv) || 0);
    if (key === "fecha") return String(av).localeCompare(String(bv)); // ISO YYYY-MM-DD

    return String(av ?? "").localeCompare(String(bv ?? ""), "es", { numeric: true, sensitivity: "base" });
  }

  function sortRows(rows) {
    const { key, dir } = state.sort;
    const sorted = [...rows].sort((a, b) => compare(a, b, key));
    return dir === "asc" ? sorted : sorted.reverse();
  }

  function updateSortIndicators() {
    $$("th.sortable").forEach((th) => {
      th.classList.remove("sorted-asc", "sorted-desc");
      const k = th.getAttribute("data-key");
      if (k === state.sort.key) th.classList.add(state.sort.dir === "asc" ? "sorted-asc" : "sorted-desc");
    });
  }

  // --------- Paginación ----------
  function paginate(rows) {
    const size = state.page.size;
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / size));

    state.page.index = Math.min(Math.max(1, state.page.index), totalPages);

    const start = (state.page.index - 1) * size;
    const pageRows = rows.slice(start, start + size);

    return { pageRows, total, totalPages };
  }

  function updatePager(total, totalPages) {
    if (resultsCountEl) resultsCountEl.textContent = `Encontrados: ${total}`;
    if (pageInfoEl) pageInfoEl.textContent = `${state.page.index} / ${totalPages}`;

    if (btnPrev) btnPrev.disabled = state.page.index <= 1;
    if (btnNext) btnNext.disabled = state.page.index >= totalPages;
  }

  // --------- Chips ----------
function renderChips() {
  if (!chipsEl) return;
  chipsEl.innerHTML = "";

  const chips = [];
  const f = state.filters;

  // Caja SIEMPRE se muestra, pero NO es removible
  if (f.caja) chips.push({ key: "caja", label: `Caja: ${f.caja}`, removable: false });

  // Los demás sí son removibles
  if (f.fechaIni || f.fechaFin)
    chips.push({ key: "fecha", label: `Rango: ${f.fechaIni || "…"} → ${f.fechaFin || "…"}`, removable: true });

  if (f.eco) chips.push({ key: "eco", label: `Eco: ${f.eco}`, removable: true });
  if (f.nomina) chips.push({ key: "nomina", label: `Nómina: ${f.nomina}`, removable: true });
  if (f.global) chips.push({ key: "global", label: `Buscar: ${f.global}`, removable: true });

  if (!chips.length) return;

  for (const c of chips) {
    const el = document.createElement("div");
    el.className = `chip ${c.removable ? "chip-removable" : "chip-fixed"}`;

    if (!c.removable) {
      // Sin botón
      el.innerHTML = `<span>${escapeHtml(c.label)}</span>`;
      chipsEl.appendChild(el);
      continue;
    }

    // Con botón bonito
    el.innerHTML = `
      <span>${escapeHtml(c.label)}</span>
      <button type="button" class="chip-x" aria-label="Quitar filtro">×</button>
    `;

    el.querySelector("button").addEventListener("click", () => {
      if (c.key === "fecha") {
        state.filters.fechaIni = "";
        state.filters.fechaFin = "";
        const fi = $("#fechaIni");
        const ff = $("#fechaFin");
        if (fi) fi.value = "";
        if (ff) ff.value = "";
      } else if (c.key === "eco") {
        state.filters.eco = "";
        const eco = $("#eco");
        if (eco) eco.value = "";
      } else if (c.key === "nomina") {
        state.filters.nomina = "";
        const nom = $("#nomina");
        if (nom) nom.value = "";
      } else if (c.key === "global") {
        state.filters.global = "";
        if (tableFilterEl) tableFilterEl.value = "";
      }

      state.page.index = 1;
      runSearchAndRender();
    });

    chipsEl.appendChild(el);
  }
}


  // --------- Render tabla ----------
  function renderTable(rows) {
    tbody.innerHTML = "";

    if (!rows.length) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="8" style="padding:14px 10px; color: rgba(255,255,255,.7);">Sin resultados.</td>`;
      tbody.appendChild(tr);
      return;
    }

    const hlTokens = tokensForHighlight();

    for (const r of rows) {
      const tr = document.createElement("tr");
      tr.dataset.folio = r.folio;

      tr.innerHTML = `
        <td>${highlight(r.folio, hlTokens)}</td>
        <td>${highlight(r.fecha, hlTokens)}</td>
        <td>${highlight(r.eco, hlTokens)}</td>
        <td>${highlight(r.nombreEco, hlTokens)}</td>
        <td>${highlight(r.cuenta, hlTokens)}</td>
        <td class="right">${highlight(money(r.importe), hlTokens)}</td>
        <td>${highlight(r.nomina, hlTokens)}</td>
        <td>${highlight(r.operador, hlTokens)}</td>
      `;

      tbody.appendChild(tr);
    }
  }

  // --------- Pipeline completo ----------
  function runSearchAndRender() {
    readFiltersFromUI();

    const filtered = applyAllFilters(demoRows);
    const sorted = sortRows(filtered);
    const { pageRows, total, totalPages } = paginate(sorted);

    renderChips();
    updateSortIndicators();
    renderTable(pageRows);
    updatePager(total, totalPages);

    saveToStorage();
    writeToURL();
  }

  const runDebounced = debounce(() => runSearchAndRender(), 200);

  // --------- Page size: Enter + OK ----------
  function applyPageSizeFromInput() {
    if (!pageSizeEl) return;
    const next = sanitizePageSize(pageSizeEl.value);
    state.page.size = next;
    state.page.index = 1;
    pageSizeEl.value = String(next);
    runSearchAndRender();
  }

  // --------- Eventos ----------
  function bind() {
    cajaSelect?.addEventListener("change", () => {
      if (cajaNumberEl) cajaNumberEl.textContent = cajaSelect.value;
      state.page.index = 1;
      runDebounced();
    });

    btnBuscar?.addEventListener("click", () => {
      state.page.index = 1;
      runSearchAndRender();
    });

    // btn Limpiar solo Todo
    btnLimpiar?.addEventListener("click", () => {
  form?.reset();

  state.filters = {
    fechaIni: "",
    fechaFin: "",
    caja: "1",
    eco: "",
    nomina: "",
    global: ""
  };

  // 🔽 Resetear orden a FOLIO
  state.sort = { key: "folio", dir: "desc" };

  // Resetear paginación
  state.page = { index: 1, size: 10 };

  if (cajaSelect) cajaSelect.value = "1";
  if (cajaNumberEl) cajaNumberEl.textContent = "1";
  if (tableFilterEl) tableFilterEl.value = "";
  if (pageSizeEl) pageSizeEl.value = "10";

  setNotice("");

  runSearchAndRender(); // <-- aquí se actualiza la flecha
});


    tableFilterEl?.addEventListener("input", () => {
      state.page.index = 1;
      runDebounced();
    });

    // btn Limpiar solo filtros
/* 
    btnClearTableFilter?.addEventListener("click", () => {
      if (tableFilterEl) tableFilterEl.value = "";
      tableFilterEl?.focus();
      state.page.index = 1;
      runSearchAndRender();
    });
*/
btnClearTableFilter?.addEventListener("click", () => {
  if (tableFilterEl) tableFilterEl.value = "";
  tableFilterEl?.focus();

  // 🔽 Resetear orden también (igual que el limpiar de arriba)
  state.sort = { key: "folio", dir: "desc" };

  state.page.index = 1;
  runSearchAndRender();
});


    ["#eco", "#nomina", "#fechaIni", "#fechaFin"].forEach((sel) => {
      const el = $(sel);
      el?.addEventListener("input", () => {
        state.page.index = 1;
        runDebounced();
      });
      el?.addEventListener("change", () => {
        state.page.index = 1;
        runDebounced();
      });
    });

    $$("th.sortable").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.getAttribute("data-key");
        if (!key) return;

        if (state.sort.key === key) {
          state.sort.dir = state.sort.dir === "asc" ? "desc" : "asc";
        } else {
          state.sort.key = key;
          state.sort.dir = "asc";
        }
        runSearchAndRender();
      });
    });

    btnPrev?.addEventListener("click", () => {
      state.page.index = Math.max(1, state.page.index - 1);
      runSearchAndRender();
    });

    btnNext?.addEventListener("click", () => {
      state.page.index = state.page.index + 1;
      runSearchAndRender();
    });

    pageSizeEl?.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      applyPageSizeFromInput();
    });

    pageSizeEl?.addEventListener("blur", () => {
      if (!pageSizeEl.value.trim()) {
        pageSizeEl.value = String(state.page.size);
        return;
      }
      applyPageSizeFromInput();
    });

    btnApplyPageSize?.addEventListener("click", () => {
      applyPageSizeFromInput();
      pageSizeEl?.focus();
    });
  }

  // --------- Clock ----------
  function tickClock() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    if (clockEl) clockEl.textContent = `${hh}:${mm}`;
  }

  // --------- Init ----------
  tickClock();
  setInterval(tickClock, 10_000);

  const usedURL = readFromURL();
  if (!usedURL) readFromStorage();

  state.page.size = sanitizePageSize(state.page.size || 10);
  state.page.index = Math.max(1, Number(state.page.index || 1));

  writeStateToUI();
  bind();
  runSearchAndRender();
})();