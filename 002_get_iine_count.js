//TamperMonkeyでいいねした数をlocalStorageの[rakuten_click_count]に入れている
//それを取得してクリップボードにコピーするブックマークレット

javascript:(function() {
    try {
        var value = localStorage.getItem('rakuten_click_count');
        if (value === null) {
            alert('rakuten_click_count が見つかりませんでした。');
        } else {
            navigator.clipboard.writeText(value).then(function() {
                alert('クリップボードにコピーしました: ' + value);
            }).catch(function(err) {
                alert('クリップボードへのコピーに失敗しました: ' + err);
            });
        }
    } catch (e) {
        alert('エラーが発生しました: ' + e.message);
    }
})();
