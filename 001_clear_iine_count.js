//TamperMonkeyでいいねした数をlocalStorageの[room_click_yyyymmddhhmmss]に入れている
//それをクリアするブックマークレット
javascript:(function() {
    try {
        // Loop through localStorage and collect keys starting with "room_click_"
        var keysToDelete = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith('room_click_')) {
                keysToDelete.push(key);
            }
        }

        // Delete the collected keys
        keysToDelete.forEach(function(key) {
            localStorage.removeItem(key);
        });

        alert('「room_click_」で始まるすべてのキーを削除しました: ' + keysToDelete.length + '件');
    } catch (e) {
        alert('エラーが発生しました: ' + e.message);
    }
})();
