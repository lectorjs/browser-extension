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

browser.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'read-selection') {
        handleReadSelection(info.selectionText as string);
    }
});

function handleReadSelection(selectedText: string) {
    browser.windows
        .create({
            url: browser.runtime.getURL('reader.html'),
            type: 'popup',
            width: 800,
            height: 600,
        })
        .then((window) => {
            const tabId = window.tabs?.[0].id;
            if (!tabId) {
                return;
            }

            browser.tabs.onUpdated.addListener(function listener(id, info) {
                if (id === tabId && info.status === 'complete') {
                    browser.tabs.onUpdated.removeListener(listener);

                    browser.tabs.sendMessage(tabId, {
                        type: 'read-selection',
                        message: selectedText,
                    });
                }
            });
        });
}
