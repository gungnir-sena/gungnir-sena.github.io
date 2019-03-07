
const getOrientation = buffer => {
    const dv = new DataView(buffer)
    if (dv.getUint16(2) !== 65505) {
        return 0
    }
    const littleEndian = dv.getUint8(12) === 73
    const count = dv.getUint16(20, littleEndian)
    for (let i = 0; i < count; i++) {
        const start = 22 + i * 12
        const tag = dv.getUint16(start, littleEndian)
        if (tag === 274) {
            const value = dv.getUint16(start + 8, littleEndian)
            return value
        }
    }
    return 0
}

const arrayBufferToDataURL = arrBuf => {
    const blob = new Blob([arrBuf], { type: 'image/jpeg' })
    return window.URL.createObjectURL(blob)
}

const embedImageTag = dataURL => {
    const img = new Image()
    img.src = dataURL
    img.style = "width:100%"
    document.body.appendChild(img)
    return img
}

const createTransformedCanvas = (orientation, img) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if ([5, 6, 7, 8].indexOf(orientation) > -1) {
        canvas.width = img.height
        canvas.height = img.width
    } else {
        canvas.width = img.width
        canvas.height = img.height
    }
    switch (orientation) {
        case 2: ctx.transform(-1, 0, 0, 1, img.width, 0); break
        case 3: ctx.transform(-1, 0, 0, -1, img.width, img.height); break
        case 4: ctx.transform(1, 0, 0, -1, 0, img.height); break
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
        case 6: ctx.transform(0, 1, -1, 0, img.height, 0); break
        case 7: ctx.transform(0, -1, -1, 0, img.height, img.width); break
        case 8: ctx.transform(0, -1, 1, 0, 0, img.width); break
    }
    ctx.drawImage(img, 0, 0)
    return canvas
}

document.getElementById('InputFile').addEventListener('change', (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const orientation = getOrientation(reader.result)
        if (orientation === 0 || orientation === 1) {
            const data = arrayBufferToDataURL(reader.result)
            const img = embedImageTag(data)
            img.addEventListener('load', () => {
                window.URL.revokeObjectURL(data)
            })
        } else {
            const img = new Image()
            img.src = arrayBufferToDataURL(reader.result)
            img.addEventListener('load', () => {
                const canvas = createTransformedCanvas(orientation, img)
                window.URL.revokeObjectURL(img.src)
                embedImageTag(canvas.toDataURL('image/jpeg'))
            })
        }
    })
    reader.readAsArrayBuffer(file)

})