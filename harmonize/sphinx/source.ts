
// Here we create a "source" of JSON files in the Fumadocs-expected format.
// This allows Fumadocs to know about our pages and handle them just like it can handle Markdown files.
function createJSONSource(allJSONDocs: any, allMeta: any){

    // TODO: Handle Cases where metadata already exists for a file.
    
    let virtualJSONFiles = allJSONDocs.map((currentFile: any) => {

        // Emulate the Fumadocs-expected format.
        let newObject = {

            // In case we need to retain all existing properties of the file object:
            // ...currentFile,

            type: "page",
            
            data: {

                title: currentFile.title,
                description: currentFile.description,
                body: currentFile.body,
                content: currentFile.body,

                toc: currentFile.toc,
                htmltoc: currentFile.htmltoc,

                _meta: currentFile._meta,

                structuredData: currentFile.structuredData,


                // For future reference, here are the expected format of Fumadocs "structuredData" and "_meta":

                // structuredData: {
                //     contents: [
                //         {
                //             heading: "",
                //             content: currentFile.body,
                //         }
                //     ],
                //     // Each heaing is in a dictionary in the list with a-unique-id "id" and title "content".
                //     headings: [ {} ],
                // }

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