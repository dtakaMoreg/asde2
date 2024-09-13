javascript:(function() {
    var linkTexts = [];
    var tmplst = [];
    var cnt = 0;
    var fileName ="";
    var scroll_count= 0;
    
    navigator.clipboard.writeText("start");  

    // 指定したIDの要素を取得します
    var userList = document.getElementById('userList');
    if(userList == null){
        userList = document.getElementById('ng-app');
    }
    
    // スクロール関数
    function scrollToBottom() {
        userList.scrollTop = userList.scrollHeight;
    }

    // スクロールが終了するまでスクロールを続けます
    var scrollInterval = setInterval(function() {
        var prevHeight = userList.scrollTop;
        scrollToBottom();
        if (prevHeight === userList.scrollTop) {
            if(scroll_count>10){
                clearInterval(scrollInterval);
            
                // スクロールが終了したらリンク要素を取得します
                getRoomLink();
            }else{
               scroll_count++;
            }
            
        }else{
            scroll_count = 0;
        }
        
    }, 1000); // 1秒ごとにスクロール


    // リンク要素を取得
    function getRoomLink() {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            hreft = links[i].getAttribute("href");
            if (hreft != null && hreft.length > 7 && hreft.includes("/items")) {
                tmplst.push('https://room.rakuten.co.jp' + hreft);
            }
        }
        
        
        // LocalStorageへ格納する
        // 朝4時にストレージをリセットする
        var currentDate = new Date();

        // リセット時刻と現在時刻を取得
        var nextResetTime = parseInt(localStorage.getItem('nextResetTime'), 10) || 0;
        var currentTime = currentDate.getTime();
        
        // リセット時刻を過ぎていたらリセット
        if (currentTime >= nextResetTime) {

            //ローカルストレージをリセット
            localStorage.removeItem("nextResetTime");
            localStorage.removeItem("collectedURLs");
            localStorage.removeItem("nextURLNo");
            localStorage.removeItem("iineClick");
            
            // 開始時刻を設定
            var currentHour = currentDate.getHours();
            var nextTime = new Date(currentDate);
            
            // 当日の0:00～9:59なら当日の10時に設定
            if (currentHour >= 0 && currentHour < 10) {
                nextTime.setHours(10, 0, 0, 0);
            // そうでなければ次の日の10時に設定
            } else {
                nextTime.setDate(currentDate.getDate() + 1);
                nextTime.setHours(10, 0, 0, 0);
            }
        
            localStorage.setItem('nextResetTime', nextTime.getTime());
        }

        // URLを追加
        var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];
        var beforecnt = collectedURLs.length;
        collectedURLs.push(...tmplst);

        // 重複の削除
        collectedURLs = Array.from(new Set(collectedURLs));
        var aftercnt = collectedURLs.length;
        
        // ローカルストレージに収集したURLを保存
        localStorage.setItem('collectedURLs', JSON.stringify(collectedURLs));

        navigator.clipboard.writeText("end");
        //alert('URLを収集しました: current[' + tmplst.length + '] total[' + collectedURLs.length + ']([' + beforecnt + ']->[' + aftercnt + '])');
          
    }

})();
