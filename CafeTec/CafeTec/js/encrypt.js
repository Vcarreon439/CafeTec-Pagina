function validateform(){  
    var name=document.getElementById('username').value;  
    var password=document.getElementById('password').value;  
 
  

    if (name==null || name==""){  
      alert("Nombre de Usuario Vacio");  
      return false;  
    }else if(password.length<6){  
      alert("La contraseña debe ser de al menos 6 caracteres");  
      return false;  
    }else{
      const derivacionDeClaveBasadaEnContraseña = async (contraseña, sal, iteraciones, longitud, hash, algoritmo = 'AES-CBC') => {
        const encoder = new TextEncoder();
        let keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          encoder.encode(contraseña),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );
        return await window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: encoder.encode(sal),
            iterations: iteraciones,
            hash
          },
          keyMaterial,
          { name: algoritmo, length: longitud },
          false,
          ['encrypt', 'decrypt']
        );
      }

      const encriptar = async (contraseña, textoPlano) => {
  const encoder = new TextEncoder();
  const sal = window.crypto.getRandomValues(new Uint8Array(16));
  const vectorInicializacion = window.crypto.getRandomValues(new Uint8Array(16));
  const bufferTextoPlano = encoder.encode(textoPlano);
  const clave = await derivacionDeClaveBasadaEnContraseña(contraseña, sal, 100000, 256, 'SHA-256');
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: vectorInicializacion },
    clave,
    bufferTextoPlano
  );
  return bufferABase64([
    ...sal,
    ...vectorInicializacion,
    ...new Uint8Array(encrypted)
  ]);
};
      alert('H2/I7wdDlJQFqBsny63blX+xw0crn9lIXBtVyifB7wEGor8EBNQA69eB0BwWEeDv');
      
    }
      

      
}  

