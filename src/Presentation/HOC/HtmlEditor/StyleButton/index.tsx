import * as React from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';

export interface IStyleButtonProps {
    style: string;
    icon?: any;
    label: string;
    active: boolean;
    onToggle: (style: string) => void;
}

export default class StyleButton extends React.Component<IStyleButtonProps> {
    public onToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        this.props.onToggle(this.props.style);
    };

    public render() {
    

        return (
            <ToggleButton selected={this.props.active} value={this.props.style} onMouseDown={this.onToggle}>
                {this.props.icon ? (this.props.icon) : (this.props.label)}
            </ToggleButton>
        );
    }
}