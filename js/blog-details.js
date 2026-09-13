/**
 * DASHRIDES - BLOG DETAILS DYNAMIC RENDERER
 * Each card in blog.html links to blog-details.html?id=<article-id>
 * This script renders unique content per article, so no two cards show same detail.
 */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'featured-dual-motor';
  const article = articles[id] || articles['featured-dual-motor'];
  renderArticle(article);
  renderRelated(id);
});

const articles = {
  'featured-dual-motor': {
    badge: 'Powertrain Engineering',
    readTime: '6 Min Read',
    date: 'Published Oct 14, 2026',
    title: 'Why Dual-Motor Torque Is Revolutionizing Urban Rush Hours',
    excerpt: 'The physics of split hub torque, intelligent electronic slip differential, and how dual 1000W brushless motors outperform single-motor commuters in real-world gridlock.',
    heroImg: 'https://i.pinimg.com/1200x/1f/95/0c/1f950c0e15cc5fcb25b1e9dee7096c91.jpg',
    heroAlt: 'Electric Scooter Powertrain Close Up',
    authorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorName: 'Maya Rodriguez',
    authorRole: 'Head of Industrial Design & Telemetry',
    authorBio: 'Maya has led mobility design programs across Zurich and San Francisco for over 10 years, focusing on composite chassis dynamics and rider-centric UX.',
    tags: ['#DualMotor', '#TorqueVectoring', '#ElectricMobility'],
    body: `
      <p>For over a decade, consumer micro-mobility was defined by single 250W or 350W front-wheel hub motors. While suitable for flat promenades and lightweight riders, anyone who has attempted to climb a 15-degree hill in San Francisco, Zurich, or Lisbon knows the familiar frustration: motor whine, precipitous battery voltage sag, and deceleration to walking pace.</p>
      <h3>The Mechanics of Split Hub Synchronicity</h3>
      <p>When developing the <strong>Dash Phantom Pro</strong>, our engineering team rejected the single-motor status quo. By distributing 1000W of peak power to the front wheel and 1000W to the rear wheel through dual field-oriented vector controllers (FOC), we unlocked a fundamentally different ride dynamic.</p>
      <blockquote>"Distributing drive torque across both contact patches transforms handling from mere transportation into active, confident street control. You stop fighting the terrain and start carving through it."</blockquote>
      <p>Under sudden acceleration, weight naturally transfers to the rear axle. In a front-drive scooter, this leads to wheel spin and loss of steering grip. With our intelligent split torque management, the rear hub handles 65% of the initial launch force while the front hub provides stabilized pull. The result is a smooth 0-30 km/h sprint in 3.2 seconds without wheel slippage on painted crosswalks.</p>
      <h3>Thermal Equilibrium and Battery Longevity</h3>
      <p>Dividing the electrical load between two stator housings dramatically reduces thermal buildup. Rather than a single motor operating at 92°C near its thermal throttle ceiling, two motors operate comfortably at 48°C. This lower internal resistance directly improves energy efficiency by 14% and extends lithium-ion battery pack lifespan by up to 250 additional recharge cycles.</p>
    `
  },
  'city-guides-scenic-night': {
    badge: 'City Guides',
    readTime: '4 Min Read',
    date: 'Sep 28, 2026',
    title: 'The 7 Most Scenic Night Riding Routes in Downtown Core',
    excerpt: 'From illuminated bridge crossings to coastal riverfront paths, explore the calmest nighttime corridors for safe, stress-free night commutes.',
    heroImg: 'https://i.pinimg.com/1200x/12/4e/0d/124e0d573e1acd2658249e11343e14aa.jpg',
    heroAlt: 'City Sunset Scooter Night Ride',
    authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    authorName: 'Elena Vance',
    authorRole: 'Senior UX Director',
    authorBio: 'Elena maps urban calm corridors and night-ride safety for DashRides, testing routes across 12 metros after midnight.',
    tags: ['#NightCommute', '#CityGuides', '#DowntownCore'],
    body: `
      <p>Downtown after 9pm is a different city: traffic thins, air cools, and riverfront lights reflect on wet asphalt. We logged 340km after midnight to find seven routes where you can ride without a single car horn.</p>
      <h3>1. Waterfront Promenade Loop (4.2km)</h3>
      <p>Car-free, LED-lit, and patrolled until 1am. Dual adaptive matrix headlights on the Night Rider Series make this our top pick for beginners.</p>
      <blockquote>"The city exhales at night — you finally hear the harbor water, not the horns."</blockquote>
      <h3>2. Museum Mile Cut-Through (2.8km)</h3>
      <p>Cobblestones smoothed in 2024, 15km/h geofenced zone, and a 24h PowerSwap kiosk at the north gate. Perfect for first-time night riders.</p>
    `
  },
  'battery-tech-powerswap': {
    badge: 'Battery Tech',
    readTime: '5 Min Read',
    date: 'Sep 22, 2026',
    title: 'Inside PowerSwap: How 15-Second Battery Docks Erase Range Anxiety',
    excerpt: 'An engineering breakdown of our robotic cell thermal management and smart grid balancing system.',
    heroImg: 'https://i.pinimg.com/1200x/cd/ca/bf/cdcabf4bb020e2ccc1865dfa3200e86f.jpg',
    heroAlt: 'PowerSwap Battery Dock',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorName: 'Kaelen Vance',
    authorRole: 'Chief Technology Officer',
    authorBio: 'Kaelen leads IoT and PowerSwap robotics, shaving swap time from 45s to 15s with sub-meter GPS.',
    tags: ['#PowerSwapBattery', '#BatteryTech', '#SmartGrid'],
    body: `
      <p>Range anxiety disappears when a fresh 100% cell is 15 seconds away. Our PowerSwap kiosks do not charge your battery — they swap it.</p>
      <h3>Robotic Thermal Handshake</h3>
      <p>Each cell arrives at 22°C. Infrared sensors reject any pack above 28°C, and the kiosk pre-conditions the replacement to the scooter’s exact voltage curve in 2.1 seconds.</p>
      <blockquote>"We don’t sell charging time — we sell continuous motion."</blockquote>
      <h3>Grid Balancing at 520 Hubs</h3>
      <p>At 2am, hubs trickle-charge at 0.3C to extend lifecycle by 210 cycles. At 5pm peak, they discharge 12kW back to the grid. Riders never see the negotiation — just a green ‘Full’ light.</p>
    `
  },
  'safety-wet-weather': {
    badge: 'Safety Protocol',
    readTime: '7 Min Read',
    date: 'Sep 18, 2026',
    title: 'Mastering Wet Weather Commutes: ABS Braking & Tire Dynamics',
    excerpt: 'Key handling tips for slippery tram lines, leaves, and sudden rainstorms with our dual disc brake setup.',
    heroImg: 'https://i.pinimg.com/736x/ca/e5/5e/cae55e271ea56610b3d937c51701a872.jpg',
    heroAlt: 'Wet weather ABS braking',
    authorImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    authorName: 'Darius Sterling',
    authorRole: 'VP of Global Operations',
    authorBio: 'Darius oversees safety protocols and trains 5,000+ riders on wet-weather handling.',
    tags: ['#BremboABS', '#SafetyProtocol', '#RainRide'],
    body: `
      <p>Wet tram tracks have the friction of black ice. Our ABS matrix pulses 18 times per second to keep both wheels rolling, not sliding.</p>
      <h3>1. Weight the Outside Peg</h3>
      <p>Shift 60% weight to the outer footrest before a wet turn. The dual-hub torque vectoring then holds line instead of washing out.</p>
      <blockquote>"Rain isn’t a no-ride day — it’s a technique day."</blockquote>
      <h3>2. Look Past the Puddle</h3>
      <p>Standing water hides potholes. Scan 15m ahead, not 3m. Our 65km battery means you can afford the dry detour.</p>
    `
  },
  'touring-coastal-odyssey': {
    badge: 'Touring',
    readTime: '8 Min Read',
    date: 'Sep 11, 2026',
    title: 'Weekend Getaways: The 80km Coastal Moped Odyssey',
    excerpt: 'How two riders packed camping essentials into our Cruiser GT EV panniers and rode the Pacific ridgeline.',
    heroImg: 'https://i.pinimg.com/736x/00/5d/93/005d93698be293aaa1f32d11bfd38bc3.jpg',
    heroAlt: 'Coastal Moped Odyssey',
    authorImg: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    authorName: 'Chloe Zhao',
    authorRole: 'Cinematographer & Touring Lead',
    authorBio: 'Chloe documents 80km+ coastal tours on the Cruiser GT EV, testing pannier loads and TFT dash routing.',
    tags: ['#Touring', '#CoastalRide', '#CruiserGT'],
    body: `
      <p>80km, two 30L panniers, one Boson 3000W drive, zero charging stops. The Pacific Coast ridge is not a car road — it’s a moped road.</p>
      <h3>Pack Like a Cinematographer</h3>
      <p>Heavy low: batteries bottom, clothes top. Panniers 7kg each = 14kg total keeps center of gravity 12cm lower than a backpack.</p>
      <blockquote>"The best view isn’t at the overlook — it’s at the 60km/h straight where the TFT shows 22km still left."</blockquote>
    `
  },
  'sustainability-decarbonizing': {
    badge: 'Sustainability',
    readTime: '5 Min Read',
    date: 'Sep 05, 2026',
    title: 'Decarbonizing The Last Mile: How 5,000 Scooters Replaced 1.8M Car Trips',
    excerpt: 'Our annual sustainability impact report analyzing carbon offsets, air quality metrics, and traffic reduction.',
    heroImg: 'https://i.pinimg.com/736x/f7/9b/c4/f79bc411ea5de78832565ea67d7e293d.jpg',
    heroAlt: 'Sustainability Impact',
    authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorName: 'Seraphina Lin',
    authorRole: 'CEO & Co-Founder',
    authorBio: 'Seraphina founded DashRides to replace fossil tonnage with precise electric micro-mobility.',
    tags: ['#ZeroEmissions', '#Sustainability', '#ImpactReport'],
    body: `
      <p>1.8 million car trips = 2,040 tons CO₂ not emitted. That’s 92,000 trees’ annual work, done by 5,000 scooters.</p>
      <h3>Where Trips Came From</h3>
      <p>42% replaced 1-3km car hops (the most polluting per km), 31% replaced ride-hail, 27% were trips that wouldn’t have happened — new mobility, not substitution.</p>
      <blockquote>"The last mile is the dirtiest mile — and the easiest to electrify."</blockquote>
    `
  },
  'engineering-carbon-alloy': {
    badge: 'Engineering',
    readTime: '6 Min Read',
    date: 'Aug 29, 2026',
    title: 'Aerospace Carbon Fiber vs. Forged Alloy: The Weight-to-Toughness Tradeoff',
    excerpt: 'Behind the scenes of our drop testing lab in Zurich, evaluating extreme torsional stiffness under stress.',
    heroImg: 'https://i.pinimg.com/736x/02/34/b2/0234b2b319bda2f947884f17a4733edd.jpg',
    heroAlt: 'Carbon Fiber vs Alloy',
    authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    authorName: 'Kaelen Vance',
    authorRole: 'Chief Technology Officer',
    authorBio: 'Kaelen runs Zurich drop labs where frames survive 300kg impacts.',
    tags: ['#AerospaceGrade', '#Engineering', '#CarbonFiber'],
    body: `
      <p>Carbon fiber is 40% lighter. Forged 6061-T6 is 300% more impact-resistant. We chose alloy for the Phantom Pro.</p>
      <h3>Drop Test 14: 2.1m Concrete</h3>
      <p>Carbon cracked at 1.8m. Alloy dented 2.1mm but stayed rideable. For a shared fleet hit 12 times a day, dent beats crack.</p>
      <blockquote>"Light is a luxury. Tough is a requirement."</blockquote>
    `
  },
  'city-guides-hidden-alleyways': {
    badge: 'City Guides',
    readTime: '5 Min Read',
    date: 'Aug 22, 2026',
    title: 'Hidden Alleyways: Mapping the Unseen Bike Lanes of Old Town',
    excerpt: 'How grassroots mappers uncovered 22km of unmarked lanes that now power our Old Town hub expansion.',
    heroImg: 'https://i.pinimg.com/1200x/5e/27/98/5e2798b8842b35de73de732b50cee467.jpg',
    heroAlt: 'Hidden Alley Bike Lanes',
    authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    authorName: 'Marcus Thorne',
    authorRole: 'Architect & Urbanist',
    authorBio: 'Marcus maps unmarked lanes for DashRides Old Town expansion.',
    tags: ['#CityGuides', '#OldTown', '#BikeLanes'],
    body: `<p>22km of alleys were on no map. Volunteers walked them with phone GPS, we validated with lidar, and the city painted them in 3 weeks.</p><h3>The Narrowest Lane: 1.1m</h3><p>Between bakery and shrine — too tight for cars, perfect for the 12kg Glide Lite folded. Now 40 scooters live there.</p><blockquote>"The city had lanes — it just forgot them."</blockquote>`
  },
  'battery-tech-solid-state': {
    badge: 'Battery Tech',
    readTime: '6 Min Read',
    date: 'Aug 18, 2026',
    title: 'Solid-State Future: Next-Gen Cells Promise 150km Range',
    excerpt: 'Inside our partner lab where sulfide electrolytes cut charge time to 12 minutes without thermal runaway.',
    heroImg: 'https://i.pinimg.com/736x/77/04/6e/77046e193300f513b1d03da0718e022b.jpg',
    heroAlt: 'Solid State Battery Lab',
    authorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorName: 'Maya Rodriguez',
    authorRole: 'Head of Industrial Design',
    authorBio: 'Maya tests sulfide cells that charge in 12 minutes.',
    tags: ['#SolidState', '#BatteryTech', '#150kmRange'],
    body: `<p>Sulfide electrolyte, no liquid, no dendrite. 12-minute 10-80% charge, 150km range, 1,200 cycles.</p><h3>Why 12 Minutes Matters</h3><p>PowerSwap is 15 seconds today. Solid-state makes 12-minute plug-in viable for home — no swap needed for commuters.</p><blockquote>"The swap is a bridge. The cell is the destination."</blockquote>`
  },
  'safety-helmet-fit': {
    badge: 'Safety Protocol',
    readTime: '4 Min Read',
    date: 'Aug 12, 2026',
    title: 'Helmet Fit Science: Why One Size Doesn’t Fit All Heads',
    excerpt: '3D cranial scans of 4,000 riders reveal why our new M/L micro-adjust dial cuts pressure points by 38%.',
    heroImg: 'https://i.pinimg.com/1200x/ea/a3/25/eaa3251982f2398bdf8b13e8d278bac0.jpg',
    heroAlt: 'Helmet Fit Testing',
    authorImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    authorName: 'Darius Sterling',
    authorRole: 'VP Global Operations',
    authorBio: 'Darius runs UV helmet sanitization and fit labs.',
    tags: ['#SmartHelmet', '#SafetyProtocol', '#FitScience'],
    body: `<p>4,000 scans, 3 head shapes: oval, round, intermediate. One-size helmets press 38% more on oval heads.</p><h3>M/L with Dial</h3><p>Two shells + 12mm micro-dial = 94% fit vs 61% one-size. UV locker then sanitizes in 40 seconds.</p><blockquote>"A helmet you don’t feel is a helmet you wear."</blockquote>`
  },
  'touring-rain-shine': {
    badge: 'Touring',
    readTime: '7 Min Read',
    date: 'Aug 07, 2026',
    title: 'Rain or Shine: Packing Light for 48-Hour Moped Trips',
    excerpt: 'Our field team’s ultralight checklist — from dry bags to tire plugs — for weekend escapes that stay under 8kg.',
    heroImg: 'https://i.pinimg.com/736x/74/65/9d/74659d1095daf960425b48e2b431953d.jpg',
    heroAlt: 'Moped Touring Packing',
    authorImg: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    authorName: 'Chloe Zhao',
    authorRole: 'Touring Lead',
    authorBio: 'Chloe packs 8kg for 48-hour trips.',
    tags: ['#Touring', '#PackingLight', '#48HourTrip'],
    body: `<p>8kg total: 2kg dry bags, 1.5kg tools, 2kg clothes, 2.5kg food/water. Under 8kg keeps range at 88% vs 72% at 15kg.</p><h3>The Non-Negotiable: Tire Plug Kit</h3><p>12g, fixes 80% flats in 4 minutes without removing wheel. We’ve used it 14 times on 80km odysseys.</p><blockquote>"Pack half the clothes, twice the plugs."</blockquote>`
  },
  'sustainability-lithium-lifecycle': {
    badge: 'Sustainability',
    readTime: '6 Min Read',
    date: 'Jul 30, 2026',
    title: 'From Watts to Water: Lifecycle Analysis of Lithium Mining',
    excerpt: 'Tracing every litre from salt flat to cell — and how our closed-loop recovery saves 42,000 litres per pack.',
    heroImg: 'https://i.pinimg.com/1200x/95/e4/59/95e4593d861e9ec21f501b989d1103e9.jpg',
    heroAlt: 'Lithium lifecycle',
    authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorName: 'Seraphina Lin',
    authorRole: 'CEO',
    authorBio: 'Seraphina tracks water from salt flat to cell.',
    tags: ['#LithiumLifecycle', '#Sustainability', '#ClosedLoop'],
    body: `<p>500,000 litres per ton of lithium — until you recycle. Our closed loop recovers 92% electrolyte, saving 42,000 litres per pack.</p><h3>Salt Flat to Cell: 8 Steps</h3><p>Brine → Evaporation (12 months) → Conversion → Cathode → Cell → Pack → Ride → Recovery. Step 8 is the only one we control — and we run it at 92%.</p><blockquote>"Water is the real battery."</blockquote>`
  },
  'engineering-torque-vectoring': {
    badge: 'Engineering',
    readTime: '8 Min Read',
    date: 'Jul 24, 2026',
    title: 'Torque Vectoring Explained: How Dual Motors Share Load',
    excerpt: 'Front/rear split algorithms that prevent wheel slip on wet Tram tracks — tested at 35° incline labs.',
    heroImg: 'https://i.pinimg.com/1200x/eb/90/3f/eb903ff64bfdcf698f30ad3ee4dd926c.jpg',
    heroAlt: 'Torque vectoring',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorName: 'Kaelen Vance',
    authorRole: 'CTO',
    authorBio: 'Kaelen codes split algorithms for wet tracks.',
    tags: ['#TorqueVectoring', '#DualMotor', '#Engineering'],
    body: `<p>Wet tram track: steel, 2cm wide, friction 0.12. Front motor 35% / Rear 65% split keeps both patches gripping.</p><h3>35° Lab Incline Test</h3><p>Single motor slipped at 18°. Dual vectoring held 35° with 12kg cargo. Same hill, different math.</p><blockquote>"Grip is not horsepower — it’s distribution."</blockquote>`
  },
  'city-guides-noise-pollution': {
    badge: 'City Guides',
    readTime: '4 Min Read',
    date: 'Jul 18, 2026',
    title: 'Sound of the City: Noise Pollution Drops 30% With EVs',
    excerpt: 'Decibel maps before/after DashRides corridors — and why cafes moved tables back to sidewalks.',
    heroImg: 'https://i.pinimg.com/736x/94/08/49/940849822e8e43122ecaa74373f26e1a.jpg',
    heroAlt: 'Noise pollution EV',
    authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    authorName: 'Marcus Thorne',
    authorRole: 'Urbanist',
    authorBio: 'Marcus maps decibel drops when cars leave.',
    tags: ['#NoisePollution', '#CityGuides', '#EVSilence'],
    body: `<p>12 corridors, 30% average drop at ear height (1.5m). Cafes moved 40 tables to sidewalks within 3 weeks.</p><h3>Where It Drops Most: Intersections</h3><p>Traffic light queues: 78dB → 54dB. The scooters’ 62dB hum is below conversation (65dB).</p><blockquote>"Silence is a service."</blockquote>`
  },
  'battery-tech-cold-weather': {
    badge: 'Battery Tech',
    readTime: '5 Min Read',
    date: 'Jul 11, 2026',
    title: 'Cold Weather Charging: Myths vs Lab Data at -10°C',
    excerpt: 'We froze cells for 72 hours — capacity held 89% and regen still added 11% range in snow.',
    heroImg: 'https://i.pinimg.com/1200x/11/75/59/117559c92739b3e7334b26d7206044ee.jpg',
    heroAlt: 'Cold weather battery',
    authorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorName: 'Maya Rodriguez',
    authorRole: 'Telemetry Lead',
    authorBio: 'Maya freezes cells for 72 hours.',
    tags: ['#ColdWeather', '#BatteryTech', '#WinterRange'],
    body: `<p>-10°C for 72h, then ride. Capacity 89%, regen +11%, range 83% vs 25°C. Myth: ‘EVs die in winter.’ Data: They shiver, not die.</p><h3>Pre-Heat Trick</h3><p>2-minute 0.2C pre-heat in hub brings cell to 8°C before you unlock. Range jumps from 83% to 94%.</p><blockquote>"Cold is a setting, not a failure."</blockquote>`
  },
  'safety-intersection-ai': {
    badge: 'Safety Protocol',
    readTime: '6 Min Read',
    date: 'Jul 03, 2026',
    title: 'Intersection Intelligence: AI Predicts Pedestrian Flow',
    excerpt: 'How our handlebar haptics warn you 2.1s before a jaywalker steps from between parked vans.',
    heroImg: 'https://i.pinimg.com/1200x/41/48/66/4148663120513c4ee603f8b9077fbd0c.jpg',
    heroAlt: 'AI pedestrian prediction',
    authorImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    authorName: 'Darius Sterling',
    authorRole: 'VP Operations',
    authorBio: 'Darius trains AI on jaywalker gaps.',
    tags: ['#AISafety', '#IntersectionIntelligence', '#Haptics'],
    body: `<p>12,000 intersections, 2.1 seconds warning. Handlebar buzzes left/right 180ms before a pedestrian appears between vans.</p><h3>How It Sees Around Vans</h3><p>Lidar sees ankles under van gap (18cm). AI predicts step intent from shin angle 78% accuracy.</p><blockquote>"The van is not a wall — it’s a window."</blockquote>`
  },
  'touring-desert-delta': {
    badge: 'Touring',
    readTime: '9 Min Read',
    date: 'Jun 27, 2026',
    title: 'Desert to Delta: A 120km One-Charge Challenge',
    excerpt: 'Cruiser GT EV did 120km on 90% charge across 38°C dunes — here’s the tire pressure trick that saved 8km.',
    heroImg: 'https://i.pinimg.com/736x/0a/0c/5d/0a0c5d390efe5af9def97106428c0a54.jpg',
    heroAlt: 'Desert to delta ride',
    authorImg: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    authorName: 'Chloe Zhao',
    authorRole: 'Touring Lead',
    authorBio: 'Chloe rides 120km on one charge.',
    tags: ['#DesertToDelta', '#Touring', '#OneChargeChallenge'],
    body: `<p>120km, 38°C, 90% charge, 8km left. Tire pressure 42 PSI → 38 PSI soft sand = +8km range (less sink).</p><h3>The Pressure Trick</h3><p>Drop 4 PSI for 20km dune section, re-inflate at oasis compressor. Range +8km, comfort +40%.</p><blockquote>"Soft tires float. Hard tires dig."</blockquote>`
  },
  'sustainability-circular-economy': {
    badge: 'Sustainability',
    readTime: '5 Min Read',
    date: 'Jun 19, 2026',
    title: 'Circular Economy: Second Life for Used Scooter Batteries',
    excerpt: 'Retired packs now power 40 corner shops in Hyderabad — 2.1MWh nightly, zero new lithium mined.',
    heroImg: 'https://i.pinimg.com/1200x/b0/e6/15/b0e6150d3b66c8909fdad10f064bc3b8.jpg',
    heroAlt: 'Battery second life',
    authorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorName: 'Seraphina Lin',
    authorRole: 'CEO',
    authorBio: 'Seraphina gives packs second life in shops.',
    tags: ['#CircularEconomy', '#SecondLife', '#Hyderabad'],
    body: `<p>Retired at 80% health, reborn as shop power. 40 shops, 2.1MWh nightly, 18 months extra life, zero new mining.</p><h3>From Scooter to Shop</h3><p>80% → 60% is useless for 90km, perfect for 8-hour shop backup. One pack = 3 shops’ lights + 2 fans overnight.</p><blockquote>"Retirement is reassignment."</blockquote>`
  },
  'engineering-aerodynamics': {
    badge: 'Engineering',
    readTime: '7 Min Read',
    date: 'Jun 11, 2026',
    title: 'Aerodynamics at 50km/h: Wind Tunnel Secrets for City Riders',
    excerpt: 'Our aero team shaved 11W drag at 50km/h — that’s +4km range from a handlebar tuck you can actually hold.',
    heroImg: 'https://i.pinimg.com/736x/31/89/41/3189411fd0ea898d871261d9f18a6dcc.jpg',
    heroAlt: 'Wind tunnel aerodynamics',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorName: 'Kaelen Vance',
    authorRole: 'CTO',
    authorBio: 'Kaelen shaves drag in wind tunnels.',
    tags: ['#Aerodynamics', '#WindTunnel', '#RangePlus'],
    body: `<p>At 50km/h, 62% of battery goes to air. Shaving 11W = 4km extra. No motor change, just air.</p><h3>The Tuck You Can Hold</h3><p>Elbows in 12cm, head down 8cm, knees hugging frame = 11W saved. We raised handlebar 2cm so you can hold it 20 minutes, not 2.</p><blockquote>"Drag is a tax. Posture is the deduction."</blockquote>`
  }
};

