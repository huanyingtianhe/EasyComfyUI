const { PrismaClient } = require('@prisma/client')

var connection  = null;

const connect = async () => {
  try {
    if (connection) {
      console.log("use existing db connection")
      return connection
    }
    else {
      connection = new PrismaClient()
      return connection;
    }
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
