import './WindowControls.css';

export default function WindowControls() {
   const platform = window.electron.platform;

   return (
      <header className={platform === 'darwin' ? 'mac' : 'win'}>
         {platform === 'darwin' && (
            <div className="window-controls mac">
               <div
                  className="window-btn close"
                  id="close"
                  data-symbol="×"
                  onClick={() => window.electron.sendFrameAction('CLOSE')}
               ></div>
               <div
                  className="window-btn min"
                  id="minimize"
                  data-symbol="–"
                  onClick={() => window.electron.sendFrameAction('MINIMIZE')}
               ></div>
               <div
                  className="window-btn max"
                  id="maximize"
                  data-symbol="+"
                  onClick={() => window.electron.sendFrameAction('MAXIMIZE')}
               ></div>
            </div>
         )}

         {platform === 'win32' && (
            <div className="win-controls">
               <div
                  className="win-btn min"
                  id="minimize"
                  onClick={() => window.electron.sendFrameAction('MINIMIZE')}
               >
                  –
               </div>
               <div
                  className="win-btn max"
                  id="maximize"
                  onClick={() => window.electron.sendFrameAction('MAXIMIZE')}
               >
                  □
               </div>
               <div
                  className="win-btn close"
                  id="close"
                  onClick={() => window.electron.sendFrameAction('CLOSE')}
               >
                  ×
               </div>
            </div>
         )}
      </header>
   );
}
