function createJSONSource(allJSONDocs: any, allMeta: any){

    // TODO: Handle Cases where metadata already exists for a file.
    
    let virtualJSONFiles = allJSONDocs.map((currentFile: any) => {

        let newObject = {
            // Retain all existing properties of the file object.
            // ...currentFile,
            // path: `pythonAPI/${currentFile.path}`,

            type: "page",
            
            data: {

                title: currentFile.title,
                description: currentFile.description,
                body: currentFile.body,
                content: currentFile.body,

                htmltoc: currentFile.htmltoc,

                _meta: currentFile._meta,

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

            path: currentFile._meta.filePath,

        }
        
        return newObject;

    })

    return virtualJSONFiles;

}

export { createJSONSource };