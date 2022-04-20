module.exports = {
    apps: [{
      name: "Delilahs",
      script: "./api/app.js",
      watch: true,
      env_local: {
        "NODE_ENV": "local",
                "API_DESCRIPTION": "API en modo local."
      },
      env_cloud: {
        "NODE_ENV": "cloud",
                "API_DESCRIPTION": "API en modo cloud."
      }
}]
};
