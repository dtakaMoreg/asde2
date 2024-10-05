javascript:(function() {
    // 定数の設定
    const targetUrl = "https://room.rakuten.co.jp/room_f45d756af1/items";
    const localStorageKeyCount = "local_storage_click_count";
    const localStorageKeyUrls = "local_storage_save_urls";
  
    // 現在のURLが対象URLであるか確認
    if (window.location.href === targetUrl) {
      // local_storage_click_countの取得、存在しない場合は0に設定
      let clickCount = parseInt(localStorage.getItem(localStorageKeyCount)) || 0;

      // clickCount個目のelements_aが存在するか確認
      function clickElementIfExists() {
        
        // elements_aとelements_bを取得
        const divs = document.querySelectorAll('div[class*="masonry-grid-column"]');
        let elements_a = [];
        let elements_b = [];
    
        if (divs[0]) {
          const links_a = divs[0].querySelectorAll('a[class*="link-image"]');
          links_a.forEach(link => elements_a.push(link));
        }
    
        if (divs[1]) {
          const links_b = divs[1].querySelectorAll('a[class*="link-image"]');
          links_b.forEach(link => elements_b.push(link));
        }

        if (clickCount < elements_b.length) {
          // elements_a[clickCount]が存在する場合はクリック
          elements_b[clickCount].click();
  
          // local_storage_click_countをインクリメントして保存
          clickCount++;
          localStorage.setItem(localStorageKeyCount, clickCount);
        } else {
          // elements_aが足りない場合はスクロールして再チェック
          window.scrollBy(0, 1000); // スクロールダウン
          setTimeout(clickElementIfExists, 1000); // 再試行
        }
      }
  
      // 初回のチェックを開始
      clickElementIfExists();
  
    } else {
      // 対象外のURLの場合、local_storage_save_urlsに保存し、前のページに戻る
      let savedUrls = JSON.parse(localStorage.getItem(localStorageKeyUrls)) || [];
      savedUrls.push(window.location.href);
      localStorage.setItem(localStorageKeyUrls, JSON.stringify(savedUrls));
  
      // 前のページに戻る
      window.history.back();
    }
  })();
  