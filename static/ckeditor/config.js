/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.toolbar = 'Basic';
	config.toolbar_Basic = [
		// ['Source','-','Save','NewPage','Preview','-','Templates'],
    //    ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
	   ['Cut','Copy','Paste','PasteText','PasteFromWord'],
	   ['Styles','Format','Font','FontSize'],
        ['TextColor','BGColor'],
    //    ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
    //    ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
       '/',
       ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
        ['NumberedList','BulletedList','-','Outdent','Indent'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['Link','Unlink','Anchor'],
    //    ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
       ['Image','Table']
	];
	config.cloudServices_tokenUrl = 'http://api.neworldxo.com/file/imageUpload'
	config.filebrowserImageUploadUrl = 'http://api.neworldxo.com/file/imageUpload'
	config.extraPlugins = 'easyimage'
	config.removePlugins = 'image'
};
