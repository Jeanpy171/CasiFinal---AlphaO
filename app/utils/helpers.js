/*export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}*/

export const validateEmail = (mail, fn) => {
  if (mail == "" || mail == null) {
    console.log("INFO MAIL INVALIDA")
    fn("El campo mail no puede estar vacio")
  } else {
    let regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    if (!regex.test(mail)) {
      console.log("Direccion de correo invalida");
      fn("Direccion de correo invalida");
      return false;
    } else {
      console.log(" - - - -Direccion de correo valida");
      fn("");
    }
  }
}

export const validateName = (name, fn) => {

  if (name == "" || name == null) {
    console.log("INFO name INVALIDA")
    fn("El campo nombre no puede estar vacio")

  } else {
    if (name.length < 3) {
      fn("El campo nombre no puede tener 3 o menos digitos")
    } else {
      let regex = new RegExp(/^[A-Z]+[a-z]+$/);
      if (!regex.test(name)) {
        console.log("Nombre no valido");
        fn("El campo nombre no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Nombre valida");
        fn("");
      }
    }
  }
}

export const validateUsername = (username, fn) => {

  if (username == "" || username == null) {
    console.log("INFO name INVALIDA")
    fn("El campo nombre de usuario no puede estar vacio")

  } else {
    if (username.length < 3) {
      fn("El campo nombre de usuario no puede tener 3 o menos digitos")
    } else {
      let regex = new RegExp(/^[A-Z]+[a-z0-9_-]{3,16}$/);
      if (!regex.test(username)) {
        console.log("Nombre de usuario no valido");
        fn("El campo nombre de usuario no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Nombre de usuario valido");
        fn("");
      }
    }
  }
}

export const validateLastname = (lastName, fn) => {
  if (lastName == "" || lastName == null) {
    console.log("INFO lastName INVALIDA")
    fn("El campo apellido no puede estar vacio")
  } else {
    if (lastName.length < 3) {
      fn("El campo apellido no puede tener 3 o menos digitos")
    } else {
      let regex = new RegExp(/^[A-Z]+[a-z]+$/);
      if (!regex.test(lastName)) {
        console.log("Apellido no valido");
        fn("El campo apellido no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Apellido valido");
        fn("");
      }
    }
  }
}

export const validatePhone = (phone, fn) => {
  if (phone == "" || phone == null) {
    console.log("INFO phone INVALIDA")
    fn("El campo telefono no puede estar vacio")
  } else {
    let regex = new RegExp(/^[0][9][0-9]{8}$/gmi);
    if (phone.length < 10) {
      fn("El numero de telefono no puede tener menos 10 digitos ")
    } else {
      if (!regex.test(phone)) {
        console.log("Direccion de correo invalida");
        fn("El campo telefono no admite el numero digitado");
        return false;
      } else {
        fn("");
      }
    }
  }
}

export const validateHomePhone = (phone, fn) => {
  if (phone == "" || phone == null) {
    console.log("INFO home-phone INVALIDA")
    fn("El campo telefono convencional no puede estar vacio")
  } else {
    let regex = new RegExp(/^[0][2][0-9]{7}$/gmi);
    if (phone.length < 7) {
      fn("El campo telefono convencional no puede tener menos 9 digitos ")
    } else {
      if (!regex.test(phone)) {
        console.log("Direccion de correo invalida");
        fn("El campo telefono convencional no admite el numero digitado");
        return false;
      } else {
        fn("");
      }
    }
  }
}

export const validateAddress = (address, fn) => {
  if (address == "" || address == null) {
    console.log("INFO ADDRESS INVALIDA")
    fn("El campo direcci??n no puede estar vacio")
  } else {
    if (address.length < 4) {
      fn("La direcci??n no puede tener menos de 4 caracteres ")
    } else {
      let regex = new RegExp(/^[A-Z ]+[a-z ]+$/);
      if (!regex.test(address)) {
        console.log("Direcci??n no valido");
        fn("El campo direcci??n no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Direcci??n valido");
        fn("");
      }
    }
  }
}

export const validatePassword = (password, fn) => {
  var myregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/;
  if (password == "" || password == null || password == " ") {
    console.log("INFO ADDRESS INVALIDA")
    fn("El campo contrase??a no puede estar vacio")
  } else {

    if (myregex.test(password)) {
      console.log("CONTRASE??A CORRECTA")
      fn("");
    } else {
      console.log("CONTRASE??A INCORRECTA")
      fn("La contrase??a debe contener 8 caracteres con al menos una letra mayuscula, un numero y un caracter especial");
    }
  }

}

export const validatePasswords = (password, password_confirmation, fn) => {
  var myregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/;
  if (password == "" || password_confirmation == null) {
    console.log("INFO ADDRESS INVALIDA")
    fn("El campo contrase??a no puede estar vacio")
  } else {
    if (password != password_confirmation) {
      fn("Las contrase??as no coinciden ")
    } else {
      fn("");

      if (myregex.test(password) && myregex.test(password_confirmation)) {
        console.log("CONTRASE??A CORRECTA")
        fn("");
      } else {
        console.log("CONTRASE??A INCORRECTA")
        fn("La contrase??a debe contener al menos una letra mayuscula, un numero y un caracter especial");
      }
    }
  }
}
