module.exports = {
  bucket: {
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  },
  twilio: {
    auth: process.env.TWILIO_AUTH,
    sid: process.env.TWILIO_SID,
    number: process.env.TWILIO_NUMBER
  },  
  firebase : {
      apiKey: "AIzaSyBJj_sA3OqXQGrm2UmSUvbTKKp34b42u6Y",
      authDomain: "dbtronics-79c66.firebaseapp.com",
      databaseURL: "https://dbtronics-79c66.firebaseio.com",
      projectId: "dbtronics-79c66",
      storageBucket: "dbtronics-79c66.appspot.com",
      messagingSenderId: "299370403853",
      appId: "1:299370403853:web:2f2a63607f773821259d44"
    }      
}
