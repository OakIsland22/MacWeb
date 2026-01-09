(() => {
  const $ = (sel) => document.querySelector(sel);

  const cajaNumberEl = $("#cajaNumber");
  const cajaSelect = $("#cajaSelect");
  const btnBuscar = $("#btnBuscar");
  const btnLimpiar = $("#btnLimpiar");
  const form = $("#filtersForm");
  const tbody = $("#resultsBody");
  const clockEl = $("#clock");

  // Datos demo (relleno)
  const demoRows = [
    {
      folio: "A-000123",
      fecha: "2026-01-08",
      eco: "12045",
      nombreEco: "Unidad Norte - Camión con descripción larga para probar ajuste de texto",
      cuenta: "1100-200-XYZ-0001",
      importe: 1530.5,
      nomina: "983210",
      operador: "Juan Pérez"
    },
    {
      folio: "A-000124",
      fecha: "2026-01-08",
      eco: "12046",
      nombreEco: "Unidad Centro",
      cuenta: "1100-200-XYZ-0002",
      importe: 250.0,
      nomina: "983211",
      operador: "María López"
    },
    {
      folio: "A-000125",
      fecha: "2026-01-07",
      eco: "99801",
      nombreEco: "Unidad Sur - Otro texto largo para asegurar que no rompa la tabla y se acomode bien en varias líneas",
      cuenta: "1100-200-XYZ-0003",
      importe: 98765.43,
      nomina: "777001",
      operador: "Operador con nombre muy largo para testear el layout"
    },
    {
      folio: "A-000126",
      fecha: "2026-01-06",
      eco: "45001",
      nombreEco: "Unidad Poniente",
      cuenta: "1100-200-XYZ-0004",
      importe: 18.2,
      nomina: "555999",
      operador: "Luis García"
    }
  ];

  function money(n) {
    try {
      return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);
    } catch {
      return `$${Number(n).toFixed(2)}`;
    }
  }

  function renderTable(rows) {
    tbody.innerHTML = "";

    rows.forEach((r) => {
      const tr = document.createElement("tr");
      tr.dataset.folio = r.folio;

      tr.innerHTML = `
        <td>${escapeHtml(r.folio)}</td>
        <td>${escapeHtml(r.fecha)}</td>
        <td>${escapeHtml(r.eco)}</td>
        <td>${escapeHtml(r.nombreEco)}</td>
        <td>${escapeHtml(r.cuenta)}</td>
        <td class="right">${escapeHtml(money(r.importe))}</td>
        <td>${escapeHtml(r.nomina)}</td>
        <td>${escapeHtml(r.operador)}</td>
      `;

      tr.addEventListener("dblclick", () => {
        console.log(`Doble clic en folio ${r.folio}`, r);
      });

      tbody.appendChild(tr);
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function tickClock() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    if (clockEl) clockEl.textContent = `${hh}:${mm}`;
  }

  function readFilters() {
    const fechaIni = $("#fechaIni")?.value || "";
    const fechaFin = $("#fechaFin")?.value || "";
    const caja = cajaSelect?.value || "1";
    const eco = $("#eco")?.value?.trim() || "";
    const nomina = $("#nomina")?.value?.trim() || "";

    return { fechaIni, fechaFin, caja, eco, nomina };
  }

  function bind() {
    cajaSelect?.addEventListener("change", () => {
      cajaNumberEl.textContent = cajaSelect.value;
    });

    btnBuscar?.addEventListener("click", () => {
      const f = readFilters();
      console.log("Buscar (demo). Filtros:", f);

      // Demo: no filtra de verdad, solo vuelve a renderizar.
      // Si quieres que haga filtro real, lo hacemos en 1 minuto con reglas claras.
      renderTable(demoRows);
    });

    btnLimpiar?.addEventListener("click", () => {
      form?.reset();

      // Reset manual de UI dependiente
      cajaSelect.value = "1";
      cajaNumberEl.textContent = "1";

      console.log("Filtros reiniciados (demo).");
      renderTable(demoRows);
    });
  }

  // Init
  renderTable(demoRows);
  bind();
  tickClock();
  setInterval(tickClock, 10_000);
})();

