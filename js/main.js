/* ==========================================================
   Cozy Cafe — main script
   Edit the MENU below to change items, prices or photos.
   ========================================================== */
const IMG = (id, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

const MENU = {
  breakfast: {
    title: "Breakfast",
    subtitle: "Fresh from the oven, every morning",
    items: [
      { name: "Butter Croissant", price: "$200", img: "1681218079567-35aef7c8e7e4", desc: "Flaky, golden and layered with real butter.", popular: true },
      { name: "Chocolate Croissant", price: "$500", img: "1681218424681-b4f8228ecea9", desc: "Buttery pastry wrapped around rich dark chocolate." },
      { name: "Toast & Jam", price: "$900", img: "1651002488658-631108f38b08", desc: "Thick-cut toasted bread with sweet fruit jam." },
      { name: "Pancake Stack", price: "$800", img: "1528207776546-365bb710ee93", desc: "Fluffy pancakes with berries, banana and syrup.", popular: true }
    ]
  },
  lunch: {
    title: "Lunch",
    subtitle: "Sandwiches, burgers & savoury bites",
    items: [
      { name: "Club Sandwich", price: "$500", img: "1540713434306-58505cf1b6fc", desc: "Triple-decker stacked with fillings, lettuce and tomato.", popular: true },
      { name: "Chicken Sandwich", price: "$200", img: "1703219342329-fce8488cf443", desc: "Crispy chicken, crunchy slaw and a soft bun." },
      { name: "Veggie Sandwich", price: "$100", img: "1539252554453-80ab65ce3586", desc: "Garden-fresh vegetables on toasted bread." },
      { name: "Beef Burger", price: "$500", img: "1568901346375-23c9450c58cd", desc: "Juicy beef patty, cheese, lettuce and tomato.", popular: true },
      { name: "Chicken Burger", price: "$800", img: "1615297928064-24977384d0da", desc: "Golden fried chicken fillet with house sauce." },
      { name: "French Fries", price: "$500", img: "1676566399758-51b0d3927d48", desc: "Crispy, lightly salted and perfect for sharing." },
      { name: "Meat Pie", price: "$800", img: "1608039783021-6116a558f0c5", desc: "Hearty savoury filling in a flaky pastry crust." },
      { name: "Sausage Roll", price: "$700", img: "1743012492397-c6680eaa2c5d", desc: "Seasoned sausage baked in puff pastry." },
      { name: "Spring Rolls", price: "$200", img: "1695712641569-05eee7b37b6d", desc: "Light rolls packed with crunchy vegetables." }
    ]
  },
  desserts: {
    title: "Desserts & Sweet Bakes",
    subtitle: "A little something sweet with your coffee",
    items: [
      { name: "Cinnamon Roll", price: "$300", img: "1694632288834-17d86b340745", desc: "Soft swirls of cinnamon sugar with a sweet glaze.", popular: true },
      { name: "Banana Bread Slice", price: "$1,000", img: "1675712843856-ba2cb7d33f3c", desc: "Moist, homestyle banana bread, sliced thick." },
      { name: "Blueberry Muffin", price: "$1,200", img: "1637087788449-222cf1da072a", desc: "Bursting with blueberries and a crumbly top." },
      { name: "Cheese Danish", price: "$1,400", img: "1633785587635-a5c1df91fa90", desc: "Buttery pastry with a creamy cheese centre." }
    ]
  },
  drinks: {
    title: "Coffee & Tea",
    subtitle: "Brewed fresh by our baristas",
    note: "Drink prices available at the counter.",
    items: [
      { name: "Espresso", price: "", img: "1510591509098-f4fdc6d0ff04", desc: "A bold, velvety shot to kick-start your day." },
      { name: "Cappuccino", price: "", img: "1534234757579-8ad69d218ad4", desc: "Espresso topped with silky steamed milk foam.", popular: true },
      { name: "Café Latte", price: "", img: "1563311977-d285756282dc", desc: "Smooth espresso with plenty of steamed milk." },
      { name: "Iced Coffee", price: "", img: "1461023058943-07fcbe16d735", desc: "Chilled, refreshing and lightly sweet." },
      { name: "Hot Tea", price: "", img: "1518881922778-bacb4debc3d7", desc: "A comforting pot of freshly brewed tea." }
    ]
  }
};

/* ---------- Card template ---------- */
function cardHTML(item, badge) {
  return `
    <article class="menu-card reveal">
      <div class="thumb">
        <img src="${IMG(item.img)}" alt="${item.name}" loading="lazy">
        ${badge ? `<span class="badge">${badge}</span>` : ""}
      </div>
      <div class="body">
        <div class="row">
          <h3>${item.name}</h3>
          ${item.price ? `<span class="price">${item.price}</span>` : ""}
        </div>
        <p>${item.desc}</p>
      </div>
    </article>`;
}

/* ---------- Home: popular items ---------- */
function renderPopular() {
  const el = document.getElementById("popular-grid");
  if (!el) return;
  const picks = Object.values(MENU).flatMap(g => g.items.filter(i => i.popular));
  el.innerHTML = picks.slice(0, 8).map(i => cardHTML(i, "Popular")).join("");
}

/* ---------- Menu page ---------- */
function renderMenu() {
  const wrap = document.getElementById("menu-groups");
  if (!wrap) return;
  wrap.innerHTML = Object.entries(MENU).map(([key, g]) => `
    <div class="menu-group" data-group="${key}">
      <div class="menu-group-head"><h2>${g.title}</h2><small>${g.subtitle}</small></div>
      ${g.note ? `<p class="note" style="margin-top:-12px;margin-bottom:24px;text-align:left">${g.note}</p>` : ""}
      <div class="card-grid">${g.items.map(i => cardHTML(i, i.popular ? "Popular" : "")).join("")}</div>
    </div>`).join("");

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const f = tab.dataset.filter;
      document.querySelectorAll(".menu-group").forEach(g => {
        g.style.display = f === "all" || g.dataset.group === f ? "" : "none";
      });
    });
  });
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* ---------- Contact form (front-end only) ---------- */
function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const name = form.querySelector("#name").value.trim().split(" ")[0];
    const msg = document.getElementById("form-msg");
    msg.textContent = `Thanks, ${name}! We've received your message and will get back to you soon.`;
    msg.classList.add("show");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPopular();
  renderMenu();
  initNav();
  initForm();
  initReveal();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
