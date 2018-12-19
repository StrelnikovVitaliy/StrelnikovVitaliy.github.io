function init() {
    var currentPageNumber = 1;
    var $rowsAmmount = document.querySelector('.show__input');
    var rowsAmmount = $rowsAmmount.value;
    var $allRowsTable = document.querySelectorAll('tbody > tr');
    var allRowsTable = $allRowsTable.length;
    var pagesCountNumber = getCountPages(rowsAmmount, allRowsTable);
    var $pagerInfo = document.createElement('div'); //add Tag div
    var $pager = document.querySelector('.pager');
    $pager.prepend($pagerInfo);
    $pagerInfo.innerText = getDescription(allRowsTable, rowsAmmount, currentPageNumber);
    $pagerInfo.classList.add('pager__info'); //add class to PagerInfo

    function getCountPages(rowsAmmount, allRowsTable) {
        return Math.ceil(allRowsTable / rowsAmmount);

    }

    function getDescription(allRowsTable, rowsAmmount, currentPageNumber) {
        return `Show ${(currentPageNumber - 1) * rowsAmmount + 1} to ${currentPageNumber * rowsAmmount} of ${allRowsTable} rows`;
    }


}

init();