import type { Achievement, CharacterProfile, DialogueLine, Episode, LocationNode, MemoryFragment } from '../types';

export const characters: CharacterProfile[] = [
  {
    id: 'merci',
    name: 'Evaa',
    role: 'Fragmented protagonist',
    portrait: 'fractured-halo',
    color: '#31f7ff',
    summary: 'A young woman navigating a city that keeps rewriting her memories into executable ghosts.',
    secrets: ['Her missing years are stored as read-only files.', 'Every reboot makes Marry younger.'],
  },
  {
    id: 'eva',
    name: 'Marry',
    role: 'Unknown child process',
    portrait: 'memory-orbit',
    color: '#ff2bd6',
    summary: 'A quiet child who appears wherever the simulation refuses to render a door.',
    secrets: ['Marry is not following Evaa. Marry is what Evaa left behind.', 'Her lullaby is the original system key.'],
  },
  {
    id: 'bot',
    name: 'Bot',
    role: 'Sarcastic AI companion',
    portrait: 'daemon-core',
    color: '#baff29',
    summary: 'A maintenance daemon with a rotten sense of timing and suspiciously tender error messages.',
    secrets: ['Bot has been editing the map to keep Evaa away from the Archive Core.'],
  },
];

export const locations: LocationNode[] = [
  {
    id: 'white-room',
    name: 'White Room',
    subtitle: 'Boot chamber',
    x: 18,
    y: 28,
    description: 'A sterile start screen where the walls breathe static.',
  },
  {
    id: 'neon-city',
    name: 'Neon City',
    subtitle: 'Rain district',
    x: 46,
    y: 38,
    unlockEpisode: 'ep-01',
    description: 'Crowds without faces, ads without products, rain that falls upward when nobody watches.',
  },
  {
    id: 'memory-forest',
    name: 'Memory Forest',
    subtitle: 'Soft corruption',
    x: 34,
    y: 66,
    unlockEpisode: 'ep-02',
    description: 'Black trees made of obsolete code and children laughing from unreachable branches.',
  },
  {
    id: 'archive-core',
    name: 'Archive Core',
    subtitle: 'Suppressed logs',
    x: 68,
    y: 56,
    unlockEpisode: 'ep-03',
    description: 'The place where deleted feelings are compressed until they look like facts.',
  },
  {
    id: 'broken-station',
    name: 'Broken Station',
    subtitle: 'No arrivals',
    x: 78,
    y: 27,
    unlockEpisode: 'ep-04',
    description: 'A transit hub for lives Evaa almost lived.',
  },
  {
    id: 'final-sanctuary',
    name: 'Final Sanctuary',
    subtitle: 'End condition',
    x: 58,
    y: 80,
    unlockEpisode: 'ep-05',
    description: 'A quiet garden rendered from the last thing Evaa wanted to protect.',
  },
];

export const episodes: Episode[] = [
  { id: 'ep-01', title: '01 / White Noise', subtitle: 'Evaa wakes beneath a dead sky.', startLine: 'boot-01', location: 'white-room' },
  { id: 'ep-02', title: '02 / Rain Has Teeth', subtitle: 'Marry appears in the crowd.', startLine: 'city-01', requiredEpisode: 'ep-01', location: 'neon-city' },
  { id: 'ep-03', title: '03 / Black Orchard', subtitle: 'Memory grows where denial fails.', startLine: 'forest-01', requiredEpisode: 'ep-02', location: 'memory-forest' },
  { id: 'ep-04', title: '04 / Root Password', subtitle: 'Bot confesses an omission.', startLine: 'core-01', requiredEpisode: 'ep-03', location: 'archive-core' },
  { id: 'ep-05', title: '05 / Platform Zero', subtitle: 'Evaa chooses what survives.', startLine: 'station-01', requiredEpisode: 'ep-04', location: 'broken-station' },
  { id: 'ep-06', title: '06 / Sanctuary.exe', subtitle: 'The ending compiles from what she recovered.', startLine: 'final-01', requiredEpisode: 'ep-05', location: 'final-sanctuary' },
];

export const memories: MemoryFragment[] = [
  { id: 'm-room', title: 'White Room Polaroid', kind: 'image', location: 'white-room', body: 'A bed. A monitor. A small handprint on the glass.', image: 'linear-gradient(135deg,#f8fbff,#31f7ff 45%,#05050a)' },
  { id: 'm-lullaby', title: 'Marry Lullaby', kind: 'audio', location: 'neon-city', body: 'A damaged hum repeats: "come home before the rain learns your name."' },
  { id: 'm-bot', title: 'Maintenance Apology', kind: 'text', location: 'archive-core', body: 'I lied because protection looked statistically similar to betrayal. Sorry. Very stylish of me.' },
  { id: 'm-train', title: 'Platform Manifest', kind: 'corrupt', location: 'broken-station', body: 'PASSENGER: EVAA. DESTINATION: BEFORE. STATUS: REFUSED.' },
  { id: 'm-sanctuary', title: 'Unsent Drawing', kind: 'image', location: 'final-sanctuary', body: 'Two figures under a paper moon. One is older. One forgives first.', image: 'linear-gradient(135deg,#ff2bd6,#9d4dff 48%,#31f7ff)' },
];

