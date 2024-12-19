import express, {Express, NextFunction, Request, Response} from "express";
import AmhsMessagesService from "../app/services/amhsMessages.service";
import ChokidarService from "../app/services/chokidar.service";

class App {
    app: Express = express()

    init() {
        this.expressRoutes()
        this.startServer()
        this.chokidarWatcher()
    }

    chokidarWatcher() {
        const cs = new ChokidarService()
        cs.init()
    }

    expressRoutes() {
        this.app.get('/amhs-messages', async (req: Request, res: Response, next: NextFunction) => {
            const data = await AmhsMessagesService.get() ?? []
            res.json({
                messages: 'Amhs messages',
                data
            })
        })
    }

    startServer() {
        this.app.listen(4444).on('listening', () => {
            console.log('Application started at 4444')
        })
    }
}

export default App
