import JSZip from 'jszip';
import SketchFormat from "@sketch-hq/sketch-file-format-ts";
import {SkyStyle} from "./SkyStyle";
import {SkyPage} from "./Page";

export class SkyModel {
    static currentContext: SkyModel

    zipFile!: JSZip

    data!: SketchFormat.Document

    pages: SkyPage[] = []

    private styleRegistry = new Map<string, SkyStyle>()

    constructor() {
        SkyModel.currentContext = this
    }

    async readZipFile(zipFile: JSZip) {
        this.zipFile = zipFile

        this.data = await SkyModel.readJsonFile(zipFile, 'document.json')

        this.collectStyles()

        await this.initPages()
    }

    static async readJsonFile(zipFile: JSZip, filename: string) {
        const docStr = await zipFile.file(filename)?.async('string')
        return JSON.parse(docStr)
    }

    collectStyles() {
        this.data.foreignLayerStyles?.map((obj) => obj.localSharedStyle).forEach(this.registerSharedStyle)
        this.data.layerStyles?.objects?.forEach(this.registerSharedStyle)
    }

    private registerSharedStyle = (sharedStyle: SketchFormat.SharedStyle) => {
        const skyStyle = new SkyStyle().fromJson(sharedStyle.value)
        this.registerStyle(sharedStyle.do_objectID, skyStyle)
    }

    private registerStyle(id: string, style: SkyStyle) {
        this.styleRegistry.set(id, style);
    }

    async readPageFileRefJson(fileRef: SketchFormat.FileRef) {
        return await SkyModel.readJsonFile(this.zipFile, fileRef._ref + '.json')
    }

    private async initPages() {
        for (const page of this.data.pages) {
            const pageJson = await this.readPageFileRefJson(page)
            this.pages.push(new SkyPage().fromJson(pageJson))
        }
    }
}