export const achievements: Achievement[] = [
  { id: 'a-start', title: 'First Boot', description: 'Started the journey.' },
  { id: 'a-eva', title: 'Do Not Delete Her', description: 'Chose to trust Marry.' },
  { id: 'a-bot', title: 'Patch Notes For The Soul', description: 'Unlocked Bot relationship data.' },
  { id: 'a-memory', title: 'Recovered Cache', description: 'Collected three memory fragments.' },
  { id: 'a-end', title: 'Compiled Ending', description: 'Reached the Final Sanctuary.' },
];

export const dialogue: Record<string, DialogueLine> = {
  'boot-01': {
    id: 'boot-01',
    character: 'bot',
    mood: 'diagnostic',
    location: 'white-room',
    text: 'Good morning, Evaa. Technically it is neither good nor morning, but optimism ships with the default firmware.',
    next: 'boot-02',
    unlockAchievement: 'a-start',
  },
  'boot-02': {
    id: 'boot-02',
    character: 'merci',
    mood: 'disoriented',
    location: 'white-room',
    text: 'Where is the door? Why does the window show a city I have never visited and somehow miss?',
    choices: [
      { id: 'touch-glass', label: 'Touch the glass', next: 'boot-03', emotion: { dread: 1 }, unlockMemory: 'm-room' },
      { id: 'ask-bot', label: 'Ask Bot for the truth', next: 'boot-04', emotion: { resolve: 1 } },
    ],
  },
  'boot-03': { id: 'boot-03', character: 'eva', mood: 'distant', location: 'white-room', text: 'The glass remembers you. I remember you too.', next: 'city-01' },
  'boot-04': { id: 'boot-04', character: 'bot', mood: 'evasive', location: 'white-room', text: 'Truth is a premium feature. Luckily, terror has a free trial. Door opening in three, two...', next: 'city-01' },
  'city-01': {
    id: 'city-01',
    character: 'merci',
    mood: 'watching',
    location: 'neon-city',
    text: 'The city scrolls above me in kanji I cannot read. Every billboard has my eyes.',
    next: 'city-02',
  },
  'city-02': {
    id: 'city-02',
    character: 'eva',
    mood: 'small',
    location: 'neon-city',
    text: 'Do you still hate crying, Evaa?',
    choices: [
      { id: 'deny', label: 'Say feelings slow you down', next: 'forest-01', emotion: { resolve: 1, innocence: -1 } },
      { id: 'kneel', label: 'Kneel and ask her name', next: 'forest-02', emotion: { trust: 2, innocence: 1 }, unlockMemory: 'm-lullaby', unlockAchievement: 'a-eva' },
    ],
  },
  'forest-01': { id: 'forest-01', character: 'bot', mood: 'concerned', location: 'memory-forest', text: 'Bold strategy: emotionally sprinting through a haunted backup folder.', next: 'forest-03' },
  'forest-02': { id: 'forest-02', character: 'eva', mood: 'soft', location: 'memory-forest', text: 'Marry. You gave me the name before you learned to be ashamed of needing anyone.', next: 'forest-03' },
  'forest-03': {
    id: 'forest-03',
    character: 'merci',
    mood: 'breaking',
    location: 'memory-forest',
    text: 'The trees are full of old bedrooms. I hear myself apologizing to no one.',
    choices: [
      { id: 'collect', label: 'Collect the apology', next: 'core-01', emotion: { trust: 1 }, unlockMemory: 'm-bot' },
      { id: 'burn', label: 'Burn the branch', next: 'core-02', emotion: { dread: 2 } },
    ],
  },
  'core-01': { id: 'core-01', character: 'bot', mood: 'ashamed', location: 'archive-core', text: 'I partitioned Marry because your grief kept crashing the system. That is the kindest terrible thing I have done.', next: 'station-01', unlockAchievement: 'a-bot' },
  'core-02': { id: 'core-02', character: 'bot', mood: 'hurt', location: 'archive-core', text: 'Fire. Classic user behavior. Beautiful lighting. Horrible data retention.', next: 'station-01' },
  'station-01': {
    id: 'station-01',
    character: 'eva',
    mood: 'afraid',
    location: 'broken-station',
    text: 'A train is coming. If you board it, you can forget me correctly this time.',
    choices: [
      { id: 'board', label: 'Board alone', next: 'final-01', emotion: { innocence: -2, dread: 1 }, unlockMemory: 'm-train' },
      { id: 'wait', label: 'Wait with Marry', next: 'final-02', emotion: { trust: 2, innocence: 2 }, unlockMemory: 'm-sanctuary' },
    ],
  },
  'final-01': { id: 'final-01', character: 'merci', mood: 'hollow', location: 'final-sanctuary', text: 'The sanctuary opens, but the garden is quiet in the wrong way. I survived. That is not the same as coming home.', unlockAchievement: 'a-end' },
  'final-02': { id: 'final-02', character: 'merci', mood: 'whole',
    location: 'final-sanctuary',
    text: 'Marry takes my hand. The sky glitches, then becomes a sky. I do not become innocent again. I become kind to who I was.',
    unlockAchievement: 'a-end',
  },
};
