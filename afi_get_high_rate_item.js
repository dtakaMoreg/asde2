//楽天アフィリエイトの高利率ページからURLを取得するブックマークレット
javascript:(function() {
    // リンクを取得してセットに追加し、重複を除去
    let links;
    if (window.location.href.startsWith('https://search.rakuten.co.jp/')) {
        links = [...new Set(
            [...document.querySelectorAll('a[class*="image-link-wrapper"]')]
            .map(a => a.href)
        )].join('\n');
    } else if (window.location.href.startsWith('https://affiliate.rakuten.co.jp/')) {
        links = [...new Set(
            [...document.querySelectorAll('.raf-product__textBox a')]
            .map(a => a.href)
            .filter(href => href.startsWith('https://item.rakuten.co.jp/'))
        )].join('\n');
    } else {
        links = 'No matching URL pattern.';
    }
    
        
    // 共有機能をサポートしているか確認
    if (navigator.share) {
        // 共有を実行
        navigator.share({
            title: '楽天商品リンク',
            text: links
        }).then(() => {
            alert('リンクを共有しました。');
        }).catch((error) => {
            console.error('共有に失敗しました', error);
        });
    } else {
        alert('このブラウザは共有機能をサポートしていません。');
    }
})();
