//enlever la class error si ajouter
let removeError = function() { 
    document.getElementById('pass').classList.remove('error'); 
    document.getElementById('email').classList.remove('error'); 
};
//ajouter la class error (effet de vibration et ombre rouge)
function addError(){
    document.getElementById('pass').classList.add('error');
    document.getElementById('email').classList.add('error');
}

//fonction de creation d'un compte
function signup(event){
    event.preventDefault();
    var res=document.getElementById("result");
    //recuperation des entrées 
    const user={
        email:document.getElementById("email").value,
        nom:document.getElementById("nom").value,
        prenom:document.getElementById("prenom").value,
        pass:cryptPass(document.getElementById("pass").value),
    };
    //chercher si on a un utilisateur avec l'email entre par l'utilisateur 
    var userCheck=localStorage.getItem(user.email);
    if(userCheck== null){// email jamais utiliser  
        //enregistrer les donnees 
        localStorage.setItem(user.email,JSON.stringify(user));
        res.style.color="green";
        res.innerHTML="compte crée";
    }
    else{//email deja utilisé par un autre compte
        res.innerHTML="user already signed up";
        res.style.color='rgb(241, 67, 67)'; 
        addError();
    }
}
//fonction de connexion
function login(event){
    event.preventDefault();
    var email=document.getElementById("email").value;
    var pass=document.getElementById("pass").value;
    var res=document.getElementById("result");
    //recuperation de l'utilisateur a partir du Local Storage
    var user=localStorage.getItem(email);
    var data=JSON.parse(user);

   if(user==null){//email n'existe pas dans local Storage
    res.style.color='rgb(241, 67, 67)';    
    res.innerHTML="wrong email or password";
    addError();
    }
    //email et mot de passe correctes
    else if(email==data.email&&cryptPass(pass)==data.pass){
        res.innerHTML="logged in";
        res.style.color="green";
        console.log(data);
    }
    else{//mot de passe inccorect
        addError();
        res.innerHTML="wrong email or password";
        res.style.color='rgb(241, 67, 67)'; 
        addError();        
    }
}
//fonction de hasgage 
const cryptPass = function(str) {
    const hs=[0xdeadbeef ^ 0,0x41c6ce57 ^ 0,0xfae69b63 ^ 0,0xbadcaffe ^ 0];
    const imu2prm=[2654435761,1597334677,9745628194,6219433873,
                   2246822507,3266489909,9807643451,4576128788];
    let hash,i,ch;
    for (i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        for(let j=0;j<4;j++){
            hs[j] = Math.imul(hs[j] ^ ch, imu2prm[j]);
        }
    }  
    for(i=0;i<4;i+=2){
        hs[i] = Math.imul(hs[i] ^ (hs[i]<<32), imu2prm[i+4]) ^ Math.imul(hs[i+1] ^ (hs[i+1]<<9), imu2prm[i+5]);
        hs[i+1] = Math.imul(hs[i+1] ^ (hs[i+1]<<32), imu2prm[i+4]) ^ Math.imul(hs[i] ^ (hs[i]<<9), imu2prm[i+5]);
    } 

    hash=(hs[1]>>>0).toString(32).padStart(16,(hs[2]>>>0).toString(16).padStart(8,0));
    hash+=(hs[0]>>>0).toString(32).padStart(16,(hs[3]>>>0).toString(16).padStart(8,0));
    return hash;
 };
 

 