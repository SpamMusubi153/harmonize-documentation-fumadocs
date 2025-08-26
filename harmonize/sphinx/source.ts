function createJSONSource(allJSONDocs, allMeta){

    // TODO: Handle Cases where metadata already exists for a file.
    
    let virtualJSONFiles = allJSONDocs.map(currentFile => {

        const currentFilePath = currentFile.current_page_name + ".fjson";

        // Discern information about the current file's path.
        const splitFilePath = currentFile.current_page_name.split("/");
        const currentFileName = splitFilePath.at(-1) + ".fjson";
        let directory;
        const currentWebPath = splitFilePath.at(-1);

        // If the split path length is greater than one, then the file is inside one or more subdirectories.
        if (splitFilePath.length > 1){
            directory = splitFilePath.slice(0, splitFilePath.length - 1).join("/")
        }
        // Otherwise, the file is not in a any subdirectories.
        else {
            directory = "."
        }

        let newObject = {
            // Retain all existing properties of the file object.
            // ...currentFile,
            // path: `pythonAPI/${currentFile.path}`,

            type: "page",
            
            data: {
            // ...currentFile.data,
            // url: `pythonAPI/${currentFile.path}`

            title: currentFile.title, // ("name")
            url: currentFilePath,
            body: currentFile.body,

            prev: currentFile.prev,
            next: currentFile.next,
            toc: currentFile.toc,

            // ...currentFile

            // Automatically Generated Metadata Format
            // _meta: {
            //     filePath: currentFilePath,
            //     fileName: currentFileName,
            //     directory: directory,
            //     extension: "json",
            //     path: currentWebPath,
            // },

            },

            path: currentFilePath,

        }

        // console.log(newObject.data._meta)
        
        return newObject;

    })

    return virtualJSONFiles;

}

export { createJSONSource };