import {watch} from "chokidar";
import * as fs from "fs/promises";
import AmhsMessagesService from "./amhsMessages.service";
import * as path from "path";
import {logger} from "../../logger/winston";

class ChokidarService {
    filepath: string = '/usr/src/app/messages'
    read_filepath: string = '/usr/src/app/read-messages'

    init() {
        const watcher = watch(this.filepath, {
            persistent: true,
        })

        watcher.on('add', async (filepath) => {
            try {
                console.log(`${filepath} file added`)
                const filename = path.basename(filepath)
                const data = await fs.readFile(filepath, 'utf8');
                const jsonData = JSON.parse(data);
                await AmhsMessagesService.store({
                    filename,
                    content: jsonData
                })
                await this.moveFile(filepath, `${this.read_filepath}/${filename}`)
                logger.log('info', filepath)
            } catch (exception) {
                console.log(exception)
                logger.log('error', exception)
            }
        })

        console.log(`Watching for changes in: ${this.filepath}`);
    }

    async moveFile(sourcePath: string, destinationPath: string) {
        try {
            await fs.copyFile(sourcePath, destinationPath);
            console.log(`File copied to: ${destinationPath}`);

            await fs.unlink(sourcePath);
            console.log(`Original file deleted: ${sourcePath}`);
        } catch (error) {
            logger.log('error', error)
        }
    }
}

export default ChokidarService
