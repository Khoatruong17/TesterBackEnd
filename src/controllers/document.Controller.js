const express = require('express');
const Documents = require('../models/documentModel');

const documentController = {
    //create document
    createDocument: async (req, res) => {
        
        try {
            console.log(req.body);
            const newDocument = await new Documents({
               
                document: req.body.document,
            });
             console.log(req.body);
            const document = await newDocument.save();
            console.log("Add document Successfully");
            res.status(200).json(document);
              console.log(req.body);
        } catch (error) {
            console.log("Error create document: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllDocument: async(req, res) =>{
        try{
            const document = await Documents.find();
            res.status(200).json(document);
            console.log("Get all documents successfully");
        }catch(error){
            console.log("Error get all documents: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a document
    deleteDocument: async (req, res) => {
        try {
            const document = await Documents.findByIdAndDelete(req.params.id);
            if (!document) {
                return res.status(404).json({ message: "Document not found" });
            }
            res.status(200).json({ message: "Document deleted successfully" }); 
            console.log(`Delete document successfully`);
        } catch (error) {
            console.log("Error deleting document: " + error);
            res.status(500).json({ error: error.message });
        }
    },

    // Update a document
    updateDocument: async (req, res) => {
        try {
            const updatedDocument = req.body.document;
            const document = await Documents.findByIdAndUpdate(req.params.id, { document: updatedDocument }, { new: true });
            if (!document) {
                return res.status(404).json({ message: "Cannot find document" });
            }
            res.status(200).json(document);
            console.log(`Update document successfully`);
        } catch (error) {
            console.log("Error updating document: " + error);
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = documentController;