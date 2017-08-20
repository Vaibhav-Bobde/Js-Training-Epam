function createSecretHolder(secret) {
    return {
        getSecret: function getSecret() {
            return secret;
        },
        setSecret: function setSecret(num) {
            secret = num;
        }
    }
}