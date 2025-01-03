//TamperMonkeyでいいねした数をlocalStorageの[rakuten_click_count]に入れている
//それをクリアするブックマークレット
javascript: (function() {
    localStorage.setItem('rakuten_click_count', '0');
    alert('rakuten_click_count has been reset to 0');
})();
