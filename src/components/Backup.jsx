import React from 'react';

const Backup = props => (
  <div className="backup">
    <input type="submit" value="Download Backup" onClick={
      (event) => {
        const blob = new Blob([JSON.stringify(localStorage, null, 2)], { type: "text/plain;charset=utf-8" });
        let URL_ = (window.URL || window.webkitURL);
        let fileURL = URL_.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = fileURL;
        a.download = "jukedrop-backup.json";
        a.click();
        a.remove();
        setTimeout(function() {
          URL_.revokeObjectURL(fileURL);
        }, 10000);
        return false;
      }
    }
    />
  </div>
);

export default Backup;
