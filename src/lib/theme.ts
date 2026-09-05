export const THEME_STORAGE_KEY = 'theme'
export const THEME_CHANGE_EVENT = 'themechange'

export const themeInitScript = `(function(){try{
  var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
  var isDark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', isDark);
}catch(e){}})()`
