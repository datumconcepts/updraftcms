import * as React from "react";

import { Confirm } from "semantic-ui-react";

export interface IConfirmDialogProps {
    message: string;
    cancelAction: () => void;
    confirmAction: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({ message, cancelAction, confirmAction, confirmText, cancelText }) => {
    return (
        <Confirm
            open={true}
            content={message}
            onCancel={cancelAction}
            onConfirm={confirmAction}
            confirmButton={confirmText}
            cancelButton={cancelText}
            size="mini"

        />
    );
}
export default ConfirmDialog;