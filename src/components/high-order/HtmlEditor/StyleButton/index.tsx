import * as React from 'react';
import { Button } from 'semantic-ui-react';


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
            <Button icon={true} selected={this.props.active} value={this.props.style} onMouseDown={this.onToggle}>
                {this.props.icon ? (this.props.icon) : (this.props.label)}
            </Button>
        );
    }
}