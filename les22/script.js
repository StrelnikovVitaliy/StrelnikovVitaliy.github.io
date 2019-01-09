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

    $rowsAmmount.addEventListener('input', function (e) {
        rowsAmmount = e.target.value;
        pagesCountNumber = getCountPages(rowsAmmount, allRowsTable);
        $pagerInfo.innerText = getDescription(allRowsTable, rowsAmmount, currentPageNumber);
        $pagerList.innerHTML = "";
        $pagerList.append.apply($pagerList, createPagerListContent(currentPageNumber, pagesCountNumber));
        showRows(currentPageNumber, Number(rowsAmmount));
    });

    $pagerNext.setAttribute('href', `#page-${currentPageNumber + 1}`);

    $pagerList.append.apply($pagerList, createPagerListContent(currentPageNumber, pagesCountNumber));// add pager to web with apply method

    function getCountPages(rowsAmmount, allRowsTable) {
        return Math.ceil(allRowsTable / rowsAmmount);

    }

    function getDescription(allRowsTable, rowsAmmount, currentPageNumber) {
        return `Show ${(currentPageNumber - 1) * rowsAmmount + 1} to ${currentPageNumber * rowsAmmount} of ${allRowsTable} rows`;
    }

    function createPagerListItem(content, currentPageNumber) {
        var $pagerListItem = document.createElement('li');
        var $pagerPage = document.createElement('a');

        if (isNaN(content)) {
            $pagerListItem.append(content)
        }
        else {
            $pagerListItem.append($pagerPage); //вложили "а" в "ли" только при условии что это !isNaN
            $pagerListItem.classList.add('pager__list-item'); //add class to pager__list-item
            $pagerPage.classList.add('pager__page');
            $pagerPage.innerText = content;

            if (content !== currentPageNumber) {
                $pagerPage.setAttribute('href', `#page-${content}`);
            }
            else {
                $pagerPage.classList.add('pager__page--current');
            }
        }
        return $pagerListItem;


    }

    function createPagerListContent(currentPageNum, pageCount) {
        const result = [
            createPagerListItem(1, currentPageNum)
        ];
        if (pageCount > 1) {

            if (currentPageNum > 3) {
                result.push(createPagerListItem('...', currentPageNum));
            }
            if (currentPageNum > 2) {
                result.push(createPagerListItem(currentPageNum - 1, currentPageNum));
            }
            if (currentPageNum !== 1 && currentPageNum !== pageCount) {
                result.push(createPagerListItem(currentPageNum, currentPageNum));
            }
            if (currentPageNum + 1 < pageCount) {
                result.push(createPagerListItem(currentPageNum + 1, currentPageNum));
            }
            if (currentPageNum + 2 < pageCount) {
                result.push(createPagerListItem('...', currentPageNum));
            }
            result.push(createPagerListItem(pageCount, currentPageNum));
        }
        return result;
    }

    function showRows(fromRow, toRow) {
        var i;
        var $hiddenElements = document.querySelectorAll(`tbody tr:nth-child(-n+ ${fromRow - 1}), tbody tr:nth-child(n+${toRow + 1})`);
        for (i = 0; i < $hiddenElements.length; i++) {
            $hiddenElements[i].style.display = "none";
        }
        var $shownElements = document.querySelectorAll(`tbody tr:nth-child(n+ ${fromRow}):nth-child(-n+${toRow})`);
        for (i = 0; i < $shownElements.length; i++) {
            $shownElements[i].style.display = "table-row";
        }
    };

    $pagerControls.addEventListener('click', function (e) {
            const $link = e.target.closest('.pager__page, .pager__prev, .pager__next'),
                hrefValue = $link.getAttribute('href');
            if
            (hrefValue) {
                const pageNumRegExp = /#page-(\d+)/i,
                    [, pageNum] = hrefValue.match(pageNumRegExp);

                currentPageNumber = +pageNum;

                $pagerList.innerText = '';
                $pagerInfo.innerText = getDescription(allRowsTable, rowsAmmount, currentPageNumber);

                showRows(currentPageNumber * rowsAmmount - rowsAmmount + 1, rowsAmmount * currentPageNumber);
                $pagerList.append.apply($pagerList, createPagerListContent(currentPageNumber, pagesCountNumber));// add pager to web with apply method

                if (currentPageNumber > 1) {
                    $pagerPrev.setAttribute('href', `#page-${currentPageNumber - 1}`);
                } else {
                    $pagerPrev.removeAttribute('href');
                }

                if (currentPageNumber < pagesCountNumber) {
                    $pagerNext.setAttribute('href', `#page-${currentPageNumber + 1}`);
                } else {
                    $pagerNext.removeAttribute('href');
                }
            }
        }
    );

    showRows(currentPageNumber * rowsAmmount - rowsAmmount + 1, rowsAmmount * currentPageNumber);
}

init();
