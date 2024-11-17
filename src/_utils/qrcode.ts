import QRCode from "qrcode"

async function qrCodeFileGenerator(id: string) {
    const url = await QRCode.toDataURL(id, {
        width: 100,
        margin: 2,
        color: {
            dark: "#00cc74"
        }
    })

    const qrCodeResponse = await fetch(url)
    const blobQrCode = await qrCodeResponse.blob()

    const qrcodeFile = new File([blobQrCode], 'exemple.png', {
        type: "image/png"
    })

    const arrayBuffer = await qrcodeFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const completedQrCodeFile = {
        name: qrcodeFile.name,
        size: qrcodeFile.size,
        type: qrcodeFile.type,
        lastModified: qrcodeFile.lastModified,
        buffer
    }

    return completedQrCodeFile
}

export { qrCodeFileGenerator }