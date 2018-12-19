//$ с долларом это элемнты которые мы добавляем в ДОМ дерево
// без $ - возвращает значение
function init() {
    var currentPageNumber = 1;
    var $rowsAmmount = document.querySelector('.show__input');
    var rowsAmmount = $rowsAmmount.value;
    var $allRowsTable = document.querySelectorAll('tbody > tr');
    var allRowsTable = $allRowsTable.length;
    var pagesCountNumber = getCountPages(rowsAmmount, allRowsTable);
    var $pager = document.querySelector('.pager');
    var $pagerInfo = document.createElement('div'); //add Tag div
    var $pagerControls = document.createElement('div'); //add Tag div to PagerControls
    var $pagerPrev = document.createElement('a'); //add Tag div to PagerPrev
    var $pagerNext = document.createElement('a'); //add Tag div to PagerNext
    var $pagerList = document.createElement('ul'); //add Tag div to PagerList

    $pagerControls.append($pagerPrev, $pagerList, $pagerNext);
    $pager.append($pagerInfo, $pagerControls);
    $pagerInfo.innerText = getDescription(allRowsTable, rowsAmmount, currentPageNumber);
    $pagerInfo.classList.add('pager__info'); //add class to PagerInfo
    $pagerControls.classList.add('pager__controls'); //add class to pager__controls
    $pagerPrev.classList.add('pager__prev'); //add class to pager__prev
    $pagerNext.classList.add('pager__next'); //add class to pager__next
    $pagerList.classList.add('pager__list'); //add class to pager__list
    $pagerPrev.innerText = 'Previous';
    $pagerNext.innerText = 'Next';

    $pagerNext.setAttribute('href', `#page-${currentPageNumber + 1}`);

    function getCountPages(rowsAmmount, allRowsTable) {
        return Math.ceil(allRowsTable / rowsAmmount);

    }

    function getDescription(allRowsTable, rowsAmmount, currentPageNumber) {
        return `Show ${(currentPageNumber - 1) * rowsAmmount + 1} to ${currentPageNumber * rowsAmmount} of ${allRowsTable} rows`;
    }

    function createPagerListItem(pageNumber, currentPageNumber) {
        var $pagerListItem = document.createElement('li');
        var $pagerPage = document.createElement('a');
        $pagerListItem.classList.add('pager__list-item'); //add class to pager__list-item
        $pagerListItem.append($pagerPage); //вложили "а" в "ли"
        $pagerPage.classList.add('pager__page');
        $pagerPage.innerText = pageNumber;
        if (pageNumber !== currentPageNumber) {
            $pagerPage.setAttribute('href', `#page-${pageNumber}`);
        }
        else {
            $pagerPage.classList.add('pager__page--current');
        }
        return $pagerListItem;


    }
    function createPagerListContent() {
        
    }

}

init();