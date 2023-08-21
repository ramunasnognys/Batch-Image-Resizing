//
// 🚀━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━📸
//         Script for BATCH IMAGE RESIZING
//         and EXPORTING in Adobe Photoshop
//              By Ramunas Nognys
//              Date: 21-08-2023
// 🚀━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━📸
//

// Set the target size and resolution
var targetWidth = 2790; // Width in pixels
var targetHeight = 2460; // Height in pixels
var targetResolution = 300; // Resolution in PPI

// Set the resampling method
var resampleMethod = ResampleMethod.BICUBIC;

// Get the folder containing the images to resize
var folder = Folder.selectDialog("Select the folder containing the images");

// Check if a folder is selected
if (folder) {
  // Create a new folder to store the resized images
  var exportFolder = new Folder(folder.fullName + "/Exports/");
  exportFolder.create();

  // Get all the files inside the selected folder
  var files = folder.getFiles();

  // Loop through each file in the folder
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Check if the file is an image
    if (
      file instanceof File &&
      file.name.match(/\.(png|jpg|jpeg|gif|tif|tiff|psd)$/i)
    ) {
      // Open the file
      var doc = app.open(file);

      // Set the ruler units to pixels
      app.preferences.rulerUnits = Units.PIXELS;

      // Resize the document
      doc.resizeImage(
        UnitValue(targetWidth, "px"),
        UnitValue(targetHeight, "px"),
        targetResolution,
        resampleMethod
      );

      // Save the resized image as PNG format in the export folder
      var fileName = file.name.substr(0, file.name.lastIndexOf("."));
      var saveFile = new File(
        exportFolder.fullName + "/" + fileName + "_resized.png"
      );
      doc.saveAs(saveFile, new PNGSaveOptions(), true, Extension.LOWERCASE);

      // Close the document without saving changes
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }
  }

  // Display a success message
  alert("Image resizing and export complete!", "", false);
} else {
  // No folder selected, display an error message
  alert("No folder selected", "", false);
}
