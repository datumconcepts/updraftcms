import * as React from "react";
import { Icon, Card, Button, Grid, Form, Checkbox } from "semantic-ui-react";

import {
  convertFromRaw,
  convertToRaw,
  DraftBlockType,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";

import { IPropertyMap } from "models";

import ModalDialog from "components/high-order/modal-dialog/index";

import "draft-js/dist/Draft.css";
import StyleButton from "components/high-order/HtmlEditor/StyleButton";

interface IRichTextComponentProps {
  propertyMap: IPropertyMap;
  onPropertyUpdate: (propertyMap: IPropertyMap) => void;
}

const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-one', },
  // { label: 'H2', style: 'header-two' },
  // { label: 'H3', style: 'header-three' },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  {
    label: "Blockquote",
    style: "blockquote",
    icon: <Icon name="quote left" />,
  },
  {
    label: "UL",
    style: "unordered-list-item",
    icon: <Icon name="unordered list" />,
  },
  {
    label: "OL",
    style: "ordered-list-item",
    icon: <Icon name="ordered list" />,
  },
  { label: "Code Block", style: "code-block", icon: <Icon name="code" /> },
];

const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <Button.Group>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          icon={type.icon}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </Button.Group>
  );
};

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: <Icon name="bold" /> },
  { label: "Italic", style: "ITALIC", icon: <Icon name="italic" /> },
  { label: "Underline", style: "UNDERLINE", icon: <Icon name="underline" /> },
];

const InlineStyleControls = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <Button.Group>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          icon={type.icon}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </Button.Group>
  );
};

const RichTextComponent: React.FC<IRichTextComponentProps> = ({
  propertyMap,
  onPropertyUpdate,
}) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [expanded, setExpanded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [obj, setObj] = React.useState<IPropertyMap>({
    ...propertyMap,
    name: propertyMap.name,
    required: propertyMap.required,
  });

  React.useEffect(() => {
    if (propertyMap.defaultValue) {
      const contentState = convertFromRaw(propertyMap.defaultValue);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [propertyMap]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const changeDefaultValue = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    // this.setState({ editorState }, () => {
    //   onPropertyUpdate({ ...propertyMap, 'defaultValue': convertToRaw(contentState) });
    // });
  };

  const onChange = (editorState: EditorState) => setEditorState(editorState);
  const toggleBlockType = (blockType: DraftBlockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const editButtonHandler = React.useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const handleCancel = React.useCallback(() => {
    setModalOpen(false);
    setObj({ ...obj, name: propertyMap.name });
    setObj({ ...obj, required: propertyMap.required });
  }, [setModalOpen, setObj, obj, propertyMap]);

  const handleConfirm = React.useCallback(() => {
    onPropertyUpdate({
      ...propertyMap,
      name: obj.name,
      required: obj.required ?? false,
    });
    setModalOpen(false);
  }, [onPropertyUpdate, propertyMap, obj, setModalOpen]);

  return (
    <>
      <ModalDialog
        modalOpen={modalOpen}
        header="Element Options"
        cancelAction={handleCancel}
        confirmAction={handleConfirm}
        confirmText="Update"
        cancelText="Cancel"
      >
        <Form.Input
          label="Name"
          name="name"
          value={obj.name}
          onChange={(e, { value }) =>
            setObj({ ...obj, name: value })
          }
        />
        <Checkbox
          label="Required"
          onChange={(e, { checked }) => setObj({ ...obj, required: checked! })}
          checked={obj.required}
        />
      </ModalDialog>
      <Card fluid={true}>
        <Card.Content>
          <Card.Header onClick={handleExpandClick}>
            <Grid columns="equal">
              <Grid.Column>{propertyMap.name}</Grid.Column>
              <Grid.Column style={{ flex: "0 0 auto", width: "auto" }}>
                <Icon
                  style={{ cursor: "pointer" }}
                  name="edit outline"
                  color="blue"
                  onClick={editButtonHandler}
                />
              </Grid.Column>
            </Grid>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <div style={{ flex: 1 }} className="editor-container">
            <BlockStyleControls
              editorState={editorState}
              onToggle={toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={toggleInlineStyle}
            />
            <Editor editorState={editorState} onChange={changeDefaultValue} />
          </div>
        </Card.Content>
      </Card>
    </>
  );
};
export default RichTextComponent;
