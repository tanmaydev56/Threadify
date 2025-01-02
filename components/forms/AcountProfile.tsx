"use client"

import React, { ChangeEvent } from 'react'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { userValidation } from '@/lib/validations/user'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'

// we will create an interface hamesha jabh bhi props ka type define krna hai
interface Props {
    user:{
    id:string,
    objectId:string,
    name: string,
    username: string,
    bio: string,
    image: string
    }
    btnTitle:string,
}


const AcountProfile = ({user,btnTitle}:Props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  
  // File[] yeh array hamesha files ka type hoga
  
  // arrray of files
  const startUpload = useUploadThing("media");
  const form = useForm({
    resolver: zodResolver(userValidation),
    // in this we will pass the validation 
    // and woh validation lib me hogi
    // we will use ZOD
    // zod will help use to create schema for our form
    defaultValues: {
      profile_photo:  user?.image || "",
      name:  user?.name || "",
      username:  user?.username || "",
      bio:  user?.bio || "",
    }
  });

  // understand this function
  const handleImage = (e:ChangeEvent<HTMLInputElement>,feildChange:(value:string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if(!file.type.includes('image')) return;
      fileReader.onload = async (event) => {
        const imageDataURL = event.target?.result?.toString() || '';
        feildChange(imageDataURL);
      }
      fileReader.readAsDataURL(file);
    }
   

  }
  const onSubmit = async (values: z.infer<typeof userValidation>) => {
   const blob  = values.profile_photo;
   const hasImgchanged = isBase64Image(blob);
   if(hasImgchanged){
    const imgRes = await startUpload(files);
    if(imgRes && imgRes[0].fileUrl){
      values.profile_photo = imgRes[0].fileUrl;
      // const res = await api.updateProfile(values);
     
    
      }
    
   }
   // if image has changed then we will upload it
   // if image has not changed then we will not upload it
   // we will use useUploadThing hook to upload the image
   
    const formData = new FormData();
  }
  return (
    <Form {...form}>
    <form 
    // onSubmit={form.handleSubmit(onSubmit)}
     className="flex flex-col justify-start gap-10">
      <FormField control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className='flex items-center gap-4'>
            <FormLabel className='account-form_image-label'>{
              field.value ? (
                <Image
                  src={field.value}
                  alt='profile photo'
                  width={96}
                  height={96}
                  priority
                  className='rounded-full object-contain'
                  />
                  ) : (
                    <Image
                    src="/assets/profile.svg"
                    alt='profile photo'
                    width={24}
                    height={24}
                    className='rounded-full object-contain'
                    />  
                   


              )
              
              }</FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
              <Input
                type="file"
                className='account-form_image-input'
                placeholder="Upload a photo"
                accept='image/*'
                onChange={(e) => handleImage(e, field.onChange)}

               />
               
            </FormControl>
           
          
          </FormItem>
        )}
      />
       <FormField control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className='flex flex-col gap-4 w-full'>
            <FormLabel className='text-base-semibold text-gray-200'>
             Name
              </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
              <Input
                type="text"
                className='account-form_input'
                {...field}
                 

               />
               
            </FormControl>
           
          
          </FormItem>
        )}
      />
      <FormField control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className='flex flex-col gap-4 w-full'>
            <FormLabel className='text-base-semibold text-gray-200'>
             Username
              </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
              <Input
                type="text"
                className='account-form_input '
                {...field}
                 

               />
               
            </FormControl>
           
          
          </FormItem>
        )}
      />
      <FormField control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className='flex flex-col gap-4 w-full'>
            <FormLabel className='text-base-semibold text-gray-200'>
             Bio
              </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
              <Textarea
                rows={10}
                className='account-form_input'
                {...field}
                 

               />
               
            </FormControl>
           
          
          </FormItem>
        )}
      />
      <Button className='bg-[#14B8A6] hover:bg-white' type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default AcountProfile
