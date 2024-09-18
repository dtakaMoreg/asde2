javascript:(async function() {
    // クリップボードの内容を取得
    const clipboardText = await navigator.clipboard.readText();
  
    // すべての<div class="collection-name ng-binding"></div>要素を取得
    const elements = document.querySelectorAll('div.collection-name.ng-binding');
  
    // 一致する要素を探し、その親の親をクリック
    for (const element of elements) {
      if (element.innerText === clipboardText) {
        const parentDiv = element.closest('div').parentElement;
        if (parentDiv) {
          parentDiv.click();
          break; // ここでループを終了
        }
      }
    }
    
  })();
  