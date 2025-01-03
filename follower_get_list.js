javascript:(function() {

    const MAX_DIV_TAGS = 1000;

    // 最初にfollow-buttonを含むclass名のbuttonをクリックする
    function clickFollowButton() {
        let followButtons = document.querySelectorAll("button[class*='follow-button']");
        if (followButtons.length > 1) {
            let followButton = followButtons[1];  // 2つ目のボタンを選択（インデックスは0から始まるため1）
            followButton.click();  // ボタンをクリック
            console.log("Second follow button clicked");
        
            // 2秒後に処理を開始する
            setTimeout(() => {
                console.log("Starting data extraction...");
                navigator.clipboard.writeText("start");
                let scrollContainer = document.querySelector("div#userList");
                scrollUntilLimit(scrollContainer);
            }, 2000);  // 2秒の待機
        } else {
            console.log("Follow button not found");
        }
    }

    // データを抽出する関数
    function extractData(divTag) {
        let roomUrl = divTag.querySelector("a[class*='profile-name-content']") ? divTag.querySelector("a[class*='profile-name-content']").href : '';
        let name = divTag.querySelector("span[class*='profile-name']") ? divTag.querySelector("span[class*='profile-name']").innerText : '';
        let followStatus = divTag.querySelector("button") ? divTag.querySelector("button").innerText : '';
        let rank = getRank(divTag);  // rank を取得する関数を追加
        let followInfo = divTag.querySelector("div[class*='follow-info']") ? divTag.querySelector("div[class*='follow-info']").innerText.replace('フォロワー', '') : '';

        // オブジェクト形式でデータを返す
        return { name, roomUrl, rank, followInfo, followStatus };
    }

    // rank をクラス名の "room-rank-" の次の1文字を取得する関数
    function getRank(divTag) {
        let rankClass = divTag.querySelector("div[class*='room-rank-']") ? divTag.querySelector("div[class*='room-rank-']").className : '';
        let match = rankClass.match(/room-rank-(\w)/);  // "room-rank-" の後の文字（英数字）を取得

        return match ? match[1] : '';  // マッチした場合はその文字を返す、マッチしなければ空文字
    }

    function scrollUntilLimit(scrollContainer) {
        let divTags = [];  // ここでdivTagsを毎回リセット
        let scrollCount = 0;  // スクロールが最下部に到達した回数をカウント

        function performScroll() {
            // 新たに表示されたdiv要素を取得
            let newDivTags = Array.from(document.querySelectorAll('div[class*="profile-wrapper"]'));

            // divTagsに新しい要素があれば追加
            newDivTags.forEach(newDiv => {
                if (!divTags.includes(newDiv)) {
                    divTags.push(newDiv);
                }
            });

            // スクロールが最後に到達したか確認する
            if (isScrolledToBottom(scrollContainer) || divTags.length >= MAX_DIV_TAGS) {
                saveResults(divTags);  // 結果を保存
            } else {
                // スクロールを下に進める
                scrollContainer.scrollTop = scrollContainer.scrollHeight;

                // 再びスクロール処理をセット（再帰的に呼び出す）
                setTimeout(performScroll, 200);  // 200ms後に再度スクロール
            }
        }

        // スクロール処理を初めて呼び出す
        performScroll();

        // スクロールが最後に到達したか確認する関数
        function isScrolledToBottom(scrollContainer) {
            let threshold = 1;  // 余裕を持たせるためのしきい値
            let isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight <= threshold;
            if (isAtBottom) {
                scrollCount++;  // スクロールが最下部に到達した回数をカウント
            } else {
                scrollCount = 0;  // 最下部に到達しなかった場合、カウントをリセット
            }

            return scrollCount >= 50;  // 50回以上連続して最下部に到達した場合にtrueを返す
        }

        // 結果を保存する関数
        function saveResults(divTags) {
            let results = [];  // ローカル変数としてresultsを定義

            // divTags[0] を除外する
            let filteredDivTags = divTags.slice(1);  // 先頭の1つを除外

            // 結果をオブジェクトとして保存
            filteredDivTags.forEach(divTag => {
                let result = extractData(divTag);
                results.push(result);  // オブジェクトをresultsに追加
            });

            // 現在の日時を取得して、ファイル名を作成
            let now = new Date();
            let year = now.getFullYear();
            let month = String(now.getMonth() + 1).padStart(2, '0');  // 月は0から始まるので+1
            let day = String(now.getDate()).padStart(2, '0');
            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let seconds = String(now.getSeconds()).padStart(2, '0');
            
            // ファイル名を作成
            let filename = `follower_${year}${month}${day}${hours}${minutes}${seconds}.json`;
            //let filename = `follower.json`;

            // 結果をJSONとして保存（ブラウザでダウンロード）
            let blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            a.click();

            navigator.clipboard.writeText("end");
        }
    }

    // 最初にfollow-buttonをクリックしてから処理を開始
    clickFollowButton();
})();
