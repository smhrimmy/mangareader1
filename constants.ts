import { ContentStatus, Manga, Novel } from './types';

export const MOCK_MANGAS: Manga[] = [
  {
    id: 'm1',
    type: 'MANGA',
    title: 'Solo Leveling: Reawakened',
    author: 'Chugong',
    coverUrl: 'https://picsum.photos/300/450?random=1',
    synopsis: 'In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.',
    tags: ['Action', 'Fantasy', 'System'],
    status: ContentStatus.ONGOING,
    rating: 4.9,
    views: '120M',
    lastUpdate: '2 hours ago',
    totalChapters: 189
  },
  {
    id: 'm2',
    type: 'MANGA',
    title: 'The Beginning After The End',
    author: 'TurtleMe',
    coverUrl: 'https://picsum.photos/300/450?random=2',
    synopsis: 'King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability. However, solitude lingers closely behind those with great power.',
    tags: ['Isekai', 'Magic', 'Adventure'],
    status: ContentStatus.ONGOING,
    rating: 4.8,
    views: '85M',
    lastUpdate: '1 day ago',
    totalChapters: 175
  },
  {
    id: 'm3',
    type: 'MANGA',
    title: 'Omniscient Reader',
    author: 'SingNsong',
    coverUrl: 'https://picsum.photos/300/450?random=3',
    synopsis: 'Kim Dokja does not consider himself the protagonist of his own life. Befitting the name his parents gave him, he is a solitary person whose only hobby is reading web novels.',
    tags: ['Apocalypse', 'Psychological', 'Action'],
    status: ContentStatus.ONGOING,
    rating: 4.9,
    views: '92M',
    lastUpdate: '3 days ago',
    totalChapters: 210
  }
];

export const MOCK_NOVELS: Novel[] = [
  {
    id: 'n1',
    type: 'NOVEL',
    title: 'Shadow Slave',
    author: 'GuiltyThree',
    coverUrl: 'https://picsum.photos/300/450?random=4',
    synopsis: 'Growing up in poverty, Sunny never expected anything good from life. However, after being chosen by the Nightmare Spell and becoming one of the Awakened, he found himself thrown into a merciless world.',
    tags: ['Dark Fantasy', 'Survival', 'Weak to Strong'],
    status: ContentStatus.ONGOING,
    rating: 4.9,
    views: '45M',
    lastUpdate: '1 hour ago',
    totalChapters: 1450,
    wordCount: '2.4M'
  },
  {
    id: 'n2',
    type: 'NOVEL',
    title: 'Lord of the Mysteries',
    author: 'Cuttlefish',
    coverUrl: 'https://picsum.photos/300/450?random=5',
    synopsis: 'With the rising tide of steam power and machinery, who can come close to being a Beyonder? Shrouded in the fog of history and darkness, who or what is the lurking evil that whispers into our ears?',
    tags: ['Steampunk', 'Mystery', 'Supernatural'],
    status: ContentStatus.COMPLETED,
    rating: 5.0,
    views: '32M',
    lastUpdate: '1 year ago',
    totalChapters: 1432,
    wordCount: '3.1M'
  },
  {
    id: 'n3',
    type: 'NOVEL',
    title: 'Reverend Insanity',
    author: 'Gu Zhen Ren',
    coverUrl: 'https://picsum.photos/300/450?random=6',
    synopsis: 'A story of a villain. Fang Yuan was reborn 500 years into the past with the Spring Autumn Cicada he painstakingly refined. With his profound wisdom, battle and life experiences, he seeks to overcome his foes with skill and wit.',
    tags: ['Villain MC', 'Cultivation', 'Strategy'],
    status: ContentStatus.HIATUS,
    rating: 4.7,
    views: '60M',
    lastUpdate: '2 years ago',
    totalChapters: 2334,
    wordCount: '5.2M'
  }
];

export const MOCK_CHAPTER_TEXT = `
  <p>The sky above the port was the color of television, tuned to a dead channel.</p>
  <p>It was not a day for heroes. The rain fell in sheets, washing away the grime of the lower city into the gutters where it belonged. Sunny pulled his hood tighter, the damp fabric clinging to his skin like a second, unwanted layer.</p>
  <p>"Another day, another nightmare," he muttered, checking his interface. The blue light of the holographic display reflected in his dark eyes.</p>
  <br/>
  <p>The system had been quiet lately. Too quiet. In the world of the Awakened, silence usually meant something was stalking you.</p>
  <p>He turned the corner, his boots splashing in a puddle reflecting the neon sign of a noodle bar. The smell of synthetic broth and ozone hung heavy in the air. This was sector 4, the edge of the safe zone. Beyond lay the nightmare seeds, waiting to sprout.</p>
  <p>Suddenly, a notification chimed.</p>
  <p class="font-bold text-red-500">[ALERT: Proximity Breach Detected]</p>
  <p>Sunny grinned, a sharp, humorless expression. "Finally."</p>
  <br/>
  <hr/>
  <br/>
  <p>He drew his dagger, the obsidian blade drinking in the scarce light. The shadow beneath him stretched, detached itself from the pavement, and stood up.</p>
  <p>It was time to feed.</p>
`;
