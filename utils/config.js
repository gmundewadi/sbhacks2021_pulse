if (typeof window === "undefined") {
  /**
   * exposed to the server.
   */
  module.exports = {
    MONGODB_URI: process.env.MONGODB_URI
  };
}
