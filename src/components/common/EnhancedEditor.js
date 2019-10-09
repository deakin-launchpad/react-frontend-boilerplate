import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { APIKeys } from 'configurations';

/**
 * Created by Sanchit Dang.
 * This Editor is a wrapper on TinyMCE-React (https://github.com/tinymce/tinymce-react)
 * Use apiKeys from configurations to change apiKey
*/
export const EnhancedEditor = (props) => {
  const [_content, _setContent] = useState('');
  const [editorID, setEditorID] = useState();
  const setContent = (data) => {
    _setContent(data);
    if (props.getContent)
      if (typeof props.getContent === 'function')
        props.getContent(data);
  };
  useEffect(() => {
    setEditorID();
  }, []);
  useEffect(() => {
    if (props.content)
      _setContent(String(props.content));
    if (props.id)
      setEditorID(String(props.id));
  }, [props]);
  let editor = (<Editor
    apiKey={APIKeys.tinyMCE}
    initialValue={_content}
    id={editorID}

    init={{
      height: 500,
      plugins: [
        'advlist autolink lists link image imagetools charmap print hr preview anchor',
        'searchreplace visualblocks visualchars nonbreaking code fullscreen',
        'insertdatetime table media directionality emoticons paste code wordcount save'
      ],
      removed_menuitems: 'newdocument wordcount',
      content_css: ['//fonts.googleapis.com/css?family=Lato:300,300i,400,400i'],
      image_advtab: true,
      toolbar1: 'bold italic underline| fontsizeselect formatselect | bullist numlist |  alignleft aligncenter alignright alignjustify  | ',
      toolbar2: 'link image media | forecolor backcolor | outdent indent |'
    }}
    onChange={(e) => setContent(e.target.getContent())}
  />
  );

  return editor;
};

EnhancedEditor.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node,
  getContent: PropTypes.func
};
