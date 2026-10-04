/* ------------------------------------------------------------------
   SITE SETTINGS — edit these values, nothing else needs to change.
   Leave a value as "" until you have it; the site hides or softens
   anything that is still empty.
------------------------------------------------------------------- */
const SITE = {
  stripeUrl: "",        // Stripe payment link for card donations, e.g. "https://donate.stripe.com/..."
  paypalUrl: "https://www.paypal.com/donate/?hosted_button_id=VV5JKS7ZLL2F6",
  ticketUrl: "https://www.zeffy.com/en-US/ticketing/when-trials-come",       // Zeffy ticket link for the "When Trials Come" event
  ein: "42-3268532",             // e.g. "12-3456789"
  email: "nazaridigar.usa@gmail.com",           // public contact email
  mailingAddress: "",   // where checks can be mailed, e.g. "Nazari Digar, PO Box 123, City, ST 00000"
  instagram: "https://www.instagram.com/nazaridigar_nonprofit/",       // full profile URL
  facebook: ""          // full page URL
};

(function () {
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Donate buttons in the header and hero lead to the Ways to Give section.
  $$("[data-donate]").forEach((a) => (a.href = "#donate"));

  // Payment buttons appear once their link is set above.
  [["stripe", SITE.stripeUrl], ["paypal", SITE.paypalUrl]].forEach(([name, url]) => {
    $$('[data-pay="' + name + '"]').forEach((a) => {
      if (url) {
        a.href = url;
        a.hidden = false;
      }
    });
    $$('[data-pay-pending="' + name + '"]').forEach((el) => (el.hidden = !!url));
  });

  // Event tickets
  $$("[data-ticket]").forEach((a) => {
    if (SITE.ticketUrl) {
      a.href = SITE.ticketUrl;
      a.target = "_blank";
      a.rel = "noopener";
      a.hidden = false;
    }
  });
  $$("[data-ticket-pending]").forEach((el) => (el.hidden = !!SITE.ticketUrl));

  // EIN
  $$("[data-ein]").forEach((el) => {
    if (SITE.ein) el.textContent = "(EIN " + SITE.ein + ")";
    else el.hidden = true;
  });

  // Email
  $$("[data-email]").forEach((el) => {
    if (SITE.email) {
      el.innerHTML = "";
      const a = document.createElement("a");
      a.href = "mailto:" + SITE.email;
      a.textContent = SITE.email;
      el.appendChild(a);
    }
  });
  $$("[data-email-button]").forEach((a) => {
    if (SITE.email) a.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent(a.dataset.emailButton || "Hello from the website");
    else a.hidden = true;
  });

  // Mailing address
  $$("[data-address]").forEach((el) => {
    if (SITE.mailingAddress) el.textContent = SITE.mailingAddress;
  });

  // Social links
  [["instagram", SITE.instagram], ["facebook", SITE.facebook]].forEach(([name, url]) => {
    $$('[data-social="' + name + '"]').forEach((a) => {
      if (url) a.href = url;
      else a.hidden = true;
    });
  });
  const socialWrap = document.querySelector("[data-social-wrap]");
  if (socialWrap && !SITE.instagram && !SITE.facebook) socialWrap.hidden = true;

  // Photo slots: show a branded placeholder until the photo file exists.
  $$(".photo img").forEach((img) => {
    const missing = () => {
      img.closest(".photo").classList.add("is-empty");
      img.remove();
    };
    if (img.complete && img.naturalWidth === 0) missing();
    else img.addEventListener("error", missing, { once: true });
  });

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Footer year
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
