var main = require("./target/main");

exports.handler = main.<%= service %>.core.handler;
