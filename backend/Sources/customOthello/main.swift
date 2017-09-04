import Kitura
import KituraNet
import HeliumLogger
import Mustache
import Foundation
import SwiftyJSON

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

router.get("/list") {
    request, response, next in
        let dict : [String: Any] = [
            "length": 2,
            "list" : [
                [
                "id" : 3,
                "size" : 6,
                "ppt" : 2
                ],
                [
                "id" : 4,
                "size" : 8,
                "ppt" : 1
                ],
            ]
        ]
        response.headers["Content-Type"] = "application/json; charset=UTF-8"
        try response.send(json: JSON(dict)).end()

}

Kitura.addHTTPServer(onPort: 8080, with: router)

Kitura.run()
