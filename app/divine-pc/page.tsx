/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import "./divine-pc.css";

const siteUrl = "https://dccchidera-lgtm.github.io/divine-pc/";
export const metadata: Metadata = {
  title: "Divine Ojiaku's Gaming PC | The £1,300 Build",
  description: "A personalised UK gaming PC buying guide for Divine Ojiaku. Real parts, photos, prices and retailer links, built around an RX 9070 and Ryzen 5 7500F.",
  alternates: { canonical: "/divine-pc/" },
  openGraph: {
    title: "Divine Ojiaku | Your Gaming PC",
    description: "Your PC. Eight carefully selected parts. One clear shopping list. Built for 1440p gaming and future upgrades.",
    url: siteUrl,
    type: "website",
    images: [{ url: "https://pcbuild.bg/assets/products/000/000/328/000000328839--kutiya-montech-air-100-lite-micro-atx-case-tg-white.jpg", alt: "Divine Ojiaku gaming PC build" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divine Ojiaku | Your Gaming PC",
    description: "Eight carefully chosen PC parts with prices, pictures and shops. Built for Divine.",
    images: ["https://pcbuild.bg/assets/products/000/000/328/000000328839--kutiya-montech-air-100-lite-micro-atx-case-tg-white.jpg"],
  },
};

type Part = {
  kind: string;
  name: string;
  why: string;
  price: number;
  shop: string;
  link: string;
  image: string;
};
const parts: Part[] = [
  {
    kind: "01 / Graphics card",
    name: "ASRock Radeon RX 9070 Challenger 16GB",
    why: "The main performance investment. Strong 1440p gaming and 16GB of video memory.",
    price: 604.99,
    shop: "CCL Computers",
    link: "https://www.cclonline.com/90-ga5nzz-00uanf-asrock-radeon-rx-9070-challenger-16gb-graphics-card-rx9070-cl-16g--477125/",
    image: "https://www.asrock.com/Graphics-Card/photo/Radeon%20RX%209070%20Challenger%2016GB%28L3%29.png",
  },
  {
    kind: "02 / Processor",
    name: "AMD Ryzen 5 7500F",
    why: "Six cores, twelve threads and an AM5 upgrade path. Tray CPU requires a separate cooler.",
    price: 110.19,
    shop: "SSD Store",
    link: "https://ssdstore.co.uk/products/amd-ryzen-5-7500f-tray-version-32mb-am5-desktop-cpu-100-000000597",
    image: "https://www.pcmasters.de/system/photos/19808/feature/AMD-Ryzen-5-7500F-Verpackung.jpg",
  },
  {
    kind: "03 / Motherboard",
    name: "ASRock B850M-X WiFi R2.0",
    why: "Modern AM5 socket, built-in WiFi and DDR5 support.",
    price: 106.39,
    shop: "AWD-IT",
    link: "https://www.awd-it.co.uk/asrock-b850m-x-wifi-r2-0-amd-ryzen-am5-ddr5-matx-motherboard-90-mxbru-a0uayz.html",
    image: "https://cdn11.bigcommerce.com/s-ms4wz8cgi2/images/stencil/1280x1280/products/128153/37746/MBDASR12760A__4__98577.1752723474.jpg?c=1",
  },
  {
    kind: "04 / Memory",
    name: "Patriot Viper Venom 16GB (2 × 8GB) DDR5 6000 CL36",
    why: "A matched, faster dual-channel kit, preferable for gaming to one slow 16GB stick.",
    price: 218.99,
    shop: "Overclockers UK",
    link: "https://www.overclockers.co.uk/patriot-viper-venom-expo-xmp-16gb-2x8gb-ddr5-c36-6000mhz-dual-channel-kit/MEM-PAT-08712.html",
    image: "https://images.price.tools/images/patriot-memory-viper-venom-ddr5-ram-l-FugXydQU.jpg",
  },
  {
    kind: "05 / Storage",
    name: "Crucial P310 1TB NVMe SSD",
    why: "Fast PCIe 4.0 game loading, with a simple storage upgrade later.",
    price: 124.97,
    shop: "Currys",
    link: "https://www.currys.co.uk/products/crucial-p310-m.2-internal-ssd-1-tb-10271060.html",
    image: "https://www.pbtech.co.nz/imgprod/H/D/HDDCRU33110__7.jpg",
  },
  {
    kind: "06 / Power supply",
    name: "MSI MAG A750GL 750W Gold",
    why: "Fully modular, quality power delivery with room for future upgrades.",
    price: 79.98,
    shop: "Currys Business",
    link: "https://business.currys.co.uk/catalogue/computing/components-upgrades/power-supply/msi-mag-a750gl-modular-atx-psu-750-w/N563837W",
    image: "https://slickdeals.net/attachment/1/1/7/1/5/2/7/450x450/21511722.thumb",
  },
  {
    kind: "07 / Case",
    name: "Montech AIR 100 LITE White",
    why: "Mesh airflow, tempered glass, two included fans and enough space for the GPU.",
    price: 34.99,
    shop: "Scan",
    link: "https://www.scan.co.uk/products/montech-air-100-lite-white",
    image: "https://pcbuild.bg/assets/products/000/000/328/000000328839--kutiya-montech-air-100-lite-micro-atx-case-tg-white.jpg",
  },
  {
    kind: "08 / CPU cooler",
    name: "Thermalright Assassin X 120 Refined SE",
    why: "An affordable air cooler that fits the AM5 socket and this case.",
    price: 15.0,
    shop: "Computer Orbit",
    link: "https://computerorbit.com/products/thermalright-assassin-x-120-refined-se-tower-air-cooler",
    image: "https://down-th.img.susercontent.com/file/cn-11134207-820l4-mlbrezrnzw27ef",
  },
];
const money = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);
const sum = parts.reduce((n, p) => n + p.price, 0);

export default function DivinePC() {
  return (
    <main className="divine-site">
      <div className="wrap">
        <nav className="divine-nav" aria-label="Page identity">
          <span className="brand"><strong>D.</strong> DIVINE OJIAKU</span>
          <span className="nav-note">Your personal build guide</span>
        </nav>

        <section className="hero">
          <div>
            <span className="eyebrow">Curated for Divine · October 2026</span>
            <h1>A proper <em>gaming PC.</em><br />Built around you.</h1>
            <p className="intro">Not a random prebuilt. A carefully selected list of parts with the buying links, a clear budget and an upgrade path. Everything in one place so you can buy it when you&apos;re ready.</p>
            <div className="hero-links">
              <a className="cta" href="#shopping-list">See your parts ↘</a>
              <a className="cta secondary" href="#why-these-parts">Why this build?</a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="https://pcbuild.bg/assets/products/000/000/328/000000328839--kutiya-montech-air-100-lite-micro-atx-case-tg-white.jpg" alt="Montech AIR 100 LITE white PC case selected for Divine" />
            <span className="visual-caption">THE CASE · EXACT MODEL SHOWN</span>
          </div>
        </section>

        <section className="stat-grid" aria-label="Build highlights">
          <div className="stat"><small>Parts estimate</small><strong>{money(sum)}</strong></div>
          <div className="stat"><small>Spending limit</small><strong>£1,300</strong></div>
          <div className="stat"><small>Best resolution</small><strong>1440p</strong></div>
          <div className="stat"><small>Graphics memory</small><strong>16GB</strong></div>
        </section>

        <section id="shopping-list">
          <div className="section-head">
            <div><span className="eyebrow">Eight parts. Direct links.</span><h2>Your shopping list</h2></div>
            <p>Tap a shop link for each item. Check the price and stock at checkout before ordering.</p>
          </div>
          <div className="parts">
            {parts.map((part) => (
              <article className="part" key={part.kind}>
                <div className="part-visual">
                  <img src={part.image} alt={part.name} loading="lazy" />
                </div>
                <div className="part-copy">
                  <span className="part-type">{part.kind}</span>
                  <h3>{part.name}</h3>
                  <p className="part-reason">{part.why}</p>
                  <div className="part-bottom">
                    <span className="part-price">{money(part.price)}</span>
                    <a className="part-buy" href={part.link} target="_blank" rel="noreferrer noopener" aria-label={"Check " + part.name + " at " + part.shop}>Shop at {part.shop} ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="total">
            <div><small>Estimated total before delivery</small><strong>{money(sum)}</strong></div>
            <div style={{fontSize:"12px",textAlign:"right",maxWidth:"200px",fontWeight:700}}>The £1,300 limit is tight. Recheck the basket and shipping before purchasing.</div>
          </div>
          <p className="fineprint">Prices were researched in UK shops around 28–29 October 2026 and can change quickly. This estimate is not a live basket or a price guarantee. Windows, monitor, keyboard, mouse, assembly and delivery are not included. Product photos illustrate the named models; the tray CPU may arrive without retail packaging.</p>
        </section>

        <section id="why-these-parts" className="breakdown">
          <article className="break-card"><span className="index">01 / PERFORMANCE</span><h3>Made for 1440p gaming.</h3><p>The RX 9070 gets the biggest share of the money. Its 16GB video memory gives room for more demanding modern games. 4K is possible in many games with sensible settings.</p></article>
          <article className="break-card"><span className="index">02 / LONGEVITY</span><h3>Upgrade the CPU later.</h3><p>AM5 offers a more useful upgrade route than older dead-end sockets. The motherboard, power supply and case are chosen so a future CPU or storage upgrade need not mean starting again.</p></article>
          <article className="break-card"><span className="index">03 / VALUE</span><h3>No budget wasted on looks.</h3><p>Good cooling, a sensible power supply and fast storage matter more than flashy RGB. A white mesh case keeps it clean, simple and affordable.</p></article>
        </section>

        <aside className="alert" aria-label="Honest buying advice">
          <h3>One trade-off you should know about</h3>
          <p>16GB of RAM is the main compromise at this budget because UK memory prices are unusually high. The selected matched 2-stick kit runs dual-channel, but upgrading to 32GB later will mean replacing both sticks on this 2-slot motherboard. If the shop total including delivery rises above £1,300, do not order the entire list without repricing first. The £1,300 cap matters more than any individual brand choice.</p>
        </aside>

        <footer><span>Prepared specifically for <strong style={{color:"#fff"}}>Divine Ojiaku</strong></span><span>Independent PC build recommendation · No sponsored picks</span></footer>
      </div>
    </main>
  );
}
