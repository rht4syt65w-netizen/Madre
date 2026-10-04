(() => {
  'use strict';

  /* ======================================================================
     Réglages à personnaliser
     ====================================================================== */
  const CONFIG = {
    // Adresse qui reçoit les demandes de tirage (et affichée en bas de page)
    email: 'contact@exemple.fr',
    formules: {
      croix: 'I · La Croix — 25\u00a0€',
      complet: 'II · Le Tirage complet — 60\u00a0€',
    },
  };

  const T = window.NUMEROLOGIE;
  const PLANETES = window.PLANETES;
  const CARTES = window.CARTES;
  const NB = ' '; // espace insécable (typographie française)

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const mqReduit = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionOK = () => !mqReduit.matches;
  const scrollBehavior = () => (motionOK() ? 'smooth' : 'auto');
  // chiffres lisibles dans les libellés en petites capitales (texte interne uniquement, jamais une saisie)
  const nb = s => String(s).replace(/\d+/g, '<span class="nb">$&</span>');

  /* ======================================================================
     Numérologie (table de Pythagore)
     ====================================================================== */
  const TABLE = {
    A: 1, J: 1, S: 1, B: 2, K: 2, T: 2, C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4, E: 5, N: 5, W: 5, F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7, H: 8, Q: 8, Z: 8, I: 9, R: 9,
  };
  const VOYELLES = new Set('AEIOUY');
  const MAITRES = [11, 22, 33];

  const chiffres = n => String(n).split('').map(Number);
  const somme = arr => arr.reduce((a, b) => a + b, 0);

  // Réduit un nombre à un chiffre, en conservant les nombres maîtres si demandé
  function reduire(n, garderMaitres = true) {
    const etapes = [n];
    while (n > 9 && !(garderMaitres && MAITRES.includes(n))) {
      n = somme(chiffres(n));
      etapes.push(n);
    }
    return { valeur: n, etapes };
  }

  // « Marie-Hélène Œuvray » → « MARIEHELENEOEUVRAY »
  function lettres(texte) {
    return texte
      .toUpperCase()
      .replace(/Œ/g, 'OE')
      .replace(/Æ/g, 'AE')
      .replace(/Ø/g, 'O')
      .replace(/Ł/g, 'L')
      .replace(/[ĐÐ]/g, 'D')
      .replace(/Ħ/g, 'H')
      .replace(/Þ/g, 'TH')
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^A-Z]/g, '');
  }

  // [39, 12, 3] → « 39 → 3+9 = 12 → 1+2 = 3 »
  const detailReduction = etapes =>
    etapes.map((e, i) => (i === 0 ? e : `${chiffres(etapes[i - 1]).join('+')} = ${e}`)).join(' → ');

  function calculerTheme(prenoms, nom, date) {
    const [a, m, j] = date.split('-').map(Number);
    const L = [...lettres(prenoms + nom)];
    const valeurs = arr => arr.map(c => TABLE[c]);
    const voy = L.filter(c => VOYELLES.has(c));
    const cons = L.filter(c => !VOYELLES.has(c));

    const chiffresDate = chiffres(`${pad(j)}${pad(m)}${a}`);
    const cdv = reduire(somme(chiffresDate));

    const expr = reduire(somme(valeurs(L)));
    const intime = reduire(somme(valeurs(voy)));
    const perso = reduire(somme(valeurs(cons)));

    const annee = new Date().getFullYear();
    const chiffresAP = chiffres(`${pad(j)}${pad(m)}${annee}`);
    const ap = reduire(somme(chiffresAP), false);

    const detailLettres = (label, arr, res) =>
      `${label}${NB}: ${valeurs(arr).join('+')} = ${detailReduction(res.etapes)}`;

    return {
      nomAffiche: `${casse(prenoms)} ${casse(nom)}`,
      premierPrenom: casse(prenoms.trim().split(/\s+/)[0] || ''),
      dateAffichee: dateFr(a, m, j),
      annee,
      cdv: { ...cdv, calcul: `${pad(j)}/${pad(m)}/${a} → ${chiffresDate.join('+')} = ${detailReduction(cdv.etapes)}` },
      expr: { ...expr, calcul: detailLettres(`Les ${L.length} lettres`, L, expr) },
      intime: { ...intime, calcul: detailLettres(`Les voyelles (${voy.join(' ')})`, voy, intime) },
      perso: { ...perso, calcul: detailLettres(`Les consonnes (${cons.join(' ')})`, cons, perso) },
      ap: { ...ap, calcul: `${pad(j)}/${pad(m)} + ${annee} → ${chiffresAP.join('+')} = ${detailReduction(ap.etapes)}` },
    };
  }

  function casse(s) {
    return s.trim().replace(/\s+/g, ' ').toLocaleLowerCase('fr-FR')
      .replace(/(^|[\s\-'’])(\p{L})/gu, (_, sep, l) => sep + l.toLocaleUpperCase('fr-FR'));
  }

  function dateFr(a, m, j) {
    const d = new Date(a, m - 1, j).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    return j === 1 ? d.replace(/^1 /, '1er ') : d;
  }

  /* ======================================================================
     Dessins : glyphes planétaires, blasons, cartes
     ====================================================================== */
  // Tracés dans une boîte de 24 × 24, pour un rendu identique sur tous les appareils
  const GLYPHES = {
    soleil: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1.8" class="g-fill"/>',
    lune: '<path d="M15.5 3.6A8.6 8.6 0 1 0 15.5 20.4A11 11 0 0 1 15.5 3.6Z" class="g-fill"/>',
    mercure: '<circle cx="12" cy="11.2" r="4.3"/><path d="M12 15.5V22M9 18.9H15M7.8 2.6Q12 8.6 16.2 2.6"/>',
    venus: '<circle cx="12" cy="8.6" r="5.4"/><path d="M12 14V22.4M8.4 18.4H15.6"/>',
    mars: '<circle cx="10" cy="14" r="5.6"/><path d="M14 10L20.4 3.6M15.2 3.6H20.4V8.8"/>',
    jupiter: '<path d="M4.6 8.2C4.6 4.4 10 3.4 10.7 6.7C11.2 9.2 8.1 12.2 5.6 15.6H19.6M15.6 4.4V21.6"/>',
    saturne: '<path d="M8 2.6V17M5 5.6H11M8 11.6C10 8.6 15.4 8.4 15.4 12.6C15.4 15.6 12 16.6 12 19C12 20.6 13.6 21.4 15.3 20.8"/>',
    cle: '<circle cx="7" cy="12" r="4.2"/><path d="M11.2 12H21.4M17.6 12V15.8M20.6 12V15"/>',
    etoile: '<path d="M12 2.8L19.9 16.6H4.1Z" class="g-jaune"/><path d="M12 21.2L4.1 7.4H19.9Z" class="g-violet"/>',
  };

  function blason(planete, cls = '') {
    return `<svg class="${cls}" viewBox="0 0 24 28" data-planete="${planete}" aria-hidden="true">` +
      '<path d="M1.5 1.5H22.5V13Q22.5 22.5 12 26.5Q1.5 22.5 1.5 13Z" class="sh-fill"/>' +
      `<g transform="translate(5 4.5) scale(.58)" class="glyph sh-glyph">${GLYPHES[planete]}</g></svg>`;
  }

  const RAYONS = Array.from({ length: 24 }, (_, i) => {
    const a = i * 15 * Math.PI / 180;
    const p = r => [(50 + r * Math.cos(a)).toFixed(2), (50 + r * Math.sin(a)).toFixed(2)];
    const [x1, y1] = p(30);
    const [x2, y2] = p(36.5);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="md-ray"/>`;
  }).join('');

  function medaillon(c) {
    const g = c.planete === 'maitresse' ? (c.num === 1 ? 'cle' : 'etoile') : c.planete;
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="44" class="md-ring"/><circle cx="50" cy="50" r="39.5" class="md-line"/>' +
      RAYONS +
      '<circle cx="50" cy="50" r="28" class="md-line"/>' +
      `<g transform="translate(29 29) scale(1.75)" class="glyph md-glyph">${GLYPHES[g]}</g></svg>`;
  }

  function contenuCarte(c) {
    if (c.planete === 'bleue') return '<span class="tc-inner"><span class="tc-panel"></span></span>';
    const blasonCarte = c.planete === 'maitresse' ? '' : blason(c.planete, 'tc-shield');
    return '<span class="tc-inner"><span class="tc-panel">' +
      `<span class="tc-top"><span class="tc-num">${c.num}</span>${blasonCarte}</span>` +
      `<span class="tc-medal">${medaillon(c)}</span>` +
      `<span class="tc-name">${c.nom}</span>` +
      '</span></span>';
  }

  const faceCarte = c =>
    `<span class="tcard tcard-face${c.planete === 'bleue' ? ' tcard-bleue' : ''}" data-planete="${c.planete}">${contenuCarte(c)}</span>`;

  function libelleCarte(c) {
    if (c.planete === 'bleue') return 'La Carte bleue · hors série';
    if (c.planete === 'maitresse') return `Nº${NB}${c.num} · ${c.nom} · carte maîtresse`;
    return `Nº${NB}${c.num} · ${c.nom} · ${PLANETES[c.planete].nom}`;
  }

  /* ======================================================================
     Roue de l'accueil : les neuf nombres et les sept planètes
     ====================================================================== */
  function dessinerRoue(svg) {
    const C = 200;
    const pt = (r, deg) => {
      const a = (deg - 90) * Math.PI / 180;
      return [+(C + r * Math.cos(a)).toFixed(2), +(C + r * Math.sin(a)).toFixed(2)];
    };
    const anneau = (r1, r2) =>
      `M${C - r1},${C}a${r1},${r1} 0 1,0 ${2 * r1},0a${r1},${r1} 0 1,0 ${-2 * r1},0Z` +
      `M${C - r2},${C}a${r2},${r2} 0 1,0 ${2 * r2},0a${r2},${r2} 0 1,0 ${-2 * r2},0Z`;

    let s = `<path d="${anneau(190, 142)}" class="w-band" fill-rule="evenodd"/>`;
    s += `<circle cx="${C}" cy="${C}" r="197" class="w-stroke w-thin"/>`;
    s += `<circle cx="${C}" cy="${C}" r="190" class="w-stroke"/>`;
    s += `<circle cx="${C}" cy="${C}" r="142" class="w-stroke"/>`;
    s += `<circle cx="${C}" cy="${C}" r="137" class="w-stroke w-thin"/>`;

    for (let i = 0; i < 72; i++) {
      const [x1, y1] = pt(62, i * 5);
      const [x2, y2] = pt(i % 2 ? 122 : 134, i * 5);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="w-ray"/>`;
    }

    // losanges entre les nombres
    for (let k = 0; k < 9; k++) {
      const deg = k * 40 + 20;
      const p = [pt(174, deg), pt(166, deg - 2.2), pt(158, deg), pt(166, deg + 2.2)];
      s += `<polygon points="${p.map(q => q.join(',')).join(' ')}" class="w-diamond"/>`;
    }

    // étoile à sept branches {7/3} au centre
    s += `<circle cx="${C}" cy="${C}" r="62" class="w-stroke"/>`;
    const ordre7 = [0, 3, 6, 2, 5, 1, 4];
    s += `<polygon points="${ordre7.map(k => pt(56, k * 360 / 7).join(',')).join(' ')}" class="w-star"/>`;
    s += `<circle cx="${C}" cy="${C}" r="14" class="w-core"/>`;
    s += `<circle cx="${C}" cy="${C}" r="4.5" class="w-dot"/>`;

    // les sept planètes, dans l'ordre du jeu
    ['soleil', 'lune', 'mercure', 'venus', 'mars', 'jupiter', 'saturne'].forEach((p, k) => {
      const [x, y] = pt(117, k * 360 / 7 + 180 / 7);
      s += `<g class="w-up" data-planete="${p}"><circle cx="${x}" cy="${y}" r="15.5" class="w-planet"/>` +
        `<g transform="translate(${x - 9} ${y - 9}) scale(.75)" class="glyph sh-glyph">${GLYPHES[p]}</g></g>`;
    });

    // les neuf nombres, qui restent droits pendant que la roue tourne
    for (let k = 0; k < 9; k++) {
      const [x, y] = pt(166, k * 40);
      s += `<g class="w-up"><circle cx="${x}" cy="${y}" r="17" class="w-num-bg"/><text x="${x}" y="${y}" class="w-num">${k + 1}</text></g>`;
    }
    svg.innerHTML = s;
  }

  dessinerRoue($('.wheel'));

  $$('.tcard-face[data-carte]').forEach(el => {
    const c = CARTES.find(x => x.num === Number(el.dataset.carte));
    el.dataset.planete = c.planete;
    el.innerHTML = contenuCarte(c);
  });

  $$('.famille .f-shield').forEach(el => {
    el.outerHTML = blason(el.closest('.famille').dataset.planete);
  });


  /* ======================================================================
     Le ciel : étoiles (canvas fixe) et constellations (décor des sections)
     ====================================================================== */
  const enMouvement = () => motionOK() && !document.documentElement.classList.contains('anim-pause');

  // Formes simplifiées, coordonnées sur une grille de 0 à 100 ; « vives » = étoiles les plus brillantes
  const CONSTELLATIONS = {
    grandeOurse: { nom: 'Ursa Major', etoiles: [[0, 14], [3, 36], [24, 42], [28, 24], [45, 20], [62, 15], [80, 26]], traits: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]], vives: [0, 5] },
    orion: { nom: 'Orion', etoiles: [[12, 12], [52, 16], [32, 0], [25, 50], [33, 48], [41, 45], [18, 90], [57, 86]], traits: [[2, 0], [2, 1], [0, 3], [1, 5], [3, 4], [4, 5], [3, 6], [5, 7]], vives: [0, 7] },
    cassiopee: { nom: 'Cassiopeia', etoiles: [[0, 22], [18, 42], [34, 24], [52, 40], [70, 12]], traits: [[0, 1], [1, 2], [2, 3], [3, 4]], vives: [2] },
    lyre: { nom: 'Lyra', etoiles: [[22, 0], [14, 30], [30, 28], [18, 64], [34, 62]], traits: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]], vives: [0] },
    cygne: { nom: 'Cygnus', etoiles: [[40, 0], [40, 36], [40, 62], [40, 96], [6, 26], [74, 48]], traits: [[0, 1], [1, 2], [2, 3], [4, 1], [1, 5]], vives: [0, 3] },
    petiteOurse: { nom: 'Ursa Minor', etoiles: [[0, 0], [16, 8], [28, 16], [38, 28], [34, 44], [54, 50], [58, 34]], traits: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]], vives: [0] },
    pleiades: { nom: 'Pleiades', etoiles: [[10, 10], [22, 4], [30, 14], [18, 20], [36, 24], [26, 30], [8, 28]], traits: [], vives: [1, 2] },
    scorpion: { nom: 'Scorpius', etoiles: [[0, 0], [6, 14], [0, 28], [16, 18], [28, 24], [36, 36], [40, 50], [38, 64], [44, 76], [56, 82], [66, 76], [68, 64]], traits: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11]], vives: [4] },
  };

  function dessinerConstellation(el) {
    const c = CONSTELLATIONS[el.dataset.c];
    if (!c) return;
    const xs = c.etoiles.map(e => e[0]);
    const ys = c.etoiles.map(e => e[1]);
    const marge = 8;
    const x0 = Math.min(...xs) - marge;
    const y0 = Math.min(...ys) - marge;
    const l = Math.max(...xs) - Math.min(...xs) + 2 * marge;
    const h = Math.max(...ys) - Math.min(...ys) + 2 * marge;
    let svg = `<svg viewBox="${x0} ${y0} ${l} ${h}">`;
    c.traits.forEach(([a, b]) => {
      svg += `<line x1="${c.etoiles[a][0]}" y1="${c.etoiles[a][1]}" x2="${c.etoiles[b][0]}" y2="${c.etoiles[b][1]}" class="cs-trait"/>`;
    });
    c.etoiles.forEach(([x, y], i) => {
      const vive = c.vives.includes(i);
      if (vive) svg += `<circle cx="${x}" cy="${y}" r="4.5" class="cs-halo"/>`;
      svg += `<circle cx="${x}" cy="${y}" r="${vive ? 1.7 : 1.1}" class="cs-etoile" style="animation-delay:${(-i * 0.7).toFixed(1)}s"/>`;
    });
    svg += '</svg>';
    el.innerHTML = svg + `<span class="cs-nom">${c.nom}</span>`;
  }
  $$('.constellation').forEach(dessinerConstellation);

  const ciel = (() => {
    const cv = $('#ciel');
    const ctx = cv && cv.getContext && cv.getContext('2d');
    if (!ctx) return { figer() {} };

    // générateur pseudo-aléatoire à graine : le même ciel à chaque visite
    const alea = graine => () => {
      graine = (graine + 0x6D2B79F5) | 0;
      let t = Math.imul(graine ^ (graine >>> 15), 1 | graine);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const TEINTES = ['255,255,255', '214,226,255', '255,236,204'];
    let W = 0;
    let H = 0;
    let etoiles = [];
    let filante = null;
    let prochaine = performance.now() + 5000;
    let dernier = 0;
    let decalageFige = 0;
    let raf = 0;

    function dimensionner() {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (w === W && h === H) return; // barre d'adresse mobile, défilement : on garde le même ciel
      W = w;
      H = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = alea(1845);
      const n = Math.min(720, Math.round((W * H) / 1500));
      etoiles = Array.from({ length: n }, () => {
        const vive = r() < 0.035;
        return {
          x: r() * W, y: r() * H,
          rayon: vive ? 1 + r() * 0.7 : 0.25 + r() * 0.6,
          profondeur: 0.02 + r() * 0.1,
          base: 0.35 + r() * 0.5, amplitude: 0.12 + r() * 0.35,
          vitesse: 0.4 + r() * 1.5, phase: r() * 6.283,
          teinte: TEINTES[Math.floor(r() * TEINTES.length)], vive,
        };
      });
      dessiner(performance.now());
    }

    function dessiner(t) {
      const anime = enMouvement();
      if (anime) decalageFige = window.scrollY;
      const decalage = motionOK() ? decalageFige : 0; // pause : position gardée ; mouvement réduit : aucun décalage
      ctx.clearRect(0, 0, W, H);
      for (const e of etoiles) {
        let y = (e.y - decalage * e.profondeur) % H;
        if (y < 0) y += H;
        const a = anime ? Math.min(1, Math.max(0.05, e.base + e.amplitude * Math.sin((t / 1000) * e.vitesse + e.phase))) : e.base;
        if (e.vive) { // halo doux
          const halo = ctx.createRadialGradient(e.x, y, 0, e.x, y, e.rayon * 6);
          halo.addColorStop(0, `rgba(${e.teinte},${(a * 0.35).toFixed(3)})`);
          halo.addColorStop(1, `rgba(${e.teinte},0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(e.x, y, e.rayon * 6, 0, 6.283);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${e.teinte},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(e.x, y, e.rayon, 0, 6.283);
        ctx.fill();
      }
      if (!anime) return;
      // une étoile filante de temps en temps
      if (!filante && t > prochaine) {
        const sens = Math.random() < 0.5 ? -1 : 1;
        filante = { x: W * (0.2 + Math.random() * 0.6), y: H * Math.random() * 0.35, vx: sens * (6 + Math.random() * 4), vy: 2.4 + Math.random() * 2, vie: 0 };
      }
      if (filante) {
        const f = filante;
        const queue = 16;
        const g = ctx.createLinearGradient(f.x, f.y, f.x - f.vx * queue, f.y - f.vy * queue);
        g.addColorStop(0, `rgba(255,244,220,${(0.9 * (1 - f.vie / 50)).toFixed(3)})`);
        g.addColorStop(1, 'rgba(255,244,220,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x - f.vx * queue, f.y - f.vy * queue);
        ctx.stroke();
        f.x += f.vx;
        f.y += f.vy;
        f.vie += 1;
        if (f.vie > 50) {
          filante = null;
          prochaine = t + 8000 + Math.random() * 10000;
        }
      }
    }

    function boucle(t) {
      raf = 0;
      if (!enMouvement()) { // une image fixe, puis la boucle s'arrête
        dessiner(t);
        return;
      }
      if (t - dernier > 30) { // environ 30 images par seconde
        dessiner(t);
        dernier = t;
      }
      raf = requestAnimationFrame(boucle);
    }
    const relancer = () => { if (!raf) raf = requestAnimationFrame(boucle); };
    if (mqReduit.addEventListener) mqReduit.addEventListener('change', relancer);
    else mqReduit.addListener(relancer); // Safari < 14

    let attente;
    window.addEventListener('resize', () => {
      clearTimeout(attente);
      attente = setTimeout(dimensionner, 150);
    });
    // changement d'écran ou de zoom : on redessine à la bonne résolution
    const surveillerDpr = () => window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      .addEventListener('change', () => { W = 0; dimensionner(); surveillerDpr(); }, { once: true });
    surveillerDpr();
    dimensionner();
    relancer();
    return { figer: relancer };
  })();

  /* ======================================================================
     Formulaire du thème
     ====================================================================== */
  const formTheme = $('#form-theme');
  const boxResultats = $('#resultats');

  // date du jour en heure locale, au format des champs date (AAAA-MM-JJ)
  const aujourdhui = () => {
    const n = new Date();
    return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`;
  };
  $('#naissance').max = aujourdhui();

  formTheme.addEventListener('submit', e => {
    e.preventDefault();
    const f = formTheme.elements;
    const prenoms = f.prenoms.value.trim();
    const nom = f.nom.value.trim();
    const date = f.naissance.value;
    const err = $('#theme-erreur');
    $$('[aria-invalid]', formTheme).forEach(c => {
      c.removeAttribute('aria-invalid');
      c.removeAttribute('aria-describedby');
    });

    let message = null;
    let champ = null;
    if (!lettres(prenoms)) { message = 'Indiquez au moins un prénom.'; champ = f.prenoms; }
    else if (!lettres(nom)) { message = 'Indiquez votre nom de naissance.'; champ = f.nom; }
    else if (!date) {
      message = f.naissance.validity.badInput
        ? `Cette date est incomplète ou n'existe pas${NB}: vérifiez le jour, le mois et l'année.`
        : 'Indiquez votre date de naissance.';
      champ = f.naissance;
    }
    else if (date.length !== 10 || date < '1900-01-01' || date > aujourdhui()) {
      message = 'Cette date de naissance semble incorrecte.';
      champ = f.naissance;
    }

    if (message) {
      champ.setAttribute('aria-invalid', 'true');
      champ.setAttribute('aria-describedby', 'theme-erreur');
      err.hidden = false;
      err.textContent = '';
      champ.focus();
      setTimeout(() => { err.textContent = message; }, 50); // relu même si l'erreur se répète
      return;
    }
    err.hidden = true;
    afficherTheme(calculerTheme(prenoms, nom, date));
  });
  formTheme.querySelector('[type="submit"]').disabled = false;

  function afficherTheme(t) {
    const cdv = T.cheminDeVie[t.cdv.valeur];
    const badge = v => (MAITRES.includes(v) ? '<span class="badge">Nombre maître</span>' : '');

    const carte = (i, label, sous, res, textes) => {
      if (!res.valeur) {
        const manque = label === 'Nombre intime' ? 'voyelle' : 'consonne';
        return `
        <article class="res-card" style="--d:${i}">
          <div class="res-card-top">
            <span class="res-card-num">–</span>
            <div>
              <h4 class="res-label">${nb(label)}</h4>
              <p class="res-sub">${sous}</p>
            </div>
          </div>
          <p>Ce nombre ne peut pas être calculé${NB}: votre nom ne contient aucune ${manque}.</p>
        </article>`;
      }
      return `
        <article class="res-card" style="--d:${i}">
          <div class="res-card-top">
            <span class="res-card-num">${res.valeur}</span>
            <div>
              <h4 class="res-label">${nb(label)}</h4>
              <p class="res-sub">${sous}</p>
            </div>
          </div>
          ${badge(res.valeur)}
          <p>${textes[res.valeur]}</p>
          <details class="calc"><summary>Voir le calcul</summary><p>${res.calcul}</p></details>
        </article>`;
    };

    const idPlanete = window.PLANETE_DU_NOMBRE[t.cdv.valeur];
    const P = PLANETES[idPlanete];
    const famille = CARTES.filter(c => c.planete === idPlanete);

    boxResultats.innerHTML = `
      <div class="res-head">
        <p class="kicker">Thème numérologique de</p>
        <h3 class="res-name">${esc(t.nomAffiche)}</h3>
        <p class="res-date">Date de naissance${NB}: ${t.dateAffichee}</p>
      </div>

      <article class="res-main">
        <div class="res-main-num" aria-hidden="true"><span>${t.cdv.valeur}</span></div>
        <div class="res-main-body">
          <p class="res-label">Votre chemin de vie · ${nb(t.cdv.valeur)} ${badge(t.cdv.valeur)}</p>
          <h4>${cdv.titre}</h4>
          <ul class="keywords">${cdv.mots.map(m => `<li>${m}</li>`).join('')}</ul>
          <p>${cdv.texte}</p>
          <details class="calc"><summary>Voir le calcul</summary><p>${t.cdv.calcul}</p></details>
        </div>
      </article>

      <div class="res-grid">
        ${carte(0, "Nombre d'expression", "Votre façon d'agir et de communiquer", t.expr, T.expression)}
        ${carte(1, 'Nombre intime', 'Vos aspirations profondes', t.intime, T.intime)}
        ${carte(2, 'Nombre de personnalité', "L'image que vous renvoyez", t.perso, T.personnalite)}
        ${carte(3, `Année personnelle ${t.annee}`, 'Le climat de votre année', t.ap, T.anneePerso)}
      </div>

      <section class="res-planete" data-planete="${idPlanete}">
        <div class="rp-shield">${blason(idPlanete)}</div>
        <div class="rp-body">
          <p class="res-label">Votre planète dans l'Oracle Belline</p>
          <h4>${P.nom}</h4>
          <p>Votre chemin de vie, le ${t.cdv.valeur}, est associé ${P.a}${NB}: les sept lames de sa famille sont vos cartes clés. Un tirage peut vous aider à voir laquelle fait écho à votre situation du moment.</p>
          <p>${P.texte}</p>
          <ul class="rp-cards">${famille.map(c => `<li><b>${c.num}</b>${c.nom}</li>`).join('')}</ul>
          <a href="#carte" class="btn-link rp-link">Tirer votre lame du jour <span aria-hidden="true">→</span></a>
          <p class="rp-note">Correspondance proposée d'après la numérologie chaldéenne${NB}; elle ne fait pas partie de la tradition du jeu.</p>
        </div>
      </section>

      <div class="res-actions">
        <button type="button" class="btn btn-outline" id="imprimer">Imprimer ou enregistrer en PDF</button>
        <a href="#tirage" class="btn btn-primary">Aller plus loin avec un tirage</a>
      </div>`;

    boxResultats.hidden = false;
    const titre = $('.res-name', boxResultats);
    titre.tabIndex = -1;
    titre.focus({ preventScroll: true });
    $('#imprimer', boxResultats).addEventListener('click', () => window.print());
    requestAnimationFrame(() => boxResultats.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }));

    const prenomResa = $('#resa-prenom');
    if (prenomResa && !prenomResa.value) prenomResa.value = t.premierPrenom;

    // Suggestion pour la lame du jour : le chemin de vie ramené à un chiffre de 1 à 9
    nombreSuggere = t.cdv.valeur > 9 ? somme(chiffres(t.cdv.valeur)) : t.cdv.valeur;
    hint.textContent = nombreSuggere === t.cdv.valeur
      ? `Votre chemin de vie est le ${nombreSuggere}${NB}: pourquoi ne pas choisir ce chiffre${NB}?`
      : `Votre chemin de vie, le ${t.cdv.valeur}, se réduit à ${nombreSuggere}${NB}: pourquoi ne pas choisir ce chiffre${NB}?`;
    hint.hidden = false;
    marquerSuggestion();
  }

  /* ======================================================================
     « Tirez votre lame du jour » — méthode attribuée au Mage Edmond :
     on choisit un chiffre de 1 à 9 et l'on retourne la carte qui tombe dessus.
     ====================================================================== */
  const row = $('#draw-row');
  const revealBox = $('#draw-reveal');
  const boxMessage = $('.draw-message');
  const hint = $('.draw-hint');
  let paquet = [];
  let nombreSuggere = null;

  function melanger(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function marquerSuggestion() {
    $$('.pick', row).forEach(b => b.classList.toggle('is-suggested', Number(b.dataset.n) === nombreSuggere));
  }

  function preparerTirage() {
    paquet = melanger(CARTES);
    boxMessage.hidden = true;
    $('#draw-annonce').textContent = '';
    revealBox.hidden = true;
    revealBox.innerHTML = '';
    row.hidden = false;
    row.innerHTML = Array.from({ length: 9 }, (_, i) => `
      <button type="button" class="pick" style="--k:${i - 4}" data-n="${i + 1}" aria-label="Chiffre ${i + 1}">
        <span class="tcard tcard-back"></span><span class="pick-num" aria-hidden="true">${i + 1}</span>
      </button>`).join('');
    marquerSuggestion();
    $$('.pick', row).forEach((b, i) => b.addEventListener('click', () => reveler(i)));
  }

  function reveler(i) {
    const c = paquet[i];
    const rang = i === 0 ? '1re' : `${i + 1}e`;
    row.hidden = true;
    revealBox.innerHTML = `
      <div class="flip" aria-hidden="true"><span class="flip-inner"><span class="tcard tcard-back"></span>${faceCarte(c)}</span></div>
      <p class="draw-count">Vous avez choisi le ${nb(i + 1)}${NB}: voici la ${nb(rang)} lame du paquet.</p>`;
    revealBox.hidden = false;
    const flip = $('.flip', revealBox);
    requestAnimationFrame(() => requestAnimationFrame(() => flip.classList.add('is-flipped')));

    $('.draw-name', boxMessage).innerHTML = nb(libelleCarte(c));
    $('.draw-msg', boxMessage).textContent = c.message;
    setTimeout(() => {
      boxMessage.hidden = false;
      $('#draw-annonce').textContent = `${libelleCarte(c)}. ${c.message}`;
      $('#redraw').focus({ preventScroll: true });
    }, motionOK() ? 800 : 0);
  }

  $('#redraw').addEventListener('click', () => {
    preparerTirage();
    ($('.pick.is-suggested', row) || $('.pick', row)).focus({ preventScroll: true });
  });
  preparerTirage();

  /* ======================================================================
     Réservation
     ====================================================================== */
  const formResa = $('#form-resa');
  const FORMATS = { croix: ['Par écrit'], complet: ['Visio', 'Téléphone'] };
  const radiosFormat = $$('input[name="format"]', formResa);

  function majFormats() {
    const permis = FORMATS[formResa.elements.formule.value];
    radiosFormat.forEach(r => { r.disabled = Boolean(permis) && !permis.includes(r.value); });
    if (permis && !permis.includes(formResa.elements.format.value)) {
      radiosFormat.find(r => r.value === permis[0]).checked = true;
    }
    $('#resa-tel').required = formResa.elements.format.value === 'Téléphone';
  }
  formResa.elements.formule.addEventListener('change', majFormats);
  radiosFormat.forEach(r => r.addEventListener('change', majFormats));

  $$('[data-formule]').forEach(btn => {
    btn.addEventListener('click', () => {
      formResa.elements.formule.value = btn.dataset.formule;
      majFormats();
      $('#reserver').scrollIntoView({ behavior: scrollBehavior() });
      setTimeout(() => $('#resa-prenom').focus({ preventScroll: true }), motionOK() ? 700 : 0);
    });
  });

  formResa.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(formResa));
    const formule = CONFIG.formules[d.formule] || d.formule;
    const sujet = `Demande de tirage — ${formule}`;
    const corps = [
      'Bonjour,',
      '',
      `Je souhaite réserver : ${formule}`,
      `Format souhaité : ${d.format}`,
      '',
      `Prénom : ${d.prenom}`,
      `E-mail : ${d.email}`,
      d.telephone ? `Téléphone : ${d.telephone}` : null,
      d.dispos ? `Disponibilités : ${d.dispos}` : null,
      '',
      'Ma question / ma situation :',
      d.question,
      '',
      'Merci !',
    ].filter(l => l !== null).join('\r\n');

    const url = `mailto:${CONFIG.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    const ok = $('.resa-ok', formResa);
    const lien = `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;
    if (url.length > 2000) {
      // au-delà, certaines messageries tronquent le texte ou ne s'ouvrent pas
      ok.innerHTML = `Votre message est un peu long pour être transmis ainsi${NB}: raccourcissez-le, ou écrivez directement à ${lien}.`;
    } else {
      window.location.href = url;
      ok.innerHTML = `Merci${NB}! Votre messagerie devrait s'ouvrir avec votre demande. Si rien ne se passe, écrivez directement à ${lien}.`;
    }
    ok.hidden = false;
    $('#resa-annonce').textContent = ok.textContent;
  });
  formResa.querySelector('[type="submit"]').disabled = false;

  /* ======================================================================
     Divers
     ====================================================================== */
  $$('[data-email]').forEach(a => {
    a.href = `mailto:${CONFIG.email}`;
    a.textContent = CONFIG.email;
  });
  $('#annee').textContent = new Date().getFullYear();

  const animBtn = $('#anim-toggle');
  animBtn.setAttribute('aria-label', 'Mettre en pause les animations');
  animBtn.addEventListener('click', () => {
    const pause = document.documentElement.classList.toggle('anim-pause');
    animBtn.setAttribute('aria-pressed', String(pause));
    ciel.figer();
  });

  // apparitions au défilement
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
})();
