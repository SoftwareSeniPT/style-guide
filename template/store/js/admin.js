var storeAdmin = {
    init: function() {

		storeAdmin.secondImage();

	},

	secondImage: function(){

        // Cache vars to stay in scope
        var frame;
        var $metaBox = jQuery('.custom-image-uploader');
        var $addImgLink = $metaBox.find('.upload-custom-image');
        var $delImgLink = $metaBox.find('.delete-custom-image');
        var $imgContainer = $metaBox.find('.custom-image-container');
        var $imgIdInput = $metaBox.find('.custom-image-id');

        // ADD IMAGE LINK
        $addImgLink.on( 'click', function(e){
        
            e.preventDefault();
            
            // If the media frame already exists, reopen it.
            if ( frame ) {
                frame.open();
                return;
            }

            // Create a new media frame
            frame = wp.media({
                title: 'Select image to use',
                button: {
                    text: 'Use this image'
                },
                multiple: false  // Set to true to allow multiple files to be selected
            });

            // What to do when image is selected in the media frame, and the save button is clicked
            frame.on('select', function() {

                  // Get media attachment details from the frame state
                  var attachment = frame.state().get('selection').first().toJSON();

                  // Send the attachment URL to our custom image input field.
                  $imgContainer.append('<img src="'+attachment.url+'"/>');

                  // Send the attachment id to our hidden input
                  $imgIdInput.val(attachment.id);

                  // Hide the add image link
                  $addImgLink.addClass('hidden');

                  // Unhide the remove image link
                  $delImgLink.removeClass('hidden');
            });

            // Finally, open the modal on click
            frame.open();
        });


        // DELETE IMAGE LINK
        $delImgLink.on('click', function(e){

            e.preventDefault();

            // Clear out the preview image
            $imgContainer.html('');

            // Un-hide the add image link
            $addImgLink.removeClass('hidden');

            // Hide the delete image link
            $delImgLink.addClass('hidden');

            // Delete the image id from the hidden input
            $imgIdInput.val('');

        });

	}

};
jQuery(document).ready(function($){

	storeAdmin.init();

});