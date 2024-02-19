/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/record', 'N/search', 'N/https'], function(serverWidget, record, search, https) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'PandaDoc Integration Configuration'
            });


            var templateDetails = getDataFromPandaDoc('https://api.pandadoc.com/public/v1/templates/id/details')

            // Dropdown to select PandaDoc folder
            var pandaDocFolderField = form.addField({
                id: 'pandadoc_folder',
                type: serverWidget.FieldType.SELECT,
                label: 'PandaDoc Folder'
            });
            // Add options to the PandaDoc folder dropdown
            // Code to populate options...

            var pandaDocFolderList = getDataFromPandaDoc('https://api.pandadoc.com/public/v1/templates/folders')
 
            log.debug("pandaDocFolderList",pandaDocFolderList);


            pandaDocFolderList.forEach(function(obj) {  
                pandaDocFolderField.addSelectOption({
                    value: obj.name,
                    text: obj.name
                });
            });





            // Dropdown to select PandaDoc Template
            var pandaDocTemplateField = form.addField({
                id: 'pandadoc_template',
                type: serverWidget.FieldType.SELECT,
                label: 'PandaDoc Template'
            });

            var pandaDocTemplateList = getDataFromPandaDoc('https://api.pandadoc.com/public/v1/templates')

            pandaDocTemplateList.forEach(function(obj) {
                pandaDocTemplateField.addSelectOption({
                    value: obj.name,
                    text: obj.name
                });
            });





         // Dropdown to select NetSuite record type
        var netsuiteRecordTypeField = form.addField({
            id: 'netsuite_record_type',
            type: serverWidget.FieldType.SELECT,
            label: 'NetSuite Record Type'
        });

        // Fetch NetSuite record types and add them as options to the dropdown
        var recordTypesSearch = search.create({
            type: 'customrecordtype',
            columns: ['name']
        });

        recordTypesSearch.run().each(function(result) {
            var recordTypeName = result.getValue('name');
            netsuiteRecordTypeField.addSelectOption({
                value: recordTypeName,
                text: recordTypeName
            });
            return true;
        });

            // First sublist: Header Fields
            var headerSublist = form.addSublist({
                id: 'header_sublist',
                type: serverWidget.SublistType.LIST,
                label: 'Header Fields'
            });
            headerSublist.addField({
                id: 'checkbox',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Checkbox'
            });
            headerSublist.addField({
                id: 'pandadoc_template_fields',
                type: serverWidget.FieldType.SELECT,
                label: 'PandaDoc Template Fields'
            });
            headerSublist.addField({
                id: 'pandadoc_field_type',
                type: serverWidget.FieldType.TEXT,
                label: 'PandaDoc Field Type'
            });
            headerSublist.addField({
                id: 'netsuite_fields',
                type: serverWidget.FieldType.SELECT,
                label: 'NetSuite Fields'
            });

            // Second sublist: Line Fields
            var lineSublist = form.addSublist({
                id: 'line_sublist',
                type: serverWidget.SublistType.LIST,
                label: 'Line Fields'
            });
            lineSublist.addField({
                id: 'checkbox',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Checkbox'
            });
            lineSublist.addField({
                id: 'pandadoc_template_fields',
                type: serverWidget.FieldType.SELECT,
                label: 'PandaDoc Template Fields'
            });
            lineSublist.addField({
                id: 'pandadoc_field_type',
                type: serverWidget.FieldType.TEXT,
                label: 'PandaDoc Field Type'
            });
            lineSublist.addField({
                id: 'netsuite_fields',
                type: serverWidget.FieldType.SELECT,
                label: 'NetSuite Fields'
            });

            form.addSubmitButton({
                label: 'Submit'
            });

            context.response.writePage(form);
        } else {
            // Code to handle form submission...
        }

        function getDataFromPandaDoc(endPoint)
        {

            var headers = {};
                headers["Authorization"] = "API-Key 5a61b40e748fa9a1be2114f565958d78877abcb4"
                headers["Accept"] = "application/json"

                var getFolders = https.get({
                url: endPoint,
                headers: headers,
                body: {}
                });

                log.debug("check", getFolders.body)
                var folderList = JSON.parse(getFolders.body).results

                return folderList


            
        }


    }

    return {
        onRequest: onRequest
    };

});
