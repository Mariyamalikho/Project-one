import type { CSSProperties } from 'react';
import { characters } from '../data/world';
import type { CharacterId } from '../types';

export function CharacterPortrait({ id, mood }: { id: CharacterId; mood: string }) {
  const character = characters.find((item) => item.id === id)!;
  return (
    <div className="portrait" style={{ '--portrait-color': character.color } as CSSProperties}>
      <div className={`portrait-core portrait-${character.portrait}`} aria-hidden>
        <span className="avatar-ring avatar-ring-a" />
        <span className="avatar-ring avatar-ring-b" />
        <span className="avatar-face">
          <span className="avatar-eye avatar-eye-left" />
          <span className="avatar-eye avatar-eye-right" />
          <span className="avatar-mark" />
        </span>
      </div>
      <div className="mt-3 text-center">
        <p className="font-display text-lg uppercase tracking-[0.24em]" style={{ color: character.color }}>
          {character.name}
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{mood}</p>
      </div>
    </div>
  );
}
