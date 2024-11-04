//フォロワーリストを取得する
//s,a,b,cまでで上から200人
javascript:(function() {
    var linkTexts = [];
    var tmplst = [];
    var cnt = 0;
    var fileName ="";
    var scroll_count= 0;
    var collectedURLs = [];
    var linkcount = 0;


    // 指定したIDの要素を取得します
    var userList = document.getElementById('userList');
    if(userList == null){
       userList = document.getElementById('ng-app');
    }
    
    // スクロール関数
    function scrollToBottom() {
        userList.scrollTop = userList.scrollHeight;
    }

    function dispHidden(userList) {
        var elements = userList.querySelectorAll('div[class*="spacer"]');
        elements.forEach(function(el) {
            el.style.display = 'none';
        });
    }

    function counthref(){
        var links = document.getElementsByTagName('a');
        var count = 0;
        for (var i = 0; i < links.length; i++) {
            var hreft = links[i].getAttribute("href");
            if (hreft != null && hreft.length > 7 && hreft.includes("/items")) {
                count++;
            }
        }
    
        return count;
    }

    // スクロールが終了するまでスクロールを続けます
    var scrollInterval = setInterval(function() {
        var prevHeight = userList.scrollTop;
        scrollToBottom();
        dispHidden(userList);
        var links = counthref();
        if (linkcount >= links) {
            if(scroll_count>20){
                clearInterval(scrollInterval);
            
                // スクロールが終了したらリンク要素を取得します
                getRoomDelLink();
            }else{
               scroll_count++;
            }
            
        }else{
            scroll_count = 0;
            linkcount = links;
            

        }
        
        document.title = linkcount + "/" + scroll_count;
    }, 500); // 500msごとにスクロール


    // リンク要素を取得
    function getRoomDelLink() {
        var links = document.getElementsByTagName('a');
        document.title = "aa" + links.length;
        
        for (var i = 0; i < links.length; i++) {
            hreft = links[i].getAttribute("href");
            if (hreft != null && hreft.length > 7 && hreft.includes("/items")) {
                let divelements = links[i].getElementsByTagName('div');
                if (divelements.length > 0){
                    s = divelements[0].className.indexOf("room-rank");
                    if(s > 0){
                        s = s + 10;
                        const rank = divelements[0].className[s]
                        //if(rank === "d" || rank === "e"){
                            collectedURLs.push(rank + '\thttps://room.rakuten.co.jp' + hreft);
                        //}
                    }
                }
            }
        }
        
        
        //ダウンロード
        startDownload(0);
    }


    var fileName ="";
    
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // yyyymmddhhmmss形式にフォーマット
    fileName = `removelist_${formattedDate}`; // ファイル名は適宜変更してください
        
    // ダウンロードを開始します
    function startDownload(nextinfo) {

        // なければやらない
        if(collectedURLs.length > nextinfo) {
            var linkTexts = [];
            for (var i = nextinfo; i < collectedURLs.length; i++) {
                linkTexts.push(collectedURLs[i]);
            }
            var textData = linkTexts.join('\n');
            var blob = new Blob([textData], { type: 'text/plain' });
            var url = URL.createObjectURL(blob);

            var a = document.createElement('a');
            a.href = url;
            a.download = fileName + '.txt';
            a.style.display = 'none';
            document.body.appendChild(a);

            a.click();

            URL.revokeObjectURL(url);
            document.body.removeChild(a);

            //alert('ダウンロードが完了しました [' + (parseInt(nextinfo)+1) + ']->[' + collectedURLs.length + ']');
            
        } else {
            alert('追加で作成するリストはありません。 collectedURLs[' + collectedURLs.length + ']');
        }

    }

    
})();
