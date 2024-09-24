//楽天アフィリエイトの高利率ページからURLを取得するブックマークレット
javascript:(function() {
    let links = [...new Set(
        [...document.querySelectorAll('.raf-product__textBox a')]
        .map(a => a.href)
        .filter(href => href.startsWith('https://item.rakuten.co.jp/'))
    )].join('\n');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(links).then(function() {
            alert('リンクをクリップボードにコピーしました。');
        }, function(err) {
            alert('クリップボードにコピーできませんでした。');
        });
    } else {
        prompt('クリップボードがサポートされていません。以下のリンクを手動でコピーしてください:', links);
    }
})();
