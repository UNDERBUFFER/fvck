import fs from 'fs'
import abs from 'path'
import FileType from 'file-type'


export async function validFile(img: string): Promise<Boolean> {
    const raw = new Buffer(img, 'base64')
    const ext = await FileType.fromBuffer(raw)
    return Boolean(ext)
}


export async function uploadImage(img: string): Promise<string> {
    const raw = new Buffer(img, 'base64')

    const dir = abs.resolve( __dirname, '..', '..', 'images' )
    const ext = (await FileType.fromBuffer(raw)).ext
    const path = `${dir}/${Math.random().toString(36).substr(2, 9)}.${ext}`

    await fs.promises.writeFile(path, raw)
    return path
}

