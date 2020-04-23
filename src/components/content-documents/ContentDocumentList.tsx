import * as React from "react";
import { useHistory, useParams } from "react-router";
import { Card } from 'semantic-ui-react';

import { IContentDocument, } from "models";

import AppContent from "components/high-order/AppContent";
import EmptyListDisplay from "components/high-order/EmptyListDisplay";
import DisplayCard from "components/high-order/DisplayCard";



interface IRouteParams {
  objectModelId?: string;
}

interface IContentDocumentListProps {
  contentDocuments: IContentDocument[];
  addContentDocument: () => void;
}
const ContentDocumentList: React.FC<IContentDocumentListProps> = ({ contentDocuments, addContentDocument }) => {

  const { objectModelId } = useParams<IRouteParams>();
  const history = useHistory();

  const editContentDocument = React.useCallback(({ id }: IContentDocument) => {
    history.push(objectModelId ? `/${objectModelId}/content/${id}/edit` : `/content/${id}/edit`);
  }, [history, objectModelId]);


  return (<AppContent>
    {contentDocuments.length === 0 ? (
      <EmptyListDisplay
        clickHandler={addContentDocument}
        title="It looks like you have no content yet. Click here to add a new document"
      />
    ) : (
        <Card.Group>
          {([] as IContentDocument[])
            .concat(contentDocuments)
            .map((contentDocument, contentDocumentIndex) => (
              <DisplayCard key={`content_document_${contentDocumentIndex}`}
                title={contentDocument.name}
                subHeader={contentDocument.id}
                clickAction={() => editContentDocument(contentDocument)}

              />
            ))
          }
        </Card.Group>
      )}
  </AppContent>);
}

export default ContentDocumentList;