function renderArticle(a) {
  document.title = `${a.title} — DashRides Journal`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', a.excerpt);

  // Header
  const badgeEl = document.getElementById('article-badge');
  if (badgeEl) { badgeEl.textContent = a.badge; badgeEl.className = 'badge ' + (['City Guides','City Routes'].includes(a.badge) ? 'badge-lime' : ['Battery Tech','Engineering'].includes(a.badge) ? 'badge-orange' : a.badge.includes('Safety') ? 'badge-lime' : a.badge.includes('Tour') ? 'badge-orange' : a.badge.includes('Sustain') ? 'badge-lime' : 'badge-orange'); }
  const metaEl = document.getElementById('article-meta');
  if (metaEl) metaEl.textContent = `${a.readTime} • ${a.date}`;
  const titleEl = document.getElementById('article-title');
  if (titleEl) titleEl.textContent = a.title;
  const excerptEl = document.getElementById('article-excerpt');
  if (excerptEl) excerptEl.textContent = a.excerpt;
  const heroImgEl = document.getElementById('article-hero-img');
  if (heroImgEl) { heroImgEl.src = a.heroImg; heroImgEl.alt = a.title; }

  // Body
  const bodyEl = document.getElementById('article-body');
  if (bodyEl) bodyEl.innerHTML = a.body;

  // Author
  const authorImgEl = document.getElementById('author-img');
  if (authorImgEl) { authorImgEl.src = a.authorImg; authorImgEl.alt = a.authorName; }
  const authorNameEl = document.getElementById('author-name');
  if (authorNameEl) authorNameEl.textContent = a.authorName;
  const authorRoleEl = document.getElementById('author-role');
  if (authorRoleEl) authorRoleEl.textContent = a.authorRole;
  const authorBioEl = document.getElementById('author-bio');
  if (authorBioEl) authorBioEl.textContent = a.authorBio;

  // Tags
  const tagsEl = document.getElementById('article-tags');
  if (tagsEl) {
    tagsEl.innerHTML = a.tags.map(t => `<span class="badge ${t.includes('Electric') || t.includes('City') || t.includes('Zero') ? 'badge-lime' : 'badge-orange'}">${t}</span>`).join(' ');
  }
}

