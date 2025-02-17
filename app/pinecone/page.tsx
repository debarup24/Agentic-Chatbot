"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Database, LucideLoader2, MoveUp, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const VectorDBpage = (props: Props) => {
   const [isUploading, setIsUploading] = useState(false);
   const [indexName, setIndexName] = useState("");
   const [nameSpace, setNameSpace] = useState("");

   const onStartUpload = async () => {
          try {
            const response = await fetch("api/updatedatabase" , {method:'POST' , body: JSON.stringify({indexName, nameSpace})})
            console.log(response) ;

      //  await processStreamedProgress(response) ;
          } catch (error) {
            console.error("Error fetching data:", error);
          }
         
   }

  return (
     // use 
    <main className='flex flex-col items-center bg-slate-100 p-24'>
        <Card>
            <CardHeader>
                <CardTitle>Update Knowledge Base</CardTitle>
                <CardDescription>Add new documents to your vector DB</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='col-span-2 grid gap-4 border rounded-lg p-6'>
                     <div className='gap-4 relative'>
                        <Button className='absolute -right-4 -top-5' variant={'ghost'} size={"icon"}>
                            <RefreshCcw />
                        </Button>
                        <Label>File List :</Label>
                      <Textarea readOnly className='min-h-24 resize-none p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground'/>
                     </div>

                     <div className='grid grid-cols-2 gap-4'>
                        <div className='grid gap-2'>
                          <Label>Index Name</Label>
                          <Input value={indexName} onChange={(e) => {setIndexName(e.target.value)}} placeholder='index name' disabled={isUploading} className='disabled:cursor-default'/>
                          

                        </div>
                        <div className='grid gap-2'>
                          <Label>Namespace</Label>
                          <Input value={nameSpace} onChange={(e) => {setNameSpace(e.target.value)}} placeholder='namespace' disabled={isUploading} className='disabled:cursor-default'/>
                        </div>
                     </div>
                  </div>
                  <Button onClick={onStartUpload} variant={'outline'} disabled={isUploading} className='w-full h-full' >
                    <span className='flex flex-row gap-2'>
                    <Database size={60} className='stroke-[#fc7b03]' />
                    <MoveUp size={40} className=' stroke-[#fc7b03]'/>
                    </span>
                  </Button>
                </div>
              {isUploading && 
              <div className='mt-4'>
                   <Label>File Name :</Label>
                   <div className='flex flex-row items-center gap-4'>
                    <Progress value={80}></Progress>
                    <LucideLoader2 className='stroke-[#c33303]'/>
                   </div>
                </div> }
             </CardContent>
        </Card>
    </main>
    
  )
}

export default VectorDBpage 