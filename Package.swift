// swift-tools-version:3.1

import PackageDescription

let package = Package(
    name: "customOthello",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1, minor: 7),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 1, minor: 7),
        .Package(url: "https://github.com/vapor/fluent.git", majorVersion: 2),
        .Package(url: "https://github.com/IBM-Swift/GRMustache.swift.git", majorVersion: 1)
    ])
