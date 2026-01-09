(() => {
  const LS_KEY = "demo_user";

  const $ = (sel) => document.querySelector(sel);

  function safeText(el, value) {
    if (!el) return;
    el.textContent = value;
  }

  function formatDateES(d) {
    // Formato simple: 08/01/2026 (dd/mm/yyyy)
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  function setUser(name) {
    localStorage.setItem(LS_KEY, name);
    render();
  }

  function clearUser() {
    localStorage.removeItem(LS_KEY);
    render();
  }

  function getUser() {
    return localStorage.getItem(LS_KEY) || "Invitado";
  }

  function render() {
    const user = getUser();
    safeText($("#userName"), user);
    safeText($("#footerUser"), user);
  }

  function tickClock() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    safeText($("#clock"), `${hh}:${mm}`);
    safeText($("#today"), formatDateES(d));
  }

  function bind() {
    const btnLogin = $("#btnLogin");
    const btnLogout = $("#btnLogout");

    btnLogin?.addEventListener("click", () => {
      const current = getUser();
      const next = prompt("Ingresa el nombre de usuario:", current === "Invitado" ? "" : current);
      if (next && next.trim().length > 0) setUser(next.trim());
    });

    btnLogout?.addEventListener("click", () => {
      clearUser();
    });
  }

  // init
  render();
  bind();
  tickClock();
  setInterval(tickClock, 10_000); // actualiza cada 10s
})();
