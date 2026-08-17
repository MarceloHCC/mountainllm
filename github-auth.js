(() => {
  const storageKey = 'mountain-github-profile';
  const config = window.MOUNTAIN_AUTH_CONFIG || {};
  const profileButton = document.querySelector('.top-actions .avatar');
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);

  if (!profileButton) return;

  const icon = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.1a6.9 6.9 0 0 0-2.18 13.45c.35.06.48-.15.48-.34v-1.33c-1.96.43-2.37-.83-2.37-.83-.32-.82-.78-1.04-.78-1.04-.64-.43.05-.42.05-.42.7.05 1.08.73 1.08.73.63 1.07 1.64.76 2.04.58.06-.45.25-.76.45-.93-1.56-.18-3.2-.78-3.2-3.47 0-.77.28-1.4.73-1.89-.07-.18-.32-.9.07-1.87 0 0 .6-.2 1.91.72A6.7 6.7 0 0 1 8 4.43c.6 0 1.2.08 1.76.24 1.31-.9 1.91-.72 1.91-.72.39.97.14 1.69.07 1.87.46.49.73 1.12.73 1.89 0 2.7-1.64 3.28-3.2 3.46.25.22.47.64.47 1.29v1.91c0 .19.13.4.48.34A6.9 6.9 0 0 0 8 1.1Z"/></svg>`;

  const readProfile = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null'); }
    catch { return null; }
  };

  const saveProfile = (profile) => localStorage.setItem(storageKey, JSON.stringify(profile));

  const safeProfileFromHash = () => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const payload = params.get('github_auth');
    if (!payload) return null;
    try {
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
      const json = decodeURIComponent(escape(atob(padded)));
      const value = JSON.parse(json);
      return value && typeof value.login === 'string' ? value : null;
    } catch { return null; }
  };

  const clearAuthHash = () => history.replaceState(null, '', `${location.pathname}${location.search}`);

  const openAccount = () => {
    const existing = document.querySelector('.github-account-popover');
    if (existing) return existing.remove();
    const profile = readProfile();
    const popover = document.createElement('div');
    popover.className = 'github-account-popover';
    popover.innerHTML = profile
      ? `<div class="github-account-head">${profile.avatar_url ? `<img src="${escapeHtml(profile.avatar_url)}" alt="">` : icon}<div><strong>${escapeHtml(profile.name || profile.login)}</strong><span>@${escapeHtml(profile.login)}</span></div></div><button type="button" data-github-logout>Sair da conta</button>`
      : `<div class="github-account-head github-account-empty">${icon}<div><strong>Conecte seu GitHub</strong><span>Use sua conta para entrar.</span></div></div><button type="button" data-github-login>Entrar com GitHub</button>`;
    document.body.append(popover);
    const rect = profileButton.getBoundingClientRect();
    popover.style.top = `${rect.bottom + 8}px`;
    popover.style.right = `${Math.max(12, window.innerWidth - rect.right)}px`;
    popover.querySelector('[data-github-login]')?.addEventListener('click', () => {
      if (!config.apiBase) {
        popover.querySelector('.github-account-empty div').innerHTML = '<strong>Login sendo configurado</strong><span>O endereço seguro ainda não foi publicado.</span>';
        return;
      }
      location.assign(`${config.apiBase.replace(/\/$/, '')}/auth/github`);
    });
    popover.querySelector('[data-github-logout]')?.addEventListener('click', () => {
      localStorage.removeItem(storageKey);
      renderProfile();
      popover.remove();
    });
  };

  const renderProfile = () => {
    const profile = readProfile();
    profileButton.classList.add('github-profile');
    profileButton.setAttribute('role', 'button');
    profileButton.setAttribute('tabindex', '0');
    profileButton.setAttribute('aria-label', profile ? `Conta GitHub: ${profile.login}` : 'Entrar com GitHub');
    profileButton.innerHTML = profile?.avatar_url
      ? `<img src="${profile.avatar_url}" alt="">`
      : icon;
    profileButton.title = profile ? `@${profile.login}` : 'Entrar com GitHub';
  };

  const received = safeProfileFromHash();
  if (received) {
    saveProfile(received);
    clearAuthHash();
    window.setTimeout(() => window.toast?.(`Conectado como @${received.login}`), 50);
  }

  renderProfile();
  profileButton.addEventListener('click', openAccount);
  profileButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openAccount(); }
  });
  document.addEventListener('pointerdown', (event) => {
    const popover = document.querySelector('.github-account-popover');
    if (popover && !popover.contains(event.target) && !profileButton.contains(event.target)) popover.remove();
  });
})();
