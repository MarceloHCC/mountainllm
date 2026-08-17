(() => {
  const $ = selector => document.querySelector(selector);
  const actions = $('.top-actions');
  if (actions) {
    const share = [...actions.querySelectorAll('button')].find(button => button.textContent.trim() === 'Compartilhar') || Object.assign(document.createElement('button'), { textContent: 'Compartilhar' });
    const exportButton = $('#export-btn') || Object.assign(document.createElement('button'), { textContent: 'Exportar' });
    const publish = actions.querySelector('.publish') || Object.assign(document.createElement('button'), { textContent: 'Publicar', className: 'publish' });
    let language = actions.querySelector('.language-select');
    if (!language) {
      language = document.createElement('select');
      language.className = 'language-select';
      language.setAttribute('aria-label', 'Idioma');
      language.innerHTML = '<option>PT</option><option>EN</option><option>ES</option>';
    }
    const profile = actions.querySelector('.avatar') || Object.assign(document.createElement('span'), { className: 'avatar', textContent: 'MR' });
    actions.replaceChildren(share, exportButton, publish, language, profile);
  }
  $('.project-title strong')?.remove();
  $('.project-title .chevron')?.remove();
  const style = document.createElement('style');
  style.textContent = `
    .topbar{height:56px!important}.project-title{padding-left:16px!important}.top-actions{gap:7px!important}.top-actions button{height:29px!important;padding:0 10px!important;border-radius:5px!important;font-size:11px!important}.top-actions .publish{background:#e5e5e8!important;border-color:#e5e5e8!important;color:#1b1b1e!important}.top-actions .language-select{display:inline-block!important;height:29px!important;min-width:43px!important;border:1px solid #34343a!important;border-radius:5px!important;background:#202024!important;color:#d9d9de!important;font-size:10px!important}.canvas-tools-dock{height:42px!important;flex-basis:42px!important;padding:0 15px!important;gap:6px!important;background:#17171b!important;box-shadow:none!important}.canvas-tools-dock>span{font-size:9px!important;color:#85858e!important}.canvas-tools-dock .canvas-tool{height:27px!important;padding:0 9px!important;border:1px solid #34343a!important;border-radius:5px!important;background:transparent!important;color:#bcbcc3!important;font-size:10px!important;box-shadow:none!important;transform:none!important}.canvas-tools-dock .canvas-tool:before{display:none!important}.canvas-tools-dock .canvas-tool:hover{background:#28282d!important;color:#fff!important}.canvas-tools-dock .canvas-tool.active{background:#e5e5e8!important;color:#17171b!important;border-color:#e5e5e8!important}
  `;
  document.head.append(style);
})();
