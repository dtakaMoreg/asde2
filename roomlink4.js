javascript:(function() {
    // 保存するキーの範囲
    const maxKeys = 10;
    const allUrls = [];

    // local_storage_save_urls_0～local_storage_save_urls_9の内容をまとめる
    for (let i = 0; i < maxKeys; i++) {
        const localStorageKey = "local_storage_save_urls_" + i;
        const urls = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        
        // 各URLリストをallUrlsに追加
        allUrls.push(`local_storage_save_urls_${i}:`);
        allUrls.push(...urls);
        allUrls.push(""); // 改行を追加
    }

    // テキスト形式に変換
    const blob = new Blob([allUrls.join('\n')], { type: 'text/plain' });

    // ダウンロードリンクを作成して自動クリック
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved_urls.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("URLの保存が完了しました。");
})();
