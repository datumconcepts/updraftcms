import * as React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CodeIcon from "@material-ui/icons/Code";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicsIcon from '@material-ui/icons/FormatItalic';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';


import { IPropertyMap } from "src/Types";

import { convertFromRaw, convertToRaw, DraftBlockType, Editor, EditorState, RichUtils } from 'draft-js';

import 'draft-js/dist/Draft.css'
import StyleButton from '../../HOC/HtmlEditor/StyleButton';

interface IRichTextComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}
interface IRichTextComponentState {
  editorState: EditorState;
  expanded: boolean;
}

const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-one', },
  // { label: 'H2', style: 'header-two' },
  // { label: 'H3', style: 'header-three' },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote', icon: <FormatQuoteIcon /> },
  { label: 'UL', style: 'unordered-list-item', icon: <FormatListBulletedIcon /> },
  { label: 'OL', style: 'ordered-list-item', icon: <FormatListNumberedIcon /> },
  { label: 'Code Block', style: 'code-block', icon: <CodeIcon /> },
];

const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <React.Fragment>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          icon={type.icon}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </React.Fragment>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon /> },
  { label: 'Italic', style: 'ITALIC', icon: <FormatItalicsIcon /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon /> },
];

const InlineStyleControls = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <React.Fragment>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          icon={type.icon}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </React.Fragment>
  );
};



class RichTextComponent extends React.Component<IRichTextComponentProps, IRichTextComponentState> {
  public state = {
    editorState: EditorState.createEmpty(),
    expanded: false
  }
  public componentDidMount() {
    const { propertyMap } = this.props;
    if (propertyMap.defaultValue) {
      const contentState = convertFromRaw(propertyMap.defaultValue);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }
  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  public changeDefaultValue = (editorState: EditorState) => {
    const { propertyMap, onPropertyUpdate } = this.props;
    const contentState = editorState.getCurrentContent();
    this.setState({ editorState }, () => {
      onPropertyUpdate({ ...propertyMap, 'defaultValue': convertToRaw(contentState) });
    });
  };
  public changeValue = (e: any) => {
    const { propertyMap, onPropertyUpdate } = this.props;
    const {
      target: { name, value }
    } = e;
    onPropertyUpdate({ ...propertyMap, [name]: value });
  };

  public onChange = (editorState: EditorState) => this.setState({ editorState });

  public toggleBlockType = (blockType: DraftBlockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  public toggleInlineStyle = (inlineStyle: string) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  public render() {
    const { propertyMap } = this.props;
    const { editorState } = this.state;
    return (
      <Card square={true}>
        <CardActions>
          <div style={{ flex: 1 }} className="editor-container">
            <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
            <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
            <Editor editorState={editorState} onChange={this.changeDefaultValue} />
          </div>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded}>
          <CardActions>
            <Grid container={true} spacing={10}>
              <Grid item={true} xs={true}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth={true}
                  onChange={this.changeValue}
                  value={propertyMap.name}
                />
              </Grid>
              <Grid item={true} xs={true}>
                <TextField
                  label="Id"
                  fullWidth={true}
                  disabled={true}
                  value={propertyMap.id}
                />
              </Grid>
            </Grid>
          </CardActions>
        </Collapse>
      </Card>);
  }
}
export default RichTextComponent;
