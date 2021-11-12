import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { APIKeys } from 'constants/index';

/**
 * Created by Sanchit Dang.
 * This Editor is a wrapper on TinyMCE-React (https://github.com/tinymce/tinymce-react)
 * Use apiKeys from constants to change apiKey
*/
export const EnhancedEditor = (props) => {
  const [_content, _setContent] = useState('');
  const [editorID, setEditorID] = useState();
  const [menuBar, setMenuBar] = useState(true);
  const [height, setHeight] = useState(500);
  const [toolbar1, setToolbar1] = useState('bold italic underline| fontsizeselect formatselect | bullist numlist |  alignleft aligncenter alignright alignjustify');
  const [toolbar2, setToolbar2] = useState('link image media | forecolor backcolor | outdent indent');
  const [removed_menuitems, setRemoved_menuitems] = useState('newdocument wordcount');
  const plugins = [
    'advlist autolink lists link image imagetools charmap print hr preview anchor',
    'searchreplace visualblocks visualchars nonbreaking code fullscreen',
    'insertdatetime table media directionality emoticons paste code wordcount save'
  ];
  const content_css = ['//fonts.googleapis.com/css?family=Lato:300,300i,400,400i'];
  const setContent = (data) => {
    _setContent(data);
    if (props.getContent)
      if (typeof props.getContent === 'function')
        props.getContent(data);
  };
  useEffect(() => {
    if (props.content)
      _setContent(String(props.content));
    if (props.id)
      setEditorID(String(props.id));
    if (props.options) {
      if (props.options.menuBar !== undefined)
        setMenuBar(props.options.menuBar);
      if (props.options.height !== undefined && props.options.height !== null)
        setHeight(props.options.height);
      if (props.options.toolbar1 !== undefined)
        setToolbar1(props.options.toolbar1);
      if (props.options.toolbar2 !== undefined)
        setToolbar2(props.options.toolbar2);
      if (props.options.removedMenuItems !== undefined)
        setRemoved_menuitems(props.options.removedMenuItems);
    }
  }, [props]);

  let initObj = {
    height, plugins, removed_menuitems, content_css, image_advtab: true, toolbar1, toolbar2,
    file_picker_types: 'file image media', images_reuse_filename: true,
    file_picker_callback: props.imageUpload === undefined ? null : (callback) => {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', typeof props.imageUpload.fileTypes === 'string' ? props.imageUpload.fileTypes : '*');
      input.onchange = function () {
        if (props.imageUpload.function instanceof Function) {
          props.imageUpload.function(this.files, (responseImageLink, title) => {
            callback(responseImageLink, { title: title ? title : Math.random() });
          });
        }
      };
      input.click();
    }
  };

  if (!menuBar) Object.assign(initObj, { menubar: false });
  let editor = (<Editor
    apiKey={APIKeys.tinyMCE.key}
    initialValue={_content}
    id={editorID}
    init={initObj}
    onChange={(e) => setContent(e.target.getContent())}
  />
  );
  return editor;
};

EnhancedEditor.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node,
  getContent: PropTypes.func,
  options: PropTypes.shape({
    menuBar: PropTypes.bool,
    toolbar1: PropTypes.string,
    toolbar2: PropTypes.string,
    removedMenuItems: PropTypes.string,
    height: PropTypes.number
  }),
  imageUpload: PropTypes.shape({
    function: PropTypes.func,
    fileTypes: PropTypes.string
  })
};
