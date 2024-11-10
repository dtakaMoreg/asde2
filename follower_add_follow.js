// ユーザのフォローボタンを押す

javascript:(function() {
    // 1. divタグでclass名にfollow-buttonを含む要素を取得
    var divs = document.querySelectorAll('div[class*="follow-button"]');
    
    divs.forEach(function(div) {
        // 2. 1の中にあるbutton要素を取得
        var button = div.querySelector('button');
        
        // 3. buttonのテキストが「フォローする」だったらクリック
        if (button && button.textContent === "フォローする") {
            button.click();
        }
    });
})();