function renderRelated(currentId) {
  const relatedGrid = document.getElementById('related-grid');
  if (!relatedGrid) return;
  const allIds = Object.keys(articles).filter(id => id !== currentId);
  // pick 3 related: prefer same category
  const currentCat = (articles[currentId]?.badge || '').toLowerCase();
  let related = allIds.filter(id => (articles[id].badge || '').toLowerCase() === currentCat.toLowerCase()).slice(0,3);
  if (related.length < 3) {
    const remaining = allIds.filter(id => !related.includes(id));
    // shuffle remaining
    for (let i = remaining.length -1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [remaining[i], remaining[j]]=[remaining[j],remaining[i]]; }
    related = related.concat(remaining.slice(0, 3 - related.length));
  } else {
    // shuffle related
    for (let i = related.length -1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [related[i], related[j]]=[related[j],related[i]]; }
  }
  relatedGrid.innerHTML = related.map(id => {
    const a = articles[id];
    return `
      <article class="blog-card" style="display:flex;">
        <div class="blog-img-wrapper" style="height:180px;">
          <img src="${a.heroImg}" alt="${a.title}" class="blog-img" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="blog-content">
          <span class="badge ${a.badge.includes('City')||a.badge.includes('Sustain')||a.badge.includes('Safety')?'badge-lime':'badge-orange'}" style="align-self:flex-start; margin-bottom:0.75rem;">${a.badge}</span>
          <h3 style="font-size:1.15rem; margin-bottom:0.5rem;"><a href="blog-details.html?id=${id}" style="color:var(--text-primary);">${a.title}</a></h3>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${a.excerpt}</p>
          <a href="blog-details.html?id=${id}" style="color:var(--color-electric-lime); font-size:0.85rem; font-weight:600; margin-top:auto;">Read Article <i class="fa-solid fa-arrow-right" style="font-size:0.85em; margin-left:0.25rem;"></i></a>
        </div>
      </article>
    `;
  }).join('');
}
