/******************
**** INTERFACE ****
*******************/

interface INavStoreValues {
    currentLinkPos: number | null
    links: string[]
}

/******************
****   UTILS   ****
*******************/

/**
* The function get data from localstorage to use links feture
* @return {INavStoreValues} returns a INavStoreValues from localstorage.
*/
const getDataFromLocalStorage = (): INavStoreValues => {
    const defaultValues = {
        currentLinkPos: null,
        links: []
    };

    const navigationStr = localStorage.getItem('navigation');
    return navigationStr ? JSON.parse(navigationStr) : defaultValues;
};

const saveDataInLocalStorage = (value: INavStoreValues): void => {
    localStorage.setItem('navigation', JSON.stringify(value));
};

const sumPos = (pos: INavStoreValues['currentLinkPos']): INavStoreValues['currentLinkPos'] => {
    if (pos !== null) return pos + 1;
    return 0;
};
const subPos = (pos: INavStoreValues['currentLinkPos']): INavStoreValues['currentLinkPos'] => {
    if (pos !== null && pos > 0) return pos - 1;
    return null;
};
/******************
**** FUNCTIONS ****
*******************/

export const getCurrentLink = (): string => {
    const currentData = getDataFromLocalStorage();
    if (currentData.currentLinkPos !== null) return currentData.links[currentData.currentLinkPos];
    return '';
};

export const addLink = (link: string): void => {
    const data = getDataFromLocalStorage();

    // si es el mismo link no lo agrego.
    if (data.links[data.currentLinkPos ?? 0] === link) return;

    // si se va a agregar un link en una posicion ya ocupada elimino todo el resto de links
    // a partir de esa posicion.

    const nextPos = data.currentLinkPos ? data.currentLinkPos + 1 : 1;
    if (data.links[nextPos]) {
        data.links = data.links.slice(0, nextPos);
    }
    data.links.push(link);
    data.currentLinkPos = sumPos(data.currentLinkPos);
    saveDataInLocalStorage(data);
};

export const moveToNextLink = (): string => {
    const data = getDataFromLocalStorage();
    data.currentLinkPos = sumPos(data.currentLinkPos);
    saveDataInLocalStorage(data);
    return getCurrentLink();
};

export const moveToPrevLink = (): string => {
    const data = getDataFromLocalStorage();
    if (data.links.length < 2) return '';
    // data.links.pop();
    data.currentLinkPos = subPos(data.currentLinkPos);
    saveDataInLocalStorage(data);
    console.log('link: ', getCurrentLink());
    return getCurrentLink();
};

export const isRightLinkEnabled = (): boolean => {
    const data = getDataFromLocalStorage();
    if (data.links.length < 2) return false;
    if (
        data.currentLinkPos !== null &&
        data.currentLinkPos < 10 &&
        !(data.currentLinkPos === data.links.length - 1)
    ) return true;

    return false;
};

export const isLeftLinkEnabled = (): boolean => {
    const data = getDataFromLocalStorage();
    if (data.links.length < 2) return false;
    if (data.currentLinkPos && data.currentLinkPos > 0) return true;

    return false;
};
