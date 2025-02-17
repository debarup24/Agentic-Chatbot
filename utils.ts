import {Pinecone} from "@pinecone-database/pinecone"
import {Document } from "langchain/document"
import { pipeline} from "@huggingface/transformers";


export async function updateVectorDB(
    client: Pinecone,
    indexName : string,
    nameSpace : string,
    docs: Document[],
    progressCallback: (filename: string, totalChunks: number, chunksUpserted: number, isComplete: boolean) => void
) {
      const modelname = 'mixedbread-ai/mxbai-embed-large-v1'
      const extractor = await pipeline('feature-extraction', modelname, { quantized: false, // error given! 

      })
      console.log(extractor);
}