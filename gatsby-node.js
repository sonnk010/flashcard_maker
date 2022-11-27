const path = require("path")

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  createPage({
    path: `/app/flash-card/:id`,
    matchPath: `/app/flash-card/:id`,
    component: path.resolve(`./src/pages/app/flash-card.js`),
})
}