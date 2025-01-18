//楽天アフィリエイトの高利率ページからURLを取得するブックマークレット
javascript:(function() {
    // リンクを取得してセットに追加し、重複を除去
    let links;
    let currentURL = window.location.href;

    if (currentURL.indexOf('https://search.rakuten.co.jp/') !== -1) {
        links = [...new Set(
            [...document.querySelectorAll('a[class*="dui-item"]')]
            .map(a => a.href)
            .filter(href => href.startsWith('https://item.rakuten.co.jp/'))
        )].join('\n');
    } else if (currentURL.indexOf('https://affiliate.rakuten.co.jp/') !== -1) {
        links = [...new Set(
            [...document.querySelectorAll('.raf-product__textBox a')]
            .map(a => a.href)
            .filter(href => href.startsWith('https://item.rakuten.co.jp/'))
        )].join('\n');
    } else {
        links = 'No matching URL pattern.';
    }

    // クリップボードにコピー
    if (navigator.clipboard) {
        navigator.clipboard.writeText(links).then(() => {
            alert('リンクをクリップボードにコピーしました。');
        }).catch((error) => {
            console.error('クリップボードへのコピーに失敗しました', error);
        });
    } else {
        alert('このブラウザはクリップボードコピーをサポートしていません。');
    }
})();
