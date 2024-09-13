javascript:(function() {

    var fileName ="";
    
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // yyyymmddhhmmss形式にフォーマット
    fileName = `list_${formattedDate}`; // ファイル名は適宜変更してください
        
    // ダウンロードを開始します
    function startDownload(nextinfo) {

        var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];

        // なければやらない
        if(collectedURLs.length > nextinfo) {
            // 改行を入れてテキストに変換
            var data = collectedURLs.join('\r\n');
            
            // Blobオブジェクトを作成
            var blob = new Blob([data], { type: 'text/plain' });

            // ダウンロードリンクを作成して自動的にクリックさせる
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName + '.txt'; // ダウンロードされるファイル名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } else {
            alert('追加で作成するリストはありません。 collectedURLs[' + collectedURLs.length + ']');
        }

    }

    // ダウンロードを開始します
    startDownload(0);

})();
