export const storageChecker = id => {
    if(localStorage.getItem(id)) return true;
    else return false;
}