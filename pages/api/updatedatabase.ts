import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { NextApiRequest, NextApiResponse } from "next";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {Pinecone} from "@pinecone-database/pinecone"
import { updateVectorDB } from "@/utils";


export default async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'POST') {
      const {indexName, nameSpace} = JSON.parse(req.body)
      await handleUpload(indexName, nameSpace, res) ;
    }
}

async function handleUpload(indexName: string, nameSpace: string, res: NextApiResponse) {

    // use langchain here
    const loader = new DirectoryLoader('./documents' , {'.pdf' : (path: string) => new PDFLoader(path, {splitPages: false}) ,
      '.txt' : (path: string) => new PDFLoader(path)  
     }) ;

     const docs =await loader.load() ;

     const client = new Pinecone ({
        apiKey: process.env.PINECONE_API_KEY!
     })
     await updateVectorDB(client, indexName, nameSpace, docs, (filename, totalChunks, chunkUpserted, isComplete) => {
        
        if(!isComplete) {
            res.write(
                JSON.stringify({
                    filename,
                    totalChunks,
                    chunkUpserted,
                    isComplete
                })
            )
        } else {
            res.end()
        }
     })
}
