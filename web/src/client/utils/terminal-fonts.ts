export const TERMINAL_FONT_OPTIONS = [
  { id: 'system', label: 'System Monospace' },
  { id: 'fira-code', label: 'Fira Code (Bundled)' },
  { id: 'hack-nerd', label: 'Hack Nerd Font Mono (Bundled)' },
  { id: 'sf-mono', label: 'SF Mono' },
  { id: 'menlo', label: 'Menlo' },
  { id: 'consolas', label: 'Consolas' },
  { id: 'liberation-mono', label: 'Liberation Mono' },
] as const;

export type TerminalFontId = (typeof TERMINAL_FONT_OPTIONS)[number]['id'];

export const DEFAULT_TERMINAL_FONT_ID: TerminalFontId = 'system';

const SYSTEM_TERMINAL_FONT_STACK =
  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace';

const TERMINAL_FONT_FAMILIES: Record<TerminalFontId, string> = {
  system: SYSTEM_TERMINAL_FONT_STACK,
  'fira-code': `"Fira Code", ${SYSTEM_TERMINAL_FONT_STACK}`,
  'hack-nerd': `"Hack Nerd Font Mono", "Fira Code", ${SYSTEM_TERMINAL_FONT_STACK}`,
  'sf-mono': `"SF Mono", SFMono-Regular, ${SYSTEM_TERMINAL_FONT_STACK}`,
  menlo: `"Menlo", ${SYSTEM_TERMINAL_FONT_STACK}`,
  consolas: `"Consolas", ${SYSTEM_TERMINAL_FONT_STACK}`,
  'liberation-mono': `"Liberation Mono", ${SYSTEM_TERMINAL_FONT_STACK}`,
};

const TERMINAL_FONT_LOAD_FACES: Partial<Record<TerminalFontId, string>> = {
  'fira-code': 'Fira Code',
  'hack-nerd': 'Hack Nerd Font Mono',
};

export function getTerminalFontFamily(fontId: TerminalFontId): string {
  return TERMINAL_FONT_FAMILIES[fontId];
}

export function getTerminalFontLoadFace(fontId: TerminalFontId): string | null {
  return TERMINAL_FONT_LOAD_FACES[fontId] ?? null;
}

export function isTerminalFontId(value: unknown): value is TerminalFontId {
  return typeof value === 'string' && Object.hasOwn(TERMINAL_FONT_FAMILIES, value);
}
