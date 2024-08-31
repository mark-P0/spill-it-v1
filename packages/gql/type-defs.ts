import fs from "node:fs";

export const typeDefs = fs.readFileSync("./definitions.graphql", "utf-8");
