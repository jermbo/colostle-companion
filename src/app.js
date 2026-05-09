import {
  lookupExploration,
  lookupItem,
  lookupSettlement,
} from './data/oracle-tables.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SUITS = ['♠', '♥', '♦', '♣'];
const SUIT_NAMES = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
const SUIT_LABELS = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RED_SUITS = new Set(['♥', '♦']);

const TOP_BAR_TITLES = {
  home:  'Colostle',
  play:  'The Iron Vale',
  party: 'Party',
  story: 'Journal',
  cards: 'Cards',
};

const TOP_BAR_SUBS = {
  home:  '',
  play:  'Phase 1 · Session 3',
  party: '',
  story: '',
  cards: 'The Iron Vale',
};

// ---------------------------------------------------------------------------
// State (mock — no persistence yet)
// ---------------------------------------------------------------------------

const state = {
  activeTab: 'home',
  exploreCounter: { filled: 3, total: 5 },
  combatCounter:  { filled: 1, total: 5 },
  deckCount: 38,
  lastCard: { value: '9', suit: '♣' },
  journalOpen: false,
};

// ---------------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);

const els = {
  topBarTitle:   $('top-bar-title'),
  topBarSub:     $('top-bar-sub'),
  topBarRight:   $('top-bar-right'),
  navItems:      document.querySelectorAll('.nav-item'),
  tabPanels:     document.querySelectorAll('.tab-panel'),

  exploreBar:    $('explore-bar'),
  exploreValue:  $('explore-value'),
  combatBar:     $('combat-bar'),
  combatValue:   $('combat-value'),

  deckCount:     $('deck-count'),
  flippedCard:   $('flipped-card'),
  cardValue:     $('card-value'),
  cardSuit:      $('card-suit'),

  oracleTag:     $('oracle-tag'),
  oracleCardLabel: $('oracle-card-label'),
  oracleResult:  $('oracle-result'),
  oracleSub:     $('oracle-sub'),

  btnReflip:     $('btn-reflip'),
  btnJournal:    $('btn-journal'),
  quickJournal:  $('quick-journal'),
  journalTextarea: $('journal-textarea'),
  btnSaveJournal: $('btn-save-journal'),
};

// ---------------------------------------------------------------------------
// Progress bar renderer
// ---------------------------------------------------------------------------

function renderProgressBar(containerEl, filled, total, color) {
  containerEl.innerHTML = '';
  containerEl.style.setProperty('--seg-color', color);
  for (let i = 0; i < total; i++) {
    const seg = document.createElement('div');
    seg.className = 'progress-bar__seg' + (i < filled ? ' filled' : '');
    containerEl.appendChild(seg);
  }
}

function renderCounters() {
  const { exploreCounter, combatCounter } = state;
  els.exploreValue.textContent = `${exploreCounter.filled} / ${exploreCounter.total}`;
  renderProgressBar(els.exploreBar, exploreCounter.filled, exploreCounter.total, 'var(--explore)');

  els.combatValue.textContent = `${combatCounter.filled} / ${combatCounter.total}`;
  renderProgressBar(els.combatBar, combatCounter.filled, combatCounter.total, 'var(--combat)');
}

// ---------------------------------------------------------------------------
// Tab switching
// ---------------------------------------------------------------------------

function activateTab(tabId) {
  state.activeTab = tabId;

  els.navItems.forEach((btn) => {
    const active = btn.dataset.tab === tabId;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  els.tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });

  els.topBarTitle.textContent = TOP_BAR_TITLES[tabId] ?? 'Colostle';
  els.topBarSub.textContent   = TOP_BAR_SUBS[tabId] ?? '';

  const showMenu = tabId === 'play';
  els.topBarRight.style.visibility = showMenu ? 'visible' : 'hidden';
}

// ---------------------------------------------------------------------------
// Card flip mechanic
// ---------------------------------------------------------------------------

function randomCard() {
  const value = VALUES[Math.floor(Math.random() * VALUES.length)];
  const suit  = SUITS[Math.floor(Math.random() * SUITS.length)];
  return { value, suit };
}

