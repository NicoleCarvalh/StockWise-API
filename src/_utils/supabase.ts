import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.POSTGRE_BASE_URL ?? "", process.env.POSTGRE_DATABASE_KEY ?? "")

const uploadCompanyPhoto = async (fileName: string, file: any) => {
    const {data, error} = await supabase.storage.from('stock_images').upload(`company/${fileName}`, file.buffer, {
        contentType: file.mimetype
    })

    return data
}

const getPublicCompanyPhotoUrl = (fileName: string) => {
    return supabase
      .storage
      .from('stock_images')
      .getPublicUrl(`company/${fileName}`)?.data?.publicUrl
}

export { uploadCompanyPhoto, getPublicCompanyPhotoUrl }