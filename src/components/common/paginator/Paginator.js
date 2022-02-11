import React, { useState } from 'react';
import s from './paginator.module.scss';
import cn from 'classnames';

let Paginator = ({ totalItemsCount, portionSize = 25, ...props }) => {
    let pagesCount = Math.ceil(totalItemsCount / props.pageSize);

    let pages = [];
    for (let index = 1; index <= pagesCount; index++) {
        pages.push(index);

    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    if (totalItemsCount <= props.pageSize) {
        return <></>
    }

    return (
        <div className={s.usersPaginator}>

            {portionNumber > 1 &&
                <button className={s.selectPagesButton} onClick={() => { setPortionNumber(portionNumber - 1) }}>Left</button>}
            
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) => {
                    return <div className={cn({ [s.selectedPage]: props.currentPage === p }, s.pageBox)} key={index} onClick={() => { props.onPageChanged(p) }}>
                        <span className={s.pageNumber}>{p}</span>
                    </div>
                })}
            
            {portionCount > portionNumber &&
                <button className={s.selectPagesButton} onClick={() => { setPortionNumber(portionNumber + 1) }}>Right</button>}
        
        </div>
    );
}

export default Paginator