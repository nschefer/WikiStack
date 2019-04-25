const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

function slugFromTitle (title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define("pages", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: Sequelize.ENUM("open", "close")
});

Page.beforeValidate((user) => {
  const slugTitle = slugFromTitle(user.dataValues.title);
  user.dataValues.slug = slugTitle;
});

const User = db.define("users", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, validate:{isEmail: true}}
});

module.exports = {
  db,
  Page,
  User
};
