//TamperMonkeyでいいねした数をlocalStorageの[room_click_yyyymmddhhmmss]に入れている
//その数を取得してクリップボードにコピーするブックマークレット

javascript:(function() {
    try {
        // Count the number of localStorage keys starting with "room_click_"
        var count = 0;
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith('room_click_')) {
                count++;
            }
        }

        // Copy the count to clipboard
        navigator.clipboard.writeText(count.toString()).then(function() {
            alert('「room_click_」で始まるキーの数をクリップボードにコピーしました: ' + count);
        }).catch(function(err) {
            alert('クリップボードへのコピーに失敗しました: ' + err);
        });
    } catch (e) {
        alert('エラーが発生しました: ' + e.message);
    }
})();

