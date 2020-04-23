import React from 'react';

interface IShortcut {
    key: string;
    action: () => void;
}

const useShortcuts = (shortcuts: IShortcut[]) => {

    React.useEffect(() => {
        const registerShortcuts = (event: KeyboardEvent) => {
            if (event.ctrlKey) {
                shortcuts.map(shortcut => {
                    if (event.key === shortcut.key) {
                        event.preventDefault();
                        shortcut.action();
                    }
                })
            }
        }
        document.addEventListener('keydown', registerShortcuts);

        return () => document.removeEventListener('keydown', registerShortcuts)

    }, [shortcuts]);

}

export default useShortcuts;