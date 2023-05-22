document
  .getElementById('toggle-light-mode')
  ?.addEventListener('click', async () => {
    const isDarkMode = await (window as any).darkMode.toggle();
    document.getElementById('theme-source')!.innerHTML = isDarkMode
      ? 'Dark'
      : 'Light';
  });

document
  .getElementById('reset-to-system')
  ?.addEventListener('click', async () => {
    await (window as any).darkMode.system();
    document.getElementById('theme-source')!.innerHTML = 'System';
  });
