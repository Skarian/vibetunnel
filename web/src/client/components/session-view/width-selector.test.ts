// @vitest-environment happy-dom

import { fixture } from '@open-wc/testing';
import { html } from 'lit';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import './width-selector.js';
import type { TerminalSettingsModal } from './width-selector.js';

describe('TerminalSettingsModal', () => {
  let element: TerminalSettingsModal;

  beforeEach(async () => {
    localStorage.clear();

    element = await fixture<TerminalSettingsModal>(html`
      <terminal-settings-modal
        .visible=${true}
        .terminalMaxCols=${80}
        .terminalFontSize=${14}
        .terminalFontFamily=${'system'}
        .terminalTheme=${'auto'}
      ></terminal-settings-modal>
    `);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render width, font size, font family, and theme controls', async () => {
    await element.updateComplete;

    const widthSelect = document.querySelector('select') as HTMLSelectElement | null;
    expect(widthSelect).toBeTruthy();

    const fontFamilySelect = document.querySelector('#font-family-select') as HTMLSelectElement | null;
    expect(fontFamilySelect).toBeTruthy();

    const themeSelect = document.querySelector('#theme-select') as HTMLSelectElement | null;
    expect(themeSelect).toBeTruthy();
    expect(
      Array.from(themeSelect?.options ?? []).some((option) => option.value === 'catppuccin-mocha')
    ).toBe(true);
  });

  it('should not render legacy binary mode toggle', async () => {
    await element.updateComplete;

    expect(document.querySelector('[role="switch"]')).toBeFalsy();
  });
});
