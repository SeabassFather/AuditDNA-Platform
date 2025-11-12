export default function LanguageSwitch({ language, setLanguage }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold underline' : ''}>English</button>
      <button onClick={() => setLanguage('es')} className={language === 'es' ? 'font-bold underline' : ''}>EspaÃ±ol</button>
    </div>
  );
}
