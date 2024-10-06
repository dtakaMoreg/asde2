javascript:(function() {
    // local_storage_save_urls_aとlocal_storage_save_urls_bを取得
    let savedUrlsA = localStorage.getItem('local_storage_save_urls_a');
    let savedUrlsB = localStorage.getItem('local_storage_save_urls_b');
debugger
    if (!savedUrlsA && !savedUrlsB) {
        alert('No URLs saved to download.');
        return;
    }

    // URLリストを結合
    savedUrlsA = savedUrlsA ? JSON.parse(savedUrlsA) : [];
    savedUrlsB = savedUrlsB ? JSON.parse(savedUrlsB) : [];
    let mergedUrls = savedUrlsA.concat(savedUrlsB);

    // テキストファイルに保存する内容を生成
    const blob = new Blob([mergedUrls.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // aタグを生成してクリック
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged_saved_urls.txt'; // 保存するファイル名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // オブジェクトURLを解放
    URL.revokeObjectURL(url);

    alert('Merged saved URLs have been downloaded as merged_saved_urls.txt');
})();
