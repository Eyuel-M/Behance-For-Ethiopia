-- Designers table
create table if not exists designers (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  slug         text        not null unique,
  category     text        not null,
  skills       text[]      not null default '{}',
  experience   integer     not null default 0,
  location     text        not null,
  rate         integer     not null,
  rating       numeric(3,1) not null default 0,
  review_count integer     not null default 0,
  bio          text        not null default '',
  available    boolean     not null default true,
  photo_url    text,
  avatar_color text        not null default 'bg-stone-200',
  avatar_text  text        not null default 'text-stone-800',
  portfolio    jsonb       not null default '[]',
  created_at   timestamptz not null default now()
);

-- Enable Row Level Security
alter table designers enable row level security;

-- Public read access (no auth required for MVP)
create policy "Public read access"
  on designers for select
  using (true);

-- ─── Seed data ────────────────────────────────────────────────────────────────

insert into designers (name, slug, category, skills, experience, location, rate, rating, review_count, bio, available, avatar_color, avatar_text, portfolio) values
(
  'Abebe Dereje', 'abebe-dereje', 'Brand Identity',
  array['Figma','Branding','Logo Design','Design Systems'], 6, 'Addis Ababa', 25, 4.9, 34,
  'Senior brand identity designer helping startups and SMEs build distinctive visual identities that stand out in competitive markets. With 6 years of experience across Ethiopia and East Africa, I specialise in translating business strategy into cohesive visual systems — from logo and typography to brand guidelines and packaging.',
  true, 'bg-amber-100', 'text-amber-800',
  '[{"id":"p1","title":"Habesha Coffee Rebrand","category":"Brand Identity","gradient":"from-amber-400 to-orange-500"},{"id":"p2","title":"Nile Fintech Identity","category":"Logo Design","gradient":"from-blue-500 to-indigo-600"},{"id":"p3","title":"Addis Market App Icon","category":"Icon Design","gradient":"from-emerald-400 to-teal-500"},{"id":"p4","title":"EthioAir Brand System","category":"Design Systems","gradient":"from-sky-400 to-cyan-500"},{"id":"p5","title":"Sheba Packaging","category":"Print Design","gradient":"from-rose-400 to-pink-500"},{"id":"p6","title":"Rift Valley Tourism","category":"Brand Identity","gradient":"from-violet-500 to-purple-600"}]'
),
(
  'Sara Mulugeta', 'sara-mulugeta', 'UI / UX Design',
  array['UX Research','Prototyping','Figma','Usability Testing'], 5, 'Addis Ababa', 30, 5.0, 21,
  'Product designer specialising in intuitive digital experiences for SaaS and fintech platforms across East Africa and beyond. I lead end-to-end design from discovery research and journey mapping to high-fidelity prototypes and design-system documentation — always with a sharp focus on usability and business outcomes.',
  true, 'bg-stone-200', 'text-stone-800',
  '[{"id":"p1","title":"Zemen Bank Mobile App","category":"UI / UX Design","gradient":"from-blue-400 to-indigo-500"},{"id":"p2","title":"EthioTelecom Dashboard","category":"Dashboard UI","gradient":"from-slate-500 to-slate-700"},{"id":"p3","title":"Ride-Share Onboarding","category":"UX Flow","gradient":"from-teal-400 to-emerald-500"},{"id":"p4","title":"E-Commerce Checkout","category":"UI Design","gradient":"from-orange-400 to-amber-500"},{"id":"p5","title":"Health Tracker App","category":"Mobile UI","gradient":"from-rose-400 to-red-500"},{"id":"p6","title":"Admin Design System","category":"Design Systems","gradient":"from-violet-500 to-fuchsia-600"}]'
),
(
  'Yonas Tesfaye', 'yonas-tesfaye', 'Motion Graphics',
  array['After Effects','Premiere Pro','Illustration','3D'], 7, 'Hawassa', 28, 4.8, 18,
  'Motion designer and visual storyteller producing compelling brand films, explainer videos, and animated UI for global clients. My work blends illustration, 3D, and motion to create memorable brand moments that audiences stop scrolling for.',
  false, 'bg-orange-100', 'text-orange-800',
  '[{"id":"p1","title":"EthioTV Brand Idents","category":"Motion Graphics","gradient":"from-orange-500 to-red-600"},{"id":"p2","title":"Startup Explainer Video","category":"Animation","gradient":"from-violet-500 to-purple-700"},{"id":"p3","title":"App UI Micro-interactions","category":"UI Animation","gradient":"from-cyan-400 to-sky-600"},{"id":"p4","title":"Product Launch Reel","category":"Video","gradient":"from-pink-500 to-rose-600"},{"id":"p5","title":"3D Product Visualisation","category":"3D Design","gradient":"from-emerald-400 to-green-600"},{"id":"p6","title":"Social Media Campaign","category":"Motion Graphics","gradient":"from-amber-400 to-yellow-500"}]'
),
(
  'Hana Girma', 'hana-girma', 'Web Design',
  array['Figma','Webflow','Tailwind CSS','Responsive Design'], 4, 'Addis Ababa', 22, 4.7, 29,
  'Web designer bridging the gap between aesthetic and function — clean layouts, fast load times, and pixel-perfect execution. I design and build responsive websites in Figma and Webflow for startups, NGOs, and local businesses that want an international-quality online presence.',
  true, 'bg-rose-100', 'text-rose-800',
  '[{"id":"p1","title":"NGO Annual Report Site","category":"Web Design","gradient":"from-teal-400 to-cyan-600"},{"id":"p2","title":"Restaurant Landing Page","category":"Landing Page","gradient":"from-amber-400 to-orange-500"},{"id":"p3","title":"Fashion Brand Website","category":"Web Design","gradient":"from-rose-400 to-pink-500"},{"id":"p4","title":"SaaS Marketing Site","category":"Web Design","gradient":"from-blue-500 to-indigo-600"},{"id":"p5","title":"Portfolio Template","category":"Web Design","gradient":"from-slate-500 to-slate-700"},{"id":"p6","title":"Events Platform UI","category":"UI Design","gradient":"from-violet-400 to-purple-600"}]'
),
(
  'Dawit Bekele', 'dawit-bekele', 'Product Design',
  array['Product Strategy','Wireframing','Figma','User Flows'], 8, 'Dire Dawa', 35, 4.9, 42,
  'End-to-end product designer with 8 years of experience shipping mobile and web products for startups and established enterprises. I operate at the intersection of business strategy, user research, and interaction design — turning complex problems into simple, shippable products.',
  true, 'bg-indigo-100', 'text-indigo-800',
  '[{"id":"p1","title":"Logistics SaaS Platform","category":"Product Design","gradient":"from-indigo-500 to-blue-600"},{"id":"p2","title":"Mobile Wallet v2","category":"Mobile App","gradient":"from-emerald-500 to-teal-600"},{"id":"p3","title":"B2B Analytics Tool","category":"Dashboard UI","gradient":"from-slate-600 to-zinc-700"},{"id":"p4","title":"Onboarding Redesign","category":"UX Flow","gradient":"from-amber-500 to-orange-600"},{"id":"p5","title":"Design System v3","category":"Design Systems","gradient":"from-violet-500 to-fuchsia-600"},{"id":"p6","title":"AI Feature Integration","category":"Product Design","gradient":"from-sky-400 to-blue-500"}]'
),
(
  'Meron Alemu', 'meron-alemu', 'Illustration',
  array['Procreate','Adobe Illustrator','Character Design','Icons'], 3, 'Bahir Dar', 20, 4.8, 15,
  'Illustrator and icon designer crafting expressive characters and custom visual assets for editorial, branding, and product teams. My work has appeared in children''s books, brand campaigns, and product UIs — bringing warmth and personality wherever it lands.',
  true, 'bg-teal-100', 'text-teal-800',
  '[{"id":"p1","title":"Children''s Book Series","category":"Illustration","gradient":"from-yellow-400 to-orange-400"},{"id":"p2","title":"App Icon Library","category":"Icon Design","gradient":"from-teal-400 to-cyan-500"},{"id":"p3","title":"Brand Character System","category":"Character Design","gradient":"from-pink-400 to-rose-500"},{"id":"p4","title":"Editorial Illustrations","category":"Illustration","gradient":"from-violet-400 to-purple-500"},{"id":"p5","title":"UI Spot Illustrations","category":"Illustration","gradient":"from-blue-400 to-indigo-500"},{"id":"p6","title":"Cultural Pattern Series","category":"Pattern Design","gradient":"from-amber-400 to-yellow-500"}]'
),
(
  'Kibrom Haile', 'kibrom-haile', 'UI / UX Design',
  array['Figma','Design Systems','Accessibility','Component Libraries'], 5, 'Addis Ababa', 27, 4.7, 23,
  'UI designer focused on scalable design systems and accessible component libraries that empower engineering teams to ship faster. I work closely with developers to produce token-driven systems with thorough documentation, reducing design debt and speeding up product iteration.',
  false, 'bg-violet-100', 'text-violet-800',
  '[{"id":"p1","title":"Enterprise Design System","category":"Design Systems","gradient":"from-violet-500 to-indigo-600"},{"id":"p2","title":"Component Library Docs","category":"Design Systems","gradient":"from-slate-500 to-slate-700"},{"id":"p3","title":"Accessible Form Patterns","category":"Accessibility","gradient":"from-emerald-400 to-teal-500"},{"id":"p4","title":"Dark Mode Token System","category":"Design Systems","gradient":"from-zinc-600 to-zinc-800"},{"id":"p5","title":"Mobile Component Set","category":"UI Design","gradient":"from-sky-400 to-blue-500"},{"id":"p6","title":"Icon System (600+)","category":"Icon Design","gradient":"from-amber-400 to-orange-500"}]'
),
(
  'Tigist Worku', 'tigist-worku', 'Brand Identity',
  array['Brand Strategy','Figma','Typography','Print Design'], 6, 'Addis Ababa', 26, 5.0, 11,
  'Brand strategist and designer helping Ethiopian and international businesses communicate their values through cohesive visual identity. I combine deep brand strategy with meticulous craft — every typeface choice and colour decision is intentional, purposeful, and built to last.',
  true, 'bg-yellow-100', 'text-yellow-800',
  '[{"id":"p1","title":"Luxury Hotel Rebrand","category":"Brand Identity","gradient":"from-yellow-500 to-amber-600"},{"id":"p2","title":"Law Firm Identity","category":"Brand Identity","gradient":"from-slate-600 to-slate-800"},{"id":"p3","title":"Food Brand Packaging","category":"Print Design","gradient":"from-orange-400 to-red-500"},{"id":"p4","title":"Annual Report Design","category":"Print Design","gradient":"from-blue-500 to-indigo-600"},{"id":"p5","title":"Type Specimen System","category":"Typography","gradient":"from-stone-400 to-stone-600"},{"id":"p6","title":"Retail Brand Guidelines","category":"Brand Identity","gradient":"from-rose-400 to-pink-500"}]'
),
(
  'Natnael Tadesse', 'natnael-tadesse', 'Web Design',
  array['UI Design','Figma','CSS','Landing Pages'], 3, 'Mekelle', 18, 4.6, 9,
  'Web designer specialising in high-converting landing pages and marketing sites for Ethiopian businesses expanding their online presence. I care deeply about the details — spacing, hierarchy, and typography — that separate a forgettable page from one that converts.',
  true, 'bg-cyan-100', 'text-cyan-800',
  '[{"id":"p1","title":"SaaS Waitlist Page","category":"Landing Page","gradient":"from-cyan-400 to-sky-500"},{"id":"p2","title":"E-Commerce Homepage","category":"Web Design","gradient":"from-orange-400 to-amber-500"},{"id":"p3","title":"Clinic Website","category":"Web Design","gradient":"from-teal-400 to-emerald-500"},{"id":"p4","title":"Product Hunt Launch","category":"Landing Page","gradient":"from-rose-400 to-pink-500"},{"id":"p5","title":"Agency Portfolio Site","category":"Web Design","gradient":"from-violet-400 to-indigo-500"},{"id":"p6","title":"Event Registration Page","category":"Landing Page","gradient":"from-amber-400 to-yellow-500"}]'
);
