import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
});
