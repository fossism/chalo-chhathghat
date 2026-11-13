# Chalo Chhath Ghat (चलो छठ घाट)
### 600-Meter Pilgrimage Journey — Anime Aesthetic & Realistic Showcase

An online, real-time 3D browser pilgrimage and crowd game capturing the authentic soul of **Chhath Puja Mahaparv** from the village ancestral home to the holy Ganges.

---

## Overview

### 1. The Full 600-Meter Pilgrimage Route (घर से गंगा घाट तक)
The ghat is not right outside your door—it is a **600-meter devotional journey** through 5 distinct living zones:
* **0m to 120m — Ancestral Home & Courtyard (घर का आंगन व तुलसी चौरा)**:
  - Traditional brick village house with sloping clay tiled roof (*khaprail makaan*), carved wooden doors, and verandah.
  - Sacred clay *Tulsi Chaura* with burning diya.
  - Mango-wood river-clay stove (*Mitti ka Chulha*) with rising smoke where Kharna kheer and Thekua are freshly prepared.
  - Lifting the heavy bamboo Daura onto the head.
* **120m to 280m — Village Alleys & Basti (गाँव की पगडंडी व बस्ती)**:
  - Mud-walled thatched huts, cow sheds (*bathan*), stacked cow-dung fuel cakes (*goitha*).
  - Devotees performing *Dandvat Pranaam* (crawling prostrations with sacred chalk lines).
  - Villagers offering pranaam and touching the Daura for blessings.
* **280m to 440m — Festive Bazaar & Toran Dwar (तोरण द्वार व सहरिया बाजार)**:
  - Grand illuminated welcome archway (*Chhath Mahaparv Toran Dwar*).
  - Bunting garland flags strung across the road.
  - Festival market stalls selling sugarcane bundles, giant pomelos (*Dabh Nimbu*), water chestnuts (*Singhara*), and clay lamps.
  - Loudspeaker pole broadcasting Padma Bhushan **Sharda Sinha's** immortal folk melodies.
* **440m to 540m — Sandy Floodplain Trail (रेत व बालू का कछार)**:
  - Road transitions into soft river sand (*balu*).
  - Flanked by lush banana tree groves with hanging banana hands.
  - Winter morning mist (*kuhaasa*) gathering over the trail.
* **540m to 600m+ — The Grand Sacred Ganga Ghat (महा पावन गंगा घाट)**:
  - Multi-tiered red sandstone steps descending into the water.
  - 5-sugarcane *Kosi* canopies with terracotta elephants (*Kosi Haathi*) and burning oil lamps.
  - The Holy Ganges river with real-time mirror reflections (`MeshReflectorMaterial`).
  - Devotees standing waist-deep in water offering holy Arghya to the blazing sun.

---

### 2. Studio Ghibli / Makoto Shinkai Anime-Style People
* **Anime Vrati (Heroine Devotee)**:
  - Natural anime human anatomy: expressive eyes with specular highlights, tapered jawline, styled dark hair with marigolds.
  - Draped cotton-silk *Piliya* saree with crimson borders and golden zari embroidery.
  - **Billowing Saree Pallu**: Graceful cloth tail waving and fluttering in the river wind with procedural wave animation.
  - Iconic **Orange Matiya Sindoor** drawn cleanly from the tip of the nose up the forehead parting.
  - Jointed arms holding the woven bamboo *Soop* with coconut, dabh pomelo, thekua, and a lit diya.
* **Anime Daura Bearer (Lead Protagonist)**:
  - Athletic anime hero build with styled dark anime hair and devotional tilak.
  - Draped white kurta with knee-jointed walking legs.
  - Saffron-yellow *gamchha* fluttering over the shoulder in the breeze.
  - Hands raised supporting the large bamboo *Daura* on a twisted cloth ring (*bitha*).
  - Biomechanical walking cycle: hip sway, knee flexion, foot plant, and balanced basket sway.

---

### 3. Realistic & Anime-Detailed Banana Trees (Kelwa ke Ped)
* **Organic Tapered Trunk**: Curved pseudostem with overlapping leaf sheath textures and dried peeling bark layers.
* **10 Sweeping Drooping Fronds**: Modeled with realistic parabolic curves, pale green central midribs, high-resolution parallel vein textures, and natural wind-split slits in the leaves.
* **Hanging Banana Bunch (*Kelwa ke Ghaudh*)**: 4 spiral tiers of curved crescent finger bananas shifting from yellow to green, terminating in a deep burgundy banana blossom (*Mocha*).
* **Bamboo Support Prop (*Theka*)**: Angled pole supporting the heavy fruit branch.

---

### 4. 600m Journey HUD & Instant Waypoint Teleport
* **Live Distance Progress Bar**: Shows exactly how many meters you have walked from `0m` to `600m`.
* **5 Quick Teleport Waypoint Buttons**:
  - `[0m: Home (घर का आंगन)]`
  - `[150m: Alley (गाँव की पगडंडी)]`
  - `[320m: Bazaar (तोरण द्वार व बाजार)]`
  - `[480m: Trail (रेत व बालू का कछार)]`
  - `[600m: Ghat (महा पावन गंगा घाट)]`
* **Showcase Camera Views**:
  - 600m Drone Pilgrimage Tour
  - Surya Arghya Ghat Close-up
  - Ancestral Home Courtyard View
  - Festive Bazaar Arch View
  - Interactive WASD / Joystick Free Walk Mode

---

## Tech Stack

* **3D Rendering**: Three.js, React Three Fiber, React Three Drei
* **Shaders & Reflections**: MeshReflectorMaterial, MeshToonMaterial with procedural cel-shading gradient maps
* **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
* **Audio**: Web Audio API Procedural Synthesizer (Shankhnaad, temple bells, dholak beats, tanpura drone)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open `http://127.0.0.1:5173/` in your browser to experience the 600m pilgrimage.
