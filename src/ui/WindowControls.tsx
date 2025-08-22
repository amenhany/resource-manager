import './WindowControls.css';

export default function WindowControls() {
   const platform = window.electron.platform;

   return (
      <header className={platform === 'darwin' ? 'mac' : 'win'}>
         {platform === 'darwin' && (
            <div className="window-controls mac">
               <div
                  className="window-btn close"
                  data-symbol="×"
                  onClick={() => window.electron.sendFrameAction('CLOSE')}
               ></div>
               <div
                  className="window-btn min"
                  data-symbol="–"
                  onClick={() => window.electron.sendFrameAction('MINIMIZE')}
               ></div>
               <div
                  className="window-btn max"
                  data-symbol="+"
                  onClick={() => window.electron.sendFrameAction('MAXIMIZE')}
               ></div>
            </div>
         )}

         {platform === 'win32' && (
            <div className="win-controls">
               <div
                  className="win-btn min"
                  onClick={() => window.electron.sendFrameAction('MINIMIZE')}
               >
                  –
               </div>
               <div
                  className="win-btn max"
                  onClick={() => window.electron.sendFrameAction('MAXIMIZE')}
               >
                  □
               </div>
               <div
                  className="win-btn close"
                  onClick={() => window.electron.sendFrameAction('CLOSE')}
               >
                  ×
               </div>
            </div>
         )}
      </header>
   );
}
