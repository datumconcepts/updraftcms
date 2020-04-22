import * as React from "react";


import { IDocumentProperty } from "Types";

import { convertFromRaw, convertToRaw, DraftBlockType, Editor, EditorState, RichUtils } from 'draft-js';

import 'draft-js/dist/Draft.css'
import StyleButton from 'Presentation/HOC/HtmlEditor/StyleButton';
import { Icon, Grid, Card } from 'semantic-ui-react';

interface IRichTextComponentProps {
  documentProperty: IDocumentProperty;
  onPropertyUpdate: (documentProperty: IDocumentProperty) => void;
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
  { label: 'Blockquote', style: 'blockquote', icon: <Icon name="quote left" /> },
  { label: 'UL', style: 'unordered-list-item', icon: <Icon name="unordered list" /> },
  { label: 'OL', style: 'ordered-list-item', icon: <Icon name="ordered list" /> },
  { label: 'Code Block', style: 'code-block', icon: <Icon name="code" /> },
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
  { label: 'Bold', style: 'BOLD', icon: <Icon name="bold" /> },
  { label: 'Italic', style: 'ITALIC', icon: <Icon name="italic" /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <Icon name="underline" /> },
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
    const { documentProperty } = this.props;
    if (documentProperty.value) {
      const contentState = convertFromRaw(documentProperty.value);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }
  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  public changeValue = (editorState: EditorState) => {
    const { documentProperty, onPropertyUpdate } = this.props;
    const contentState = editorState.getCurrentContent();
    this.setState({ editorState }, () => {
      onPropertyUpdate({ ...documentProperty, 'value': convertToRaw(contentState) });
    });
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
    const { editorState } = this.state;
    return (
      <Grid item={true}>
        <Card square={true}>
          <Card.Content>
            <div style={{ flex: 1 }} className="editor-container">
              <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
              <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
              <Editor editorState={editorState} onChange={this.changeValue} />
            </div>
          </Card.Content>
        </Card>
      </Grid>);
  }
}
export default RichTextComponent;
