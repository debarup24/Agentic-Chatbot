import {Pinecone} from "@pinecone-database/pinecone"
import {Document } from "langchain/document"
import { FeatureExtractionPipeline, pipeline} from "@xenova/transformers";


export async function updateVectorDB(
    client: Pinecone,
    indexName : string,
    nameSpace : string,
    docs: Document[],
    progressCallback: (filename: string, totalChunks: number, chunksUpserted: number, isComplete: boolean) => void
) {
      const modelname = 'mixedbread-ai/mxbai-embed-large-v1'
      const extractor = await pipeline('feature-extraction', modelname, { quantized: false
      })
      console.log(extractor);

      for(const doc of docs) {
        await processDocument(client, indexName, nameSpace, doc, extractor)
      }
}

function processDocument(client: Pinecone, indexName: string, nameSpace: string, doc: Document<Record<string, any>>, extractor: FeatureExtractionPipeline) {
  // console.log(doc)
}
