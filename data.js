// Brainrot catalogue — 30 hand-picked films, all free on YouTube.
// Each entry: id (YouTube), title, channel, minutes, category, note (one line, why watch).
const FILMS = [
  { id: "iYTos-1FfnM", title: "The Rise and Fall of Blackberry", channel: "ColdFusion", min: 13, cat: "Tech", note: "How the phone that invented the smartphone lost it all to the iPhone." },
  { id: "24O00Jz8R04", title: "The Struggle of Building the Original iPhone — The Untold Story", channel: "ColdFusion", min: 34, cat: "Tech", note: "The chaos, secrecy and engineering behind the first iPhone." },
  { id: "iSv63RaZeuo", title: "The Story of SpaceX", channel: "ColdFusion", min: 11, cat: "Tech", note: "From three failed launches to reusable rockets: how SpaceX nearly died twice." },
  { id: "PzL-oXxNGVM", title: "Quantum Computers — FULLY Explained!", channel: "ColdFusion", min: 12, cat: "Tech", note: "What quantum computers actually are, minus the hype." },
  { id: "h6fcK_fRYaI", title: "The Egg — A Short Story", channel: "Kurzgesagt – In a Nutshell", min: 8, cat: "Tech", note: "A seven-minute short film about the universe that will sit with you all day." },
  { id: "MBRqu0YOH14", title: "Optimistic Nihilism", channel: "Kurzgesagt – In a Nutshell", min: 7, cat: "Tech", note: "Why the meaninglessness of the universe is good news." },
  { id: "sNhhvQGsMEc", title: "The Fermi Paradox — Where Are All The Aliens? (1/2)", channel: "Kurzgesagt – In a Nutshell", min: 6, cat: "Tech", note: "If the universe is full of planets, where is everybody?" },
  { id: "SB8qIO6Ti_M", title: "How ASML Won Lithography (& Why Japan Lost)", channel: "Asianometry", min: 16, cat: "Tech", note: "The one Dutch company every chip on Earth depends on." },
  { id: "mN7CWi1tbH4", title: "The Birth of Taiwan's Semiconductor Industry", channel: "Asianometry", min: 20, cat: "Tech", note: "How a tiny island ended up making the world's most advanced chips." },
  { id: "fNVa1qMbF9Y", title: "Why Planes Don't Fly Over Tibet", channel: "RealLifeLore", min: 10, cat: "Tech", note: "The mountains, the thin air, and why airlines route around the roof of the world." },
  { id: "dGXahSnA_oA", title: "How Airlines Schedule Flights", channel: "Wendover Productions", min: 10, cat: "Tech", note: "The puzzle of moving 100,000 flights a day without breaking." },
  { id: "JXeJANDKwDc", title: "When This Number Hits 5200 — You Will be Dead", channel: "Kurzgesagt – In a Nutshell", min: 10, cat: "Tech", note: "You have about 4,000 weeks. This one makes you feel it." },

  { id: "3RKU9XBwZro", title: "Why did Starbucks REALLY become so popular?", channel: "MagnatesMedia", min: 21, cat: "Business", note: "How a Seattle coffee shop became a third place for the whole world." },
  { id: "8uNgfFwbziU", title: "The INSANE Truth About IKEA", channel: "MagnatesMedia", min: 31, cat: "Business", note: "Flat-pack furniture, meatballs, and the most deliberate business model on Earth." },
  { id: "gHXaUDx7P0Y", title: "How A Kid With $0 Created Nike", channel: "MagnatesMedia", min: 34, cat: "Business", note: "A kid, a waffle iron, and the shoe that became a culture." },
  { id: "MhspjNiER9Q", title: "The CRAZY Truth About McDonald's", channel: "MagnatesMedia", min: 45, cat: "Business", note: "How two brothers' burger stand became the biggest restaurant on the planet." },
  { id: "AJeVN7dZV7Y", title: "Why Jeff Bezos Owns Everything...", channel: "MagnatesMedia", min: 18, cat: "Business", note: "The empire behind the store: cloud, logistics, and everything Amazon touches." },
  { id: "5sMXR7rK40U", title: "The Decline of Blockbuster...What Happened?", channel: "Company Man", min: 13, cat: "Business", note: "The video store that owned Friday night — and laughed off Netflix." },
  { id: "A8OPvx1nhSM", title: "Toys R Us — The Final Chapter", channel: "Company Man", min: 12, cat: "Business", note: "The toy store every 90s kid remembers, and the debt that killed it." },
  { id: "Qws713t3HBY", title: "The Decline of Sears...What Happened?", channel: "Company Man", min: 14, cat: "Business", note: "The Amazon of its day, undone by the very idea it invented." },
  { id: "eVrmFgvEnAA", title: "The Decline of Kodak...What Happened?", channel: "Company Man", min: 12, cat: "Business", note: "The company that invented the digital camera — and shelved it." },
  { id: "KxELxC8TWKg", title: "How Costco Mastered Capitalism Without Being Greedy", channel: "Established Context", min: 16, cat: "Business", note: "Big carts, tiny margins, and a business that refuses to be greedy." },

  { id: "T4CCY9RJeD4", title: "Will There Ever Be Another World's Tallest Building?", channel: "The B1M", min: 12, cat: "Design", note: "Why the race to build the tallest tower may already be over." },
  { id: "VbeM8Lf7s5A", title: "The Genius Design of Apple Park", channel: "neo", min: 18, cat: "Design", note: "A $5 billion ring in the desert, designed like a product." },
  { id: "wOrmr5kT-48", title: "How to solve problems like a designer", channel: "Vox", min: 5, cat: "Design", note: "Design thinking, explained in five minutes with real examples." },
  { id: "IVjmIovOPek", title: "How cars went from boxy to curvy", channel: "Vox", min: 4, cat: "Design", note: "How wind tunnels redesigned every car on the road." },
  { id: "-g6-TozOg7A", title: "Dieter Rams: Less but Better", channel: "Dwell", min: 4, cat: "Design", note: "Less but better: the ten principles behind Braun, Apple, and everything clean." },
  { id: "rg3X1vZN5TA", title: "Architecture, art and design — 100 years of the Bauhaus (1/3)", channel: "DW Documentary", min: 42, cat: "Design", note: "The school that rebuilt art, architecture and design in one radical decade." },
  { id: "isKxMbZsSAk", title: "Losing the sense of taste", channel: "NOWNESS", min: 4, cat: "Design", note: "A four-minute art film on what we lose when taste disappears." },
  { id: "5tTS7IQQPgk", title: "Charles & Ray Eames, Modern Architecture and Design Icons", channel: "THIRTEEN", min: 86, cat: "Design", note: "The couple who designed the chair, the house, and modern America." }
];

// Featured film on the hero banner.
const FEATURED_ID = "24O00Jz8R04";

// "Start here" row — the ten best first watches.
const START_HERE = ["24O00Jz8R04", "iYTos-1FfnM", "iSv63RaZeuo", "SB8qIO6Ti_M", "h6fcK_fRYaI", "3RKU9XBwZro", "gHXaUDx7P0Y", "8uNgfFwbziU", "VbeM8Lf7s5A", "5tTS7IQQPgk"];
