import mssql from 'mssql';
let pool = {
    user: 'userEC52E044DE',
    password: 'POlb33D8PQlo68S',
    database: 'Yeni_Mekmar_DB',
    server: '94.73.151.2',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

const api = {
    connect(){
      mssql.connect(pool);
      return mssql;
    }
}

export default api.connect();
 