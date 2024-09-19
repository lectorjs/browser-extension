import browser from 'webextension-polyfill';

const CONTEXT_MENU_ITEMS = [
    {
        id: 'read-selection',
        title: 'Read selection with Lector',
        contexts: ['selection'],
    },
] satisfies browser.Menus.CreateCreatePropertiesType[];

browser.runtime.onInstalled.addListener(() => {
    for (const item of CONTEXT_MENU_ITEMS) {
        browser.contextMenus.create(item);
    }
});
