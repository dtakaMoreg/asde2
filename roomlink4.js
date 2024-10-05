javascript:(function() {
    // local_storage_save_urlsを取得
    let savedUrls = localStorage.getItem('local_storage_save_urls');
    
    if (!savedUrls) {
        alert('No URLs saved to download.');
        return;
    }

    savedUrls = JSON.parse(savedUrls);

    // テキストファイルに保存する内容を生成
    const blob = new Blob([savedUrls.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // aタグを生成してクリック
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_urls.txt'; // 保存するファイル名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // オブジェクトURLを解放
    URL.revokeObjectURL(url);

    alert('Saved URLs have been downloaded as saved_urls.txt');
})();
