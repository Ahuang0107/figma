export function saveJsonFile(fileName: string, docStr: string) {
    const download = document.createElement("a")
    download.download = `${fileName}.json`
    download.style.display = "none"
    const blob = new Blob([docStr])
    download.href = URL.createObjectURL(blob)
    document.body.appendChild(download)
    download.click()
    document.body.removeChild(download)
}
