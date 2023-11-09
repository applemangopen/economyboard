const { Sequelize } = require("sequelize");
const { db } = require("../constants");

const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
});

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("sequelize 성공적으로 데이터베이스 연결");

        await sequelize.sync();
        console.log("sequelize 요청한 table이 성공적으로 생성됨!");
    } catch (err) {
        console.error("데이터베이스에 접근할 수 없거나 테이블 생성 불가", err);
    }
};

initDB();

module.exports = {
    sequelize,
    initDB,
};
