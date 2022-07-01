module.exports = {
    ENTORNO: process.env.ENT || 'PROD',
    PORT: process.env.PORT || 8080,
    MODO: process.env.MODO || 'CLUSTER',
}