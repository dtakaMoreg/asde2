//TamperMonkeyでいいねしたURLをlocalStorageの[room_click_yyyymmddhhmmss]に入れている
//そのURLを取得してクリップボードにコピーするブックマークレット

javascript:(function() {
    try {
        let urls = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('room_click_')) {
                const value = localStorage.getItem(key);
                urls.push(value);
            }
        }

        if (urls.length === 0) {
            alert('「room_click_」で始まるキーが見つかりませんでした。');
            return;
        }

        const textToCopy = urls.join('\n');

        navigator.clipboard.writeText(textToCopy).then(function() {
            alert('以下のURLリストをクリップボードにコピーしました:\n' + urls.length + ' 件');
        }).catch(function(err) {
            alert('クリップボードへのコピーに失敗しました: ' + err);
        });
    } catch (e) {
        alert('エラーが発生しました: ' + e.message);
    }
})();
