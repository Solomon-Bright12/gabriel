export interface Painting {
  id: string;
  title: string;
  medium: string;
  dimensions: string;
  price: string;
  status: 'Available' | 'Acquired';
  image: string;
  accentColor: 'gold' | 'crimson';
  description: string;
  year: string;
}

export const paintings: Painting[] = [
  {
    id: "1",
    title: "Field of Thoughts",
    medium: "Oil on Canvas",
    dimensions: "36\" x 48\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art1.jpeg",
    accentColor: "gold",
    description: "A surreal composition of a profile immersed in a vast field of yellow flowers under a twilight sky.",
    year: "2024"
  },
  {
    id: "2",
    title: "Perspective",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art2.jpeg",
    accentColor: "crimson",
    description: "An exaggerated exploration of scale and perspective featuring two figures in stark red and blue.",
    year: "2024"
  },
  {
    id: "3",
    title: "Cosmic Reflection",
    medium: "Acrylic & Mixed Media on Canvas",
    dimensions: "24\" x 30\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art3.jpeg",
    accentColor: "gold",
    description: "A close-up focusing on reflections of planetary bodies in the eyes, blurring the line between the inner and outer universe.",
    year: "2024"
  },
  {
    id: "4",
    title: "The Offering",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art4.jpeg",
    accentColor: "crimson",
    description: "A tender moment of offering flowers set against a vibrant, multi-layered colorful sky.",
    year: "2024"
  },
  {
    id: "5",
    title: "Duality",
    medium: "Oil & Acrylic on Canvas",
    dimensions: "30\" x 40\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art5.jpeg",
    accentColor: "gold",
    description: "A split portrait contrasting life and the skeletal void, tied together by a flowing purple essence.",
    year: "2024"
  },
  {
    id: "6",
    title: "Solitude",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art6.jpeg",
    accentColor: "crimson",
    description: "A lone figure suspended in a vast, atmospheric expanse — a meditation on silence and inner stillness.",
    year: "2024"
  },
  {
    id: "7",
    title: "Emergence",
    medium: "Oil on Canvas",
    dimensions: "40\" x 50\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art7.jpeg",
    accentColor: "gold",
    description: "A dramatic composition of form breaking free from shadow, embodying the tension between constraint and liberation.",
    year: "2024"
  },
  {
    id: "8",
    title: "Reverie",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art8.jpeg",
    accentColor: "crimson",
    description: "A dreamlike portrait where the boundary between the conscious and subconscious dissolves into soft, luminous color.",
    year: "2024"
  },
  {
    id: "9",
    title: "Chromatic Soul",
    medium: "Acrylic on Canvas",
    dimensions: "36\" x 36\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art9.jpeg",
    accentColor: "gold",
    description: "An exploration of the human spirit rendered through bold, saturated color fields that pulse with emotional energy.",
    year: "2024"
  },
  {
    id: "10",
    title: "The Weight of Time",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art10.jpeg",
    accentColor: "crimson",
    description: "A contemplative piece where figure and hour collide — time depicted not as a clock but as a presence that sits heavily upon the soul.",
    year: "2024"
  },
  {
    id: "11",
    title: "Ignition",
    medium: "Mixed Media on Canvas",
    dimensions: "30\" x 30\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art11.jpeg",
    accentColor: "gold",
    description: "A kinetic burst of light and form capturing the precise moment before transformation, suspended at the edge of becoming.",
    year: "2024"
  },
  {
    id: "12",
    title: "Undercurrent",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art12.jpeg",
    accentColor: "crimson",
    description: "A fluid, subterranean world where movement and stillness coexist in uneasy, beautiful tension.",
    year: "2024"
  },
  {
    id: "13",
    title: "Phantom Bloom",
    medium: "Oil on Wood Panel",
    dimensions: "24\" x 36\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art13.jpeg",
    accentColor: "gold",
    description: "Flowers that exist between states — neither fully alive nor entirely gone — blooming in the liminal space of memory.",
    year: "2024"
  },
  {
    id: "14",
    title: "Fracture",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art14.jpeg",
    accentColor: "crimson",
    description: "A shattered portrait examining the fragmented self — the pieces that remain after loss reassembled into something new.",
    year: "2025"
  },
  {
    id: "15",
    title: "Radiance",
    medium: "Acrylic on Canvas",
    dimensions: "18\" x 24\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art15.jpeg",
    accentColor: "gold",
    description: "An effulgent study of inner light made visible — the glow that emanates from a spirit fully inhabiting its own truth.",
    year: "2025"
  },
  {
    id: "16",
    title: "Veil",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art16.jpeg",
    accentColor: "crimson",
    description: "A whisper of transparency — a figure seen through gauze and time, present yet unreachable, familiar yet strange.",
    year: "2025"
  },
  {
    id: "17",
    title: "Threshold",
    medium: "Oil on Canvas",
    dimensions: "30\" x 40\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art17.jpeg",
    accentColor: "gold",
    description: "Standing at the edge of the known, a figure gazes into the infinite — a portrait of courage at the moment of crossing.",
    year: "2025"
  },
  {
    id: "18",
    title: "Nocturne",
    medium: "Digital Art",
    dimensions: "Variable Resolution",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art18.jpeg",
    accentColor: "crimson",
    description: "A deep-night composition that transforms darkness from absence into presence — the city, the sky, and the self converging.",
    year: "2025"
  },
  {
    id: "19",
    title: "Ascension",
    medium: "Oil & Mixed Media on Canvas",
    dimensions: "48\" x 60\"",
    price: "Available on Inquiry",
    status: "Available",
    image: "/images/art19.jpeg",
    accentColor: "gold",
    description: "The final movement — a figure rising beyond the frame, beyond gravity itself, into the luminous unknown.",
    year: "2025"
  }
];
