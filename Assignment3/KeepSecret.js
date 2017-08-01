function createSecretHolder(secret) {
    return secretObj = {        
        getSecret : function getSecret() {
            return secret;
        },
        setSecret : function setSecret(num) {
             secret = num;
        }
    }
}