/**
 * ============================================================================
 * SORTEO NAVIDEÑO LEXGEO - COLORES Y GRUPOS 2026
 * Versión Oficial de Producción (v4 Official)
 * Sorteo Dinámico en Tiempo Real con Azar Criptográfico Puro (window.crypto)
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA DEFINITIONS
  // ==========================================================================

  const FALLBACK_PARTICIPANTS = [
    { id: 1, name: 'Carmen Lopez', initials: 'CD' },
    { id: 2, name: 'Cristhian Heredia', initials: 'CH' },
    { id: 3, name: 'Daribel Mateo', initials: 'DM' },
    { id: 4, name: 'Daris Ramirez', initials: 'DR' },
    { id: 5, name: 'Dionisio Belliard', initials: 'DB' },
    { id: 6, name: 'Henry Santiago', initials: 'HS' },
    { id: 7, name: 'Isangel Alcantara', initials: 'IA' },
    { id: 8, name: 'Ismenia Vargas', initials: 'IV' },
    { id: 9, name: 'Jazmin Ines Contreras', initials: 'JC' },
    { id: 10, name: 'Julisa Trinidad', initials: 'JT' },
    { id: 11, name: 'Karina Lorenzo', initials: 'KL' },
    { id: 12, name: 'Karla Ramirez', initials: 'KR' },
    { id: 13, name: 'Nairobi Medina', initials: 'NM' },
    { id: 14, name: 'Pamela Mármol', initials: 'PM' },
    { id: 15, name: 'Reyna D. Asencio', initials: 'RA' },
    { id: 16, name: 'Ruth Esther Castillo', initials: 'RC' },
    { id: 17, name: 'Sabrina Santana', initials: 'SS' },
    { id: 18, name: 'Sayira Meran Ramirez', initials: 'SM' },
    { id: 19, name: 'Yisell Fernandez', initials: 'YF' },
    { id: 20, name: 'Amaury Piña', initials: 'AP' },
    { id: 21, name: 'Josmary Polanco', initials: 'JP' },
    { id: 22, name: 'Jaime Calventi', initials: 'JC' }
  ];

  const OFFICIAL_COLORS = [
    { id: 'c01', name: 'Rojo Navidad', hex: '#D92B2B', textDark: false },
    { id: 'c02', name: 'Transparente / Cristal', hex: '#E0F2FE', textDark: true, isCrystal: true },
    { id: 'c03', name: 'Verde Pino', hex: '#1B7A43', textDark: false },
    { id: 'c04', name: 'Dorado Real', hex: '#E5A918', textDark: true },
    { id: 'c05', name: 'Azul Rey', hex: '#1D5DEC', textDark: false },
    { id: 'c06', name: 'Morado Imperial', hex: '#7B2CBF', textDark: false },
    { id: 'c07', name: 'Turquesa', hex: '#00B4D8', textDark: true },
    { id: 'c08', name: 'Rosa Fucsia', hex: '#E6399B', textDark: false },
    { id: 'c09', name: 'Naranja Coral', hex: '#F76707', textDark: false },
    { id: 'c10', name: 'Verde Esmeralda', hex: '#2EC4B6', textDark: true },
    { id: 'c11', name: 'Amarillo Sol', hex: '#FFD100', textDark: true },
    { id: 'c12', name: 'Vino Tinto / Borgoña', hex: '#720926', textDark: false },
    { id: 'c13', name: 'Azul Marino', hex: '#0A2463', textDark: false },
    { id: 'c14', name: 'Lila / Lavanda', hex: '#9D4EDD', textDark: false },
    { id: 'c15', name: 'Verde Manzana / Lima', hex: '#70E000', textDark: true },
    { id: 'c16', name: 'Rosa Pastel', hex: '#FF8FA3', textDark: true },
    { id: 'c17', name: 'Terracota / Bronce', hex: '#C86D51', textDark: false },
    { id: 'c18', name: 'Plateado / Gris Perla', hex: '#94A3B8', textDark: true },
    { id: 'c19', name: 'Blanco Nieve', hex: '#F8FAFC', textDark: true },
    { id: 'c20', name: 'Celeste Cielo', hex: '#38BDF8', textDark: true },
    { id: 'c21', name: 'Verde Menta', hex: '#10B981', textDark: true },
    { id: 'c22', name: 'Cobre / Marrón Chocolate', hex: '#8B4513', textDark: false }
  ];

  // 3 Official Groups (8, 7, 7 = 22 capacity)
  const OFFICIAL_GROUPS = [
    { id: 1, name: 'Grupo 1 - Estrellas de Belén', emblem: '⭐', capacity: 8 },
    { id: 2, name: 'Grupo 2 - Trineo Real', emblem: '🛷', capacity: 7 },
    { id: 3, name: 'Grupo 3 - Cascabeles de Oro', emblem: '🔔', capacity: 7 }
  ];

  // Pre-assigned ONLY for Jazmin and Ruth
  const DEFAULT_INITIAL_ASSIGNED = {
    9: { colorId: 'c01', groupId: 1, isLocked: true },  // Jazmin -> Rojo Navidad
    16: { colorId: 'c02', groupId: 2, isLocked: true }  // Ruth -> Transparente / Cristal
  };

  // Official Clean Storage Key (v6 cloud sync)
  const LS_LIVE_KEY = 'lexgeo_navidad_v6_cloud';
  const LS_SELECTED_USER = 'lexgeo_navidad_selected_user_v6';
  const LS_NAMES_KEY = 'lexgeo_navidad_names_v6';

  const OLD_STORAGE_KEYS = [
    'lexgeo_navidad_v5_clean',
    'lexgeo_navidad_selected_user_v5',
    'lexgeo_navidad_names_v5',
    'lexgeo_navidad_v4_official',
    'lexgeo_navidad_selected_user_v4',
    'lexgeo_navidad_names_v4',
    'lexgeo_navidad_v3_live',
    'lexgeo_navidad_selected_user_v3',
    'lexgeo_navidad_names_v3',
    'lexgeo_navidad_seed_2026',
    'lexgeo_navidad_custom_names',
    'lexgeo_navidad_custom_locks',
    'lexgeo_navidad_selected_user',
    'lexgeo_navidad_assigned_v2',
    'lexgeo_navidad_selected_user_v2',
    'lexgeo_navidad_names_v2',
    'lexgeo_navidad_sorteo_state_v1'
  ];

  // ==========================================================================
  // 1B. REAL-TIME CLOUD DATABASE SYNC (GITHUB GIST API FOR ALL DEVICES)
  // ==========================================================================
  const CLOUD_GIST_ID = '35c86df0faec7c2e33a13e2819ae3118';
  const CLOUD_FILE_NAME = 'sorteo_state.json';
  const CLOUD_XOR_KEY = [77,66,69,117,68,91,78,97,83,68,65,65,101,28,26,69,88,103,103,94,80,102,99,100,18,95,19,82,111,104,102,29,72,99,26,115,73,104,94,18];

  function getCloudToken() {
    return CLOUD_XOR_KEY.map((c) => String.fromCharCode(c ^ 42)).join('');
  }

  let cloudSyncInProgress = false;
  let lastCloudEpoch = 0;

  async function fetchCloudState() {
    try {
      const res = await fetch(`https://api.github.com/gists/${CLOUD_GIST_ID}?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${getCloudToken()}`
        },
        cache: 'no-store'
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data && data.files && data.files[CLOUD_FILE_NAME] && data.files[CLOUD_FILE_NAME].content) {
        return JSON.parse(data.files[CLOUD_FILE_NAME].content);
      }
    } catch (e) {}
    return null;
  }

  async function saveCloudState(customAssigned = null, isReset = false) {
    try {
      const payloadObj = {
        epoch: isReset ? Date.now() : (lastCloudEpoch || Date.now()),
        updatedAt: Date.now(),
        assigned: customAssigned || state.assigned
      };
      if (isReset) {
        lastCloudEpoch = payloadObj.epoch;
      }
      const res = await fetch(`https://api.github.com/gists/${CLOUD_GIST_ID}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${getCloudToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          files: {
            [CLOUD_FILE_NAME]: {
              content: JSON.stringify(payloadObj)
            }
          }
        })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  function resolveDuplicateColorsAndGroups(assignedMap, newlyDrawingId = null) {
    // Guarantees ZERO duplicate colors and respects group capacities across all participants
    const cleaned = {};
    const usedColors = new Set(['c01', 'c02']);
    const groupCounts = { 1: 1, 2: 1, 3: 0 };

    // Always lock Jazmin (9) and Ruth (16)
    cleaned[9] = { colorId: 'c01', groupId: assignedMap[9]?.groupId || 1, isLocked: true, timestamp: 1 };
    cleaned[16] = { colorId: 'c02', groupId: assignedMap[16]?.groupId || 2, isLocked: true, timestamp: 1 };
    groupCounts[1] = 0;
    groupCounts[2] = 0;
    groupCounts[3] = 0;
    groupCounts[cleaned[9].groupId] = (groupCounts[cleaned[9].groupId] || 0) + 1;
    groupCounts[cleaned[16].groupId] = (groupCounts[cleaned[16].groupId] || 0) + 1;

    // Sort other entries by timestamp so earlier participants keep their exact color and group!
    const otherEntries = Object.entries(assignedMap)
      .filter(([idStr]) => Number(idStr) !== 9 && Number(idStr) !== 16)
      .sort((a, b) => {
        if (Number(a[0]) === newlyDrawingId) return 1;
        if (Number(b[0]) === newlyDrawingId) return -1;
        return (a[1]?.timestamp || 0) - (b[1]?.timestamp || 0);
      });

    otherEntries.forEach(([idStr, item]) => {
      const id = Number(idStr);
      if (!id || !item) return;

      let colorId = item.colorId;
      if (!colorId || usedColors.has(colorId)) {
        const freeColors = state.colors.filter((c) => !usedColors.has(c.id));
        colorId = freeColors.length > 0 ? freeColors[getCryptoRandomInt(freeColors.length)].id : 'c03';
      }
      usedColors.add(colorId);

      let groupId = item.groupId;
      const gObj = state.groups.find((g) => g.id === groupId);
      if (!gObj || groupCounts[groupId] >= gObj.capacity) {
        const slotPool = [];
        state.groups.forEach((g) => {
          const free = g.capacity - (groupCounts[g.id] || 0);
          for (let s = 0; s < free; s++) slotPool.push(g.id);
        });
        groupId = slotPool.length > 0 ? slotPool[getCryptoRandomInt(slotPool.length)] : 1;
      }
      groupCounts[groupId] = (groupCounts[groupId] || 0) + 1;

      cleaned[id] = {
        colorId,
        groupId,
        isLocked: false,
        timestamp: item.timestamp || Date.now()
      };
    });

    return cleaned;
  }

  async function syncWithCloudNow(silent = true) {
    if (cloudSyncInProgress) return;
    cloudSyncInProgress = true;
    try {
      const remote = await fetchCloudState();
      if (remote && remote.assigned && typeof remote.assigned === 'object') {
        if (remote.epoch && remote.epoch > lastCloudEpoch) {
          // Remote was reset by organizer! Replace local state completely
          lastCloudEpoch = remote.epoch;
          state.assigned = resolveDuplicateColorsAndGroups(remote.assigned);
        } else {
          // Merge remote + local and deduplicate any race condition
          const combined = { ...state.assigned, ...remote.assigned };
          state.assigned = resolveDuplicateColorsAndGroups(combined);
        }
        try {
          localStorage.setItem(LS_LIVE_KEY, JSON.stringify(state.assigned));
        } catch (e) {}

        if (state.currentScreen === 1) {
          renderParticipantChips();
          updateScreen1Subtitle();
        } else if (state.currentScreen === 2) {
          renderPersonalResultScreen();
        } else if (state.currentScreen === 3) {
          renderTableroScreen3();
          renderCanvasPreview();
        }
        if (!silent) showToast('🟢 Tablero actualizado en tiempo real con todos los compañeros.', 'success');
      }
    } catch (e) {
    } finally {
      cloudSyncInProgress = false;
    }
  }

  // Broadcast Channel for Multi-Tab Instant Live Sync
  let broadcastSyncChannel = null;
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      broadcastSyncChannel = new BroadcastChannel('lexgeo_navidad_sync_v5');
      broadcastSyncChannel.onmessage = (event) => {
        if (event && event.data && event.data.type === 'SYNC_STATE' && event.data.assigned) {
          mergeIncomingState(event.data.assigned, false);
        }
      };
    }
  } catch (e) {}

  // ==========================================================================
  // 2. STATE MANAGEMENT
  // ==========================================================================

  const state = {
    participants: [],
    colors: [...OFFICIAL_COLORS],
    groups: [...OFFICIAL_GROUPS],
    assigned: { ...DEFAULT_INITIAL_ASSIGNED },
    selectedParticipantId: null,
    currentScreen: 1, // 1, 2, or 3
    snowActive: true,
    audioActive: true,
    chipSearchTerm: '',
    tableSearchTerm: '',
    tableSortField: 'name'
  };

  const avatarImageCache = new Map();

  // Pure Cryptographic Random Integer [0, max - 1]
  function getCryptoRandomInt(max) {
    if (max <= 0) return 0;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }

  function getTextColorForHex(hexColor) {
    if (!hexColor) return '#ffffff';
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 155 ? '#0b191e' : '#ffffff';
  }

  // ==========================================================================
  // 3. INITIALIZATION & DATA PURGING
  // ==========================================================================

  function purgeOldData() {
    OLD_STORAGE_KEYS.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {}
    });
  }

  function getAvatarUrl(id) {
    const padded = String(id).padStart(2, '0');
    return `assets/avatars/avatar_${padded}.png?v=20261027_v5`;
  }

  function initializeParticipants() {
    let customNames = {};
    try {
      const saved = localStorage.getItem(LS_NAMES_KEY);
      if (saved) customNames = JSON.parse(saved);
    } catch (e) {}

    const external = window.PARTICIPANTS_DATA;

    state.participants = FALLBACK_PARTICIPANTS.map((fp) => {
      let mergedName = customNames[fp.id] || fp.name;
      let initials = fp.initials;
      let avatarDataUrl = null;

      if (Array.isArray(external)) {
        const found = external.find((ep) => ep.id === fp.id);
        if (found) {
          if (!customNames[fp.id] && found.name) mergedName = found.name;
          if (found.initials) initials = found.initials;
          if (found.avatarDataUrl) avatarDataUrl = found.avatarDataUrl;
        }
      }

      return {
        id: fp.id,
        name: mergedName,
        initials: initials,
        avatarUrl: avatarDataUrl || getAvatarUrl(fp.id),
        avatarDataUrl: avatarDataUrl
      };
    });
  }

  function loadState() {
    purgeOldData();

    let loaded = null;
    try {
      const saved = localStorage.getItem(LS_LIVE_KEY);
      if (saved) loaded = JSON.parse(saved);
    } catch (e) {}

    if (loaded && typeof loaded === 'object') {
      state.assigned = { ...DEFAULT_INITIAL_ASSIGNED, ...loaded };
    } else {
      state.assigned = { ...DEFAULT_INITIAL_ASSIGNED };
    }

    // Check for incoming shared state in URL (?state=... or #state=... or #s=...)
    try {
      let stateParam = null;
      const url = new URL(window.location.href);
      if (url.searchParams.has('state')) {
        stateParam = url.searchParams.get('state');
      } else if (window.location.hash.includes('state=')) {
        stateParam = window.location.hash.split('state=')[1]?.split('&')[0];
      } else if (window.location.hash.includes('s=')) {
        stateParam = window.location.hash.split('s=')[1]?.split('&')[0];
      }

      if (stateParam) {
        let decodedJson = '';
        try {
          decodedJson = decodeURIComponent(atob(stateParam));
        } catch (e) {
          try {
            decodedJson = atob(stateParam);
          } catch (e2) {}
        }
        if (decodedJson) {
          const parsed = JSON.parse(decodedJson);
          if (parsed && typeof parsed === 'object') {
            mergeIncomingState(parsed, false);
          }
        }
      }
    } catch (e) {}

    const lastUser = localStorage.getItem(LS_SELECTED_USER);
    if (lastUser && state.participants.some((p) => p.id === Number(lastUser))) {
      state.selectedParticipantId = Number(lastUser);
    }
  }

  function mergeIncomingState(newAssigned, shouldBroadcast = true) {
    if (!newAssigned || typeof newAssigned !== 'object') return;
    let changed = false;

    Object.entries(newAssigned).forEach(([idStr, assignObj]) => {
      const id = Number(idStr);
      if (!id || !assignObj || !assignObj.colorId || !assignObj.groupId) return;

      // Keep Ruth and Jazmin locked to their official colors
      if (id === 9) assignObj.colorId = 'c01';
      if (id === 16) assignObj.colorId = 'c02';

      if (
        !state.assigned[id] ||
        state.assigned[id].colorId !== assignObj.colorId ||
        state.assigned[id].groupId !== assignObj.groupId
      ) {
        state.assigned[id] = { ...assignObj };
        changed = true;
      }
    });

    if (changed) {
      persistState(shouldBroadcast);
      if (state.currentScreen === 1) {
        renderParticipantChips();
        updateScreen1Subtitle();
      } else if (state.currentScreen === 2) {
        renderPersonalResultScreen();
      } else if (state.currentScreen === 3) {
        renderTableroScreen3();
        renderCanvasPreview();
      }
    }
  }

  function persistState(shouldBroadcast = true) {
    state.assigned = resolveDuplicateColorsAndGroups(state.assigned);
    try {
      localStorage.setItem(LS_LIVE_KEY, JSON.stringify(state.assigned));
    } catch (e) {}

    try {
      const jsonStr = JSON.stringify(state.assigned);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const url = new URL(window.location.href);
      url.searchParams.set('state', encoded);
      window.history.replaceState({}, '', url.toString());

      const shareInput = document.getElementById('shareLinkInput');
      if (shareInput) shareInput.value = url.toString();
    } catch (e) {}

    if (shouldBroadcast) {
      saveCloudState(state.assigned, false);
      if (broadcastSyncChannel) {
        try {
          broadcastSyncChannel.postMessage({
            type: 'SYNC_STATE',
            assigned: state.assigned,
            timestamp: Date.now()
          });
        } catch (e) {}
      }
    }
  }

  function preloadAvatars() {
    state.participants.forEach((p) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = p.avatarDataUrl || p.avatarUrl;
      img.onload = () => {
        avatarImageCache.set(p.id, img);
        if (avatarImageCache.size === state.participants.length && state.currentScreen === 3) {
          renderCanvasPreview();
        }
      };
      img.onerror = () => {
        avatarImageCache.set(p.id, null);
      };
    });
  }

  // ==========================================================================
  // 4. STEP NAVIGATION (WIZARD FLOW: SCREEN 1, 2, 3)
  // ==========================================================================

  function showScreen(screenNum) {
    state.currentScreen = screenNum;

    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');

    if (screen1) screen1.style.display = screenNum === 1 ? 'block' : 'none';
    if (screen2) screen2.style.display = screenNum === 2 ? 'block' : 'none';
    if (screen3) screen3.style.display = screenNum === 3 ? 'block' : 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (screenNum === 1) {
      renderParticipantChips();
      updateScreen1Subtitle();
    } else if (screenNum === 2) {
      renderPersonalResultScreen();
    } else if (screenNum === 3) {
      renderTableroScreen3();
      renderCanvasPreview();
    }
  }

  function updateScreen1Subtitle() {
    const assignedCount = Object.keys(state.assigned).length;
    const pendingCount = Math.max(0, state.participants.length - assignedCount);

    const descEl = document.getElementById('screen1StatusCount');
    if (descEl) {
      if (pendingCount === 0) {
        descEl.innerHTML = `🎉 <strong>¡Todos los ${state.participants.length} compañeros ya tienen su color y grupo!</strong> Consulta tu nombre o revisa el tablero general.`;
      } else {
        descEl.innerHTML = `<strong>${assignedCount} de ${state.participants.length}</strong> compañeros ya descubrieron su color • <strong>${pendingCount}</strong> pendientes de participar.`;
      }
    }
  }

  // ==========================================================================
  // 5. SCREEN 1: CHIPS & SELECTION
  // ==========================================================================

  function renderParticipantChips() {
    const container = document.getElementById('participantQuickChips');
    if (!container) return;

    const term = state.chipSearchTerm.trim().toLowerCase();
    const filtered = state.participants.filter((p) => p.name.toLowerCase().includes(term));

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `<span style="color: #94a3b8; font-size: 0.85rem; padding: 0.5rem;">No se encontró "${state.chipSearchTerm}"</span>`;
      return;
    }

    filtered.forEach((p) => {
      const isSelected = p.id === state.selectedParticipantId;
      const isAssigned = Boolean(state.assigned[p.id]);

      const chip = document.createElement('div');
      chip.className = `participant-chip ${isSelected ? 'selected' : ''} ${isAssigned ? 'assigned' : 'pending'}`;
      chip.setAttribute('data-id', p.id);
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');

      let statusIcon = isAssigned ? '<span class="chip-status-dot" title="Ya asignado">✅</span>' : '<span class="chip-status-dot" title="Pendiente">⏳</span>';

      chip.innerHTML = `
        <img class="chip-avatar" src="${p.avatarDataUrl || p.avatarUrl}" alt="${p.name}" onerror="this.outerHTML='<span class=\\'chip-avatar initials-fallback\\'>${p.initials}</span>'">
        <span>${p.name}</span>
        ${statusIcon}
      `;

      // Single click selects participant and plays soft festive pop
      chip.addEventListener('click', () => {
        selectParticipant(p.id);
        if (state.audioActive) playPopSound();
        if (window.innerWidth <= 768) {
          const btn = document.getElementById('btnRevealAction');
          if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      // Double-click triggers instant draw if pending, or opens screen 2 if assigned
      chip.addEventListener('dblclick', () => {
        selectParticipant(p.id);
        handleDrawAction();
      });

      // Mobile double-tap detection
      let lastTap = 0;
      chip.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 350 && tapLength > 0) {
          e.preventDefault();
          selectParticipant(p.id);
          handleDrawAction();
        }
        lastTap = currentTime;
      });

      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectParticipant(p.id);
        }
      });

      container.appendChild(chip);
    });

    updateActionButtonState();
  }

  function selectParticipant(id) {
    state.selectedParticipantId = id;
    localStorage.setItem(LS_SELECTED_USER, String(id));
    renderParticipantChips();
    updateActionButtonState();

    // Only Henry (id: 6) or ?admin=1 can see the "Opciones de Henry" button!
    const btnOrg = document.getElementById('btnOpenOrganizer');
    if (btnOrg) {
      const isUrlAdmin = new URLSearchParams(window.location.search).has('admin');
      btnOrg.style.display = (id === 6 || isUrlAdmin) ? 'inline-flex' : 'none';
    }
  }

  function updateActionButtonState() {
    const btn = document.getElementById('btnRevealAction');
    const textSpan = document.getElementById('btnRevealText');
    if (!btn || !textSpan) return;

    if (!state.selectedParticipantId) {
      btn.disabled = true;
      textSpan.textContent = 'Selecciona tu nombre arriba';
      return;
    }

    const p = state.participants.find((item) => item.id === state.selectedParticipantId);
    if (!p) return;

    btn.disabled = false;
    const isAssigned = Boolean(state.assigned[p.id]);

    if (isAssigned) {
      textSpan.textContent = `¡Ver mi Asignación (${p.name})! →`;
    } else {
      textSpan.textContent = `¡Obtener mi Color y Grupo al Azar (${p.name})! ✨`;
    }
  }

  // ==========================================================================
  // 6. TRUE CRYPTOGRAPHIC REAL-TIME DRAW ENGINE
  // ==========================================================================

  function drawColorAndGroupForParticipant(pId) {
    const p = state.participants.find((item) => item.id === pId);
    if (!p) return;

    // 1. Color Selection:
    let chosenColor = null;
    let isLocked = false;

    // Jazmin always gets Rojo Navidad
    if (pId === 9 || /jazmin/i.test(p.name)) {
      chosenColor = state.colors.find((c) => c.id === 'c01');
      isLocked = true;
    }
    // Ruth always gets Transparente / Cristal
    else if (pId === 16 || /ruth/i.test(p.name)) {
      chosenColor = state.colors.find((c) => c.id === 'c02');
      isLocked = true;
    }
    // All other 17 participants get pure real-time cryptographic random color from available colors
    else {
      const takenColorIds = new Set(
        Object.entries(state.assigned)
          .filter(([id]) => Number(id) !== pId)
          .map(([id, a]) => a.colorId)
      );

      const availableColors = state.colors.filter((c) => !takenColorIds.has(c.id));

      if (availableColors.length > 0) {
        const randomIndex = getCryptoRandomInt(availableColors.length);
        chosenColor = availableColors[randomIndex];
      } else {
        chosenColor = state.colors[0];
      }
    }

    // 2. Group Selection (Proportional to free capacity using cryptographic random):
    const groupCounts = { 1: 0, 2: 0, 3: 0 };
    Object.entries(state.assigned).forEach(([id, a]) => {
      if (Number(id) !== pId && groupCounts[a.groupId] !== undefined) {
        groupCounts[a.groupId]++;
      }
    });

    const slotPool = [];
    state.groups.forEach((g) => {
      const freeSlots = g.capacity - groupCounts[g.id];
      for (let s = 0; s < freeSlots; s++) {
        slotPool.push(g.id);
      }
    });

    let chosenGroupId = 1;
    if (slotPool.length > 0) {
      const randomSlotIndex = getCryptoRandomInt(slotPool.length);
      chosenGroupId = slotPool[randomSlotIndex];
    } else {
      chosenGroupId = 1;
    }

    // Save assignment
    state.assigned[pId] = {
      colorId: chosenColor.id,
      groupId: chosenGroupId,
      isLocked: isLocked,
      timestamp: Date.now()
    };

    persistState();
  }

  function runTombolaAnimation(pId, onComplete) {
    const modal = document.getElementById('tombolaModal');
    const nameEl = document.getElementById('tombolaParticipantName');
    const avatarEl = document.getElementById('tombolaAvatarImg');
    const colorBox = document.getElementById('tombolaColorBox');
    const colorDot = document.getElementById('tombolaColorDot');
    const colorLabel = document.getElementById('tombolaColorLabel');
    const colorSub = document.getElementById('tombolaColorSub');
    const groupBox = document.getElementById('tombolaGroupBox');
    const groupIcon = document.getElementById('tombolaGroupIcon');
    const groupLabel = document.getElementById('tombolaGroupLabel');
    const groupSub = document.getElementById('tombolaGroupSub');
    const progressFill = document.getElementById('tombolaProgressFill');

    if (!modal) {
      drawColorAndGroupForParticipant(pId);
      if (onComplete) onComplete();
      return;
    }

    const p = state.participants.find((item) => item.id === pId);
    if (nameEl) nameEl.textContent = p ? p.name : 'Compañero';
    if (avatarEl && p) {
      avatarEl.src = p.avatarDataUrl || p.avatarUrl;
      avatarEl.onerror = () => {
        avatarEl.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" fill="%231e3a44"/><text x="48" y="58" font-size="34" font-weight="bold" fill="%23ffffff" text-anchor="middle">${p.initials}</text></svg>`;
      };
    }

    if (progressFill) progressFill.style.width = '0%';
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');

    // Run draw behind the scenes to determine final target
    drawColorAndGroupForParticipant(pId);
    const finalAssignment = state.assigned[pId];
    const finalColor = state.colors.find((c) => c.id === finalAssignment.colorId) || state.colors[0];
    const finalGroup = state.groups.find((g) => g.id === finalAssignment.groupId) || state.groups[0];

    const DURATION = 1800; // 1.8 seconds of exhilarating tombola
    const startTime = performance.now();
    let lastTickTime = 0;
    let tickCount = 0;

    function stepRoulette(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION);

      if (progressFill) {
        progressFill.style.width = `${Math.round(progress * 100)}%`;
      }

      // Decelerating interval: starts fast (45ms), slows down near end (220ms)
      const currentInterval = 45 + Math.pow(progress, 2.2) * 180;

      if (now - lastTickTime >= currentInterval && progress < 0.95) {
        lastTickTime = now;
        tickCount++;

        // Random cycle through colors and groups
        const tempColor = state.colors[tickCount % state.colors.length];
        const tempGroup = state.groups[tickCount % state.groups.length];

        if (colorDot) colorDot.style.backgroundColor = tempColor.hex;
        if (colorLabel) colorLabel.textContent = tempColor.name;
        if (groupIcon) groupIcon.textContent = tempGroup.emblem;
        if (groupLabel) groupLabel.textContent = tempGroup.name.split('-')[0].trim();

        if (state.audioActive) {
          playTickSound(480 + (tickCount % 6) * 60);
        }
      }

      if (progress < 1) {
        requestAnimationFrame(stepRoulette);
      } else {
        // LOCK IN FINAL RESULTS TRIUMPHANTLY
        if (colorDot) colorDot.style.backgroundColor = finalColor.hex;
        if (colorLabel) colorLabel.textContent = finalColor.name;
        if (colorBox) {
          colorBox.style.borderColor = finalColor.hex;
          colorBox.style.boxShadow = `0 0 16px ${finalColor.hex}`;
        }

        if (groupIcon) groupIcon.textContent = finalGroup.emblem;
        if (groupLabel) groupLabel.textContent = finalGroup.name;
        if (groupBox) {
          groupBox.style.borderColor = 'var(--gold-primary)';
          groupBox.style.boxShadow = '0 0 16px rgba(245, 197, 66, 0.5)';
        }

        if (pId === 9) {
          if (colorSub) colorSub.innerHTML = '🔒 <strong>¡Rojo Navidad Oficial!</strong>';
        } else if (pId === 16) {
          if (colorSub) colorSub.innerHTML = '💎 <strong>¡Transparente Cristal Oficial!</strong>';
        } else {
          if (colorSub) colorSub.innerHTML = '✨ ¡Color Oficial Confirmado!';
        }
        if (groupSub) groupSub.innerHTML = '⭐ ¡Grupo Oficial Asignado!';

        if (state.audioActive) playFanfareChime();
        triggerConfetti();

        // Brief triumphant pause to admire the win, then reveal screen 2
        setTimeout(() => {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
          if (onComplete) onComplete();
        }, 650);
      }
    }

    requestAnimationFrame(stepRoulette);
  }

  async function handleDrawAction() {
    if (!state.selectedParticipantId) return;

    const pId = state.selectedParticipantId;

    // 1. Fetch latest cloud state first so we know every color & group already taken on other phones/PCs!
    const btn = document.getElementById('btnRevealAction');
    const textSpan = document.getElementById('btnRevealText');
    if (btn) btn.disabled = true;
    if (textSpan) textSpan.textContent = '🔄 Verificando colores disponibles en vivo...';

    await syncWithCloudNow(true);

    if (btn) btn.disabled = false;
    updateActionButtonState();

    const isAlreadyAssigned = Boolean(state.assigned[pId]);
    if (isAlreadyAssigned) {
      showScreen(2);
      return;
    }

    // 2. Launch exciting 1.8s Tómbola Navideña and push new state to Cloud immediately!
    runTombolaAnimation(pId, async () => {
      await saveCloudState(state.assigned, false);
      showScreen(2);
    });
  }

  async function handleResetAllTests() {
    if (!confirm('¿Deseas reiniciar el sorteo desde cero para TODOS los dispositivos? Se borrarán las pruebas y solo Jazmin (Rojo) y Ruth (Transparente) mantendrán su color asignado.')) {
      return;
    }

    state.assigned = { ...DEFAULT_INITIAL_ASSIGNED };
    try {
      localStorage.setItem(LS_LIVE_KEY, JSON.stringify(state.assigned));
    } catch (e) {}
    await saveCloudState(state.assigned, true);
    persistState(false);
    renderParticipantChips();
    updateScreen1Subtitle();
    showToast('🗑️ Sorteo reiniciado desde cero en la nube para todos.', 'info');
    showScreen(1);
  }

  // ==========================================================================
  // 7. SCREEN 2: MI RESULTADO PERSONAL
  // ==========================================================================

  function renderPersonalResultScreen() {
    if (!state.selectedParticipantId) return;

    const p = state.participants.find((item) => item.id === state.selectedParticipantId);
    const assign = state.assigned[state.selectedParticipantId];
    if (!p || !assign) return;

    const color = state.colors.find((c) => c.id === assign.colorId) || state.colors[0];
    const group = state.groups.find((g) => g.id === assign.groupId) || state.groups[0];

    const nameEl = document.getElementById('personalName');
    const avatarEl = document.getElementById('personalAvatarImg');
    const colorBadge = document.getElementById('personalColorBadge');
    const colorDot = document.getElementById('personalColorDot');
    const colorText = document.getElementById('personalColorText');
    const groupIcon = document.getElementById('personalGroupIcon');
    const groupName = document.getElementById('personalGroupName');
    const lockTag = document.getElementById('personalLockTag');
    const teammatesBox = document.getElementById('personalTeammatesHint');

    if (nameEl) nameEl.textContent = p.name;

    if (avatarEl) {
      avatarEl.src = p.avatarDataUrl || p.avatarUrl;
      avatarEl.style.borderColor = color.hex;
      avatarEl.onerror = () => {
        avatarEl.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="100%" height="100%" fill="%231e3a44"/><text x="50%" y="55%" font-size="38" font-weight="bold" fill="%23f5c542" dominant-baseline="middle" text-anchor="middle">${p.initials}</text></svg>`;
      };
    }

    // Color Badge
    if (colorText && colorDot && colorBadge) {
      colorText.textContent = color.name;
      colorDot.style.backgroundColor = color.hex;

      if (color.isCrystal) {
        colorBadge.className = 'personal-badge-color crystal-style';
        colorBadge.style.backgroundColor = '';
        colorBadge.style.color = '#03445c';
      } else {
        colorBadge.className = 'personal-badge-color';
        colorBadge.style.backgroundColor = color.hex;
        colorBadge.style.color = getTextColorForHex(color.hex);
      }
    }

    // Group Badge
    if (groupIcon) groupIcon.textContent = group.emblem;
    if (groupName) groupName.textContent = group.name;

    // Lock Tag
    if (lockTag) {
      lockTag.style.display = assign.isLocked ? 'inline-flex' : 'none';
    }

    // Teammates in same group
    if (teammatesBox) {
      const teammates = Object.entries(state.assigned)
        .filter(([id, a]) => a.groupId === group.id && Number(id) !== p.id)
        .map(([id]) => {
          const tm = state.participants.find((item) => item.id === Number(id));
          return tm ? tm.name : '';
        })
        .filter(Boolean);

      if (teammates.length > 0) {
        teammatesBox.innerHTML = `🤝 <strong>Tus compañeros asignados en este grupo hasta ahora:</strong> ${teammates.join(', ')}.`;
      } else {
        teammatesBox.innerHTML = `⭐ Eres la primera persona asignada al <strong>${group.name}</strong>. ¡Pronto se sumarán tus compañeros!`;
      }
    }
  }

  // ==========================================================================
  // 8. SCREEN 3: TABLERO GENERAL (3 GRUPOS + LISTA + IMAGEN TEAMS)
  // ==========================================================================

  function renderTableroScreen3() {
    renderGroupCardsScreen3();
    renderPendingSectionScreen3();
    renderCompleteTableScreen3();
    updateScreen3Header();
  }

  function updateScreen3Header() {
    const total = state.participants.length;
    const assignedCount = Object.keys(state.assigned).length;
    const pendingCount = Math.max(0, total - assignedCount);

    const progressEl = document.getElementById('summaryProgressText');
    if (progressEl) {
      progressEl.textContent = `Progreso: ${assignedCount} de ${total} Asignados`;
    }

    const assignedBadge = document.getElementById('assignedCountLabel');
    if (assignedBadge) assignedBadge.textContent = `${assignedCount} / ${total}`;

    const pendingBadge = document.getElementById('pendingCountLabel');
    if (pendingBadge) pendingBadge.textContent = `${pendingCount}`;
  }

  function renderGroupCardsScreen3() {
    const container = document.getElementById('groupsGridBox');
    if (!container) return;

    container.innerHTML = '';

    state.groups.forEach((group) => {
      const assignedIds = Object.entries(state.assigned)
        .filter(([id, a]) => a.groupId === group.id)
        .map(([id]) => Number(id));

      const card = document.createElement('div');
      card.className = 'group-card';

      let membersHtml = '';
      assignedIds.forEach((pId) => {
        const p = state.participants.find((item) => item.id === pId);
        const a = state.assigned[pId];
        if (!p || !a) return;

        const color = state.colors.find((c) => c.id === a.colorId) || state.colors[0];
        const isCrystal = color.isCrystal;
        const pillClass = isCrystal ? 'color-pill crystal-style' : 'color-pill';
        const pillBg = isCrystal ? '' : `background-color: ${color.hex}; color: ${getTextColorForHex(color.hex)};`;
        const lockIcon = a.isLocked ? '<span class="member-lock-indicator" title="Color fijo asignado">🔒</span>' : '';

        membersHtml += `
          <div class="member-row">
            <div class="member-left">
              <img 
                class="member-avatar" 
                src="${p.avatarDataUrl || p.avatarUrl}" 
                alt="${p.name}"
                style="border: 2.5px solid ${color.hex};"
                onerror="this.outerHTML='<span class=\\'member-avatar initials-fallback\\' style=\\'border: 2.5px solid ${color.hex};\\'>${p.initials}</span>'"
              >
              <div class="member-name-wrap">
                <div class="member-name">${p.name} ${lockIcon}</div>
              </div>
            </div>

            <div class="${pillClass}" style="${pillBg}">
              <span class="color-dot" style="background-color: ${color.hex};"></span>
              <span>${color.name}</span>
            </div>
          </div>
        `;
      });

      const openSlots = group.capacity - assignedIds.length;
      if (openSlots > 0) {
        membersHtml += `
          <div class="member-row open-slot">
            <div class="member-left">
              <div class="member-avatar slot-avatar">🎁</div>
              <div class="member-name-wrap">
                <div class="member-name" style="color: var(--text-muted); font-weight: 500;">
                  ${openSlots} ${openSlots === 1 ? 'cupo libre pendiente' : 'cupos libres pendientes'}
                </div>
              </div>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-dim);">Por asignar</span>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="group-card-header">
          <div class="group-header-info">
            <span class="group-emblem">${group.emblem}</span>
            <h3 class="group-title">${group.name}</h3>
          </div>
          <span class="group-members-count">${assignedIds.length} / ${group.capacity}</span>
        </div>
        <div class="group-members-list">
          ${membersHtml}
        </div>
      `;

      container.appendChild(card);
    });
  }

  function renderPendingSectionScreen3() {
    const card = document.getElementById('pendingSectionCard');
    const container = document.getElementById('pendingChipsBox');
    const titleEl = document.getElementById('pendingSectionTitle');
    if (!card || !container) return;

    const pendingList = state.participants.filter((p) => !state.assigned[p.id]);

    if (pendingList.length === 0) {
      card.style.display = 'none';
      return;
    }

    card.style.display = 'block';
    if (titleEl) {
      titleEl.textContent = `Compañeros pendientes por entrar (${pendingList.length})`;
    }

    container.innerHTML = '';
    pendingList.forEach((p) => {
      const chip = document.createElement('div');
      chip.className = 'participant-chip pending';
      chip.style.cursor = 'default';
      chip.innerHTML = `
        <img class="chip-avatar" src="${p.avatarDataUrl || p.avatarUrl}" alt="${p.name}" onerror="this.outerHTML='<span class=\\'chip-avatar initials-fallback\\'>${p.initials}</span>'">
        <span>${p.name}</span>
        <span class="chip-status-dot">⏳</span>
      `;
      container.appendChild(chip);
    });
  }

  function renderCompleteTableScreen3() {
    const tbody = document.getElementById('tableBodyContent');
    if (!tbody) return;

    const term = state.tableSearchTerm.trim().toLowerCase();

    let list = state.participants.map((p) => {
      const a = state.assigned[p.id];
      const isAssigned = Boolean(a);
      const color = isAssigned ? state.colors.find((c) => c.id === a.colorId) : null;
      const group = isAssigned ? state.groups.find((g) => g.id === a.groupId) : null;

      return {
        participant: p,
        isAssigned: isAssigned,
        color: color,
        group: group,
        isLocked: a ? a.isLocked : false
      };
    });

    list = list.filter((item) => {
      const pName = item.participant.name.toLowerCase();
      const gName = item.group ? item.group.name.toLowerCase() : '';
      const cName = item.color ? item.color.name.toLowerCase() : '';
      return pName.includes(term) || gName.includes(term) || cName.includes(term);
    });

    list.sort((a, b) => {
      if (state.tableSortField === 'name') {
        return a.participant.name.localeCompare(b.participant.name);
      } else if (state.tableSortField === 'status') {
        if (a.isAssigned === b.isAssigned) {
          return a.participant.name.localeCompare(b.participant.name);
        }
        return a.isAssigned ? -1 : 1;
      } else if (state.tableSortField === 'group') {
        const gA = a.group ? a.group.id : 99;
        const gB = b.group ? b.group.id : 99;
        return gA - gB || a.participant.name.localeCompare(b.participant.name);
      } else if (state.tableSortField === 'color') {
        const cA = a.color ? a.color.name : 'zzz';
        const cB = b.color ? b.color.name : 'zzz';
        return cA.localeCompare(cB);
      }
      return 0;
    });

    tbody.innerHTML = '';

    list.forEach((item, index) => {
      const tr = document.createElement('tr');

      let groupCell = '<span style="color: var(--text-dim); font-size: 0.85rem;">⏳ Por asignar</span>';
      let colorCell = '<span style="color: var(--text-dim); font-size: 0.85rem;">❓ Oculto hasta que entre</span>';
      let statusCell = '<span class="status-tag-pending">⏳ Pendiente</span>';

      if (item.isAssigned && item.color && item.group) {
        groupCell = `<span style="color: var(--gold-primary); font-weight: 700;">${item.group.emblem} ${item.group.name}</span>`;

        const isCrystal = item.color.isCrystal;
        const pillClass = isCrystal ? 'color-pill crystal-style' : 'color-pill';
        const pillBg = isCrystal ? '' : `background-color: ${item.color.hex}; color: ${getTextColorForHex(item.color.hex)};`;

        colorCell = `
          <div class="${pillClass}" style="${pillBg}">
            <span class="color-dot" style="background-color: ${item.color.hex};"></span>
            <span>${item.color.name}</span>
          </div>
        `;

        statusCell = item.isLocked
          ? '<span class="status-tag-assigned" style="color: #f5c542; border-color: #f5c542;">🔒 Fijo Oficial</span>'
          : '<span class="status-tag-assigned">✅ Asignado</span>';
      }

      tr.innerHTML = `
        <td style="color: var(--text-dim); font-weight: 700;">${index + 1}</td>
        <td>
          <div class="table-member-cell">
            <img 
              class="member-avatar" 
              src="${item.participant.avatarDataUrl || item.participant.avatarUrl}" 
              alt="${item.participant.name}"
              style="border: 2px solid ${item.color ? item.color.hex : 'rgba(255,255,255,0.2)'};"
              onerror="this.outerHTML='<span class=\\'member-avatar initials-fallback\\'>${item.participant.initials}</span>'"
            >
            <strong style="color: #fff;">${item.participant.name}</strong>
          </div>
        </td>
        <td>${statusCell}</td>
        <td>${groupCell}</td>
        <td>${colorCell}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  // ==========================================================================
  // 9. CANVAS HIGH RESOLUTION 2X TEAMS RENDERER
  // ==========================================================================

  function renderCanvasPreview() {
    const canvas = document.getElementById('teamsCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 1600;
    const height = 1250;

    canvas.width = width;
    canvas.height = height;

    const bgGrad = ctx.createRadialGradient(width / 2, 200, 50, width / 2, height / 2, width);
    bgGrad.addColorStop(0, '#163842');
    bgGrad.addColorStop(0.45, '#0b2027');
    bgGrad.addColorStop(1, '#051216');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f5c542';
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeRect(28, 28, width - 56, height - 56);

    const drawCornerStar = (x, y) => {
      ctx.save();
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⭐', x, y);
      ctx.restore();
    };
    drawCornerStar(32, 32);
    drawCornerStar(width - 32, 32);
    drawCornerStar(32, height - 32);
    drawCornerStar(width - 32, height - 32);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f5c542';
    ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('LEXGEO SERVICIOS TOPOGRÁFICOS Y LEGALES', width / 2, 68);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 44px "Outfit", sans-serif';
    ctx.fillText('🎄 RESULTADOS OFICIALES - SORTEO DE NAVIDAD 🎅', width / 2, 122);

    const assignedCount = Object.keys(state.assigned).length;
    const totalCount = state.participants.length;

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      `22 Participantes • 3 Grupos Oficiales (8, 7 y 7) • Progreso: ${assignedCount} de ${totalCount} Asignados`,
      width / 2,
      158
    );

    ctx.fillStyle = 'rgba(245, 197, 66, 0.2)';
    ctx.strokeStyle = '#f5c542';
    ctx.lineWidth = 1.5;
    const badgeText = `Sorteo Oficial 2026 • Fecha: ${new Date().toLocaleDateString('es-DO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })}`;
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    const bWidth = ctx.measureText(badgeText).width + 36;
    roundRect(ctx, width / 2 - bWidth / 2, 178, bWidth, 32, 16, true, true);
    ctx.fillStyle = '#fde047';
    ctx.fillText(badgeText, width / 2, 199);
    ctx.restore();

    const cardTop = 230;
    const cardHeight = 955;
    const colGap = 24;
    const startX = 50;
    const colWidth = (width - 100 - colGap * 2) / 3;

    state.groups.forEach((group, gIdx) => {
      const gx = startX + gIdx * (colWidth + colGap);

      const assignedIds = Object.entries(state.assigned)
        .filter(([id, a]) => a.groupId === group.id)
        .map(([id]) => Number(id));

      ctx.save();
      const cardBg = ctx.createLinearGradient(gx, cardTop, gx + colWidth, cardTop + cardHeight);
      cardBg.addColorStop(0, 'rgba(16, 36, 43, 0.95)');
      cardBg.addColorStop(1, 'rgba(9, 23, 28, 0.98)');
      ctx.fillStyle = cardBg;
      ctx.strokeStyle = 'rgba(245, 197, 66, 0.4)';
      ctx.lineWidth = 2;
      roundRect(ctx, gx, cardTop, colWidth, cardHeight, 18, true, true);

      const headerH = 75;
      const headGrad = ctx.createLinearGradient(gx, cardTop, gx + colWidth, cardTop);
      headGrad.addColorStop(0, '#1a3e49');
      headGrad.addColorStop(1, '#0e262e');
      ctx.fillStyle = headGrad;
      roundRect(ctx, gx, cardTop, colWidth, headerH, [18, 18, 0, 0], true, false);

      ctx.strokeStyle = '#f5c542';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx, cardTop + headerH);
      ctx.lineTo(gx + colWidth, cardTop + headerH);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 21px "Outfit", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${group.emblem} ${group.name}`, gx + 18, cardTop + 45);

      ctx.fillStyle = '#f5c542';
      ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`(${assignedIds.length} / ${group.capacity})`, gx + colWidth - 18, cardTop + 45);

      const rowStartY = cardTop + headerH + 16;
      const rowGap = 12;
      const availableH = cardHeight - headerH - 32;
      const maxRows = group.capacity;
      const rowHeight = (availableH - rowGap * (maxRows - 1)) / maxRows;

      for (let r = 0; r < maxRows; r++) {
        const ry = rowStartY + r * (rowHeight + rowGap);
        const rw = colWidth - 28;
        const rx = gx + 14;

        if (r < assignedIds.length) {
          const pId = assignedIds[r];
          const p = state.participants.find((item) => item.id === pId);
          const a = state.assigned[pId];
          const color = state.colors.find((c) => c.id === a.colorId) || state.colors[0];

          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          roundRect(ctx, rx, ry, rw, rowHeight, 12, true, true);

          const avatarSize = Math.min(54, rowHeight - 16);
          const ax = rx + 14;
          const ay = ry + (rowHeight - avatarSize) / 2;

          ctx.save();
          ctx.beginPath();
          ctx.arc(ax + avatarSize / 2, ay + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          const cachedImg = avatarImageCache.get(p.id);
          if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
            ctx.drawImage(cachedImg, ax, ay, avatarSize, avatarSize);
          } else {
            ctx.fillStyle = '#1e3a44';
            ctx.fillRect(ax, ay, avatarSize, avatarSize);
            ctx.fillStyle = '#f5c542';
            ctx.font = '700 20px "Outfit", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.initials, ax + avatarSize / 2, ay + avatarSize / 2);
          }
          ctx.restore();

          ctx.strokeStyle = color.hex;
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(ax + avatarSize / 2, ay + avatarSize / 2, avatarSize / 2 + 1, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'alphabetic';

          let displayName = p.name;
          if (a.isLocked) displayName += ' 🔒';
          ctx.fillText(displayName, ax + avatarSize + 14, ry + rowHeight * 0.42);

          const pillX = ax + avatarSize + 14;
          const pillY = ry + rowHeight * 0.54;
          const pillH = 28;

          ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
          let pillLabel = color.name;
          if (color.isCrystal) pillLabel = '💎 ' + color.name;
          const pLabelWidth = ctx.measureText(pillLabel).width + 30;

          if (color.isCrystal) {
            ctx.fillStyle = '#e0f2fe';
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
            roundRect(ctx, pillX, pillY, pLabelWidth, pillH, 14, true, true);
            ctx.fillStyle = '#03445c';
          } else {
            ctx.fillStyle = color.hex;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            roundRect(ctx, pillX, pillY, pLabelWidth, pillH, 14, true, true);
            ctx.fillStyle = getTextColorForHex(color.hex);
          }

          ctx.beginPath();
          ctx.arc(pillX + 13, pillY + pillH / 2, 5, 0, Math.PI * 2);
          ctx.fillStyle = color.isCrystal ? '#38bdf8' : '#ffffff';
          ctx.fill();

          ctx.fillStyle = color.isCrystal ? '#03445c' : getTextColorForHex(color.hex);
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(pillLabel, pillX + 23, pillY + pillH / 2);
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 1;
          roundRect(ctx, rx, ry, rw, rowHeight, 12, true, true);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⏳ Cupo libre pendiente de participar', rx + rw / 2, ry + rowHeight / 2);
        }
      }

      ctx.restore();
    });

    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      'Lexgeo Servicios Topográficos y Legales • ¡Feliz Navidad y un Próspero Año 2027 para todo el equipo! 🎅✨',
      width / 2,
      height - 40
    );
    ctx.restore();
  }

  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else if (Array.isArray(radius)) {
      radius = { tl: radius[0], tr: radius[1], br: radius[2], bl: radius[3] };
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  // ==========================================================================
  // 10. EXPORT & TEAMS SHARING
  // ==========================================================================

  function downloadCanvasImage() {
    const canvas = document.getElementById('teamsCanvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `sorteo-navidad-lexgeo-3grupos-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('💾 Descargando imagen PNG en alta calidad...', 'success');
  }

  function copyCanvasImageToClipboard() {
    const canvas = document.getElementById('teamsCanvas');
    if (!canvas) return;

    if (!navigator.clipboard || !window.ClipboardItem) {
      showToast('⚠️ Tu navegador no soporta copiado directo. Descarga la imagen.', 'warning');
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        showToast('Error al procesar la imagen.', 'error');
        return;
      }
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard
          .write([item])
          .then(() => {
            showToast('🎉 ¡Imagen copiada al portapapeles! Pégala con Ctrl+V en Teams.', 'success');
            if (state.audioActive) playFestiveChime();
          })
          .catch(() => {
            showToast('⚠️ No se pudo copiar al portapapeles. Usa el botón "Descargar Imagen".', 'warning');
          });
      } catch (err) {
        showToast('⚠️ Usa el botón "Descargar Imagen" para guardarla.', 'warning');
      }
    }, 'image/png');
  }

  function copySummaryTextToClipboard() {
    let msg = `🎄 *RESULTADOS - SORTEO DE NAVIDAD LEXGEO 2026* 🎅\n`;
    msg += `📅 *Fecha:* ${new Date().toLocaleDateString('es-DO', { dateStyle: 'long' })}\n`;
    msg += `🏷️ *Modalidad:* 3 Grupos (dos de 7 y uno de 8 integrantes) • 22 Participantes\n\n`;

    state.groups.forEach((g) => {
      const assignedIds = Object.entries(state.assigned)
        .filter(([id, a]) => a.groupId === g.id)
        .map(([id]) => Number(id));

      msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `${g.emblem} *${g.name.toUpperCase()}* (${assignedIds.length} / ${g.capacity} asignados)\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

      assignedIds.forEach((pId) => {
        const p = state.participants.find((item) => item.id === pId);
        const a = state.assigned[pId];
        const color = state.colors.find((c) => c.id === a.colorId);
        if (p && color) {
          const lockStr = a.isLocked ? ' 🔒' : '';
          msg += `• *${p.name}* → Color: *${color.name}* (${color.hex})${lockStr}\n`;
        }
      });

      const openSlots = g.capacity - assignedIds.length;
      if (openSlots > 0) {
        msg += `• _${openSlots} cupos libres pendientes_\n`;
      }
      msg += `\n`;
    });

    const pendingList = state.participants.filter((p) => !state.assigned[p.id]);
    if (pendingList.length > 0) {
      msg += `⏳ *Faltan por entrar (${pendingList.length}):* ${pendingList.map((p) => p.name).join(', ')}\n\n`;
    }

    msg += `✨ *¡Feliz Navidad para todo el equipo de Lexgeo!* 🎁\n`;
    msg += `🔗 *Ver y participar en vivo:* ${window.location.href}`;

    navigator.clipboard
      .writeText(msg)
      .then(() => {
        showToast('📝 ¡Resumen copiado en texto! Listo para pegar en Teams.', 'success');
      })
      .catch(() => {
        showToast('No se pudo copiar el texto.', 'error');
      });
  }

  function copyMyPersonalAssignment() {
    if (!state.selectedParticipantId) return;
    const p = state.participants.find((item) => item.id === state.selectedParticipantId);
    const a = state.assigned[state.selectedParticipantId];
    if (!p || !a) return;

    const color = state.colors.find((c) => c.id === a.colorId);
    const group = state.groups.find((g) => g.id === a.groupId);
    if (!color || !group) return;

    const lockStr = a.isLocked ? ' (🔒 oficial)' : '';
    const text = `🎄 ¡Hola equipo! En el Sorteo de Navidad Lexgeo me tocó el color *${color.name}* (${color.hex})${lockStr} y estoy en el *${group.name}* ${group.emblem} 🎁✨`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast('📋 ¡Tu mensaje personal ha sido copiado! Pégalo en Teams.', 'success');
      })
      .catch(() => {
        showToast('No se pudo copiar el mensaje.', 'error');
      });
  }

  function copyTeamsShareLink() {
    const encoded = btoa(JSON.stringify(state.assigned));
    const url = new URL(window.location.href);
    url.searchParams.set('state', encoded);

    navigator.clipboard
      .writeText(url.toString())
      .then(() => {
        showToast('🔗 ¡Enlace oficial sincronizado copiado! Compártelo en Teams.', 'success');
      })
      .catch(() => {
        showToast('No se pudo copiar el enlace.', 'error');
      });
  }

  // ==========================================================================
  // 11. ORGANIZER ACTIONS (HENRY): AUTO ASSIGN & RESET
  // ==========================================================================

  function autoAssignPendingParticipants() {
    const pendingList = state.participants.filter((p) => !state.assigned[p.id]);

    if (pendingList.length === 0) {
      showToast('¡Todos los 22 participantes ya tienen color y grupo asignado!', 'info');
      return;
    }

    pendingList.forEach((p) => {
      drawColorAndGroupForParticipant(p.id);
    });

    closeOrganizerModal();
    showToast(`🎉 ¡Se asignaron con éxito todos los compañeros pendientes!`, 'success');
    if (state.audioActive) playFestiveChime();
    triggerConfetti();

    showScreen(3);
  }

  function openOrganizerModal() {
    const modal = document.getElementById('organizerModal');
    if (!modal) return;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    renderParticipantsEditor();
    renderColorsPaletteEditor();

    const shareInput = document.getElementById('shareLinkInput');
    if (shareInput) shareInput.value = window.location.href;
  }

  function closeOrganizerModal() {
    const modal = document.getElementById('organizerModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function renderParticipantsEditor() {
    const list = document.getElementById('participantsEditorList');
    if (!list) return;

    list.innerHTML = '';
    state.participants.forEach((p) => {
      const row = document.createElement('div');
      row.className = 'participant-edit-row';

      const a = state.assigned[p.id];
      const isAssigned = Boolean(a);
      const color = isAssigned ? state.colors.find((c) => c.id === a.colorId) : null;
      const statusText = isAssigned ? `Asignado (${color ? color.name : ''})` : 'Pendiente';

      row.innerHTML = `
        <img class="row-avatar" src="${p.avatarDataUrl || p.avatarUrl}" alt="${p.name}" onerror="this.outerHTML='<span class=\\'chip-avatar initials-fallback\\'>${p.initials}</span>'">
        <input type="text" class="edit-name-input" data-id="${p.id}" value="${p.name}" placeholder="Nombre">
        <span style="font-size: 0.8rem; color: ${isAssigned ? '#2ec4b6' : '#94a3b8'}; width: 140px; text-align: right;">${statusText}</span>
      `;
      list.appendChild(row);
    });
  }

  function renderColorsPaletteEditor() {
    const list = document.getElementById('colorsPaletteList');
    if (!list) return;

    list.innerHTML = '';
    state.colors.forEach((c, idx) => {
      const row = document.createElement('div');
      row.className = 'participant-edit-row';

      row.innerHTML = `
        <span style="font-weight:700; width: 28px; color: var(--text-muted);">${idx + 1}.</span>
        <input type="color" value="${c.hex}" style="width: 42px; height: 36px; padding: 0; border: none; border-radius: 4px;" disabled>
        <span style="flex:1; font-weight: 700; color: #fff;">${c.name}</span>
        <span style="font-family: monospace; color: var(--gold-primary); font-size: 0.85rem;">${c.hex}</span>
      `;
      list.appendChild(row);
    });
  }

  function saveOrganizerChanges() {
    const inputs = document.querySelectorAll('.edit-name-input');
    const customNames = {};

    inputs.forEach((input) => {
      const id = Number(input.dataset.id);
      const val = input.value.trim();
      if (val) {
        customNames[id] = val;
        const p = state.participants.find((item) => item.id === id);
        if (p) p.name = val;
      }
    });

    try {
      localStorage.setItem(LS_NAMES_KEY, JSON.stringify(customNames));
    } catch (e) {}

    closeOrganizerModal();
    renderParticipantChips();
    if (state.currentScreen === 2) renderPersonalResultScreen();
    if (state.currentScreen === 3) renderTableroScreen3();
    showToast('💾 Cambios de nombres guardados.', 'success');
  }

  // ==========================================================================
  // 12. SNOW ENGINE, CONFETTI & SOUND
  // ==========================================================================

  let snowCanvas, snowCtx;
  let snowflakes = [];
  let snowAnimId = null;

  function initSnowfall() {
    snowCanvas = document.getElementById('snowCanvas');
    if (!snowCanvas) return;

    snowCtx = snowCanvas.getContext('2d');
    resizeSnowCanvas();
    window.addEventListener('resize', resizeSnowCanvas, { passive: true });

    snowflakes = [];
    // 80 Fluffy White Snowflakes
    for (let i = 0; i < 80; i++) {
      snowflakes.push({
        isStar: false,
        x: Math.random() * snowCanvas.width,
        y: Math.random() * snowCanvas.height,
        radius: Math.random() * 2.8 + 1.2,
        speed: Math.random() * 1.3 + 0.6,
        wind: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.65 + 0.3,
        swayOffset: Math.random() * Math.PI * 2
      });
    }

    // 25 Golden Twinkling Starlight Flakes (Magical Christmas ambiance)
    for (let i = 0; i < 25; i++) {
      snowflakes.push({
        isStar: true,
        x: Math.random() * snowCanvas.width,
        y: Math.random() * snowCanvas.height,
        radius: Math.random() * 2.5 + 2.5,
        speed: Math.random() * 0.8 + 0.4,
        wind: Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.6 + 0.4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.8,
        swayOffset: Math.random() * Math.PI * 2,
        twinkleRate: Math.random() * 0.04 + 0.02
      });
    }

    startSnowfall();
  }

  function resizeSnowCanvas() {
    if (!snowCanvas) return;
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
  }

  function drawSparkleStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function startSnowfall() {
    if (!state.snowActive) return;

    let time = 0;
    function renderSnow() {
      if (!state.snowActive || !snowCtx) return;

      time += 0.016;
      snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

      snowflakes.forEach((f) => {
        f.y += f.speed;
        f.x += Math.sin(time + f.swayOffset) * 0.55 + f.wind;

        if (f.y > snowCanvas.height + 15) {
          f.y = -15;
          f.x = Math.random() * snowCanvas.width;
        }
        if (f.x > snowCanvas.width + 15) f.x = -15;
        if (f.x < -15) f.x = snowCanvas.width + 15;

        if (f.isStar) {
          f.rotation += f.rotSpeed;
          const currentOpacity = f.opacity * (0.65 + 0.35 * Math.sin(time * 3 + f.swayOffset));
          snowCtx.save();
          snowCtx.translate(f.x, f.y);
          snowCtx.rotate((f.rotation * Math.PI) / 180);
          snowCtx.fillStyle = `rgba(245, 197, 66, ${Math.max(0, currentOpacity)})`;
          snowCtx.shadowColor = '#f5c542';
          snowCtx.shadowBlur = 6;
          drawSparkleStar(snowCtx, 0, 0, 4, f.radius * 1.5, f.radius * 0.45);
          snowCtx.restore();
        } else {
          snowCtx.beginPath();
          snowCtx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          snowCtx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
          snowCtx.fill();
        }
      });

      snowAnimId = requestAnimationFrame(renderSnow);
    }

    renderSnow();
  }

  function stopSnowfall() {
    if (snowAnimId) cancelAnimationFrame(snowAnimId);
    if (snowCtx && snowCanvas) {
      snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    }
  }

  function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f5c542', '#d9383a', '#2ec4b6', '#38bdf8', '#ffffff', '#e5a918', '#ffd54f'];
    const particles = [];
    const count = 110;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.35,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 14,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 70 + 90
      });
    }

    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeCount = 0;
      particles.forEach((p) => {
        p.life++;
        if (p.life < p.maxLife) {
          activeCount++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.36;
          p.vx *= 0.98;
          p.rotation += p.rotSpeed;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    animateConfetti();
  }

  // ==========================================================================
  // WEB AUDIO FESTIVE SYNTHESIZERS (ZERO DEPENDENCIES)
  // ==========================================================================
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Mechanical / Bell Tick for Roulette Wheels
  function playTickSound(freq = 600, duration = 0.035) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  // Soft Festive Pop when selecting a participant chip
  function playPopSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  }

  // Joyful Multi-Tone Christmas Bells Chime
  function playFestiveChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.5);
      });
    } catch (e) {}
  }

  // Triumphant Fanfare Arpeggio Chord with Harmonic Resonance (C5, E5, G5, C6, E6)
  function playFanfareChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.28, now + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.75);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.8);
      });
    } catch (e) {}
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = '🔔';
    if (type === 'success') icon = '✅';
    else if (type === 'warning') icon = '⚠️';
    else if (type === 'error') icon = '❌';

    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ==========================================================================
  // 13. EVENT LISTENERS
  // ==========================================================================

  function setupEventListeners() {
    // Search input (Screen 1)
    const searchInput = document.getElementById('participantSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.chipSearchTerm = e.target.value;
        renderParticipantChips();
        const exact = state.participants.find(
          (p) => p.name.toLowerCase() === e.target.value.trim().toLowerCase()
        );
        if (exact) selectParticipant(exact.id);
      });
    }

    // Action button on Screen 1
    const btnReveal = document.getElementById('btnRevealAction');
    if (btnReveal) {
      btnReveal.addEventListener('click', handleDrawAction);
    }

    // Direct jump from Screen 1 to Screen 3
    const btnDirectToBoard = document.getElementById('btnDirectToBoard');
    if (btnDirectToBoard) {
      btnDirectToBoard.addEventListener('click', () => showScreen(3));
    }

    // Screen 2 Navigation
    const btnBackToScreen1 = document.getElementById('btnBackToScreen1');
    if (btnBackToScreen1) {
      btnBackToScreen1.addEventListener('click', () => showScreen(1));
    }

    const btnSwitchParticipant = document.getElementById('btnSwitchParticipant');
    if (btnSwitchParticipant) {
      btnSwitchParticipant.addEventListener('click', () => showScreen(1));
    }

    const btnGoToScreen3 = document.getElementById('btnGoToScreen3');
    if (btnGoToScreen3) {
      btnGoToScreen3.addEventListener('click', () => showScreen(3));
    }

    const btnCopyMyAssignment = document.getElementById('btnCopyMyAssignment');
    if (btnCopyMyAssignment) {
      btnCopyMyAssignment.addEventListener('click', copyMyPersonalAssignment);
    }

    // Screen 3 Navigation
    const btnBackToScreen2 = document.getElementById('btnBackToScreen2');
    if (btnBackToScreen2) {
      btnBackToScreen2.addEventListener('click', () => {
        if (state.selectedParticipantId && state.assigned[state.selectedParticipantId]) {
          showScreen(2);
        } else {
          showScreen(1);
        }
      });
    }

    const btnBackToHome = document.getElementById('btnBackToHome');
    if (btnBackToHome) {
      btnBackToHome.addEventListener('click', () => showScreen(1));
    }

    // Screen 3 Tabs
    const tabBtnGroups = document.getElementById('tabBtnGroups');
    const tabBtnTable = document.getElementById('tabBtnTable');
    const tabBtnCanvas = document.getElementById('tabBtnCanvas');

    const viewGroups = document.getElementById('viewGroupsContainer');
    const viewTable = document.getElementById('viewTableContainer');
    const viewCanvas = document.getElementById('viewCanvasContainer');

    const switchTabScreen3 = (tabName) => {
      [tabBtnGroups, tabBtnTable, tabBtnCanvas].forEach((b) => b && b.classList.remove('active'));
      [viewGroups, viewTable, viewCanvas].forEach((v) => {
        if (v) v.style.display = 'none';
      });

      if (tabName === 'groups') {
        if (tabBtnGroups) tabBtnGroups.classList.add('active');
        if (viewGroups) viewGroups.style.display = 'block';
      } else if (tabName === 'table') {
        if (tabBtnTable) tabBtnTable.classList.add('active');
        if (viewTable) viewTable.style.display = 'block';
        renderCompleteTableScreen3();
      } else if (tabName === 'canvas') {
        if (tabBtnCanvas) tabBtnCanvas.classList.add('active');
        if (viewCanvas) viewCanvas.style.display = 'block';
        renderCanvasPreview();
      }
    };

    if (tabBtnGroups) tabBtnGroups.addEventListener('click', () => switchTabScreen3('groups'));
    if (tabBtnTable) tabBtnTable.addEventListener('click', () => switchTabScreen3('table'));
    if (tabBtnCanvas) tabBtnCanvas.addEventListener('click', () => switchTabScreen3('canvas'));

    // Table search (Screen 3)
    const tableSearch = document.getElementById('tableSearchInput');
    if (tableSearch) {
      tableSearch.addEventListener('input', (e) => {
        state.tableSearchTerm = e.target.value;
        renderCompleteTableScreen3();
      });
    }

    // Table sorting
    const sortBtnName = document.getElementById('sortBtnName');
    const sortBtnStatus = document.getElementById('sortBtnStatus');
    const sortBtnGroup = document.getElementById('sortBtnGroup');
    const sortBtnColor = document.getElementById('sortBtnColor');
    const sortBtns = [sortBtnName, sortBtnStatus, sortBtnGroup, sortBtnColor];

    const setSortField = (field, activeBtn) => {
      state.tableSortField = field;
      sortBtns.forEach((b) => b && b.classList.remove('active'));
      if (activeBtn) activeBtn.classList.add('active');
      renderCompleteTableScreen3();
    };

    if (sortBtnName) sortBtnName.addEventListener('click', () => setSortField('name', sortBtnName));
    if (sortBtnStatus) sortBtnStatus.addEventListener('click', () => setSortField('status', sortBtnStatus));
    if (sortBtnGroup) sortBtnGroup.addEventListener('click', () => setSortField('group', sortBtnGroup));
    if (sortBtnColor) sortBtnColor.addEventListener('click', () => setSortField('color', sortBtnColor));

    // Canvas actions
    const btnDownload = document.getElementById('btnDownloadCanvas');
    if (btnDownload) btnDownload.addEventListener('click', downloadCanvasImage);

    const btnCopyImg = document.getElementById('btnCopyCanvas');
    if (btnCopyImg) btnCopyImg.addEventListener('click', copyCanvasImageToClipboard);

    const btnCopyText = document.getElementById('btnCopySummaryText');
    if (btnCopyText) btnCopyText.addEventListener('click', copySummaryTextToClipboard);

    const btnCopyTeamsLink = document.getElementById('btnCopyTeamsLink');
    if (btnCopyTeamsLink) btnCopyTeamsLink.addEventListener('click', copyTeamsShareLink);

    // Toggles
    const btnToggleSnow = document.getElementById('btnToggleSnow');
    const snowText = document.getElementById('snowStatusText');
    if (btnToggleSnow) {
      btnToggleSnow.addEventListener('click', () => {
        state.snowActive = !state.snowActive;
        if (state.snowActive) {
          btnToggleSnow.classList.add('active');
          if (snowText) snowText.textContent = 'Nieve On';
          startSnowfall();
        } else {
          btnToggleSnow.classList.remove('active');
          if (snowText) snowText.textContent = 'Nieve Off';
          stopSnowfall();
        }
      });
    }

    const btnToggleAudio = document.getElementById('btnToggleAudio');
    const audioText = document.getElementById('audioStatusText');
    if (btnToggleAudio) {
      btnToggleAudio.addEventListener('click', () => {
        state.audioActive = !state.audioActive;
        if (state.audioActive) {
          btnToggleAudio.classList.add('active');
          if (audioText) audioText.textContent = 'Sonido On';
          playFestiveChime();
        } else {
          btnToggleAudio.classList.remove('active');
          if (audioText) audioText.textContent = 'Sonido Off';
        }
      });
    }

    // Modal
    const btnOpenOrganizer = document.getElementById('btnOpenOrganizer');
    const btnCloseOrganizerModal = document.getElementById('btnCloseOrganizerModal');
    const btnCloseModalFooter = document.getElementById('btnCloseModalFooter');
    const organizerModal = document.getElementById('organizerModal');

    if (btnOpenOrganizer) btnOpenOrganizer.addEventListener('click', openOrganizerModal);
    if (btnCloseOrganizerModal) btnCloseOrganizerModal.addEventListener('click', closeOrganizerModal);
    if (btnCloseModalFooter) btnCloseModalFooter.addEventListener('click', closeOrganizerModal);

    if (organizerModal) {
      organizerModal.addEventListener('click', (e) => {
        if (e.target === organizerModal) closeOrganizerModal();
      });
    }

    const modalNavTabs = document.querySelectorAll('.modal-nav-tab');
    modalNavTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        modalNavTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const targetId = tab.dataset.tab;
        document.querySelectorAll('.modal-tab-content').forEach((content) => {
          content.classList.remove('active');
        });
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      });
    });

    const btnAutoAssign = document.getElementById('btnAutoAssignPending');
    if (btnAutoAssign) btnAutoAssign.addEventListener('click', autoAssignPendingParticipants);

    const btnResetZero = document.getElementById('btnResetDrawFromZero');
    if (btnResetZero) btnResetZero.addEventListener('click', handleResetAllTests);

    const btnSaveOrganizer = document.getElementById('btnSaveOrganizerChanges');
    if (btnSaveOrganizer) btnSaveOrganizer.addEventListener('click', saveOrganizerChanges);

    const btnCopyModalLink = document.getElementById('btnCopyModalLink');
    if (btnCopyModalLink) btnCopyModalLink.addEventListener('click', copyTeamsShareLink);

    // Live Sync Button
    const btnSyncLive = document.getElementById('btnSyncLive');
    if (btnSyncLive) {
      btnSyncLive.addEventListener('click', async () => {
        const dot = btnSyncLive.querySelector('.sync-dot');
        if (dot) dot.classList.add('syncing');
        await syncWithCloudNow(false);
        setTimeout(() => {
          if (dot) dot.classList.remove('syncing');
        }, 350);
      });
    }

    // Cloud Sync / Backup handlers in Organizer Modal
    const btnExportStateJson = document.getElementById('btnExportStateJson');
    if (btnExportStateJson) {
      btnExportStateJson.addEventListener('click', exportStateToJson);
    }

    const btnImportStatePrompt = document.getElementById('btnImportStatePrompt');
    if (btnImportStatePrompt) {
      btnImportStatePrompt.addEventListener('click', importStateFromJsonPrompt);
    }

    const btnForceBroadcastSync = document.getElementById('btnForceBroadcastSync');
    if (btnForceBroadcastSync) {
      btnForceBroadcastSync.addEventListener('click', () => {
        persistState(true);
        copyTeamsShareLink();
        showToast('🔄 Sincronización emitida a todos los dispositivos.', 'success');
      });
    }
  }

  function exportStateToJson() {
    try {
      const dataStr = JSON.stringify(state.assigned, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lexgeo_sorteo_navidad_2026_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(dataStr);
      }
      showToast('💾 Respaldo JSON descargado y copiado.', 'success');
    } catch (e) {
      showToast('No se pudo exportar el archivo JSON.', 'warning');
    }
  }

  function importStateFromJsonPrompt() {
    const raw = prompt('Pega aquí el contenido JSON del sorteo para restaurarlo:');
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        mergeIncomingState(parsed, true);
        showToast('📥 Sorteo restaurado exitosamente.', 'success');
      } else {
        showToast('El formato JSON no es válido.', 'error');
      }
    } catch (e) {
      showToast('Error al procesar el JSON pegado.', 'error');
    }
  }

  // ==========================================================================
  // 14. BOOTSTRAP
  // ==========================================================================

  function init() {
    initializeParticipants();
    loadState();
    setupEventListeners();
    initSnowfall();
    preloadAvatars();

    showScreen(1);

    if (state.selectedParticipantId) {
      selectParticipant(state.selectedParticipantId);
    } else if (new URLSearchParams(window.location.search).has('admin')) {
      const btnOrg = document.getElementById('btnOpenOrganizer');
      if (btnOrg) btnOrg.style.display = 'inline-flex';
    }

    // Immediate Cloud Sync on boot + Live Polling every 4 seconds across all devices!
    syncWithCloudNow(true);
    setInterval(() => {
      syncWithCloudNow(true);
    }, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', () => {
    if (window.PARTICIPANTS_DATA && Array.isArray(window.PARTICIPANTS_DATA)) {
      let needsRerender = false;
      window.PARTICIPANTS_DATA.forEach((ep) => {
        const p = state.participants.find((item) => item.id === ep.id);
        if (p && ep.avatarDataUrl && p.avatarDataUrl !== ep.avatarDataUrl) {
          p.avatarDataUrl = ep.avatarDataUrl;
          p.avatarUrl = ep.avatarDataUrl;
          needsRerender = true;
        }
      });
      if (needsRerender) {
        preloadAvatars();
        if (state.currentScreen === 1) renderParticipantChips();
        if (state.currentScreen === 2) renderPersonalResultScreen();
        if (state.currentScreen === 3) {
          renderTableroScreen3();
          renderCanvasPreview();
        }
      }
    }
  });

})();
