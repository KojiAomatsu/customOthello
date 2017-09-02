import Kitura
import KituraNet
import HeliumLogger
import Mustache
import Foundation

HeliumLogger.use()

let basePath = FileManager.default.currentDirectoryPath
let repository = TemplateRepository(directoryPath: basePath + "/Sources/customOthello/Static/")
let router = Router()

router.get("/") {
    request, response, next in
        let template = try! repository.template(named: "index")
        let data = [
            "content": "Othello game"
        ]
        let html = try! template.render(with: Box(data))
        response.status(HTTPStatusCode.OK).send(html)
        next()
}

Kitura.addHTTPServer(onPort: 8080, with: router)

Kitura.run()