function suitColor(suit) {
  return RED_SUITS.has(suit) ? 'red' : 'black';
}

function suitName(suit) {
  return SUIT_NAMES[suit];
}

function cardLabel(value, suit) {
  const suitWords = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
  return `${value} of ${suitWords[suit]}`;
}

function resolveOracleResult(value, suit) {
  const color = suitColor(suit);
  const name  = suitName(suit);
  const result = lookupExploration(value, color, name);

  if (result.enemyEncounter) {
    return {
      type: 'enemy',
      tagText: 'Enemy encounter',
      tagClass: 'wf-tag-combat',
      headline: `${value === 'J' ? 'A non-Rook enemy' : value === 'Q' ? 'A medium Rook' : 'A large Rook'} appears`,
      sub: 'Three additional flips will determine its type, range, and magic ability.',
    };
  }

  const modifier = result[name] ?? '';
  return {
    type: 'exploration',
    tagText: color === 'red' ? 'Exploration — organic' : 'Exploration — non-organic',
    tagClass: color === 'red' ? 'wf-tag-explore' : 'wf-tag-accent',
    headline: result.base,
    sub: modifier,
  };
}

function updateCardDisplay(value, suit) {
  const color = suitColor(suit);
  els.flippedCard.className = `playing-card playing-card--${color}`;
  els.flippedCard.setAttribute('aria-label', `Last flipped card: ${cardLabel(value, suit)}`);
  els.cardValue.textContent = value;
  els.cardSuit.textContent  = suit;
}

function updateOracleDisplay(value, suit) {
  const resolved = resolveOracleResult(value, suit);

  // Tag
  els.oracleTag.textContent = resolved.tagText;
  els.oracleTag.className   = `wf-tag ${resolved.tagClass}`;

  // Card label
  els.oracleCardLabel.textContent = cardLabel(value, suit);

  // Result text
  els.oracleResult.textContent = resolved.headline;
  els.oracleSub.textContent    = resolved.sub;
}

function doFlip() {
  const { value, suit } = randomCard();
  state.lastCard = { value, suit };

  // Update deck count (mock — wraps at 0)
  state.deckCount = state.deckCount > 1 ? state.deckCount - 1 : 52;
  els.deckCount.textContent = state.deckCount;

  updateCardDisplay(value, suit);
  updateOracleDisplay(value, suit);

  // Close journal if open
  if (state.journalOpen) toggleJournal(false);
}

// ---------------------------------------------------------------------------
// Journal toggle
// ---------------------------------------------------------------------------

function toggleJournal(forceOpen) {
  state.journalOpen = forceOpen !== undefined ? forceOpen : !state.journalOpen;
  els.quickJournal.style.display = state.journalOpen ? 'block' : 'none';
  if (state.journalOpen) {
    els.journalTextarea.focus();
  }
}

// ---------------------------------------------------------------------------
// Event wiring
// ---------------------------------------------------------------------------

function init() {
  // Tab navigation
  els.navItems.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // Campaign card → switch to Play tab
  const campaignCard = document.getElementById('campaign-iron-vale');
  if (campaignCard) {
    campaignCard.addEventListener('click', () => activateTab('play'));
  }

  // Flip button
  els.btnReflip.addEventListener('click', doFlip);

  // Journal toggle
  els.btnJournal.addEventListener('click', () => toggleJournal());

  // Save journal (mock — clears textarea for now)
  els.btnSaveJournal.addEventListener('click', () => {
    els.journalTextarea.value = '';
    toggleJournal(false);
  });

  // Initial render
  renderCounters();
  updateCardDisplay(state.lastCard.value, state.lastCard.suit);
  // Show "flip to begin" state on first load
  els.oracleResult.textContent = 'Flip a card to begin';
  els.oracleTag.textContent    = 'Oracle';
  els.oracleTag.className      = 'wf-tag';
  els.oracleCardLabel.textContent = '';
  els.oracleSub.textContent    = '';
}

document.addEventListener('DOMContentLoaded', init);
